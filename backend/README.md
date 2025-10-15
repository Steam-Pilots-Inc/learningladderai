# Backend

A lightweight Gemini-powered service that drives the STEM Learning Ladder.

## Prerequisites

- Python 3.10+
- A Google AI Studio API key with access to the Gemini models

## Setup

1. Create a virtual environment and activate it.
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and populate `GEMINI_API_KEY` with your key.

## API server

Run the FastAPI service (default port 8000):

```bash
uvicorn backend.app.api:app --reload
```

Endpoints:

- `GET /health` – basic readiness probe
- `POST /api/session` – start a new learning session (optional body for custom grade/subject)
- `POST /api/session/{session_id}/answer` – grade an answer and receive the next question

## CLI

Run the interactive CLI:

```bash
python -m backend.app.main --subject "Algebra" --grade "7th Grade"
```

Use `--help` to see the available options, such as disabling AI-generated reference answers or switching to local grading mode.

## Tests

Install the dev requirements and execute pytest:

```bash
pip install -r requirements-dev.txt
pytest
```
