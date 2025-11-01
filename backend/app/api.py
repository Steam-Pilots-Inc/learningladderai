from __future__ import annotations

import os
import threading
import uuid
from dataclasses import dataclass, field
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
import google.generativeai as genai


@dataclass
class SessionState:
    """Track a learner's progress through the adaptive ladder."""

    settings: GameSettings
    level: int = 1
    score: int = 0
    current_question: Optional[str] = None
    current_answer: Optional[str] = None
    asked_questions: list[str] = field(default_factory=list)


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
            asked_questions=list(stored.asked_questions),
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
        while attempts < 5:
            question, answer = get_question(
                self._model,
                state.settings,
                state.level,
                exclude=state.asked_questions,
            )
            if question.startswith("Error"):
                attempts += 1
                continue
            if question in state.asked_questions:
                attempts += 1
                continue
            state.current_question = question
            state.current_answer = answer
            state.asked_questions.append(question)
            return question, answer
        state.current_question = question
        state.current_answer = answer
        if question and not question.startswith("Error") and question not in state.asked_questions:
            state.asked_questions.append(question)
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

# --- Conversational tutoring (chat) ---

@dataclass
class ChatState:
    chat: any


class ChatManager:
    def __init__(self, model: genai.GenerativeModel):
        self._model = model
        self._chats: Dict[str, ChatState] = {}
        self._lock = threading.Lock()

    def create_chat(self) -> str:
        system_preamble = (
            "You are a friendly, step-by-step math tutor. "
            "Explain reasoning clearly and keep steps concise."
        )
        chat = self._model.start_chat(
            history=[{"role": "user", "parts": [system_preamble]}]
        )
        chat_id = uuid.uuid4().hex
        with self._lock:
            self._chats[chat_id] = ChatState(chat=chat)
        return chat_id

    def send(self, chat_id: str, message: str) -> str:
        with self._lock:
            state = self._chats.get(chat_id)
        if not state:
            raise KeyError(chat_id)
        resp = state.chat.send_message(message)
        return (resp.text or "").strip()


CHAT_MANAGER = ChatManager(MODEL)

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


class ChatSessionResponse(BaseModel):
    chat_session_id: str


class ChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1)


class ChatMessageResponse(BaseModel):
    reply: str


@app.post("/api/chat/session", response_model=ChatSessionResponse)
def create_chat_session() -> ChatSessionResponse:
    chat_id = CHAT_MANAGER.create_chat()
    return ChatSessionResponse(chat_session_id=chat_id)


@app.post("/api/chat/{chat_id}/message", response_model=ChatMessageResponse)
def chat_message(chat_id: str, request: ChatMessageRequest) -> ChatMessageResponse:
    try:
        reply = CHAT_MANAGER.send(chat_id, request.message)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Chat session not found.") from exc
    return ChatMessageResponse(reply=reply)
