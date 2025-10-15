"""STEM Learning Ladder CLI entrypoint."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from dataclasses import dataclass
from difflib import SequenceMatcher
from typing import Optional, Tuple

from dotenv import load_dotenv
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


def parse_args() -> GameSettings:
    """Parse CLI arguments and return structured settings."""
    parser = argparse.ArgumentParser(description="Play the STEM Learning Ladder.")
    parser.add_argument("--grade", default=GameSettings.grade, help="Target grade level.")
    parser.add_argument("--subject", default=GameSettings.subject, help="Subject focus.")
    parser.add_argument(
        "--max-diff",
        type=int,
        default=GameSettings.max_diff,
        help="Maximum difficulty level in the adaptive ladder.",
    )
    parser.add_argument(
        "--grading-mode",
        choices=("ai", "fast"),
        default=GameSettings.grading_mode,
        help="Use Gemini semantic grading or local fuzzy matching.",
    )
    parser.add_argument("--model-name", default=GameSettings.model_name, help="Gemini model identifier.")
    parser.add_argument(
        "--use-ai-answers",
        dest="use_ai_answers",
        action="store_true",
        help="Display Gemini-generated reference answers during play.",
    )
    parser.add_argument(
        "--no-ai-answers",
        dest="use_ai_answers",
        action="store_false",
        help="Hide Gemini-generated reference answers.",
    )
    parser.set_defaults(use_ai_answers=GameSettings.use_ai_answers)

    args = parser.parse_args()
    return GameSettings(
        grade=args.grade,
        subject=args.subject,
        max_diff=args.max_diff,
        use_ai_answers=args.use_ai_answers,
        grading_mode=args.grading_mode,
        model_name=args.model_name,
    )


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
    data = extract_json_object(response.text.strip())
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


def fetch_ai_solution(model: genai.GenerativeModel, subject: str, question: str) -> Optional[str]:
    """Ask Gemini for its worked answer for comparison."""
    try:
        response = model.generate_content(
            f"Solve this {subject} question: {question}. "
            "Provide only the final numeric or symbolic answer."
        )
    except Exception:
        return None
    return response.text.strip()


def run_game(settings: GameSettings, model: genai.GenerativeModel) -> None:
    """Execute the main learning loop."""
    level = 1
    score = 0

    print("Welcome to the STEM Learning Ladder! Type 'exit' to quit.\n")

    while True:
        print(f"Level {level}/{settings.max_diff} | Score: {score}")

        question, answer = get_question(model, settings, level)
        if "Error" in question:
            time.sleep(1)
            question, answer = get_question(model, settings, level)

        print(f"Question: {question}\n")
        user_answer = input("Your answer: ").strip()
        if user_answer.lower() == "exit":
            print(f"Final Score: {score}")
            break

        if settings.use_ai_answers:
            ai_solution = fetch_ai_solution(model, settings.subject, question)
            if ai_solution:
                print(f"AI's Answer: {ai_solution}\n")
            else:
                print("AI's Answer: unavailable\n")

        if settings.grading_mode == "ai":
            correct = ai_grade(model, question, user_answer, answer)
        else:
            correct = is_similar(user_answer, answer)

        if correct:
            print("Correct!\n")
            score += 1
            level = min(level + 1, settings.max_diff)
        else:
            print(f"Incorrect. Correct answer: {answer}\n")
            level = max(1, level - 1)


def main() -> None:
    """Entrypoint used by the CLI."""
    load_dotenv()
    settings = parse_args()
    api_key = os.getenv("GEMINI_API_KEY")
    try:
        model = configure_model(api_key, settings.model_name)
    except ValueError as exc:
        sys.exit(str(exc))

    run_game(settings, model)


if __name__ == "__main__":
    main()
