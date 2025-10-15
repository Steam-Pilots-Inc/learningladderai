from __future__ import annotations

import json
import re
from dataclasses import dataclass
from difflib import SequenceMatcher
from typing import Optional, Tuple

import google.generativeai as genai

DEFAULT_MODEL_NAME = "gemini-2.5-flash"
JSON_OBJECT_PATTERN = re.compile(r"\{.*\}", re.DOTALL)


@dataclass
class GameSettings:
    """Container for runtime settings."""

    grade: str = "7th Grade"
    subject: str = "Algebra"
    max_diff: int = 10
    use_ai_answers: bool = True
    grading_mode: str = "ai"  # options: "ai" or "fast"
    model_name: str = DEFAULT_MODEL_NAME


def configure_model(api_key: Optional[str], model_name: str) -> genai.GenerativeModel:
    """Initialise the Gemini client, failing fast if the API key is missing."""
    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY is not set. Provide it via an environment variable or .env file."
        )

    genai.configure(api_key=api_key)
    return genai.GenerativeModel(model_name)


def extract_json_object(text: str) -> Optional[dict]:
    """Attempt to parse a JSON object from an arbitrary Gemini response."""
    match = JSON_OBJECT_PATTERN.search(text)
    if not match:
        return None
    try:
        return json.loads(match.group())
    except json.JSONDecodeError:
        return None


def get_question(
    model: genai.GenerativeModel, settings: GameSettings, level: int
) -> Tuple[str, str]:
    """Request a single question/answer pair from Gemini."""
    prompt = (
        f"Generate a {settings.subject} question for {settings.grade} students "
        f"at difficulty {level} (1=easy, {settings.max_diff}=hard). "
        "Return the result strictly in JSON with keys 'question' and 'answer'."
    )
    response = model.generate_content(prompt)
    text = (response.text or "").strip()
    data = extract_json_object(text)
    if data:
        return data.get("question", "No question"), data.get("answer", "No answer")
    return "Error: could not parse question.", "N/A"


def is_similar(user_ans: str, correct_ans: str, threshold: float = 0.8) -> bool:
    """Return True when user answer is sufficiently close to the expected answer."""

    def clean(value: str) -> str:
        return "".join(ch for ch in value.lower() if ch.isalnum() or ch in "+-=x")

    a = clean(user_ans)
    b = clean(str(correct_ans))
    return SequenceMatcher(None, a, b).ratio() >= threshold


def ai_grade(
    model: genai.GenerativeModel, question: str, user_ans: str, correct_ans: str
) -> bool:
    """Use Gemini to grade a response semantically."""
    prompt = (
        "You are grading a student's math answer.\n\n"
        f"Question: {question}\n"
        f"Correct Answer: {correct_ans}\n"
        f"Student Answer: {user_ans}\n\n"
        "Determine if the student's answer is correct or equivalent, allowing for "
        "misspellings, paraphrasing, units, or descriptive text. "
        "Respond ONLY with 'correct' or 'incorrect'."
    )
    try:
        result = model.generate_content(prompt).text.strip().lower()
    except Exception:
        return False
    return "correct" in result


def fetch_ai_solution(
    model: genai.GenerativeModel, subject: str, question: str
) -> Optional[str]:
    """Ask Gemini for its worked answer for comparison."""
    try:
        response = model.generate_content(
            f"Solve this {subject} question: {question}. "
            "Provide only the final numeric or symbolic answer."
        )
    except Exception:
        return None
    solution = response.text.strip() if response.text else None
    return solution or None
