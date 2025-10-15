import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { ChallengeSelector } from "./components/challenge-selector";
import { AIChatbotPreview } from "./components/ai-chatbot-preview";
import { Dashboard } from "./pages/dashboard";
import { Chatbot } from "./pages/chatbot";
import { ChallengeDetail } from "./pages/challenge-detail";
import { Leaderboard } from "./pages/leaderboard";
import { AppProvider, useApp } from "./contexts/app-context";

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'challenges':
        return (
          <div className="min-h-screen bg-background">
            <ChallengeSelector />
          </div>
        );
      case 'challenge-detail':
        return <ChallengeDetail />;
      case 'chatbot':
        return <Chatbot />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'resources':
        return (
          <div className="min-h-screen glass-subtle p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">📚 Learning Resources</h1>
                <p className="text-lg text-muted-foreground">
                  Additional materials to support your learning journey
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 glass-gradient border-0 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">📖 Study Guides</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive guides for each topic</p>
                  <button className="gradient-primary text-white px-4 py-2 rounded-xl">
                    Browse Guides
                  </button>
                </div>
                <div className="p-6 glass-gradient border-0 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">🎥 Video Lessons</h3>
                  <p className="text-muted-foreground mb-4">Interactive video explanations</p>
                  <button className="gradient-primary text-white px-4 py-2 rounded-xl">
                    Watch Videos
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="min-h-screen glass-subtle p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">👥 Community</h1>
                <p className="text-lg text-muted-foreground">
                  Connect with fellow learners and educators
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 glass-gradient border-0 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">💬 Discussion Forums</h3>
                  <p className="text-muted-foreground mb-4">Ask questions and share knowledge</p>
                  <button className="gradient-primary text-white px-4 py-2 rounded-xl">
                    Join Discussions
                  </button>
                </div>
                <div className="p-6 glass-gradient border-0 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold mb-3">👨‍🏫 Study Groups</h3>
                  <p className="text-muted-foreground mb-4">Find study partners and mentors</p>
                  <button className="gradient-primary text-white px-4 py-2 rounded-xl">
                    Find Groups
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-background">
            <HeroSection />
            <ChallengeSelector />
            <AIChatbotPreview />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}