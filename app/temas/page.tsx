'use client';

import React from 'react';
import { ThemePreview } from '../ui/common/ThemeSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Palette, Sparkles, Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function TemasPage() {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Palette className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Temas y Estilos</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Personaliza la apariencia de tu aplicación eligiendo entre diferentes temas y estilos visuales.
        </p>
        <Badge variant="outline" className="text-sm">
          Tema actual: {theme}
        </Badge>
      </div>

      {/* Información sobre temas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              ShadCN Theme
            </CardTitle>
            <CardDescription>
              Tema moderno y elegante basado en el sistema de diseño shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Colores equilibrados y profesionales</li>
              <li>• Excelente legibilidad</li>
              <li>• Soporte para modo claro y oscuro</li>
              <li>• Ideal para uso profesional</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Black Theme
            </CardTitle>
            <CardDescription>
              Tema minimalista con tonos negros para una experiencia elegante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Diseño minimalista y elegante</li>
              <li>• Reduce la fatiga visual</li>
              <li>• Perfecto para trabajo nocturno</li>
              <li>• Enfoque en el contenido</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              White Theme
            </CardTitle>
            <CardDescription>
              Tema claro y limpio con tonos blancos para máxima claridad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Máxima luminosidad y claridad</li>
              <li>• Ideal para espacios bien iluminados</li>
              <li>• Diseño limpio y espacioso</li>
              <li>• Perfecto para presentaciones</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Neurobrutalismo
            </CardTitle>
            <CardDescription>
              Tema experimental con diseño brutalista y colores vibrantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Colores vibrantes y contrastantes</li>
              <li>• Tipografía bold y llamativa</li>
              <li>• Elementos con bordes gruesos</li>
              <li>• Experiencia visual impactante</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Selector de temas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Selecciona tu tema</h2>
        <ThemePreview />
      </div>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Características de los temas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Persistencia</h3>
              <p className="text-sm text-muted-foreground">
                Tu tema seleccionado se guarda automáticamente y se mantiene entre sesiones.
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Responsive</h3>
              <p className="text-sm text-muted-foreground">
                Todos los temas están optimizados para funcionar en cualquier dispositivo.
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Accesibilidad</h3>
              <p className="text-sm text-muted-foreground">
                Diseñados siguiendo las mejores prácticas de accesibilidad web.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}