import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { SignInDropdown } from "./sign-in-dropdown";
import { Settings, LogOut, User, Trophy } from "lucide-react";
import { useApp } from "../contexts/app-context";
import logoImage from 'figma:asset/06214c03278db6898e1f3607155e575120aefc3c.png';

export function Header() {
  const { currentPage, setCurrentPage, user, isSignedIn, setUser, setIsSignedIn } = useApp();

  const handleSignOut = () => {
    setUser(null);
    setIsSignedIn(false);
    setCurrentPage('home');
  };

  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'Challenges', page: 'challenges' as const },
    { label: 'Leaderboard', page: 'leaderboard' as const },
    { label: 'AI Tutor', page: 'chatbot' as const },
    { label: 'Resources', page: 'resources' as const },
  ];

  return (
    <header className="w-full frosted-gradient border-b border-primary/20 px-6 py-4 sticky top-0 z-50 shadow-lg shadow-primary/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <button 
            onClick={() => setCurrentPage(isSignedIn ? 'dashboard' : 'home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={logoImage} 
              alt="Learning Ladder AI Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="font-bold gradient-text">
                Learning Ladder AI
              </h1>
              <p className="text-sm text-muted-foreground">by STEAM Pilots</p>
            </div>
          </button>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Button 
                key={item.page}
                variant="ghost" 
                onClick={() => setCurrentPage(item.page)}
                className={`rounded-xl transition-all duration-300 ${
                  currentPage === item.page 
                    ? 'text-primary glass-gradient' 
                    : 'text-muted-foreground hover:text-primary hover:glass-gradient'
                }`}
              >
                {item.label}
              </Button>
            ))}
            {isSignedIn && (
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('dashboard')}
                className={`rounded-xl transition-all duration-300 ${
                  currentPage === 'dashboard' 
                    ? 'text-primary glass-gradient' 
                    : 'text-muted-foreground hover:text-primary hover:glass-gradient'
                }`}
              >
                Dashboard
              </Button>
            )}
          </nav>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isSignedIn && user ? (
            <>
              <Badge 
                variant="secondary" 
                className="glass-gradient text-primary border-0 shadow-md"
              >
                {user.xp.toLocaleString()} XP
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <div className="w-full h-full gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 glass-gradient shadow-2xl border-0 z-50 rounded-2xl overflow-hidden backdrop-blur-xl" align="end" forceMount>
                  <div className="flex items-center gap-3 p-4">
                    <Avatar className="h-12 w-12">
                      <div className="w-full h-full gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Badge className="text-xs glass border-0 mt-1">
                        Level {user.level} {user.role === 'educator' ? 'Educator' : 'Student'}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-border/20" />
                  <DropdownMenuItem onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-3 p-3 cursor-pointer hover:glass-strong transition-all duration-300 rounded-xl m-2">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentPage('leaderboard')} className="flex items-center gap-3 p-3 cursor-pointer hover:glass-strong transition-all duration-300 rounded-xl m-2">
                    <Trophy className="w-4 h-4" />
                    <span>Leaderboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer hover:glass-strong transition-all duration-300 rounded-xl m-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/20" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-3 p-3 cursor-pointer hover:glass-strong transition-all duration-300 rounded-xl m-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <SignInDropdown />
          )}
        </div>
      </div>
    </header>
  );
}