import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { Calendar, FileText, BookOpen, Sparkles, Palette, Image, MessageSquare, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewType = 'resources' | 'calendar' | 'scripts' | 'prompts' | 'thumbnails' | 'chat' | 'blog' | 'learning';

interface MainNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onShowPricing: () => void;
}

export function MainNav({ currentView, onNavigate, onShowPricing }: MainNavProps) {
  return (
    <div className="flex items-center gap-6">
      <Link
        href="#"
        className="flex items-center space-x-2"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('resources');
        }}
      >
        <div className="w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
            <path d="M65 35H35c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V37c0-1.1-.9-2-2-2zm-5 20H40v-4h20v4zm0-8H40v-4h20v4z"/>
          </svg>
        </div>
        <span className="hidden font-bold lg:inline-block">Red Creativa</span>
      </Link>
      <nav className="flex items-center gap-1">
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'resources'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('resources');
          }}
        >
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">Recursos</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'calendar'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('calendar');
          }}
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden md:inline">Calendario</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'scripts'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('scripts');
          }}
        >
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Guiones</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'prompts'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('prompts');
          }}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden md:inline">Prompts</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'thumbnails'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('thumbnails');
          }}
        >
          <Image className="h-4 w-4" />
          <span className="hidden md:inline">Miniaturas</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'chat'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('chat');
          }}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden md:inline">Chat</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'blog'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('blog');
          }}
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Blog</span>
        </Link>
        <Link
          href="#"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 px-2 py-1.5 rounded-md',
            currentView === 'learning'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          )}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('learning');
          }}
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden md:inline">Aprendizaje</span>
        </Link>
        <Button 
          variant="default" 
          size="sm" 
          className="ml-2 font-semibold"
          onClick={onShowPricing}
        >
          Prueba Gratis
        </Button>
      </nav>
    </div>
  );
}