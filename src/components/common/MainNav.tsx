import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, FileText, BookOpen, Sparkles, Palette, Image, MessageSquare, GraduationCap, BarChart3, FolderOpen, FileImage, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MainNavProps {
  currentView: string;
}

export function MainNav({ currentView }: MainNavProps) {
  const { hasActiveSubscription } = useAuth();
  
  const handleNavigation = useCallback((path: string) => {
    // Force navigation using window.location to bypass any React Router issues
    window.location.href = path;
  }, []);
  
  return (
    <div className="flex items-center gap-6">
      <Link
        to="/blog"
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
            <path d="M65 35H35c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V37c0-1.1-.9-2-2-2zm-5 20H40v-4h20v4zm0-8H40v-4h20v4z"/>
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-bold lg:inline-block">Red Creativa</span>
          {hasActiveSubscription() && (
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
              <Crown className="h-3 w-3" />
              <span>PRO</span>
            </div>
          )}
        </div>
      </Link>
      <nav className="flex items-center gap-1">
        <button
          onClick={() => handleNavigation('/recursos')}
          className={cn(
            'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
            currentView === 'recursos'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          <FileText className="h-4 w-4" />
          Recursos
        </button>
        <button
            onClick={() => handleNavigation('/calendario')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              currentView === 'calendario'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <Calendar className="h-4 w-4" />
            Calendario
          </button>
        <Link
          to="/scripts"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'scripts'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Guiones</span>
        </Link>
        <Link
          to="/prompts"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'prompts'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden md:inline">Prompts</span>
        </Link>
        <Link
          to="/thumbnails"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'thumbnails'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <Image className="h-4 w-4" />
          <span className="hidden md:inline">Miniaturas</span>
        </Link>
        <Link
          to="/infografias"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'infografias'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <BarChart3 className="h-4 w-4" />
          <span className="hidden md:inline">Infografías</span>
        </Link>
        <button
           onClick={() => handleNavigation('/chat')}
           className={cn(
             'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
             currentView === 'chat'
               ? 'bg-primary text-primary-foreground'
               : 'text-muted-foreground hover:text-foreground hover:bg-accent'
           )}
         >
           <MessageSquare className="h-4 w-4" />
           Chat
         </button>
        <button
            onClick={() => handleNavigation('/blog')}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              currentView === 'blog'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </button>
        <Link
          to="/aprendizaje"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'aprendizaje'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden md:inline">Aprendizaje</span>
        </Link>
        <Link
          to="/proyectos"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'proyectos'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <FolderOpen className="h-4 w-4" />
          <span className="hidden md:inline">Proyectos</span>
        </Link>
        <Link
          to="/svg"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'svg'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <FileImage className="h-4 w-4" />
          <span className="hidden md:inline">SVG Viewer</span>
        </Link>
        <Link
          to="/precios"
          className="ml-2"
        >
          <Button 
            variant="default" 
            size="sm" 
            className="font-semibold"
          >
            Plan Pro
          </Button>
        </Link>
      </nav>
    </div>
  );
}