import { AnswerResponse, SessionConfig, SessionResponse } from "../types";

const DEFAULT_BACKEND_URL = "http://localhost:8000";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ?? DEFAULT_BACKEND_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function createSession(
  config?: SessionConfig,
): Promise<SessionResponse> {
  const body =
    config &&
    JSON.stringify({
      ...(config.grade ? { grade: config.grade } : {}),
      ...(config.subject ? { subject: config.subject } : {}),
      ...(config.maxDiff ? { max_diff: config.maxDiff } : {}),
      ...(config.useAiAnswers !== undefined
        ? { use_ai_answers: config.useAiAnswers }
        : {}),
      ...(config.gradingMode ? { grading_mode: config.gradingMode } : {}),
      ...(config.modelName ? { model_name: config.modelName } : {}),
    });

  const payload = await handleResponse<{
    session_id: string;
    question: string;
    level: number;
    score: number;
  }>(
    await fetch(`${API_BASE_URL}/api/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ?? undefined,
    }),
  );

  return {
    sessionId: payload.session_id,
    question: payload.question,
    level: payload.level,
    score: payload.score,
  };
}

export async function submitAnswer(
  sessionId: string,
  answer: string,
): Promise<AnswerResponse> {
  const payload = await handleResponse<{
    correct: boolean;
    correct_answer: string;
    ai_reference_answer?: string | null;
    score: number;
    level: number;
    next_question: string;
  }>(
    await fetch(`${API_BASE_URL}/api/session/${sessionId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    }),
  );

  return {
    correct: payload.correct,
    correctAnswer: payload.correct_answer,
    aiReferenceAnswer: payload.ai_reference_answer,
    score: payload.score,
    level: payload.level,
    nextQuestion: payload.next_question,
  };
}
