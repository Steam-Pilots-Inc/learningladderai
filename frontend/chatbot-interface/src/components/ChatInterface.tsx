import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

import { ScrollArea } from "./ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { WelcomeMessage } from "./WelcomeMessage";
import { TypingIndicator } from "./TypingIndicator";
import { LearningLadder } from "./LearningLadder";
import { LearningLadderMobile } from "./LearningLadderMobile";
import { InteractiveButton } from "./InteractiveButton";
import { useIsMobile } from "./ui/use-mobile";
import { Message } from "../types";
import { createAIMessage, createUserMessage } from "../utils/messageUtils";
import { createSession, submitAnswer } from "../utils/api";

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialising, setIsInitialising] = useState(true);
  const [selectedModel, setSelectedModel] = useState("auto");
  const [showLearningLadder, setShowLearningLadder] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const initialiseSession = useCallback(async () => {
    setSessionId(null);
    setMessages([]);
    setScore(0);
    setLevel(1);
    setError(null);
    setIsInitialising(true);
    setIsTyping(true);

    try {
      const session = await createSession({
        gradingMode: selectedModel === "fast" ? "fast" : "ai",
        useAiAnswers: selectedModel !== "fast",
      });
      setSessionId(session.sessionId);
      setScore(session.score);
      setLevel(session.level);
      setMessages([createAIMessage(session.question)]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start a new session.";
      setError(message);
      setMessages([
        createAIMessage(
          "I couldn't start a new tutoring session right now. Make sure the backend API is running and try again.\n\nDetails: " +
            message,
        ),
      ]);
    } finally {
      setIsTyping(false);
      setIsInitialising(false);
    }
  }, [selectedModel]);

  useEffect(() => {
    initialiseSession();
  }, [initialiseSession]);

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      const trimmed = messageText.trim();
      if (!trimmed) {
        return;
      }

      const userMessage = createUserMessage(trimmed);
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setError(null);

      if (!sessionId) {
        setMessages((prev) => [
          ...prev,
          createAIMessage(
            "I’m still preparing your adaptive learning session. Please wait a moment and try again.",
          ),
        ]);
        setIsTyping(false);
        return;
      }

      try {
        const response = await submitAnswer(sessionId, trimmed);
        setScore(response.score);
        setLevel(response.level);

        const feedback = response.correct
          ? "✅ Correct! You're climbing the ladder."
          : "❌ Not quite right this time.";
        const correction = response.correct
          ? null
          : `The expected answer was: ${response.correctAnswer}`;
        const reference = response.aiReferenceAnswer
          ? `AI reference answer: ${response.aiReferenceAnswer}`
          : null;
        const progress = `Score: ${response.score} | Level: ${response.level}`;
        const nextPrompt = `Next question:\n${response.nextQuestion}`;

        const aiMessage = createAIMessage(
          [feedback, correction, reference, progress, nextPrompt]
            .filter(Boolean)
            .join("\n\n"),
        );
        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong while grading that answer.";
        setError(message);
        setSessionId(null);
        setMessages((prev) => [
          ...prev,
          createAIMessage(
            `⚠️ I ran into an issue processing that answer.\n\nDetails: ${message}`,
          ),
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId],
  );

  const handleToggleLearningLadder = useCallback(() => {
    setShowLearningLadder((prev) => !prev);
  }, []);

  const isInputDisabled = isTyping || !sessionId;

  return (
    <div
      className="h-screen flex"
      style={{
        background:
          "linear-gradient(135deg, rgba(68, 151, 205, 0.02) 0%, rgba(220, 119, 102, 0.02) 100%)",
        backdropFilter: "blur(48px)",
      }}
    >
      {!isMobile && showLearningLadder && <LearningLadder />}

      {isMobile && (
        <LearningLadderMobile
          isOpen={showLearningLadder}
          onOpenChange={setShowLearningLadder}
        />
      )}

      <div className="flex-1 flex flex-col min-h-0">
        <ChatHeader
          showLearningLadder={showLearningLadder}
          onToggleLearningLadder={handleToggleLearningLadder}
        />

        <div className="flex-1 flex flex-col min-h-0">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col">
              <div
                className={`flex-1 flex flex-col justify-center items-center ${isMobile ? "px-3 pb-4" : "px-4 pb-6"}`}
              >
                <div className="w-full max-w-4xl">
                  <WelcomeMessage onSendMessage={handleSendMessage} />
                </div>
              </div>
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isInputDisabled}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
                    <span>Level {level}</span>
                    <span>Score {score}</span>
                  </div>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}

                  {isTyping && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {!sessionId && !isInitialising && (
                <div className="px-4 pb-2 flex justify-center">
                  <InteractiveButton
                    variant="primary"
                    icon={RefreshCw}
                    onClick={initialiseSession}
                  >
                    Start New Session
                  </InteractiveButton>
                </div>
              )}

              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isInputDisabled}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </>
          )}
        </div>

        {error && (
          <div className="px-4 pb-4 text-sm text-red-500">
            Connection issue: {error}
          </div>
        )}
      </div>
    </div>
  );
}
