import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { 
  ChevronLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Star, 
  Users, 
  Target, 
  BookOpen,
  Calculator,
  Trophy,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { useApp } from "../contexts/app-context";

const challengeData = {
  id: 3,
  title: "Linear Equations",
  description: "Master the fundamentals of linear equations, from basic solving to graphing and real-world applications.",
  difficulty: "Intermediate",
  duration: "2 weeks",
  points: 180,
  category: "Algebra",
  enrolled: 2963,
  rating: 4.7,
  progress: 65,
  status: "in-progress",
  badgeType: "Linear Master",
  prerequisite: "Algebra Basics",
  lessons: [
    {
      id: 1,
      title: "Introduction to Linear Equations",
      content: "Learn what linear equations are and their basic properties.",
      completed: true,
      duration: "15 min"
    },
    {
      id: 2,
      title: "Solving One-Variable Linear Equations",
      content: "Step-by-step methods for solving linear equations with one variable.",
      completed: true,
      duration: "20 min"
    },
    {
      id: 3,
      title: "Two-Variable Linear Equations",
      content: "Understanding and working with linear equations in two variables.",
      completed: true,
      duration: "25 min"
    },
    {
      id: 4,
      title: "Graphing Linear Equations",
      content: "Learn to graph linear equations and understand slope-intercept form.",
      completed: false,
      duration: "30 min",
      current: true
    },
    {
      id: 5,
      title: "Systems of Linear Equations",
      content: "Solving systems of linear equations using various methods.",
      completed: false,
      duration: "35 min"
    },
    {
      id: 6,
      title: "Real-World Applications",
      content: "Apply linear equations to solve real-world problems.",
      completed: false,
      duration: "25 min"
    }
  ],
  exercises: [
    {
      id: 1,
      question: "Solve for x: 2x + 5 = 13",
      options: ["x = 4", "x = 9", "x = 6", "x = 3"],
      correctAnswer: 0,
      explanation: "To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide by 2: x = 4"
    },
    {
      id: 2,
      question: "What is the slope of the line y = 3x - 2?",
      options: ["3", "-2", "1", "5"],
      correctAnswer: 0,
      explanation: "In the slope-intercept form y = mx + b, the coefficient of x (m) is the slope. Here, m = 3."
    }
  ]
};

export function ChallengeDetail() {
  const { setCurrentPage, user } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState(0);

  const currentLesson = challengeData.lessons.find(lesson => lesson.current);
  const completedLessons = challengeData.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = challengeData.lessons.length;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const handleNextExercise = () => {
    if (currentExercise < challengeData.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setExerciseProgress(((currentExercise + 1) / challengeData.exercises.length) * 100);
    }
  };

  const startLesson = (lessonId: number) => {
    // Simulate starting a lesson
    setActiveTab("lessons");
  };

  return (
    <div className="min-h-screen glass-subtle">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage('challenges')}
            className="glass border-0 hover:glass-strong"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Challenges
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{challengeData.title}</h1>
            <p className="text-muted-foreground">{challengeData.description}</p>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 glass-gradient border-0 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-primary mr-2" />
              <span className="font-bold">{challengeData.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground">Duration</p>
          </Card>
          
          <Card className="p-4 glass-gradient border-0 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-bold">{challengeData.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground">Rating</p>
          </Card>
          
          <Card className="p-4 glass-gradient border-0 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-primary mr-2" />
              <span className="font-bold">{challengeData.enrolled.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Students</p>
          </Card>
          
          <Card className="p-4 glass-gradient border-0 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-primary mr-2" />
              <span className="font-bold">{challengeData.points}</span>
            </div>
            <p className="text-sm text-muted-foreground">Points</p>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 glass-gradient border-0 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Your Progress</h3>
            <Badge className="glass border-0 text-primary">
              {completedLessons}/{totalLessons} Lessons Completed
            </Badge>
          </div>
          <Progress value={challengeData.progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">{challengeData.progress}% completed</p>
          
          {currentLesson && (
            <div className="mt-4 p-4 glass rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Currently Learning</h4>
                  <p className="text-sm text-muted-foreground">{currentLesson.title}</p>
                </div>
                <Button 
                  onClick={() => startLesson(currentLesson.id)}
                  className="gradient-primary rounded-xl"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-gradient border-0 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="lessons" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              Lessons
            </TabsTrigger>
            <TabsTrigger value="exercises" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              Practice
            </TabsTrigger>
            <TabsTrigger value="discussion" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              Discussion
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 glass-gradient border-0 shadow-lg">
                <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-sm">Solve linear equations with one and two variables</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-sm">Graph linear equations and understand slope-intercept form</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-sm">Solve systems of linear equations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-sm">Apply linear equations to real-world problems</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 glass-gradient border-0 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 glass rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Algebra Basics</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 glass rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Math Foundations</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons">
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Course Lessons</h3>
              <div className="space-y-4">
                {challengeData.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id} 
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      lesson.completed 
                        ? 'glass border-green-200' 
                        : lesson.current 
                        ? 'glass-gradient border-primary/30' 
                        : 'glass-subtle border-border/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          lesson.completed 
                            ? 'bg-green-500' 
                            : lesson.current 
                            ? 'gradient-primary' 
                            : 'glass'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : lesson.current ? (
                            <Play className="w-5 h-5 text-white" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">{lesson.content}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                            {lesson.completed && (
                              <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            )}
                            {lesson.current && (
                              <Badge className="text-xs glass-gradient border-0 text-primary">
                                Current
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant={lesson.completed ? "outline" : "default"}
                        className={lesson.completed 
                          ? "glass border-0 hover:glass-strong" 
                          : "gradient-primary"
                        }
                        onClick={() => startLesson(lesson.id)}
                      >
                        {lesson.completed ? 'Review' : lesson.current ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="exercises">
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Practice Exercises</h3>
                <Badge className="glass border-0 text-primary">
                  {currentExercise + 1} of {challengeData.exercises.length}
                </Badge>
              </div>
              
              <Progress value={exerciseProgress} className="h-2 mb-6" />

              <div className="space-y-6">
                <div className="p-6 glass rounded-xl">
                  <h4 className="text-lg font-medium mb-4">
                    {challengeData.exercises[currentExercise].question}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {challengeData.exercises[currentExercise].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`p-4 h-auto text-left justify-start border-0 transition-all duration-300 ${
                          selectedAnswer === index
                            ? index === challengeData.exercises[currentExercise].correctAnswer
                              ? 'bg-green-100 border-green-300 text-green-800'
                              : 'bg-red-100 border-red-300 text-red-800'
                            : 'glass hover:glass-strong'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                      >
                        <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="mt-6 p-4 glass rounded-xl">
                      <h5 className="font-medium mb-2">Explanation:</h5>
                      <p className="text-sm text-muted-foreground">
                        {challengeData.exercises[currentExercise].explanation}
                      </p>
                      
                      {currentExercise < challengeData.exercises.length - 1 && (
                        <Button 
                          onClick={handleNextExercise}
                          className="mt-4 gradient-primary"
                        >
                          Next Question
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="discussion">
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Discussion Forum</h3>
                <Button className="gradient-primary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 glass rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">J</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Jane Smith</span>
                        <Badge className="text-xs glass border-0">Student</Badge>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm mb-2">
                        I'm having trouble understanding how to identify the slope in different forms of linear equations. 
                        Can someone explain the difference between slope-intercept and standard form?
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button className="hover:text-primary">5 replies</button>
                        <button className="hover:text-primary">12 likes</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 glass rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">M</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Mike Johnson</span>
                        <Badge className="text-xs glass border-0">Student</Badge>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm mb-2">
                        Just completed the graphing lesson! The interactive examples really helped me understand 
                        how changes in slope affect the line. Great course material!
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button className="hover:text-primary">2 replies</button>
                        <button className="hover:text-primary">8 likes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}