import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Page = 'home' | 'dashboard' | 'challenges' | 'challenge-detail' | 'leaderboard' | 'chatbot' | 'profile' | 'resources' | 'community';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'educator';
  xp: number;
  level: number;
  completedChallenges: number;
  avatar?: string;
};

export type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  points: number;
  category: string;
  enrolled: number;
  rating: number;
  progress: number;
  status: 'completed' | 'in-progress' | 'locked' | 'available';
  badgeType: string;
  prerequisite: string | null;
  content?: {
    lessons: Array<{
      id: number;
      title: string;
      content: string;
      completed: boolean;
    }>;
    exercises: Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
};

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isSignedIn: boolean;
  setIsSignedIn: (signedIn: boolean) => void;
  selectedChallenge: Challenge | null;
  setSelectedChallenge: (challenge: Challenge | null) => void;
  challenges: Challenge[];
  setChallenges: (challenges: Challenge[]) => void;
  chatMessages: Array<{ id: string; text: string; sender: 'user' | 'ai'; timestamp: Date }>;
  setChatMessages: (messages: Array<{ id: string; text: string; sender: 'user' | 'ai'; timestamp: Date }>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'ai'; timestamp: Date }>>([
    {
      id: '1',
      text: "Hi! I'm your AI learning companion. Ask me anything about your studies, work through problems, or explore new topics. I'm here to help you learn effectively!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      user,
      setUser,
      isSignedIn,
      setIsSignedIn,
      selectedChallenge,
      setSelectedChallenge,
      challenges,
      setChallenges,
      chatMessages,
      setChatMessages
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}