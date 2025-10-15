# STEAM Pilots Learning Ladder AI

Learning Ladder AI explores how Gemini-powered tutoring flows pair with polished onboarding and marketing experiences.

## Structure

- `frontend/` – Vite + React prototypes (`chatbot-interface`, `homepage-concept`) for the product surfaces.
- `backend/` – Gemini CLI that generates adaptive questions and grades answers.
- `docs/` – Reference material for UX guidelines, product notes, and research.

Supporting files add polish (`LICENSE`, `.editorconfig`, `.prettierrc`, and `CONTRIBUTING.md`).

## Quick Start

```bash
# install workspace dependencies
pnpm install

# run the chatbot interface
pnpm dev --filter chatbot-interface

# launch the backend CLI (after setting GEMINI_API_KEY)
python -m backend.app.main
```

See `frontend/README.md` and `backend/README.md` for deeper instructions.

## Environment

Create `backend/.env` from `.env.example` and add your Gemini key. No keys should be committed to the repository.

## Known Issues

These screens remain prototypes:
- Some text overlaps on smaller breakpoints (MK)
- Transparency and blur effects may render inconsistently (MK)
- Layout responsiveness still needs iteration (MK)
