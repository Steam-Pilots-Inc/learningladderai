import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, Users, Target, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "../contexts/app-context";

export function HeroSection() {
  const { setCurrentPage, isSignedIn } = useApp();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(81), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full glass-gradient px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Hero Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="glass-gradient text-primary border-0 shadow-md">
                ✨ New Challenge Available
              </Badge>
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Interactive STEM Challenges
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Climb this learning ladder with hands-on AI challenges designed to
                  build your skills step by step. From beginner concepts to advanced
                  implementations.
                </p>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setCurrentPage(isSignedIn ? 'dashboard' : 'challenges')}
                  className="gradient-primary hover:opacity-90 text-white shadow-2xl rounded-xl transition-all duration-300 hover:shadow-primary/25"
                >
                  {isSignedIn ? 'Go to Dashboard' : 'Start Learning'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setCurrentPage('challenges')}
                  className="glass border-0 hover:glass-strong rounded-xl transition-all duration-300"
                >
                  View All Challenges
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-6 h-6 text-primary mr-2" />
                    <span className="text-2xl font-bold text-primary">50+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Challenges</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary mr-2" />
                    <span className="text-2xl font-bold text-primary">12K+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Learners</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-primary mr-2" />
                    <span className="text-2xl font-bold text-primary">95%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 glass-gradient-strong border-0 shadow-2xl rounded-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Your Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Overall Progress</span>
                        <span className="text-sm font-medium text-primary">{progress}% completed</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 glass rounded-xl border-0 shadow-lg">
                        <div className="text-xl font-bold text-primary">8</div>
                        <div className="text-xs text-muted-foreground">Challenges</div>
                      </div>
                      <div className="text-center p-4 glass rounded-xl border-0 shadow-lg">
                        <div className="text-xl font-bold text-secondary">2</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3">Recent Achievement</h4>
                  <div className="flex items-center gap-3 p-4 glass rounded-xl shadow-md">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Completed "Neural Networks Basics"
                      </p>
                      <p className="text-xs text-primary">+50 XP earned</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}