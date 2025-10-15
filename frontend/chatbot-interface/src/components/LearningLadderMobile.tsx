import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle, Circle, Lock, Star, Clock, Target, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";

interface LearningStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  progress: number;
  timeEstimate: string;
  points: number;
  prerequisites?: string[];
  badge?: string;
}

const learningSteps: LearningStep[] = [
  {
    id: "foundations",
    title: "Math Foundations",
    description: "Basic arithmetic and number sense",
    status: "completed",
    progress: 100,
    timeEstimate: "2 weeks",
    points: 150,
    badge: "Foundation Master"
  },
  {
    id: "algebra-basics",
    title: "Algebra Basics",
    description: "Variables, expressions, and simple equations",
    status: "completed",
    progress: 100,
    timeEstimate: "3 weeks",
    points: 200,
    prerequisites: ["foundations"],
    badge: "Algebra Explorer"
  },
  {
    id: "linear-equations",
    title: "Linear Equations",
    description: "Solving and graphing linear equations",
    status: "current",
    progress: 65,
    timeEstimate: "2 weeks",
    points: 180,
    prerequisites: ["algebra-basics"]
  },
  {
    id: "quadratic-equations",
    title: "Quadratic Equations",
    description: "Solving quadratic equations and understanding parabolas",
    status: "locked",
    progress: 0,
    timeEstimate: "3 weeks",
    points: 250,
    prerequisites: ["linear-equations"]
  },
  {
    id: "functions",
    title: "Functions",
    description: "Understanding functions and their properties",
    status: "locked",
    progress: 0,
    timeEstimate: "4 weeks",
    points: 300,
    prerequisites: ["quadratic-equations"]
  },
  {
    id: "calculus-prep",
    title: "Pre-Calculus",
    description: "Advanced functions and trigonometry",
    status: "locked",
    progress: 0,
    timeEstimate: "6 weeks",
    points: 400,
    prerequisites: ["functions"]
  }
];

const getStatusIcon = (status: string, progress: number) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" style={{ color: '#4497CD' }} />;
    case 'current':
      return <Target className="w-4 h-4" style={{ color: '#DC7766' }} />;
    case 'locked':
      return <Lock className="w-3 h-3 text-gray-400" />;
    default:
      return <Circle className="w-4 h-4 text-gray-400" />;
  }
};

const getStepStyles = (status: string) => {
  const baseStyles = "relative p-3 rounded-lg transition-all duration-200 border";
  
  switch (status) {
    case 'completed':
      return `${baseStyles} bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-md border-blue-200/50 shadow-sm`;
    case 'current':
      return `${baseStyles} bg-gradient-to-br from-white/95 to-orange-50/80 backdrop-blur-md border-orange-200/60 shadow-md ring-2 ring-orange-200/40`;
    case 'locked':
      return `${baseStyles} bg-gradient-to-br from-gray-50/70 to-gray-100/60 backdrop-blur-md border-gray-200/40 opacity-70`;
    default:
      return `${baseStyles} bg-white/80 backdrop-blur-md border-gray-200/50`;
  }
};

interface LearningLadderMobileProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LearningLadderMobile({ isOpen, onOpenChange }: LearningLadderMobileProps) {
  const totalPoints = learningSteps.reduce((sum, step) => 
    step.status === 'completed' ? sum + step.points : sum
  , 0);

  const currentStep = learningSteps.find(step => step.status === 'current');

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-full sm:w-96 bg-white/30 backdrop-blur-xl border-r border-blue-200/30 p-0"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-blue-200/30">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#4497CD' }}
              >
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <SheetTitle className="text-gray-900">Learning Ladder</SheetTitle>
                <SheetDescription className="text-sm text-gray-600">
                  Your progress journey through different learning topics
                </SheetDescription>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                <div className="text-lg font-medium" style={{ color: '#4497CD' }}>
                  {totalPoints}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-200/30">
                <div className="text-lg font-medium" style={{ color: '#DC7766' }}>
                  {learningSteps.filter(s => s.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </SheetHeader>

          {/* Current Progress */}
          {currentStep && (
            <div className="p-4 border-b border-blue-200/30">
              <div className="text-sm font-medium text-gray-700 mb-2">Currently Learning</div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-orange-200/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{currentStep.title}</span>
                  <span className="text-sm" style={{ color: '#DC7766' }}>
                    {currentStep.progress}%
                  </span>
                </div>
                <Progress 
                  value={currentStep.progress} 
                  className="h-2 mb-2"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{currentStep.timeEstimate}</span>
                  </div>
                  <div>{currentStep.points} points</div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Steps */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {learningSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < learningSteps.length - 1 && (
                  <div 
                    className="absolute left-5 top-12 w-0.5 h-6 bg-gradient-to-b from-blue-200/60 to-transparent"
                    style={{ 
                      background: step.status === 'completed' 
                        ? 'linear-gradient(to bottom, #4497CD40, transparent)' 
                        : 'linear-gradient(to bottom, #e5e7eb60, transparent)'
                    }}
                  />
                )}
                
                <div className={getStepStyles(step.status)}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getStatusIcon(step.status, step.progress)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-gray-900 leading-tight text-sm">
                          {step.title}
                        </h3>
                        {step.badge && step.status === 'completed' && (
                          <Badge 
                            variant="secondary" 
                            className="ml-2 text-xs bg-blue-100/80 text-blue-700 border-blue-200/50"
                          >
                            <Star className="w-3 h-3 mr-1" />
                            <span className="text-xs">{step.badge}</span>
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {step.status !== 'locked' && (
                        <div className="space-y-2">
                          {step.progress > 0 && step.progress < 100 && (
                            <div>
                              <Progress value={step.progress} className="h-1.5" />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{step.timeEstimate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>{step.points} pts</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {step.status === 'locked' && step.prerequisites && (
                        <div className="text-xs text-gray-500">
                          <span>Requires: </span>
                          {step.prerequisites.map(prereq => {
                            const prereqStep = learningSteps.find(s => s.id === prereq);
                            return prereqStep?.title;
                          }).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-blue-200/30">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                Keep climbing! 🪜
              </div>
              <div className="text-xs text-gray-500">
                Next milestone: {learningSteps.find(s => s.status === 'locked')?.title || 'All complete!'}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}