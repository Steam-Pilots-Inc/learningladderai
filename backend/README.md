# Backend

A Gemini-powered STEM tutoring prototype with a FastAPI service and an interactive learning ladder CLI.

## Setup

Requires Python 3.10+ and your own Google AI Studio API key. Run these commands from the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
```

Set `GEMINI_API_KEY` in `backend/.env`. `GEMINI_MODEL_NAME` defaults to `gemini-2.5-flash`; choose a model available to your account if needed. Keep real keys out of Git and frontend variables.

## API server

From the repository root:

```bash
python -m uvicorn backend.app.api:app --reload --host 127.0.0.1 --port 8000
```

Endpoints:

- `GET /health`: readiness probe.
- `POST /api/session`: start an adaptive learning session.
- `POST /api/session/{session_id}/answer`: grade an answer and get the next question.
- `POST /api/chat/session`: create a conversational tutoring session.
- `POST /api/chat/{chat_id}/message`: send a message to the tutor.

Sessions are held in memory. The prototype has no authentication or rate limiting and allows cross-origin requests. Keep it local until deployment controls are added. Learner messages are sent to Gemini for processing.

## CLI

From the repository root:

```bash
python -m backend.app.main --subject "Algebra" --grade "7th Grade"
```

Use `--help` for options, including AI or local fuzzy-match grading and generated reference answers. Generated content and grading require review.

## Tests

From the repository root:

```bash
python -m pip install -r backend/requirements-dev.txt
python -m pytest backend/tests
```
