import { Message } from "../types";
import { AI_RESPONSES, SIMULATION_SUFFIX } from "../constants/data";

export const createUserMessage = (text: string): Message => ({
  id: Date.now().toString(),
  text,
  isUser: true,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
});

export const createAIMessage = (): Message => {
  const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
  return {
    id: (Date.now() + 1).toString(),
    text: randomResponse + SIMULATION_SUFFIX,
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

export const getRandomDelay = (): number => 1500 + Math.random() * 2000;