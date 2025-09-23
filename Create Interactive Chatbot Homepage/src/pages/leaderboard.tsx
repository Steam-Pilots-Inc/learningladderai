import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Clock, 
  Target,
  Users,
  Star,
  Crown,
  Zap
} from "lucide-react";
import { useApp } from "../contexts/app-context";

const globalLeaderboard = [
  { rank: 1, name: "Alex Chen", xp: 15420, level: 28, avatar: "AC", streak: 45, challengesCompleted: 67, badge: "Math Wizard" },
  { rank: 2, name: "Sarah Johnson", xp: 14850, level: 27, avatar: "SJ", streak: 32, challengesCompleted: 63, badge: "Algebra Master" },
  { rank: 3, name: "Mike Rodriguez", xp: 14200, level: 26, avatar: "MR", streak: 28, challengesCompleted: 58, badge: "Linear Expert" },
  { rank: 4, name: "Emma Davis", xp: 13750, level: 25, avatar: "ED", streak: 21, challengesCompleted: 55, badge: "Problem Solver" },
  { rank: 5, name: "James Wilson", xp: 13200, level: 24, avatar: "JW", streak: 19, challengesCompleted: 52, badge: "Equation Expert" },
  { rank: 6, name: "Lisa Zhang", xp: 12900, level: 24, avatar: "LZ", streak: 16, challengesCompleted: 49, badge: "Math Explorer" },
  { rank: 7, name: "David Kim", xp: 12550, level: 23, avatar: "DK", streak: 14, challengesCompleted: 46, badge: "Function Master" },
  { rank: 8, name: "Anna Miller", xp: 12200, level: 23, avatar: "AM", streak: 12, challengesCompleted: 44, badge: "Graph Guru" },
  { rank: 9, name: "Ryan Brown", xp: 11800, level: 22, avatar: "RB", streak: 9, challengesCompleted: 41, badge: "Algebra Ace" },
  { rank: 10, name: "Sofia Garcia", xp: 11400, level: 21, avatar: "SG", streak: 7, challengesCompleted: 38, badge: "Math Rookie" },
];

const weeklyLeaderboard = [
  { rank: 1, name: "Emma Davis", xpGained: 850, avatar: "ED", challengesCompleted: 5 },
  { rank: 2, name: "Alex Chen", xpGained: 720, avatar: "AC", challengesCompleted: 4 },
  { rank: 3, name: "Mike Rodriguez", xpGained: 650, avatar: "MR", challengesCompleted: 4 },
  { rank: 4, name: "Sarah Johnson", xpGained: 580, avatar: "SJ", challengesCompleted: 3 },
  { rank: 5, name: "Lisa Zhang", xpGained: 520, avatar: "LZ", challengesCompleted: 3 },
];

const classLeaderboard = [
  { rank: 1, name: "You", xp: 8200, level: 18, avatar: "YU", streak: 12, challengesCompleted: 24, isCurrentUser: true },
  { rank: 2, name: "Jessica Chen", xp: 7850, level: 17, avatar: "JC", streak: 8, challengesCompleted: 22 },
  { rank: 3, name: "Tommy Wilson", xp: 7200, level: 16, avatar: "TW", streak: 6, challengesCompleted: 19 },
  { rank: 4, name: "Maya Patel", xp: 6950, level: 15, avatar: "MP", streak: 4, challengesCompleted: 18 },
  { rank: 5, name: "Jake Martinez", xp: 6400, level: 14, avatar: "JM", streak: 3, challengesCompleted: 16 },
];

const achievements = [
  { title: "First Place Finisher", description: "Ranked #1 in weekly leaderboard", icon: Trophy, count: 3, rarity: "legendary" },
  { title: "Streak Master", description: "Maintained 30+ day learning streak", icon: Zap, count: 12, rarity: "epic" },
  { title: "Problem Solver", description: "Completed 50+ challenges", icon: Target, count: 45, rarity: "rare" },
  { title: "Speed Learner", description: "Completed challenge in record time", icon: Clock, count: 8, rarity: "common" },
];

export function Leaderboard() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("global");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "gradient-primary text-white";
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "glass border-0";
    }
  };

  return (
    <div className="min-h-screen glass-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🏆 Leaderboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how you stack up against other learners and celebrate achievements together!
          </p>
        </div>

        {/* User Stats */}
        {user && (
          <Card className="p-6 glass-gradient border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <div className="w-full h-full gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-muted-foreground">Level {user.level} • Class Rank #1</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="glass border-0 text-primary">
                      {user.xp.toLocaleString()} XP
                    </Badge>
                    <Badge className="glass border-0 text-primary">
                      12-day streak 🔥
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">+320 XP this week</span>
                </div>
                <p className="text-sm text-muted-foreground">Keep up the great work!</p>
              </div>
            </div>
          </Card>
        )}

        {/* Leaderboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="glass-gradient border-0 p-1 grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="global" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              🌍 Global
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              📅 This Week
            </TabsTrigger>
            <TabsTrigger value="class" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              🎓 My Class
            </TabsTrigger>
          </TabsList>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Leaderboard Content */}
            <div className="lg:col-span-3">
              <TabsContent value="global">
                <Card className="glass-gradient border-0 shadow-lg">
                  <div className="p-6 border-b border-border/20">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-primary" />
                      Global Leaderboard
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Top learners from around the world</p>
                  </div>
                  <ScrollArea className="h-[600px]">
                    <div className="p-6 space-y-3">
                      {globalLeaderboard.map((user) => (
                        <div 
                          key={user.rank}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                            user.rank <= 3 
                              ? 'glass-gradient-strong shadow-lg' 
                              : 'glass hover:glass-strong'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {getRankIcon(user.rank)}
                            <Avatar className="w-12 h-12">
                              <div className="w-full h-full gradient-primary rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">{user.avatar}</span>
                              </div>
                            </Avatar>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold">{user.name}</h4>
                              <Badge className="text-xs glass border-0">{user.badge}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>Level {user.level}</span>
                              <span>{user.challengesCompleted} challenges</span>
                              <span>{user.streak} day streak</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-lg text-primary">{user.xp.toLocaleString()} XP</p>
                            <p className="text-xs text-muted-foreground">Total earned</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="weekly">
                <Card className="glass-gradient border-0 shadow-lg">
                  <div className="p-6 border-b border-border/20">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      Weekly Champions
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Most XP gained this week</p>
                  </div>
                  <div className="p-6 space-y-3">
                    {weeklyLeaderboard.map((user) => (
                      <div 
                        key={user.rank}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          user.rank <= 3 
                            ? 'glass-gradient-strong shadow-lg' 
                            : 'glass hover:glass-strong'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getRankIcon(user.rank)}
                          <Avatar className="w-12 h-12">
                            <div className="w-full h-full gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{user.avatar}</span>
                            </div>
                          </Avatar>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user.challengesCompleted} challenges completed
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-lg text-green-600">+{user.xpGained} XP</p>
                          <p className="text-xs text-muted-foreground">This week</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="class">
                <Card className="glass-gradient border-0 shadow-lg">
                  <div className="p-6 border-b border-border/20">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      My Class Leaderboard
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Your class • Mrs. Johnson's Algebra II</p>
                  </div>
                  <div className="p-6 space-y-3">
                    {classLeaderboard.map((student) => (
                      <div 
                        key={student.rank}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          student.isCurrentUser
                            ? 'gradient-primary text-white shadow-lg'
                            : student.rank <= 3 
                            ? 'glass-gradient-strong shadow-lg' 
                            : 'glass hover:glass-strong'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getRankIcon(student.rank)}
                          <Avatar className="w-12 h-12">
                            <div className={`w-full h-full rounded-full flex items-center justify-center ${
                              student.isCurrentUser ? 'bg-white/20' : 'gradient-primary'
                            }`}>
                              <span className="text-white font-medium">{student.avatar}</span>
                            </div>
                          </Avatar>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold">{student.name}</h4>
                            {student.isCurrentUser && (
                              <Badge className="text-xs bg-white/20 text-white border-0">You</Badge>
                            )}
                          </div>
                          <div className={`flex items-center gap-4 text-sm mt-1 ${
                            student.isCurrentUser ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            <span>Level {student.level}</span>
                            <span>{student.challengesCompleted} challenges</span>
                            <span>{student.streak} day streak</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={`font-bold text-lg ${
                            student.isCurrentUser ? 'text-white' : 'text-primary'
                          }`}>
                            {student.xp.toLocaleString()} XP
                          </p>
                          <p className={`text-xs ${
                            student.isCurrentUser ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            Total earned
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </div>

            {/* Achievements Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 glass-gradient border-0 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div 
                        key={index}
                        className={`p-3 rounded-xl ${getRarityColor(achievement.rarity)}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="w-4 h-4" />
                          <span className="font-medium text-sm">{achievement.title}</span>
                        </div>
                        <p className="text-xs opacity-80 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge className="text-xs bg-white/20 border-0">
                            {achievement.count} earned
                          </Badge>
                          <span className="text-xs opacity-60">{achievement.rarity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-border/20">
                  <h4 className="font-medium mb-3">Upcoming Rewards</h4>
                  <div className="space-y-2">
                    <div className="p-2 glass rounded-lg">
                      <p className="text-sm font-medium">Week Winner Badge</p>
                      <p className="text-xs text-muted-foreground">Finish #1 this week</p>
                    </div>
                    <div className="p-2 glass rounded-lg">
                      <p className="text-sm font-medium">Streak Legend</p>
                      <p className="text-xs text-muted-foreground">Reach 50-day streak</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}