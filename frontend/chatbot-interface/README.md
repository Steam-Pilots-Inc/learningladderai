# Chatbot Interface

React + Vite prototype for the Learning Ladder conversational tutor. The app now
talks to the Gemini-powered backend for question generation and grading.

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

If you are using the repository workspaces, you can run from the root instead:

```bash
pnpm dev --filter chatbot-interface
```

Create `.env` from `.env.example` and point `VITE_BACKEND_URL` at your running
FastAPI instance (defaults to `http://localhost:8000`).

## Notes

- Built with ShadCN UI components for rapid experimentation.
- Live responses depend on the backend API; fall back to the retry button in the
  chat if the connection drops.
