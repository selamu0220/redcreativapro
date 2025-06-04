'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MainNav } from './common/MainNav';
import { SideNav } from './common/SideNav';
import { ModeToggle } from '../ui/common/ModeToggle';
import { UserNav } from '../ui/common/UserNav';
import { Search } from '../ui/common/Search';
import { ScrollArea } from '../ui/scroll-area';
import { useAuth } from '../contexts/AuthContext';
import { useQuickRefresh } from '../hooks/useQuickRefresh';
import { Button } from '../ui/button';
import { LogIn, RefreshCw } from 'lucide-react';
import { EmailVerificationBanner } from '../ui/auth/EmailVerificationBanner';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  console.log('AppLayout: Component is rendering');
  const { user, logout } = useAuth();
  console.log('AppLayout: useAuth returned, user:', user ? 'exists' : 'null');
  const router = useRouter();
  const pathname = usePathname();
  const { isRefreshing, refresh: handleQuickRefresh } = useQuickRefresh();

  // Extraer la vista actual de la URL
  const getCurrentView = () => {
    const path = pathname.slice(1); // Remover el '/'
    return path || 'blog';
  };

  const handleAuthClick = () => {
    router.push('/auth');
  };

  const handleShowPresentation = () => {
    router.push('/presentacion');
  };

  // handleQuickRefresh viene del hook useQuickRefresh

  const currentView = getCurrentView();

  return (
    <div className="flex h-screen w-screen max-w-full max-h-full bg-background relative">
      {/* Sidebar */}
      <div className="w-64 min-w-64 border-r bg-card flex-shrink-0">
        <div className="p-4 h-full overflow-y-auto">
          <h1 className="text-xl font-bold text-foreground mb-4">Red Creativa Pro</h1>
          <SideNav 
            currentView={currentView} 
            onShowLanding={handleShowPresentation}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b bg-card px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <MainNav currentView={currentView} />
              <Search />
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <Button 
                onClick={handleQuickRefresh} 
                variant="ghost" 
                size="sm"
                disabled={isRefreshing}
                className="transition-all duration-200"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <ModeToggle />
              {user ? (
                <UserNav />
              ) : (
                <Button onClick={handleAuthClick} variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 relative">
          <ScrollArea className="h-full w-full">
            <div className="p-6 h-full min-h-full">
              <EmailVerificationBanner />
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;