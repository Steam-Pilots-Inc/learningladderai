import { useState, useRef, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { Avatar } from "../components/ui/avatar";
import { 
  Send, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Beaker, 
  Globe, 
  Palette, 
  Brain,
  RotateCcw,
  Download,
  Share
} from "lucide-react";
import { useApp } from "../contexts/app-context";

const subjects = [
  { name: "Mathematics", icon: Calculator, color: "text-blue-600", examples: ["Solve quadratic equations", "Explain derivatives", "Help with geometry proofs"] },
  { name: "Science", icon: Beaker, color: "text-green-600", examples: ["Explain photosynthesis", "Physics problems", "Chemical reactions"] },
  { name: "Literature", icon: BookOpen, color: "text-purple-600", examples: ["Analyze Shakespeare", "Essay writing tips", "Poetry interpretation"] },
  { name: "History", icon: Globe, color: "text-orange-600", examples: ["World War causes", "Ancient civilizations", "Historical timelines"] },
  { name: "Arts", icon: Palette, color: "text-pink-600", examples: ["Art movements", "Color theory", "Famous artists"] },
  { name: "General", icon: Brain, color: "text-gray-600", examples: ["Study techniques", "Time management", "Learning strategies"] }
];

const quickPrompts = [
  "Explain this concept in simple terms",
  "Give me a step-by-step solution",
  "What are some practice problems?",
  "How does this relate to real life?",
  "Can you quiz me on this topic?",
  "Summarize the key points"
];

export function Chatbot() {
  const { chatMessages, setChatMessages, user } = useApp();
  const [inputValue, setInputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me break this down for you step by step...",
        "I'd be happy to help you understand this concept. Here's how we can approach it:",
        "This is a fundamental concept in mathematics. Let me explain it clearly:",
        "Great question! This relates to several key principles. Let me walk you through:",
        "I can definitely help with that. Here's a detailed explanation:",
        "That's an excellent topic to explore. Let me provide you with a comprehensive answer:"
      ];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)] + " " + 
              (selectedSubject ? `Since you're asking about ${selectedSubject}, ` : "") +
              "Would you like me to provide some practice problems or explain any specific part in more detail?",
        sender: 'ai' as const,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: '1',
        text: "Hi! I'm your AI learning companion. Ask me anything about your studies, work through problems, or explore new topics. I'm here to help you learn effectively!",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="min-h-screen glass-subtle">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Subject Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 glass-gradient border-0 shadow-lg h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Choose Subject</h3>
              </div>
              
              <div className="space-y-3">
                {subjects.map((subject) => {
                  const IconComponent = subject.icon;
                  const isSelected = selectedSubject === subject.name;
                  
                  return (
                    <div key={subject.name}>
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`w-full justify-start gap-3 rounded-xl transition-all duration-300 ${
                          isSelected 
                            ? 'gradient-primary text-white shadow-lg' 
                            : 'glass border-0 hover:glass-strong'
                        }`}
                        onClick={() => setSelectedSubject(isSelected ? null : subject.name)}
                      >
                        <IconComponent className={`w-5 h-5 ${isSelected ? 'text-white' : subject.color}`} />
                        {subject.name}
                      </Button>
                      
                      {isSelected && (
                        <div className="mt-2 ml-4 space-y-1">
                          {subject.examples.map((example, index) => (
                            <button
                              key={index}
                              onClick={() => handleExampleClick(example)}
                              className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:glass"
                            >
                              "{example}"
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button 
                    onClick={clearChat}
                    variant="outline" 
                    size="sm" 
                    className="w-full glass border-0 justify-start gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full glass border-0 justify-start gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full glass border-0 justify-start gap-2"
                  >
                    <Share className="w-4 h-4" />
                    Share Session
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="glass-gradient border-0 shadow-lg h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-xl">Learning Ladder AI</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedSubject ? `${selectedSubject} Tutor` : 'Your Personal AI Tutor'} • Online
                    </p>
                  </div>
                  <Badge className="glass border-0 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </Badge>
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'ai' && (
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[70%] p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'gradient-primary text-white ml-12'
                            : 'glass border-0'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {message.sender === 'user' && user && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <div className="w-full h-full gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="glass border-0 p-4 rounded-2xl max-w-[70%]">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Prompts */}
              <div className="px-6 py-3 border-t border-border/20">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="glass border-0 text-xs hover:glass-strong"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-border/20">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1 glass border-0 rounded-xl focus:glass-strong"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    className="gradient-primary rounded-xl px-6 shadow-lg hover:shadow-primary/25"
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Available 24/7 to support your learning journey
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}