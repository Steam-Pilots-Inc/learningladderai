"""STEM Learning Ladder CLI entrypoint."""

from __future__ import annotations

import argparse
import os
import sys
import time

from dotenv import load_dotenv

from .ladder import (
    GameSettings,
    ai_grade,
    configure_model,
    fetch_ai_solution,
    get_question,
    is_similar,
)


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


def run_game(settings: GameSettings) -> None:
    """Execute the main learning loop."""
    api_key = os.getenv("GEMINI_API_KEY")
    try:
        model = configure_model(api_key, settings.model_name)
    except ValueError as exc:
        sys.exit(str(exc))

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
    run_game(settings)


if __name__ == "__main__":
    main()
