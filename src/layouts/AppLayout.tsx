import { useState } from 'react';
import { MainNav } from '@/components/common/MainNav';
import { SideNav } from '@/components/common/SideNav';
import { ResourcesView } from '@/components/resources/ResourcesView';
import { CalendarView } from '@/components/calendar/CalendarView';
import { ScriptLibrary } from '@/components/scripts/ScriptLibrary';
import { MiniBlog } from '@/components/blog/MiniBlog';
import { PromptLibrary } from '@/components/prompts/PromptLibrary';
import { ThumbnailCreator } from '@/components/thumbnails/ThumbnailCreator';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { PricingSection } from '@/components/pricing/PricingSection';
import { ModeToggle } from '@/components/common/ModeToggle';
import { UserNav } from '@/components/common/UserNav';
import { Search } from '@/components/common/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthPage } from '@/pages/AuthPage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import LandingPresentation from '@/components/LandingPresentation';
import CourseView from '@/components/courses/CourseView';

type ViewType = 'resources' | 'calendar' | 'scripts' | 'prompts' | 'thumbnails' | 'chat' | 'blog' | 'courses';

export default function AppLayout() {
  const [currentView, setCurrentView] = useState<ViewType>('blog');
  const [showPricing, setShowPricing] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const { isAuthenticated } = useAuth();

  const renderView = () => {
    if (showLanding) {
      return <LandingPresentation onComplete={() => setShowLanding(false)} />;
    }

    if (showPricing) {
      return <PricingSection />;
    }

    if (showAuth) {
      return <AuthPage onClose={() => setShowAuth(false)} />;
    }

    switch (currentView) {
      case 'resources':
        return <ResourcesView />;
      case 'calendar':
        return <CalendarView />;
      case 'scripts':
        return <ScriptLibrary />;
      case 'prompts':
        return <PromptLibrary />;
      case 'thumbnails':
        return <ThumbnailCreator />;
      case 'chat':
        return <ChatInterface />;
      case 'blog':
        return <MiniBlog />;
      case 'courses':
        return <CourseView />;
      default:
        return <MiniBlog />;
    }
  };

  if (showLanding) {
    return renderView();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <MainNav
            onNavigate={(view) => {
              setCurrentView(view);
              setShowPricing(false);
              setShowAuth(false);
            }}
            currentView={currentView}
            onShowPricing={() => {
              setShowPricing(true);
              setShowAuth(false);
            }}
          />
          <div className="flex items-center gap-2">
            <Search />
            <ModeToggle />
            {isAuthenticated ? (
              <UserNav />
            ) : (
              <Button size="sm" onClick={() => setShowAuth(true)}>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <SideNav
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            setShowPricing(false);
            setShowAuth(false);
          }}
          className="hidden lg:block"
        />
        <ScrollArea className="flex-1 h-[calc(100vh-56px)]">
          <main className="container p-4 md:p-6">{renderView()}</main>
        </ScrollArea>
      </div>
    </div>
  );
}