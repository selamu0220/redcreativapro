'use client';

import React, { useState } from 'react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { ScrollArea } from '../scroll-area';
import { Badge } from '../badge';
import { Input } from '../input';
import { Slider } from '../slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { 
  Zap, 
  Palette, 
  Sparkles, 
  Circle, 
  Sun, 
  Moon, 
  Contrast, 
  Droplets, 
  Wind, 
  Flame, 
  Snowflake, 
  Eye, 
  Volume2, 
  Music, 
  Mic,
  Search,
  Star,
  Heart,
  Smile,
  Camera,
  Film,
  Scissors,
  RotateCcw,
  Move,
  ZoomIn,
  Crop
} from 'lucide-react';
import { VideoEffect, COMMON_EFFECTS, COMMON_TRANSITIONS } from '../../types/video';

interface EffectsPanelProps {
  selectedClips: string[];
  onApplyEffect: (effect: VideoEffect) => void;
}

export function EffectsPanel({ selectedClips, onApplyEffect }: EffectsPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'color' | 'blur' | 'distortion' | 'artistic'>('all');
  const [activeTab, setActiveTab] = useState('effects');

  // Efectos predefinidos con categorías
  const effectCategories = {
    color: {
      name: 'Color',
      icon: Palette,
      effects: [
        { id: 'brightness', name: 'Brillo', icon: Sun, description: 'Ajusta el brillo del video' },
        { id: 'contrast', name: 'Contraste', icon: Contrast, description: 'Modifica el contraste' },
        { id: 'saturation', name: 'Saturación', icon: Droplets, description: 'Intensidad de colores' },
        { id: 'hue', name: 'Matiz', icon: Palette, description: 'Cambia el tono de color' },
        { id: 'sepia', name: 'Sepia', icon: Camera, description: 'Efecto vintage sepia' },
        { id: 'grayscale', name: 'Escala de Grises', icon: Moon, description: 'Convierte a blanco y negro' }
      ]
    },
    blur: {
      name: 'Desenfoque',
      icon: Circle,
      effects: [
        { id: 'gaussian_blur', name: 'Desenfoque Gaussiano', icon: Circle, description: 'Desenfoque suave' },
        { id: 'motion_blur', name: 'Desenfoque de Movimiento', icon: Wind, description: 'Simula movimiento rápido' },
        { id: 'radial_blur', name: 'Desenfoque Radial', icon: Eye, description: 'Desenfoque desde el centro' },
        { id: 'zoom_blur', name: 'Desenfoque de Zoom', icon: ZoomIn, description: 'Efecto de zoom dinámico' }
      ]
    },
    distortion: {
      name: 'Distorsión',
      icon: Move,
      effects: [
        { id: 'fisheye', name: 'Ojo de Pez', icon: Eye, description: 'Distorsión esférica' },
        { id: 'wave', name: 'Ondas', icon: Droplets, description: 'Distorsión ondulada' },
        { id: 'twist', name: 'Torsión', icon: RotateCcw, description: 'Efecto de torsión' },
        { id: 'pinch', name: 'Pellizco', icon: Move, description: 'Compresión central' }
      ]
    },
    artistic: {
      name: 'Artístico',
      icon: Sparkles,
      effects: [
        { id: 'oil_painting', name: 'Pintura al Óleo', icon: Palette, description: 'Efecto de pintura' },
        { id: 'cartoon', name: 'Caricatura', icon: Smile, description: 'Estilo de dibujo animado' },
        { id: 'sketch', name: 'Boceto', icon: Scissors, description: 'Efecto de dibujo a lápiz' },
        { id: 'vintage', name: 'Vintage', icon: Film, description: 'Efecto retro' },
        { id: 'neon', name: 'Neón', icon: Zap, description: 'Bordes brillantes' },
        { id: 'glitch', name: 'Glitch', icon: Zap, description: 'Efecto de error digital' }
      ]
    }
  };

  // Transiciones predefinidas
  const transitionCategories = {
    basic: {
      name: 'Básicas',
      transitions: [
        { id: 'fade', name: 'Fundido', description: 'Transición suave' },
        { id: 'cut', name: 'Corte', description: 'Cambio instantáneo' },
        { id: 'dissolve', name: 'Disolución', description: 'Mezcla gradual' }
      ]
    },
    slide: {
      name: 'Deslizamiento',
      transitions: [
        { id: 'slide_left', name: 'Deslizar Izquierda', description: 'Desliza hacia la izquierda' },
        { id: 'slide_right', name: 'Deslizar Derecha', description: 'Desliza hacia la derecha' },
        { id: 'slide_up', name: 'Deslizar Arriba', description: 'Desliza hacia arriba' },
        { id: 'slide_down', name: 'Deslizar Abajo', description: 'Desliza hacia abajo' }
      ]
    },
    creative: {
      name: 'Creativas',
      transitions: [
        { id: 'zoom_in', name: 'Zoom In', description: 'Acercamiento' },
        { id: 'zoom_out', name: 'Zoom Out', description: 'Alejamiento' },
        { id: 'rotate', name: 'Rotación', description: 'Giro de transición' },
        { id: 'flip', name: 'Volteo', description: 'Efecto de volteo' }
      ]
    }
  };

  // Filtrar efectos
  const getFilteredEffects = () => {
    let allEffects: any[] = [];
    
    Object.entries(effectCategories).forEach(([categoryKey, category]) => {
      if (selectedCategory === 'all' || selectedCategory === categoryKey) {
        allEffects = [...allEffects, ...category.effects.map(effect => ({ ...effect, category: categoryKey }))];
      }
    });
    
    if (searchTerm) {
      allEffects = allEffects.filter(effect => 
        effect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        effect.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return allEffects;
  };

  // Aplicar efecto
  const handleApplyEffect = (effectId: string, effectName: string) => {
    if (selectedClips.length === 0) {
      alert('Selecciona al menos un clip para aplicar el efecto');
      return;
    }
    
    const effect: VideoEffect = {
      id: `effect_${Date.now()}`,
      type: effectId as any,
      name: effectName,
      parameters: {},
      enabled: true
    };
    
    onApplyEffect(effect);
  };

  // Efectos de audio
  const audioEffects = [
    { id: 'reverb', name: 'Reverb', icon: Music, description: 'Añade eco y ambiente' },
    { id: 'echo', name: 'Eco', icon: Volume2, description: 'Repetición del sonido' },
    { id: 'distortion', name: 'Distorsión', icon: Zap, description: 'Distorsiona el audio' },
    { id: 'pitch_shift', name: 'Cambio de Tono', icon: Mic, description: 'Modifica la altura del sonido' },
    { id: 'noise_reduction', name: 'Reducción de Ruido', icon: Volume2, description: 'Elimina ruido de fondo' },
    { id: 'normalize', name: 'Normalizar', icon: Volume2, description: 'Ajusta el volumen' }
  ];

  const filteredEffects = getFilteredEffects();

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted mx-4 mt-4">
          <TabsTrigger value="effects">Efectos</TabsTrigger>
          <TabsTrigger value="transitions">Transiciones</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        
        {/* Video Effects */}
        <TabsContent value="effects" className="flex-1 mt-0">
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar efectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                size="sm"
                variant={selectedCategory === 'all' ? "default" : "ghost"}
                onClick={() => setSelectedCategory('all')}
              >
                Todos
              </Button>
              {Object.entries(effectCategories).map(([key, category]) => (
                <Button
                  key={key}
                  size="sm"
                  variant={selectedCategory === key ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(key as any)}
                >
                  <category.icon className="w-4 h-4 mr-1" />
                  {category.name}
                </Button>
              ))}
            </div>
            
            {/* Selected Clips Info */}
            {selectedClips.length > 0 && (
              <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                <p className="text-sm text-blue-300">
                  {selectedClips.length} clip{selectedClips.length !== 1 ? 's' : ''} seleccionado{selectedClips.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
            
            {/* Effects Grid */}
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-3">
                {filteredEffects.map(effect => {
                  const IconComponent = effect.icon;
                  return (
                    <Card key={effect.id} className="bg-card hover:bg-muted transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{effect.name}</h4>
                              <p className="text-xs text-muted-foreground">{effect.description}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {effectCategories[effect.category as keyof typeof effectCategories].name}
                              </Badge>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleApplyEffect(effect.id, effect.name)}
                            disabled={selectedClips.length === 0}
                          >
                            Aplicar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
        
        {/* Transitions */}
        <TabsContent value="transitions" className="flex-1 mt-0">
          <div className="p-4">
            <h3 className="font-medium mb-4">Transiciones</h3>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {Object.entries(transitionCategories).map(([categoryKey, category]) => (
                  <div key={categoryKey}>
                    <h4 className="font-medium text-sm mb-2 text-muted-foreground">{category.name}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {category.transitions.map(transition => (
                        <Card key={transition.id} className="bg-slate-800 hover:bg-slate-700 transition-colors">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-sm">{transition.name}</h5>
                                <p className="text-xs text-muted-foreground">{transition.description}</p>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => handleApplyEffect(transition.id, transition.name)}
                                disabled={selectedClips.length === 0}
                              >
                                Aplicar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
        
        {/* Audio Effects */}
        <TabsContent value="audio" className="flex-1 mt-0">
          <div className="p-4">
            <h3 className="font-medium mb-4">Efectos de Audio</h3>
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 gap-3">
                {audioEffects.map(effect => {
                  const IconComponent = effect.icon;
                  return (
                    <Card key={effect.id} className="bg-card hover:bg-muted transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{effect.name}</h4>
                              <p className="text-xs text-muted-foreground">{effect.description}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleApplyEffect(effect.id, effect.name)}
                            disabled={selectedClips.length === 0}
                          >
                            Aplicar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Effect Parameters Panel */}
      {selectedClips.length > 0 && (
        <div className="border-t border-slate-700 p-4">
          <h4 className="font-medium mb-3">Parámetros del Efecto</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Intensidad</label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Opacidad</label>
              <Slider defaultValue={[100]} max={100} step={1} />
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">Restablecer</Button>
              <Button size="sm">Aplicar Cambios</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}