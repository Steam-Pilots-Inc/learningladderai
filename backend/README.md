# Backend

A lightweight CLI for the STEM Learning Ladder that talks to the Gemini API.

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

## Usage

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
