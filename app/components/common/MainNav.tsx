'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { Calendar, FileText, BookOpen, Sparkles, Palette, Image, MessageSquare, GraduationCap, BarChart3, FolderOpen, FileImage, Video } from 'lucide-react';
import { Button } from '../../ui/button';
import { useAuth } from '../../contexts/AuthContext';

interface MainNavProps {
  currentView: string;
}

export function MainNav({ currentView }: MainNavProps) {
  const router = useRouter();
  
  const handleNavigation = useCallback((path: string) => {
    const targetView = path.replace('/', '');
    // Si ya estamos en la misma página, hacer refresh
    if (currentView === targetView) {
      window.location.reload();
    } else {
      // Navegar a la nueva página
      router.push(path);
    }
  }, [currentView, router]);
  
  return (
    <div className="flex items-center gap-6">
      <button
        onClick={() => handleNavigation('/blog')}
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
        </div>
      </button>
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
        <button
          onClick={() => handleNavigation('/scripts')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'scripts'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Guiones</span>
        </button>
        <button
          onClick={() => handleNavigation('/prompts')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'prompts'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden md:inline">Prompts</span>
        </button>
        <button
          onClick={() => handleNavigation('/miniaturas')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'miniaturas'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <Image className="h-4 w-4" />
          <span className="hidden md:inline">Miniaturas</span>
        </button>
        <button
          onClick={() => handleNavigation('/editor-video')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'editor-video'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <Video className="h-4 w-4" />
          <span className="hidden md:inline">Editor Video</span>
        </button>
        <button
          onClick={() => handleNavigation('/tareas')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'tareas'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <BarChart3 className="h-4 w-4" />
          <span className="hidden md:inline">Tareas</span>
        </button>
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
        <button
          onClick={() => handleNavigation('/aprendizaje')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'aprendizaje'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden md:inline">Aprendizaje</span>
        </button>
        <button
          onClick={() => handleNavigation('/proyectos')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'proyectos'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <FolderOpen className="h-4 w-4" />
          <span className="hidden md:inline">Proyectos</span>
        </button>
        <button
          onClick={() => handleNavigation('/svg-viewer')}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'svg-viewer'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
        >
          <FileImage className="h-4 w-4" />
          <span className="hidden md:inline">SVG Viewer</span>
        </button>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2 font-semibold cursor-not-allowed opacity-60"
          disabled
        >
          Próximamente
        </Button>
      </nav>
    </div>
  );
}