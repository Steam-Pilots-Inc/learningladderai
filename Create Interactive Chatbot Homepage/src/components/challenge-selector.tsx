import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Search, Filter, Clock, Star, Calculator, CheckCircle, Lock, Target } from "lucide-react";
import { useState } from "react";
import { useApp } from "../contexts/app-context";

const challenges = [
  {
    id: 1,
    title: "Math Foundations",
    description: "Basic arithmetic and number sense",
    difficulty: "Foundation Master",
    duration: "2 weeks",
    points: 150,
    icon: Calculator,
    category: "Foundations",
    enrolled: 4521,
    rating: 4.9,
    progress: 100,
    status: "completed",
    badgeType: "Foundation Master",
    prerequisite: null
  },
  {
    id: 2,
    title: "Algebra Basics",
    description: "Variables, expressions, and simple equations",
    difficulty: "Algebra Explorer",
    duration: "3 weeks",
    points: 200,
    icon: Calculator,
    category: "Algebra",
    enrolled: 3847,
    rating: 4.8,
    progress: 100,
    status: "completed",
    badgeType: "Algebra Explorer",
    prerequisite: "Math Foundations"
  },
  {
    id: 3,
    title: "Linear Equations",
    description: "Solving and graphing linear equations",
    difficulty: "Currently Learning",
    duration: "2 weeks",
    points: 180,
    icon: Calculator,
    category: "Algebra",
    enrolled: 2963,
    rating: 4.7,
    progress: 65,
    status: "in-progress",
    badgeType: "Linear Master",
    prerequisite: "Algebra Basics"
  },
  {
    id: 4,
    title: "Quadratic Equations",
    description: "Solving quadratic equations and understanding parabolas",
    difficulty: "Advanced",
    duration: "3 weeks",
    points: 220,
    icon: Calculator,
    category: "Algebra",
    enrolled: 1892,
    rating: 4.6,
    progress: 0,
    status: "locked",
    badgeType: "Quadratic Expert",
    prerequisite: "Linear Equations"
  },
  {
    id: 5,
    title: "Functions",
    description: "Understanding functions and their properties",
    difficulty: "Advanced",
    duration: "4 weeks",
    points: 250,
    icon: Calculator,
    category: "Functions",
    enrolled: 1456,
    rating: 4.7,
    progress: 0,
    status: "locked",
    badgeType: "Function Master",
    prerequisite: "Quadratic Equations"
  },
  {
    id: 6,
    title: "Pre-Calculus",
    description: "Advanced functions and trigonometry",
    difficulty: "Expert",
    duration: "5 weeks",
    points: 300,
    icon: Calculator,
    category: "Advanced",
    enrolled: 987,
    rating: 4.8,
    progress: 0,
    status: "locked",
    badgeType: "Pre-Calc Champion",
    prerequisite: "Functions"
  }
];

const statusColors = {
  "completed": "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-orange-100 text-orange-800 border-orange-200",
  "locked": "bg-gray-100 text-gray-600 border-gray-200"
};

const badgeColors = {
  "Foundation Master": "bg-blue-100 text-blue-800 border-blue-200",
  "Algebra Explorer": "bg-blue-100 text-blue-800 border-blue-200",
  "Currently Learning": "bg-orange-100 text-orange-800 border-orange-200",
  "Advanced": "bg-purple-100 text-purple-800 border-purple-200",
  "Expert": "bg-red-100 text-red-800 border-red-200"
};

export function ChallengeSelector() {
  const { setCurrentPage, setSelectedChallenge } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Challenges");
  const [searchTerm, setSearchTerm] = useState("");

  const statuses = ["All Challenges", "Available", "In Progress", "Completed"];
  const statusCounts = {
    "All Challenges": challenges.length,
    "Available": challenges.filter(c => c.status === "completed" || c.status === "in-progress" || (c.status === "locked" && c.prerequisite && challenges.find(ch => ch.title === c.prerequisite)?.status === "completed")).length,
    "In Progress": challenges.filter(c => c.status === "in-progress").length,
    "Completed": challenges.filter(c => c.status === "completed").length,
  };

  const filteredChallenges = challenges.filter(challenge => {
    let matchesStatus = selectedDifficulty === "All Challenges";
    if (selectedDifficulty === "Available") {
      matchesStatus = challenge.status === "completed" || challenge.status === "in-progress" || 
                     (challenge.status === "locked" && (!challenge.prerequisite || 
                      challenges.find(ch => ch.title === challenge.prerequisite)?.status === "completed"));
    } else if (selectedDifficulty === "In Progress") {
      matchesStatus = challenge.status === "in-progress";
    } else if (selectedDifficulty === "Completed") {
      matchesStatus = challenge.status === "completed";
    }
    
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full px-6 py-12 glass-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Math Challenge</h2>
          <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            Progress through our math ladder system designed for middle and high school students. 
            Master foundational concepts and climb toward advanced mathematics.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              className="pl-10 glass border-0 rounded-xl transition-all duration-300 focus:glass-strong"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 glass border-0 rounded-xl hover:glass-strong transition-all duration-300">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedDifficulty === status ? "default" : "outline"}
              onClick={() => setSelectedDifficulty(status)}
              className={`flex items-center gap-2 rounded-xl transition-all duration-300 ${
                selectedDifficulty === status 
                  ? 'gradient-primary text-white shadow-lg' 
                  : 'glass border-0 hover:glass-strong'
              }`}
            >
              {status}
              <Badge variant="secondary" className={`ml-1 text-xs font-bold ${
                selectedDifficulty === status 
                  ? 'bg-white/20 text-white border-0' 
                  : 'bg-white/90 text-gray-800 border-0'
              }`}>
                {statusCounts[status as keyof typeof statusCounts]}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Challenge Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => {
            const IconComponent = challenge.icon;
            const isLocked = challenge.status === "locked";
            const isCompleted = challenge.status === "completed";
            const isInProgress = challenge.status === "in-progress";
            
            return (
              <Card key={challenge.id} className={`p-6 transition-all duration-300 cursor-pointer glass-gradient border-0 rounded-2xl ${isLocked ? 'opacity-60' : 'hover:glass-gradient-strong hover:shadow-2xl hover:shadow-primary/10'}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-0 shadow-lg ${
                        isCompleted ? 'gradient-primary' :
                        isInProgress ? 'gradient-primary' :
                        'glass'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <IconComponent className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <Badge className="text-xs bg-white/90 text-gray-800 border-0 shadow-md font-medium">
                          {challenge.badgeType}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-gray-800">{challenge.rating}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{challenge.title}</h3>
                      {isInProgress && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-0 font-medium">
                          {challenge.progress}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{challenge.description}</p>
                    {challenge.prerequisite && isLocked && (
                      <p className="text-xs text-gray-800 mt-2 flex items-center gap-1 font-medium">
                        <Target className="w-3 h-3" />
                        Requires: {challenge.prerequisite}
                      </p>
                    )}
                  </div>

                  {isInProgress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">Progress</span>
                        <span className="font-bold text-gray-900">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-700 font-medium">
                      <Clock className="w-4 h-4" />
                      {challenge.duration}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 font-medium">{challenge.enrolled.toLocaleString()} students</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold">
                        {challenge.points} pts
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    className={`w-full rounded-xl transition-all duration-300 font-bold ${
                      isCompleted ? 'gradient-primary hover:opacity-90 shadow-2xl text-white' :
                      isInProgress ? 'gradient-primary hover:opacity-90 shadow-2xl text-white' :
                      isLocked ? 'bg-gray-200 cursor-not-allowed text-gray-600' :
                      'gradient-primary hover:opacity-90 shadow-2xl hover:shadow-primary/25 text-white'
                    }`}
                    disabled={isLocked}
                    onClick={() => {
                      if (!isLocked) {
                        const challengeWithContent = {
                          ...challenge,
                          content: {
                            lessons: [
                              { id: 1, title: "Introduction to Linear Equations", content: "Learn basic concepts", completed: true },
                              { id: 2, title: "Solving Linear Equations", content: "Step-by-step solving", completed: true },
                              { id: 3, title: "Graphing Linear Equations", content: "Visual representation", completed: false, current: true },
                            ],
                            exercises: [
                              { id: 1, question: "Solve: 2x + 5 = 13", options: ["x = 4", "x = 9", "x = 6", "x = 3"], correctAnswer: 0, explanation: "Subtract 5 from both sides, then divide by 2" }
                            ]
                          }
                        };
                        setSelectedChallenge(challengeWithContent);
                        setCurrentPage('challenge-detail');
                      }
                    }}
                  >
                    {isCompleted ? 'Review Challenge' :
                     isInProgress ? 'Continue Learning' :
                     isLocked ? 'Locked' :
                     'Start Challenge'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No challenges found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedDifficulty("All Challenges");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}