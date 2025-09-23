import { Card } from "./ui/card";
import { InteractiveCard } from "./InteractiveCard";
import { EXAMPLE_QUESTIONS, WELCOME_MESSAGE } from "../constants/data";
import { useIsMobile } from "./ui/use-mobile";
import logoImage from 'figma:asset/7122b91fe7bf91021f4fcb0af8e60a829d145e38.png';

interface WelcomeMessageProps {
  onSendMessage: (message: string) => void;
}

export function WelcomeMessage({ onSendMessage }: WelcomeMessageProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center space-y-6 md:space-y-8 w-full">
      <div className="text-center space-y-3 md:space-y-4 max-w-2xl px-4">
        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
          <img 
            src={logoImage} 
            alt="Learning Ladder AI" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <h1 className="text-xl md:text-2xl tracking-tight">Learning Ladder AI</h1>
        
        <p className="text-muted-foreground text-sm md:text-base">
          {WELCOME_MESSAGE}
        </p>
      </div>

      {isMobile ? (
        // Mobile: Horizontal scroll layout
        <div className="w-full">
          <div className="flex gap-3 pb-4 px-4 overflow-x-auto scrollbar-hide">
            {EXAMPLE_QUESTIONS.map((example, index) => {
              const IconComponent = example.icon;
              return (
                <InteractiveCard
                  key={index}
                  className="flex-shrink-0 w-64"
                  variant="glass"
                  clickable={true}
                  hoverable={true}
                  icon={IconComponent}
                  onClick={() => onSendMessage(example.question)}
                >
                  <div className="space-y-2 -mt-1">
                    <p className="text-xs text-muted-foreground font-medium opacity-80">{example.category}</p>
                    <p className="text-sm leading-relaxed font-medium">{example.question}</p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              {EXAMPLE_QUESTIONS.map((_, index) => (
                <div key={index} className="w-1.5 h-1.5 rounded-full bg-white/30 transition-all duration-200 hover:bg-white/50"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Desktop: Grid layout  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full px-4">
          {EXAMPLE_QUESTIONS.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <InteractiveCard
                key={index}
                variant="glass"
                clickable={true}
                hoverable={true}
                icon={IconComponent}
                onClick={() => onSendMessage(example.question)}
              >
                <div className="space-y-2 -mt-1">
                  <p className="text-sm text-muted-foreground font-medium opacity-80">{example.category}</p>
                  <p className="text-sm leading-relaxed font-medium">{example.question}</p>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      )}
    </div>
  );
}