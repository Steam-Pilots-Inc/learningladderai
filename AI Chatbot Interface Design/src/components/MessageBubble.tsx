import { Avatar } from "./ui/avatar";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <Avatar className={`w-8 h-8 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </Avatar>
      
      <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`} style={{ maxWidth: '80%' }}>
        <div
          className={`
            px-4 py-3 rounded-2xl border border-white/20
            ${isUser 
              ? 'bg-primary/90 text-primary-foreground ml-auto' 
              : 'bg-white/10 text-foreground'
            }
            shadow-lg
          `}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground px-2">{timestamp}</span>
      </div>
    </div>
  );
}