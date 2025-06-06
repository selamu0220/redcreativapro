'use client';

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Badge } from '../badge';
import { Palette, Moon, Sun, Zap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';

const themeIcons = {
  shadcn: Sun,
  black: Moon,
  white: Sun,
  neurobrutalismo: Zap
};

const themeColors = {
  shadcn: 'bg-blue-500',
  black: 'bg-black',
  white: 'bg-white border-2 border-gray-300',
  neurobrutalismo: 'bg-gradient-to-r from-pink-500 via-green-500 to-purple-500'
};

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();
  const currentTheme = themes.find(t => t.id === theme);
  const IconComponent = themeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <IconComponent className="h-4 w-4" />
          <span className="hidden md:inline">{currentTheme?.name}</span>
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Seleccionar Tema</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((themeOption) => {
          const ThemeIcon = themeIcons[themeOption.id];
          const isActive = theme === themeOption.id;
          
          return (
            <DropdownMenuItem
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className="flex items-center gap-3 p-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-4 h-4 rounded-full ${themeColors[themeOption.id]}`} />
                <ThemeIcon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium">{themeOption.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {themeOption.description}
                  </div>
                </div>
                {isActive && (
                  <Badge variant="default" className="text-xs">
                    Activo
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Componente de vista previa de temas
export function ThemePreview() {
  const { themes, setTheme, theme: currentTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {themes.map((theme) => {
        const ThemeIcon = themeIcons[theme.id];
        const isActive = currentTheme === theme.id;
        
        return (
          <Card 
            key={theme.id} 
            className={`cursor-pointer transition-all hover:scale-105 ${
              isActive ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setTheme(theme.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-full ${themeColors[theme.id]} flex items-center justify-center`}>
                  <ThemeIcon className="h-4 w-4 text-white" />
                </div>
                {isActive && (
                  <Badge variant="default">Activo</Badge>
                )}
              </div>
              <CardTitle className="text-lg">{theme.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {theme.description}
              </CardDescription>
              
              {/* Vista previa del tema */}
              <div className="mt-4 p-3 border rounded-md bg-muted/50">
                <div className="space-y-2">
                  <div className="h-2 bg-primary rounded w-3/4"></div>
                  <div className="h-2 bg-muted-foreground rounded w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-12 bg-secondary rounded text-xs flex items-center justify-center">
                      Btn
                    </div>
                    <div className="h-6 w-12 bg-accent rounded text-xs flex items-center justify-center">
                      Btn
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}