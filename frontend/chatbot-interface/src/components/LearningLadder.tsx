import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { InteractiveCard } from "./InteractiveCard";
import { InteractiveButton } from "./InteractiveButton";
import { CheckCircle, Circle, Lock, Star, Clock, Target, Play, Award, TrendingUp } from "lucide-react";

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
      return <CheckCircle className="w-5 h-5 font-bold" style={{ color: '#4497CD', strokeWidth: '2.5px', filter: 'drop-shadow(0 1px 2px rgba(68, 151, 205, 0.3))' }} />;
    case 'current':
      return <Target className="w-5 h-5 font-bold" style={{ color: '#DC7766', strokeWidth: '2.5px', filter: 'drop-shadow(0 1px 2px rgba(220, 119, 102, 0.3))' }} />;
    case 'locked':
      return <Lock className="w-4 h-4 text-gray-400 opacity-70" style={{ strokeWidth: '2px' }} />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" style={{ strokeWidth: '2px' }} />;
  }
};

// Removed getStepStyles function as we now use InteractiveCard

export function LearningLadder() {
  const totalPoints = learningSteps.reduce((sum, step) => 
    step.status === 'completed' ? sum + step.points : sum
  , 0);

  const currentStep = learningSteps.find(step => step.status === 'current');

  return (
    <div className="w-80 h-full bg-white/30 backdrop-blur-xl border-r border-blue-200/30 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-blue-200/30">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#4497CD' }}
          >
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-medium text-gray-900">Learning Ladder</h2>
            <p className="text-sm text-gray-600">Your progress journey</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <InteractiveCard
            variant="primary"
            hoverable
            className="p-3 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: '#4497CD' }} />
              <div>
                <div className="text-lg font-medium" style={{ color: '#4497CD' }}>
                  {totalPoints}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>
          </InteractiveCard>
          <InteractiveCard
            variant="secondary"
            hoverable
            className="p-3 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: '#DC7766' }} />
              <div>
                <div className="text-lg font-medium" style={{ color: '#DC7766' }}>
                  {learningSteps.filter(s => s.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>

      {/* Current Progress */}
      {currentStep && (
        <div className="p-4 border-b border-blue-200/30">
          <div className="text-sm font-medium text-gray-700 mb-2">Currently Learning</div>
          <InteractiveCard
            variant="secondary"
            clickable
            hoverable
            className="p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{currentStep.title}</span>
              <span className="text-sm" style={{ color: '#DC7766' }}>
                {currentStep.progress}%
              </span>
            </div>
            <Progress 
              value={currentStep.progress} 
              className="h-2 mb-3"
            />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{currentStep.timeEstimate}</span>
              </div>
              <div className="text-sm text-gray-600">{currentStep.points} points</div>
            </div>
            <InteractiveButton
              variant="secondary"
              size="sm"
              icon={Play}
              className="w-full rounded-lg"
              glow
            >
              Continue Learning
            </InteractiveButton>
          </InteractiveCard>
        </div>
      )}

      {/* Learning Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {learningSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Connection Line */}
            {index < learningSteps.length - 1 && (
              <div 
                className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-blue-200/60 to-transparent"
                style={{ 
                  background: step.status === 'completed' 
                    ? 'linear-gradient(to bottom, #4497CD40, transparent)' 
                    : 'linear-gradient(to bottom, #e5e7eb60, transparent)'
                }}
              />
            )}
            
            <InteractiveCard
              variant={
                step.status === 'completed' ? 'primary' : 
                step.status === 'current' ? 'secondary' : 'glass'
              }
              clickable={step.status !== 'locked'}
              hoverable={step.status !== 'locked'}
              className={step.status === 'locked' ? 'opacity-70' : ''}
              badge={step.badge && step.status === 'completed' ? (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-blue-100/80 text-blue-700 border-blue-200/50 whitespace-nowrap"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {step.badge}
                </Badge>
              ) : undefined}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(step.status, step.progress)}
                </div>
                
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h3 className="font-medium text-gray-900 leading-tight mb-1 break-words">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed break-words">
                    {step.description}
                  </p>
                  
                  {step.status !== 'locked' && (
                    <div className="space-y-3">
                      {step.progress > 0 && step.progress < 100 && (
                        <div>
                          <Progress value={step.progress} className="h-1.5" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{step.timeEstimate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{step.points} pts</span>
                        </div>
                      </div>
                      
                      {step.status === 'current' && (
                        <InteractiveButton
                          variant="primary"
                          size="xs"
                          icon={Play}
                          className="w-full rounded-md"
                          pulse
                        >
                          Continue
                        </InteractiveButton>
                      )}
                      
                      {step.status === 'completed' && (
                        <InteractiveButton
                          variant="glass"
                          size="xs"
                          icon={Target}
                          className="w-full rounded-md"
                        >
                          Review
                        </InteractiveButton>
                      )}
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
            </InteractiveCard>
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
  );
}