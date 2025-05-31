import { useEffect, useState } from 'react';
import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Palette,
  Calendar,
  FileText,
  BookOpen,
  Share2,
  Sparkles,
  Gauge,
  CalendarDays,
  CalendarClock,
  CalendarCheck,
  Image,
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type ViewType = 'resources' | 'calendar' | 'scripts' | 'prompts' | 'thumbnails' | 'chat' | 'blog' | 'courses';

interface SideNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  className?: string;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  view: ViewType;
  variant: 'default' | 'ghost';
}

interface SubNavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export function SideNav({ currentView, onNavigate, className }: SideNavProps) {
  const [subNavItems, setSubNavItems] = useState<SubNavItem[]>([]);

  useEffect(() => {
    switch (currentView) {
      case 'calendar':
        setSubNavItems([
          {
            title: 'Dashboard',
            icon: <Gauge className="h-4 w-4" />,
            href: '#calendar-dashboard',
          },
          {
            title: 'Month View',
            icon: <CalendarDays className="h-4 w-4" />,
            href: '#calendar-month',
          },
          {
            title: 'Week View',
            icon: <CalendarClock className="h-4 w-4" />,
            href: '#calendar-week',
          },
          {
            title: 'Day View',
            icon: <CalendarCheck className="h-4 w-4" />,
            href: '#calendar-day',
          },
        ]);
        break;
      default:
        setSubNavItems([]);
    }
  }, [currentView]);

  const navItems: NavItem[] = [
    {
      title: 'Resources',
      icon: <Palette className="h-5 w-5" />,
      view: 'resources',
      variant: currentView === 'resources' ? 'default' : 'ghost',
    },
    {
      title: 'Calendar',
      icon: <Calendar className="h-5 w-5" />,
      view: 'calendar',
      variant: currentView === 'calendar' ? 'default' : 'ghost',
    },
    {
      title: 'Scripts',
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
      title: 'Thumbnails',
      icon: <Image className="h-5 w-5" />,
      view: 'thumbnails',
      variant: currentView === 'thumbnails' ? 'default' : 'ghost',
    },
    {
      title: 'Chat',
      icon: <MessageSquare className="h-5 w-5" />,
      view: 'chat',
      variant: currentView === 'chat' ? 'default' : 'ghost',
    },
    {
      title: 'Blog',
      icon: <BookOpen className="h-5 w-5" />,
      view: 'blog',
      variant: currentView === 'blog' ? 'default' : 'ghost',
    },
    {
      title: 'Cursos',
      icon: <GraduationCap className="h-5 w-5" />,
      view: 'courses',
      variant: currentView === 'courses' ? 'default' : 'ghost',
    },
  ];

  return (
    <div
      className={cn(
        'pb-12 hidden md:block border-r w-[240px] shrink-0',
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main Navigation
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant={item.variant}
                size="sm"
                className="w-full justify-start"
                onClick={() => onNavigate(item.view)}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Button>
            ))}
          </div>
        </div>
        {subNavItems.length > 0 && (
          <>
            <Separator />
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </h2>
              <ScrollArea className="h-[300px]">
                <div className="space-y-1 px-2">
                  {subNavItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </div>
    </div>
  );
}