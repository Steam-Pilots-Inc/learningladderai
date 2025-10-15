import { useState } from "react";
import { Button } from "./ui/button";
import { InteractiveButton } from "./InteractiveButton";
import { Textarea } from "./ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";
import { ModelPicker } from "./ModelPicker";
import { useIsMobile } from "./ui/use-mobile";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ChatInput({
  onSendMessage,
  disabled,
  selectedModel,
  onModelChange,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className={`${isMobile ? 'px-4 pt-3 pb-4' : 'px-4 pt-4 pb-4'} flex flex-col items-center`}>
      <div className="w-full max-w-4xl">
        <div className={`flex justify-center ${isMobile ? 'mb-3' : 'mb-6'}`}>
          <ModelPicker
            selectedModel={selectedModel}
            onModelChange={onModelChange}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`}
        >
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isMobile ? "Ask a question..." : "Ask a question or describe what you need help with..."}
            className={`resize-none glass-container bg-white/10 border-white/20 focus:border-white/30 focus:bg-white/15 transition-colors duration-200 rounded-full ${
              isMobile 
                ? 'pr-14 py-2.5 pl-4 text-sm' 
                : 'pr-18 py-3 pl-6'
            }`}
            style={{ 
              height: isMobile ? '48px' : '60px'
            }}
            rows={1}
            disabled={disabled}
          />
          <div 
            className={`absolute top-1/2 flex border border-white/20 rounded-full shadow-sm glass-container ${
              isMobile ? 'right-2 p-0.5' : 'right-4 p-1'
            }`} 
            style={{ 
              background: 'linear-gradient(45deg, rgba(68, 151, 205, 0.15) 0%, rgba(220, 119, 102, 0.15) 100%)', 
              transform: 'translateY(-50%)'
            }}
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={`interactive-glass rounded-full border-0 ${isMobile ? 'w-6 h-6' : 'w-7 h-7'}`}
            >
              <Paperclip className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={`interactive-glass rounded-full border-0 ${isMobile ? 'w-6 h-6' : 'w-7 h-7'}`}
            >
              <Mic className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            </Button>
          </div>
        </div>
        <InteractiveButton
          type="submit"
          variant="primary"
          size="lg"
          state={disabled ? "disabled" : message.trim() ? "default" : "disabled"}
          icon={Send}
          glow={!!message.trim()}
          className="rounded-full flex-shrink-0 border border-white/20 shadow-lg"
          style={{ 
            width: isMobile ? '48px' : '60px', 
            height: isMobile ? '48px' : '60px',
            padding: '0'
          }}
        />
        </form>
      </div>
    </div>
  );
}