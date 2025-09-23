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