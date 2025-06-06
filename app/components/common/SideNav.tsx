'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { cn } from '../../lib/utils';
import {
  Palette,
  Calendar,
  FileText,
  BookOpen,
  Sparkles,
  Image,
  MessageSquare,
  GraduationCap,
  BarChart3,
  FolderOpen,
  FileImage,
  Youtube,
  User,
  Video
} from 'lucide-react';

interface SideNavProps {
  currentView: string;
  onShowLanding: () => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  view: string;
  variant: 'default' | 'ghost';
}

export function SideNav({ currentView, onShowLanding }: SideNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Función para navegación con refresh rápido
  const handleNavigation = (path: string) => {
    // Si ya estamos en la misma página, hacer refresh
    if (currentView === path) {
      window.location.reload();
    } else {
      // Navegar a la nueva página
      router.push(`/${path}`);
    }
  };

  const navItems: NavItem[] = [
    {
      title: 'Blog',
      icon: <BookOpen className="h-5 w-5" />,
      view: 'blog',
      variant: currentView === 'blog' ? 'default' : 'ghost',
    },
    {
      title: 'Recursos',
      icon: <Palette className="h-5 w-5" />,
      view: 'recursos',
      variant: currentView === 'recursos' ? 'default' : 'ghost',
    },
    {
      title: 'Calendario',
      icon: <Calendar className="h-5 w-5" />,
      view: 'calendario',
      variant: currentView === 'calendario' ? 'default' : 'ghost',
    },
    {
      title: 'Guiones',
      icon: <FileText className="h-5 w-5" />,
      view: 'scripts',
      variant: currentView === 'scripts' ? 'default' : 'ghost',
    },
    {
      title: 'Prompts',
      icon: <Sparkles className="h-5 w-5" />,
      view: 'prompts',
      variant: currentView === 'prompts' ? 'default' : 'ghost',
    },
    {
      title: 'Miniaturas',
      icon: <Image className="h-5 w-5" />,
      view: 'miniaturas',
      variant: currentView === 'miniaturas' ? 'default' : 'ghost',
    },
    {
      title: 'Editor de Video',
      icon: <Video className="h-5 w-5" />,
      view: 'editor-video',
      variant: currentView === 'editor-video' ? 'default' : 'ghost',
    },
    {
      title: 'Tareas',
      icon: <BarChart3 className="h-5 w-5" />,
      view: 'tareas',
      variant: currentView === 'tareas' ? 'default' : 'ghost',
    },
    {
      title: 'Chat',
      icon: <MessageSquare className="h-5 w-5" />,
      view: 'chat',
      variant: currentView === 'chat' ? 'default' : 'ghost',
    },
    {
      title: 'Aprendizaje',
      icon: <GraduationCap className="h-5 w-5" />,
      view: 'aprendizaje',
      variant: currentView === 'aprendizaje' ? 'default' : 'ghost',
    },
    {
      title: 'Proyectos',
      icon: <FolderOpen className="h-5 w-5" />,
      view: 'proyectos',
      variant: currentView === 'proyectos' ? 'default' : 'ghost',
    },
    {
      title: 'SVG Viewer',
      icon: <FileImage className="h-5 w-5" />,
      view: 'svg-viewer',
      variant: currentView === 'svg-viewer' ? 'default' : 'ghost',
    },
    {
      title: 'Sobre Red Creativa',
      icon: <Youtube className="h-5 w-5" />,
      view: 'sobre-red-creativa',
      variant: currentView === 'sobre-red-creativa' ? 'default' : 'ghost',
    },
    {
      title: 'Sobre el Creador',
      icon: <User className="h-5 w-5" />,
      view: 'sobre-el-creador',
      variant: currentView === 'sobre-el-creador' ? 'default' : 'ghost',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="px-2">
        <h2 className="mb-3 px-2 text-sm font-medium tracking-wide uppercase text-muted-foreground">
          Navegación Principal
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigation(item.view)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:text-accent-foreground w-full text-left leading-none',
                item.variant === 'default'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {item.icon}
              <span className="truncate">{item.title}</span>
            </button>
          ))}
        </div>
        
        <Separator />
        
        <div className="px-2 space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
            onClick={onShowLanding}
          >
            🎯 Presentación
          </Button>
        </div>
      </div>
    </div>
  );
}