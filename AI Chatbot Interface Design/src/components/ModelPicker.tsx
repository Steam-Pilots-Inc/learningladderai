import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { MODEL_OPTIONS } from "../constants/data";
import { useIsMobile } from "./ui/use-mobile";

interface ModelPickerProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function ModelPicker({ selectedModel, onModelChange }: ModelPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const selectedOption = MODEL_OPTIONS.find(option => option.value === selectedModel) || MODEL_OPTIONS[0];
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleModelSelect = (modelValue: string) => {
    console.log('Model selected:', modelValue, 'Current:', selectedModel); // Debug log
    onModelChange(modelValue);
    setIsExpanded(false);
  };

  const selectedIndex = MODEL_OPTIONS.findIndex(option => option.value === selectedModel);

  return (
    <div className="relative">
      {/* Collapsed state - shows selected model */}
      {!isExpanded && (
        <Button
          variant="outline"
          onClick={handleToggle}
          className={`flex items-center gap-1.5 interactive-glass rounded-full shadow-lg border-0 ${
            isMobile ? 'px-3 py-1.5 h-auto text-xs' : 'px-4 py-2 h-auto text-sm'
          }`}
        >
          {selectedOption.icon && (
            <selectedOption.icon className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-foreground`} />
          )}
          <span className="font-medium text-foreground whitespace-nowrap">
            {selectedOption.label.replace(' Model', '')}
          </span>
          <ChevronDown className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      )}

      {/* Expanded state - shows all models horizontally */}
      {isExpanded && (
        <div className={`relative flex glass-container-heavy bg-white/5 border border-white/20 rounded-full shadow-lg ${isMobile ? 'p-1' : 'p-1'}`}>
          {/* Active indicator background */}
          <div 
            className="absolute top-1 bottom-1 rounded-full bg-white/15 border border-white/30 transition-transform duration-300 ease-out"
            style={{
              left: `${4 + (selectedIndex * (isMobile ? 80 : 96))}px`,
              width: isMobile ? '72px' : '88px'
            }}
          />
          
          {/* Model options */}
          <div className="relative flex">
            {MODEL_OPTIONS.map((model, index) => {
              const IconComponent = model.icon;
              const isSelected = model.value === selectedModel;
              
              return (
                <Button
                  key={model.value}
                  variant="ghost"
                  onClick={() => handleModelSelect(model.value)}
                  className={`
                    relative rounded-full transition-colors duration-200 flex items-center justify-center z-10 border-0
                    ${isMobile ? 'px-2 py-1.5 gap-1 w-20 h-auto text-xs' : 'px-3 py-2 gap-2 w-24 h-auto text-sm'}
                    ${isSelected 
                      ? 'text-foreground bg-transparent' 
                      : 'text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent'
                    }
                  `}
                >
                  <IconComponent className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                  <span className="truncate flex-shrink-0 font-medium">
                    {model.label.replace(' Model', '')}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Overlay to close when clicking outside */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-0"
          onClick={handleToggle}
        />
      )}
    </div>
  );
}