import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { WelcomeMessage } from "./WelcomeMessage";
import { TypingIndicator } from "./TypingIndicator";
import { LearningLadder } from "./LearningLadder";
import { LearningLadderMobile } from "./LearningLadderMobile";
import { useIsMobile } from "./ui/use-mobile";
import { Message } from "../types";
import { createUserMessage, createAIMessage, getRandomDelay } from "../utils/messageUtils";

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("auto");
  const [showLearningLadder, setShowLearningLadder] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    const userMessage = createUserMessage(messageText);
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = createAIMessage();
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, getRandomDelay());
  }, []);

  const handleToggleLearningLadder = useCallback(() => {
    setShowLearningLadder(prev => !prev);
  }, []);

  return (
    <div className="h-screen flex" style={{ 
      background: 'linear-gradient(135deg, rgba(68, 151, 205, 0.02) 0%, rgba(220, 119, 102, 0.02) 100%)', 
      backdropFilter: 'blur(48px)' 
    }}>
      {/* Learning Ladder Sidebar - Desktop only */}
      {!isMobile && showLearningLadder && <LearningLadder />}
      
      {/* Mobile Learning Ladder Sheet */}
      {isMobile && (
        <LearningLadderMobile 
          isOpen={showLearningLadder} 
          onOpenChange={setShowLearningLadder} 
        />
      )}
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0">
        <ChatHeader 
          showLearningLadder={showLearningLadder}
          onToggleLearningLadder={handleToggleLearningLadder}
        />
        
        <div className="flex-1 flex flex-col min-h-0">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col">
              <div className={`flex-1 flex flex-col justify-center items-center ${isMobile ? 'px-3 pb-4' : 'px-4 pb-6'}`}>
                <div className="w-full max-w-4xl">
                  <WelcomeMessage onSendMessage={handleSendMessage} />
                </div>
              </div>
              <ChatInput 
                onSendMessage={handleSendMessage} 
                disabled={isTyping} 
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                  
                  {/* Invisible element to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <ChatInput 
                onSendMessage={handleSendMessage} 
                disabled={isTyping} 
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}