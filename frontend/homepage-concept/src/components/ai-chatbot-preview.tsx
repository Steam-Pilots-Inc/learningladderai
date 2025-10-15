import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { useApp } from "../contexts/app-context";

const subjectAreas = [
  { name: "Mathematics", icon: "📊", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Computer Science", icon: "💻", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Literature", icon: "📚", color: "bg-green-50 text-green-700 border-green-200" },
  { name: "History", icon: "🏛️", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { name: "Science", icon: "🧪", color: "bg-red-50 text-red-700 border-red-200" },
  { name: "Arts", icon: "🎨", color: "bg-pink-50 text-pink-700 border-pink-200" },
];

const sampleQuestions = [
  "Explain the themes in Shakespeare's Hamlet",
  "Help me solve quadratic equations step by step",
  "What were the causes of World War I?",
  "How does photosynthesis work?",
  "Explain how machine learning works",
  "Analyze the symbolism in Van Gogh's Starry Night"
];

export function AIChatbotPreview() {
  const { setCurrentPage } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null);

  return (
    <div className="w-full px-6 py-12 glass-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Meet Your AI Learning Companion</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized explanations, work through problems step-by-step, and explore topics across all subjects with our intelligent tutoring system.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subject Areas */}
          <Card className="p-6 glass-gradient border-0 shadow-lg">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Choose Your Subject
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {subjectAreas.map((subject) => (
                <Button
                  key={subject.name}
                  variant="outline"
                  className={`h-auto p-4 justify-start gap-3 transition-all duration-300 rounded-xl border-0 ${
                    selectedSubject === subject.name 
                      ? "gradient-primary text-white shadow-lg"
                      : "glass hover:glass-strong"
                  }`}
                  onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
                >
                  <span className="text-lg">{subject.icon}</span>
                  <span className="text-sm font-medium">{subject.name}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Chat Interface Preview */}
          <Card className="p-6 glass-gradient border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Learning Ladder AI</h3>
                <p className="text-sm text-muted-foreground">Your personal AI tutor</p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800">Online</Badge>
            </div>

            <div className="space-y-3 mb-4 h-64 overflow-y-auto glass-subtle rounded-xl p-4">
              <div className="glass-gradient rounded-xl p-4">
                <p className="text-sm">
                  Hi! I'm your AI learning companion. Ask me anything about your studies, work through problems, or explore new topics. I'm here to help you learn effectively!
                </p>
                <p className="text-xs text-muted-foreground mt-2">Just now</p>
              </div>
              
              <div className="glass rounded-xl p-4 ml-8 shadow-md">
                <p className="text-sm">
                  Can you help me understand how linear equations work?
                </p>
                <p className="text-xs text-muted-foreground mt-2">2 minutes ago</p>
              </div>

              <div className="glass-gradient rounded-xl p-4">
                <p className="text-sm">
                  Absolutely! Linear equations are equations where the variables are raised to the first power. The general form is y = mx + b, where m is the slope and b is the y-intercept. Would you like me to show you some examples?
                </p>
                <p className="text-xs text-muted-foreground mt-2">Just now</p>
              </div>
              
              <div className="glass rounded-xl p-4 ml-8 shadow-md">
                <p className="text-sm">
                  Yes, please show me some examples!
                </p>
                <p className="text-xs text-muted-foreground mt-2">Just now</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Ask me anything about your studies..."
                  className="flex-1 px-4 py-3 glass border-0 rounded-xl text-sm focus:glass-strong transition-all duration-300"
                />
                <Button size="sm" className="px-4 py-3 gradient-primary hover:opacity-90 text-white rounded-xl shadow-lg">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {sampleQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={`text-xs transition-all ${
                      hoveredQuestion === question 
                        ? "bg-primary/10 border-primary text-primary" 
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredQuestion(question)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                  >
                    {question.length > 30 ? question.slice(0, 30) + "..." : question}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button 
            size="lg" 
            onClick={() => setCurrentPage('chatbot')}
            className="gradient-primary hover:opacity-90 text-white shadow-lg rounded-xl shadow-primary/25"
          >
            Try the AI Tutor Now
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Available 24/7 to support your learning journey
          </p>
        </div>
      </div>
    </div>
  );
}