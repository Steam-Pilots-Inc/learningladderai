import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Avatar } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar } from "../components/ui/calendar";
import { Trophy, Target, Clock, Star, TrendingUp, BookOpen, MessageCircle, Users } from "lucide-react";
import { useApp } from "../contexts/app-context";
import { useState } from "react";

const weeklyActivity = [
  { day: 'Mon', hours: 2.5, completed: true },
  { day: 'Tue', hours: 1.8, completed: true },
  { day: 'Wed', hours: 3.2, completed: true },
  { day: 'Thu', hours: 0, completed: false },
  { day: 'Fri', hours: 2.1, completed: true },
  { day: 'Sat', hours: 4.0, completed: true },
  { day: 'Sun', hours: 1.5, completed: false }
];

const achievements = [
  { id: 1, title: "Math Foundation Master", description: "Completed basic math challenges", earned: true, icon: "🏆", date: "2024-01-15" },
  { id: 2, title: "Algebra Explorer", description: "Solved 50 algebra problems", earned: true, icon: "⭐", date: "2024-01-20" },
  { id: 3, title: "Linear Equation Champion", description: "Mastered linear equations", earned: false, icon: "🎯", progress: 65 },
  { id: 4, title: "Problem Solver", description: "Solve 100 math problems", earned: false, icon: "🧮", progress: 43 }
];

const recentActivity = [
  { id: 1, type: "challenge_completed", title: "Completed Algebra Basics", time: "2 hours ago", xp: 200 },
  { id: 2, type: "lesson_finished", title: "Finished Linear Equations Lesson 3", time: "1 day ago", xp: 50 },
  { id: 3, type: "achievement_earned", title: "Earned Algebra Explorer badge", time: "2 days ago", xp: 100 },
  { id: 4, type: "streak_milestone", title: "7-day learning streak!", time: "3 days ago", xp: 75 }
];

export function Dashboard() {
  const { user, setCurrentPage } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 glass-gradient text-center">
          <h2 className="text-xl mb-4">Please sign in to view your dashboard</h2>
          <Button onClick={() => setCurrentPage('home')} className="gradient-primary">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen glass-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}! 👋</h1>
            <p className="text-muted-foreground mt-2">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="glass-gradient text-primary border-0 text-lg px-4 py-2">
              Level {user.level}
            </Badge>
            <Badge className="glass-gradient text-primary border-0 text-lg px-4 py-2">
              {user.xp.toLocaleString()} XP
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 glass-gradient border-0 shadow-lg hover:glass-gradient-strong transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user.completedChallenges}</p>
                <p className="text-sm text-muted-foreground">Challenges Completed</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-gradient border-0 shadow-lg hover:glass-gradient-strong transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-gradient border-0 shadow-lg hover:glass-gradient-strong transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">23h</p>
                <p className="text-sm text-muted-foreground">Time This Week</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-gradient border-0 shadow-lg hover:glass-gradient-strong transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Continue Learning</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Linear Equations</h4>
                    <p className="text-sm text-muted-foreground">Lesson 4: Graphing Linear Equations</p>
                    <Progress value={65} className="mt-2 h-2" />
                    <p className="text-xs text-muted-foreground mt-1">65% completed</p>
                  </div>
                  <Button 
                    onClick={() => setCurrentPage('challenge-detail')}
                    className="gradient-primary rounded-xl"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </Card>

            {/* Weekly Activity */}
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
              <div className="grid grid-cols-7 gap-2">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                    <div 
                      className={`h-20 w-full rounded-lg flex items-end justify-center text-xs font-medium ${
                        day.completed ? 'gradient-primary text-white' : 'glass'
                      }`}
                    >
                      {day.hours > 0 && (
                        <span className="mb-2">{day.hours}h</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 glass rounded-xl">
                    <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                      {activity.type === 'challenge_completed' && <Trophy className="w-4 h-4 text-white" />}
                      {activity.type === 'lesson_finished' && <BookOpen className="w-4 h-4 text-white" />}
                      {activity.type === 'achievement_earned' && <Star className="w-4 h-4 text-white" />}
                      {activity.type === 'streak_milestone' && <TrendingUp className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge className="glass border-0 text-primary">+{activity.xp} XP</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => setCurrentPage('challenges')}
                  className="w-full glass border-0 justify-start gap-3 hover:glass-strong"
                  variant="outline"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Challenges
                </Button>
                <Button 
                  onClick={() => setCurrentPage('chatbot')}
                  className="w-full glass border-0 justify-start gap-3 hover:glass-strong"
                  variant="outline"
                >
                  <MessageCircle className="w-5 h-5" />
                  AI Tutor Chat
                </Button>
                <Button 
                  onClick={() => setCurrentPage('leaderboard')}
                  className="w-full glass border-0 justify-start gap-3 hover:glass-strong"
                  variant="outline"
                >
                  <Users className="w-5 h-5" />
                  Leaderboard
                </Button>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-3 rounded-xl ${achievement.earned ? 'glass' : 'glass-subtle'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${achievement.earned ? '' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {!achievement.earned && achievement.progress && (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">{achievement.progress}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Calendar */}
            <Card className="p-6 glass-gradient border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Learning Calendar</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}