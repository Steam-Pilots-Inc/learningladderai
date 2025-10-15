import { Message } from "../types";

export const createUserMessage = (text: string): Message => ({
  id: Date.now().toString(),
  text,
  isUser: true,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
});

export const createAIMessage = (text: string): Message => ({
  id: (Date.now() + 1).toString(),
  text,
  isUser: false,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
});
