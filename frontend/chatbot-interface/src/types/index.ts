import { LucideIcon } from "lucide-react";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ExampleQuestion {
  icon: LucideIcon;
  category: string;
  question: string;
}

export interface ModelOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface SessionResponse {
  sessionId: string;
  question: string;
  level: number;
  score: number;
}

export interface AnswerResponse {
  correct: boolean;
  correctAnswer: string;
  aiReferenceAnswer?: string | null;
  score: number;
  level: number;
  nextQuestion: string;
}

export interface SessionConfig {
  grade?: string;
  subject?: string;
  maxDiff?: number;
  useAiAnswers?: boolean;
  gradingMode?: "ai" | "fast";
  modelName?: string;
}

export interface ChatSessionResponse {
  chatSessionId: string;
}

export interface ChatMessageResponse {
  reply: string;
}
