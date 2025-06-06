'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'white' | 'black' | 'neurobrutalismo';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: {
    id: ThemeType;
    name: string;
    description: string;
  }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = [
  {
    id: 'white' as ThemeType,
    name: 'Blanco',
    description: 'Tema claro y limpio con tonos blancos puros'
  },
  {
    id: 'black' as ThemeType,
    name: 'Negro',
    description: 'Tema oscuro minimalista con tonos negros profundos'
  },
  {
    id: 'neurobrutalismo' as ThemeType,
    name: 'Neurobrutalismo',
    description: 'Tema experimental con diseño brutalista y colores vibrantes'
  }
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('white');

  useEffect(() => {
    // Cargar tema guardado del localStorage
    const savedTheme = localStorage.getItem('app-theme') as ThemeType;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Guardar tema en localStorage y aplicar clase CSS
    localStorage.setItem('app-theme', theme);
    
    // Remover todas las clases de tema del body y html
    document.body.classList.remove('theme-black', 'theme-white', 'theme-neurobrutalismo');
    document.documentElement.classList.remove('theme-black', 'theme-white', 'theme-neurobrutalismo');
    
    // Agregar la clase del tema actual al body y html
    document.body.classList.add(`theme-${theme}`);
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: handleSetTheme,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}