import { Button } from "./ui/button";
import { InteractiveButton } from "./InteractiveButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { ChevronDown, MoreVertical, Users, GraduationCap, UserCircle, Settings, Plus, MessageSquare, History, Download, Share, Trash2, Moon, Sun, HelpCircle, LogOut, BarChart3 } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";

interface ChatHeaderProps {
  showLearningLadder?: boolean;
  onToggleLearningLadder?: () => void;
}

export function ChatHeader({ showLearningLadder, onToggleLearningLadder }: ChatHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Learning Ladder Toggle - Desktop only, now positioned first */}
          {!isMobile && onToggleLearningLadder && (
            <InteractiveButton
              variant={showLearningLadder ? "primary" : "glass"}
              size="sm"
              icon={BarChart3}
              onClick={onToggleLearningLadder}
              pulse={showLearningLadder}
              className="rounded-md"
            >
              <span className="whitespace-nowrap">Learning Ladder</span>
            </InteractiveButton>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className={`interactive-glass rounded-md min-w-0 max-w-full inline-flex items-center gap-2 font-medium border-0 ${isMobile ? 'px-2 py-1.5 text-xs h-auto' : 'px-3 py-2 text-sm h-auto'}`}
              >
                <Users className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0`} />
                <span className="truncate">
                  {isMobile ? "Mr. Khan's" : "Mr. Khan's Classroom"}
                </span>
                <ChevronDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className={`glass-container-heavy bg-white/10 border border-white/20 ${isMobile ? 'w-48' : 'w-56'} rounded-2xl shadow-xl`}
            >
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Users className="w-4 h-4 mr-2" />
                Mr. Khan's Classroom
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Users className="w-4 h-4 mr-2" />
                Ms. Smith's Classroom
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Users className="w-4 h-4 mr-2" />
                Dr. Johnson's Lab
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/30 mx-2 my-2 h-px" />
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Plus className="w-4 h-4 mr-2" />
                Add New Classroom
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Settings className="w-4 h-4 mr-2" />
                Classroom Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className={`interactive-glass rounded-md inline-flex items-center gap-1.5 font-medium border-0 ${isMobile ? 'px-2 py-1.5 text-xs h-auto' : 'px-3 py-2 text-sm h-auto'}`}
              >
                <span className="whitespace-nowrap">Sign In</span>
                <ChevronDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className={`glass-container-heavy bg-white/10 border border-white/20 ${isMobile ? 'w-48' : 'w-56'} rounded-2xl shadow-xl`}
            >
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <GraduationCap className="w-4 h-4 mr-2" />
                Sign in as Educator
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <UserCircle className="w-4 h-4 mr-2" />
                Sign in as Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className={`interactive-glass rounded-md border-0 ${isMobile ? 'w-7 h-7' : 'w-8 h-8'}`}
              >
                <MoreVertical className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={`glass-container-heavy bg-white/10 border border-white/20 ${isMobile ? 'w-48' : 'w-56'} rounded-2xl shadow-xl`}
            >
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <MessageSquare className="w-4 h-4 mr-2" />
                New Chat
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <History className="w-4 h-4 mr-2" />
                Chat History
              </DropdownMenuItem>
              {isMobile && onToggleLearningLadder && (
                <DropdownMenuItem 
                  className="hover:bg-white/20 rounded-xl mx-1 my-0.5"
                  onClick={onToggleLearningLadder}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Learning Progress
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-white/30 mx-2 my-2 h-px" />
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Download className="w-4 h-4 mr-2" />
                Export Chat
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Share className="w-4 h-4 mr-2" />
                Share Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/30 mx-2 my-2 h-px" />
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/30 mx-2 my-2 h-px" />
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5" style={{ color: '#DC7766' }}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Chats
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/20 rounded-xl mx-1 my-0.5">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}