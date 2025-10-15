import { BookOpen, Calculator, Globe, Code, Atom, Palette, Zap, Gauge, Brain } from "lucide-react";

export const EXAMPLE_QUESTIONS = [
  {
    icon: BookOpen,
    category: "Literature",
    question: "Explain the themes in Shakespeare's Hamlet"
  },
  {
    icon: Calculator,
    category: "Mathematics",
    question: "Help me solve quadratic equations step by step"
  },
  {
    icon: Globe,
    category: "History",
    question: "What were the causes of World War I?"
  },
  {
    icon: Code,
    category: "Computer Science",
    question: "Explain how recursion works with examples"
  },
  {
    icon: Atom,
    category: "Science",
    question: "How does photosynthesis work?"
  },
  {
    icon: Palette,
    category: "Arts",
    question: "Analyze the symbolism in Van Gogh's Starry Night"
  }
];

export const AI_RESPONSES = [
  "That's a great question! Let me break this down for you step by step...",
  "I'd be happy to help you understand this concept better. Here's what you need to know:",
  "This is an interesting topic in education. Let me provide you with a comprehensive explanation:",
  "Based on your question, I can see you're exploring an important subject. Here's my response:",
  "Excellent question! This is something many students find challenging, so let me explain it clearly:"
];

export const MODEL_OPTIONS = [
  { value: "auto", label: "Auto Model", icon: Gauge },
  { value: "fast", label: "Quick Model", icon: Zap },
  { value: "thinking", label: "Thinking Model", icon: Brain }
];

export const WELCOME_MESSAGE = "Ask me anything about your studies, get explanations, work through problems, or explore new topics. I'm here to help you learn and teach more effectively.";

export const SIMULATION_SUFFIX = "\n\nThis is a simulated response. In a real implementation, this would connect to an AI service like OpenAI, Claude, or other educational AI models to provide detailed, helpful responses tailored to students and educators.";