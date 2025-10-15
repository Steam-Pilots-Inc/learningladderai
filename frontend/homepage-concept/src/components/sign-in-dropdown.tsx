import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, GraduationCap, User } from "lucide-react";
import { useApp } from "../contexts/app-context";

export function SignInDropdown() {
  const { setUser, setIsSignedIn, setCurrentPage } = useApp();

  const handleSignIn = (role: 'student' | 'educator') => {
    const userData = {
      id: '1',
      name: role === 'student' ? 'Alex Student' : 'Dr. Smith',
      email: role === 'student' ? 'alex@school.edu' : 'smith@school.edu',
      role,
      xp: role === 'student' ? 8200 : 15400,
      level: role === 'student' ? 18 : 28,
      completedChallenges: role === 'student' ? 24 : 67,
      avatar: role === 'student' ? 'AS' : 'DS'
    };
    
    setUser(userData);
    setIsSignedIn(true);
    setCurrentPage('dashboard');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:glass-gradient rounded-xl transition-all duration-300">
          Sign In
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 glass-gradient shadow-2xl border-0 z-50 rounded-2xl overflow-hidden backdrop-blur-xl">
        <DropdownMenuItem 
          className="flex items-center gap-3 p-4 cursor-pointer hover:glass-strong transition-all duration-300 rounded-xl m-2"
          onClick={() => handleSignIn('educator')}
        >
          <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-medium block">Sign in as Educator</span>
            <span className="text-xs text-muted-foreground">Access teacher dashboard</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-3 p-4 cursor-pointer hover:glass-strong transition-all duration-300 rounded-xl m-2"
          onClick={() => handleSignIn('student')}
        >
          <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-medium block">Sign in as Student</span>
            <span className="text-xs text-muted-foreground">Start your learning journey</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}