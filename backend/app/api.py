from __future__ import annotations

import os
import threading
import uuid
from dataclasses import dataclass
from typing import Dict, Optional, Tuple

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .ladder import (
    GameSettings,
    ai_grade,
    configure_model,
    fetch_ai_solution,
    get_question,
    is_similar,
)


@dataclass
class SessionState:
    """Track a learner's progress through the adaptive ladder."""

    settings: GameSettings
    level: int = 1
    score: int = 0
    current_question: Optional[str] = None
    current_answer: Optional[str] = None


class SessionManager:
    """Manage active sessions and interface with the Gemini model."""

    def __init__(self, model):
        self._model = model
        self._sessions: Dict[str, SessionState] = {}
        self._lock = threading.Lock()

    def create_session(self, settings: Optional[GameSettings] = None) -> Tuple[str, SessionState]:
        state = SessionState(settings=settings or GameSettings())
        question, _ = self._generate_question(state)
        if question.startswith("Error"):
            raise RuntimeError("Unable to generate a question from Gemini.")

        session_id = uuid.uuid4().hex
        with self._lock:
            self._sessions[session_id] = state
        return session_id, state

    def submit_answer(self, session_id: str, answer: str) -> Tuple[bool, str, Optional[str], str, SessionState]:
        with self._lock:
            stored = self._sessions.get(session_id)
        if not stored:
            raise KeyError(session_id)

        state = SessionState(
            settings=stored.settings,
            level=stored.level,
            score=stored.score,
            current_question=stored.current_question,
            current_answer=stored.current_answer,
        )

        if not state.current_question or not state.current_answer:
            question, correct_answer = self._generate_question(state)
            if question.startswith("Error"):
                raise RuntimeError("Unable to generate a question from Gemini.")
        else:
            question = state.current_question
            correct_answer = state.current_answer

        if state.settings.grading_mode == "ai":
            is_correct = ai_grade(self._model, question, answer, correct_answer)
        else:
            is_correct = is_similar(answer, correct_answer)

        ai_reference = (
            fetch_ai_solution(self._model, state.settings.subject, question)
            if state.settings.use_ai_answers
            else None
        )

        if is_correct:
            state.score += 1
            state.level = min(state.level + 1, state.settings.max_diff)
        else:
            state.level = max(1, state.level - 1)

        next_question, _ = self._generate_question(state)
        if next_question.startswith("Error"):
            raise RuntimeError("Unable to generate a question from Gemini.")

        with self._lock:
            self._sessions[session_id] = state

        return is_correct, correct_answer, ai_reference, next_question, state

    def _generate_question(self, state: SessionState) -> Tuple[str, str]:
        attempts = 0
        question, answer = "Error: could not parse question.", "N/A"
        while attempts < 3:
            question, answer = get_question(self._model, state.settings, state.level)
            if not question.startswith("Error"):
                break
            attempts += 1
        state.current_question = question
        state.current_answer = answer
        return question, answer


class SessionRequest(BaseModel):
    grade: Optional[str] = None
    subject: Optional[str] = None
    max_diff: Optional[int] = Field(default=None, gt=0, le=20)
    use_ai_answers: Optional[bool] = None
    grading_mode: Optional[str] = Field(default=None, pattern="^(ai|fast)$")
    model_name: Optional[str] = None


class SessionResponse(BaseModel):
    session_id: str
    question: str
    level: int
    score: int


class AnswerRequest(BaseModel):
    answer: str = Field(..., min_length=1)


class AnswerResponse(BaseModel):
    correct: bool
    correct_answer: str
    ai_reference_answer: Optional[str] = None
    score: int
    level: int
    next_question: str


load_dotenv()
_default_settings = GameSettings()
MODEL_NAME = os.getenv("GEMINI_MODEL_NAME", _default_settings.model_name)

try:
    MODEL = configure_model(os.getenv("GEMINI_API_KEY"), MODEL_NAME)
except ValueError as exc:
    raise RuntimeError("Backend startup failed: configure GEMINI_API_KEY.") from exc

SESSION_MANAGER = SessionManager(MODEL)

app = FastAPI(title="Learning Ladder AI API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/api/session", response_model=SessionResponse)
def create_session(request: SessionRequest | None = None) -> SessionResponse:
    kwargs = {}
    if request:
        if request.grade:
            kwargs["grade"] = request.grade
        if request.subject:
            kwargs["subject"] = request.subject
        if request.max_diff:
            kwargs["max_diff"] = request.max_diff
        if request.use_ai_answers is not None:
            kwargs["use_ai_answers"] = request.use_ai_answers
        if request.grading_mode:
            kwargs["grading_mode"] = request.grading_mode
        if request.model_name:
            kwargs["model_name"] = request.model_name
    if "model_name" not in kwargs:
        kwargs["model_name"] = MODEL_NAME
    settings = GameSettings(**kwargs)

    try:
        session_id, state = SESSION_MANAGER.create_session(settings)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    return SessionResponse(
        session_id=session_id,
        question=state.current_question or "",
        level=state.level,
        score=state.score,
    )


@app.post("/api/session/{session_id}/answer", response_model=AnswerResponse)
def submit_answer(
    request: AnswerRequest,
    session_id: str = Path(..., min_length=8, description="Active session identifier."),
) -> AnswerResponse:
    try:
        correct, correct_answer, ai_reference, next_question, state = SESSION_MANAGER.submit_answer(
            session_id, request.answer
        )
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Session not found.") from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    return AnswerResponse(
        correct=correct,
        correct_answer=correct_answer,
        ai_reference_answer=ai_reference,
        score=state.score,
        level=state.level,
        next_question=next_question,
    )
