# STEAM Pilots Learning Ladder AI

Learning Ladder AI explores how Gemini-powered tutoring flows pair with polished onboarding and marketing experiences.

## Structure

- `frontend/` – Vite + React prototypes (`chatbot-interface`, `homepage-concept`) for the product surfaces.
- `backend/` – Gemini API + CLI that generates adaptive questions and grades answers.
- `docs/` – Reference material for UX guidelines, product notes, and research.

Supporting files add polish (`LICENSE`, `.editorconfig`, `.prettierrc`, and `CONTRIBUTING.md`).

## Quick Start

```bash
# install workspace dependencies
pnpm install

# run the backend API (requires GEMINI_API_KEY in backend/.env)
uvicorn backend.app.api:app --reload

# run the chatbot interface in another terminal
pnpm dev --filter chatbot-interface
```

See `frontend/README.md` and `backend/README.md` for deeper instructions, including the CLI mode.

## Environment

Create `backend/.env` from `.env.example` and add your Gemini key. For local development you can set `VITE_BACKEND_URL=http://localhost:8000` in `frontend/chatbot-interface/.env`.

## Known Issues

These screens remain prototypes:
- Some text overlaps on smaller breakpoints (MK)
- Transparency and blur effects may render inconsistently (MK)
- Layout responsiveness still needs iteration (MK)
