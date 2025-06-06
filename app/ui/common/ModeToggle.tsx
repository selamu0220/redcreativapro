'use client';

import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useTheme } from '../../contexts/ThemeContext';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all" />
          <Palette className="absolute h-5 w-5 rotate-90 scale-0 transition-all" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('white')}>
          🤍 Blanco
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('black')}>
          🖤 Negro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('neurobrutalismo')}>
          🎨 Neurobrutalismo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}