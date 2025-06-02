import React, { useState, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainNav } from '@/components/common/MainNav';
import { SideNav } from '@/components/common/SideNav';
import { ModeToggle } from '@/components/common/ModeToggle';
import { UserNav } from '@/components/common/UserNav';
import { Search } from '@/components/common/Search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useQuickRefresh } from '@/hooks/useQuickRefresh';
import { Button } from '@/components/ui/button';
import { LogIn, RefreshCw } from 'lucide-react';
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';

const AppLayout = () => {
  console.log('AppLayout: Component is rendering');
  const { user, logout } = useAuth();
  console.log('AppLayout: useAuth returned, user:', user ? 'exists' : 'null');
  const navigate = useNavigate();
  const location = useLocation();
  const { isRefreshing, refresh: handleQuickRefresh } = useQuickRefresh();

  // Extraer la vista actual de la URL
  const getCurrentView = () => {
    const path = location.pathname.slice(1); // Remover el '/'
    return path || 'blog';
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleShowPresentation = () => {
    navigate('/presentacion');
  };

  // handleQuickRefresh viene del hook useQuickRefresh

  const currentView = getCurrentView();

  return (
    <div className="flex h-screen w-full bg-background">
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
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-6 min-h-full">
              <EmailVerificationBanner />
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;