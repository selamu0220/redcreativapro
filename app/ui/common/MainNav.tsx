'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../../lib/utils';
import styles from './Navigation.module.css';
import { Calendar, FileText, BookOpen, Sparkles, Palette, Image, MessageSquare, GraduationCap, BarChart3, FolderOpen, FileImage, Crown, Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeSelector } from './ThemeSelector';

interface MainNavProps {
  currentView: string;
}

export function MainNav({ currentView }: MainNavProps) {
  const { hasActiveSubscription } = useAuth();
  const router = useRouter();
  
  const handleNavigation = useCallback((path: string) => {
    const targetView = path.replace('/', '');
    // Si ya estamos en la misma página, hacer refresh
    if (currentView === targetView) {
      window.location.reload();
    } else {
      // Navegar a la nueva página y hacer refresh inmediato
      router.push(path);
      // Pequeño delay para asegurar que la navegación se complete antes del refresh
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }, [currentView, navigate]);
  
  return (
    <div className={styles.navContainer}>
      <div className={styles.navContent}>
        <div className={styles.navFlex}>
          <div className={styles.logoContainer}>
            <button
              onClick={() => handleNavigation('/blog')}
              className={styles.logoButton}
            >
              <div className={styles.logoIcon}>
          <svg viewBox="0 0 100 100" className={styles.logoSvg}>
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
            <path d="M65 35H35c-1.1 0-2 .9-2 2v26c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V37c0-1.1-.9-2-2-2zm-5 20H40v-4h20v4zm0-8H40v-4h20v4z"/>
          </svg>
        </div>
        <div className={styles.brandContainer}>
          <span className={styles.brandText}>Red Creativa</span>
          {hasActiveSubscription() && (
            <div className={styles.proBadge}>
              <Crown className={styles.proIcon} />
              <span>PRO</span>
            </div>
          )}
        </div>
      </button>
          </div>
          <nav className={styles.navLinks}>
            <button
              onClick={() => handleNavigation('/recursos')}
              className={cn(
                styles.navLink,
                currentView === 'recursos' && styles.navLinkActive
              )}
            >
              <FileText className="h-4 w-4" />
              Recursos
            </button>
            <button
              onClick={() => handleNavigation('/calendario')}
              className={cn(
                styles.navLink,
                currentView === 'calendario' && styles.navLinkActive
              )}
            >
              <Calendar className="h-4 w-4" />
              Calendario
            </button>
            <button
              onClick={() => handleNavigation('/scripts')}
              className={cn(
                styles.navLink,
                currentView === 'scripts' && styles.navLinkActive
              )}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Guiones</span>
            </button>
            <button
              onClick={() => handleNavigation('/prompts')}
              className={cn(
                styles.navLink,
                currentView === 'prompts' && styles.navLinkActive
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">Prompts</span>
            </button>
            <button
              onClick={() => handleNavigation('/thumbnails')}
              className={cn(
                styles.navLink,
                currentView === 'thumbnails' && styles.navLinkActive
              )}
            >
              <Image className="h-4 w-4" />
              <span className="hidden md:inline">Miniaturas</span>
            </button>
            <button
              onClick={() => handleNavigation('/infografias')}
              className={cn(
                styles.navLink,
                currentView === 'infografias' && styles.navLinkActive
              )}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Infografías</span>
            </button>
            <button
              onClick={() => handleNavigation('/chat')}
              className={cn(
                styles.navLink,
                currentView === 'chat' && styles.navLinkActive
              )}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </button>
            <button
              onClick={() => handleNavigation('/blog')}
              className={cn(
                styles.navLink,
                currentView === 'blog' && styles.navLinkActive
              )}
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </button>
            <button
              onClick={() => handleNavigation('/aprendizaje')}
              className={cn(
                styles.navLink,
                currentView === 'aprendizaje' && styles.navLinkActive
              )}
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">Aprendizaje</span>
            </button>
            <button
              onClick={() => handleNavigation('/proyectos')}
              className={cn(
                styles.navLink,
                currentView === 'proyectos' && styles.navLinkActive
              )}
            >
              <FolderOpen className="h-4 w-4" />
              <span className="hidden md:inline">Proyectos</span>
            </button>
            <button
              onClick={() => handleNavigation('/svg')}
              className={cn(
                styles.navLink,
                currentView === 'svg' && styles.navLinkActive
              )}
            >
              <FileImage className="h-4 w-4" />
              <span className="hidden md:inline">SVG Viewer</span>
            </button>
            <button
              onClick={() => handleNavigation('/temas')}
              className={cn(
                styles.navLink,
                currentView === 'temas' && styles.navLinkActive
              )}
            >
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Temas</span>
            </button>
            <div className="flex items-center gap-2 ml-2">
              <ThemeSelector />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}