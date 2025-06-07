'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Label } from '../label';
import { Input } from '../input';
import { Slider } from '../slider';
import { Badge } from '../badge';

import { 
  Play, 
  Pause, 
  SkipBack, 
  Plus, 
  Move, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Eye,
  Trash2,
  Copy,
  Settings,
  Layers
} from 'lucide-react';
import { VideoClip } from '../../types/video';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

interface Keyframe {
  id: string;
  time: number;
  property: string;
  value: any;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce';
}

interface KeyframeEditorProps {
  clip: VideoClip | null;
  currentTime: number;
  onUpdateClip: (clip: VideoClip) => void;
  onTimeChange: (time: number) => void;
}

export function KeyframeEditor({ clip, currentTime, onUpdateClip, onTimeChange }: KeyframeEditorProps) {
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  const [selectedKeyframe, setSelectedKeyframe] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>('position');
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);

  // Propiedades animables
  const animatableProperties = [
    { value: 'position', label: 'Posición', icon: Move },
    { value: 'scale', label: 'Escala', icon: ZoomIn },
    { value: 'rotation', label: 'Rotación', icon: RotateCw },
    { value: 'opacity', label: 'Opacidad', icon: Eye },
    { value: 'volume', label: 'Volumen', icon: Settings }
  ];

  // Tipos de easing
  const easingTypes = [
    { value: 'linear', label: 'Lineal' },
    { value: 'ease-in', label: 'Ease In' },
    { value: 'ease-out', label: 'Ease Out' },
    { value: 'ease-in-out', label: 'Ease In-Out' },
    { value: 'bounce', label: 'Rebote' }
  ];

  // Cargar keyframes del clip
  useEffect(() => {
    if (clip && clip.keyframes) {
      setKeyframes(clip.keyframes);
    } else {
      setKeyframes([]);
    }
  }, [clip]);

  // Control de reproducción
  useEffect(() => {
    if (isPlaying && clip) {
      playbackRef.current = setInterval(() => {
        onTimeChange(prev => {
          const newTime = prev + 0.1;
          return newTime >= clip.duration ? 0 : newTime;
        });
      }, 100);
    } else {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
        playbackRef.current = null;
      }
    }

    return () => {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    };
  }, [isPlaying, clip, onTimeChange]);

  // Agregar keyframe
  const addKeyframe = () => {
    if (!clip) return;

    const newKeyframe: Keyframe = {
      id: `keyframe-${Date.now()}`,
      time: currentTime,
      property: selectedProperty,
      value: getDefaultValue(selectedProperty),
      easing: 'ease-in-out'
    };

    const updatedKeyframes = [...keyframes, newKeyframe].sort((a, b) => a.time - b.time);
    setKeyframes(updatedKeyframes);
    
    const updatedClip = {
      ...clip,
      keyframes: updatedKeyframes
    };
    onUpdateClip(updatedClip);
    setSelectedKeyframe(newKeyframe.id);
  };

  // Eliminar keyframe
  const deleteKeyframe = (keyframeId: string) => {
    const updatedKeyframes = keyframes.filter(k => k.id !== keyframeId);
    setKeyframes(updatedKeyframes);
    
    if (clip) {
      const updatedClip = {
        ...clip,
        keyframes: updatedKeyframes
      };
      onUpdateClip(updatedClip);
    }
    
    if (selectedKeyframe === keyframeId) {
      setSelectedKeyframe(null);
    }
  };

  // Duplicar keyframe
  const duplicateKeyframe = (keyframe: Keyframe) => {
    const newKeyframe: Keyframe = {
      ...keyframe,
      id: `keyframe-${Date.now()}`,
      time: currentTime
    };

    const updatedKeyframes = [...keyframes, newKeyframe].sort((a, b) => a.time - b.time);
    setKeyframes(updatedKeyframes);
    
    if (clip) {
      const updatedClip = {
        ...clip,
        keyframes: updatedKeyframes
      };
      onUpdateClip(updatedClip);
    }
    setSelectedKeyframe(newKeyframe.id);
  };

  // Actualizar keyframe
  const updateKeyframe = (keyframeId: string, updates: Partial<Keyframe>) => {
    const updatedKeyframes = keyframes.map(k => 
      k.id === keyframeId ? { ...k, ...updates } : k
    ).sort((a, b) => a.time - b.time);
    
    setKeyframes(updatedKeyframes);
    
    if (clip) {
      const updatedClip = {
        ...clip,
        keyframes: updatedKeyframes
      };
      onUpdateClip(updatedClip);
    }
  };

  // Obtener valor por defecto para una propiedad
  const getDefaultValue = (property: string) => {
    switch (property) {
      case 'position':
        return { x: 0, y: 0 };
      case 'scale':
        return { x: 1, y: 1 };
      case 'rotation':
        return 0;
      case 'opacity':
        return 1;
      case 'volume':
        return 1;
      default:
        return 0;
    }
  };

  // Obtener keyframes de la propiedad seleccionada
  const getPropertyKeyframes = () => {
    return keyframes.filter(k => k.property === selectedProperty);
  };

  // Obtener keyframe seleccionado
  const getSelectedKeyframe = () => {
    return keyframes.find(k => k.id === selectedKeyframe);
  };

  // Formatear tiempo
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(1);
    return `${minutes}:${seconds.padStart(4, '0')}`;
  };

  // Calcular posición en timeline
  const getTimelinePosition = (time: number) => {
    if (!clip) return 0;
    return (time / clip.duration) * 100;
  };

  if (!clip) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Selecciona un clip para editar keyframes</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5" />
              <span>Editor de Keyframes</span>
              <Badge variant="outline">{clip.name}</Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTimeChange(0)}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <span className="text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(clip.duration)}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Controles */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <Label className="text-sm">Propiedad</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {animatableProperties.map(prop => {
                      const Icon = prop.icon;
                      return (
                        <SelectItem key={prop.value} value={prop.value}>
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <span>{prop.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={addKeyframe} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Keyframe
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label className="text-sm">Zoom:</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.5))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono w-12 text-center">{zoom}x</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(5, zoom + 0.5))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>Timeline - {animatableProperties.find(p => p.value === selectedProperty)?.label}</span>
            <Badge variant="secondary">
              {getPropertyKeyframes().length} keyframes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Timeline visual */}
            <div 
              ref={timelineRef}
              className="relative h-20 bg-muted rounded border overflow-hidden"
              style={{ transform: `scaleX(${zoom})`, transformOrigin: 'left' }}
            >
              {/* Marcadores de tiempo */}
              <div className="absolute inset-0">
                {Array.from({ length: Math.ceil(clip.duration) + 1 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-border"
                    style={{ left: `${getTimelinePosition(i)}%` }}
                  >
                    <span className="absolute top-1 left-1 text-xs text-muted-foreground">
                      {i}s
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Keyframes */}
              {getPropertyKeyframes().map(keyframe => (
                <div
                  key={keyframe.id}
                  className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full cursor-pointer ${
                    selectedKeyframe === keyframe.id 
                      ? 'bg-blue-500 ring-2 ring-blue-300' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                  style={{ left: `${getTimelinePosition(keyframe.time)}%` }}
                  onClick={() => {
                    setSelectedKeyframe(keyframe.id);
                    onTimeChange(keyframe.time);
                  }}
                  title={`${keyframe.property} - ${formatTime(keyframe.time)}`}
                />
              ))}
              
              {/* Indicador de tiempo actual */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                style={{ left: `${getTimelinePosition(currentTime)}%` }}
              >
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </div>
            
            {/* Lista de keyframes */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {getPropertyKeyframes().length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <p>No hay keyframes para esta propiedad</p>
                  <p className="text-sm">Haz clic en "Agregar Keyframe" para comenzar</p>
                </div>
              ) : (
                getPropertyKeyframes().map(keyframe => (
                  <div
                    key={keyframe.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedKeyframe === keyframe.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-border/80'
                    }`}
                    onClick={() => {
                      setSelectedKeyframe(keyframe.id);
                      onTimeChange(keyframe.time);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                        <div>
                          <p className="font-medium text-sm">{formatTime(keyframe.time)}</p>
                          <p className="text-xs text-muted-foreground">
                            {keyframe.easing}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateKeyframe(keyframe);
                          }}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteKeyframe(keyframe.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor de propiedades del keyframe seleccionado */}
      {selectedKeyframe && getSelectedKeyframe() && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Editar Keyframe</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="properties" className="w-full">
              <TabsList>
                <TabsTrigger value="properties">Propiedades</TabsTrigger>
                <TabsTrigger value="timing">Tiempo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="properties" className="space-y-4">
                {(() => {
                  const keyframe = getSelectedKeyframe()!;
                  
                  switch (keyframe.property) {
                    case 'position':
                      return (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>X</Label>
                            <Input
                              type="number"
                              value={keyframe.value.x || 0}
                              onChange={(e) => updateKeyframe(keyframe.id, {
                                value: { ...keyframe.value, x: parseFloat(e.target.value) }
                              })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Y</Label>
                            <Input
                              type="number"
                              value={keyframe.value.y || 0}
                              onChange={(e) => updateKeyframe(keyframe.id, {
                                value: { ...keyframe.value, y: parseFloat(e.target.value) }
                              })}
                            />
                          </div>
                        </div>
                      );
                    
                    case 'scale':
                      return (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Escala X</Label>
                            <Slider
                              value={[keyframe.value.x || 1]}
                              onValueChange={([value]) => updateKeyframe(keyframe.id, {
                                value: { ...keyframe.value, x: value }
                              })}
                              min={0.1}
                              max={5}
                              step={0.1}
                            />
                            <span className="text-sm text-muted-foreground">{keyframe.value.x || 1}</span>
                          </div>
                          <div className="space-y-2">
                            <Label>Escala Y</Label>
                            <Slider
                              value={[keyframe.value.y || 1]}
                              onValueChange={([value]) => updateKeyframe(keyframe.id, {
                                value: { ...keyframe.value, y: value }
                              })}
                              min={0.1}
                              max={5}
                              step={0.1}
                            />
                            <span className="text-sm text-muted-foreground">{keyframe.value.y || 1}</span>
                          </div>
                        </div>
                      );
                    
                    case 'rotation':
                      return (
                        <div className="space-y-2">
                          <Label>Rotación (grados)</Label>
                          <Slider
                            value={[keyframe.value || 0]}
                            onValueChange={([value]) => updateKeyframe(keyframe.id, { value })}
                            min={-360}
                            max={360}
                            step={1}
                          />
                          <span className="text-sm text-muted-foreground">{keyframe.value || 0}°</span>
                        </div>
                      );
                    
                    case 'opacity':
                      return (
                        <div className="space-y-2">
                          <Label>Opacidad</Label>
                          <Slider
                            value={[keyframe.value || 1]}
                            onValueChange={([value]) => updateKeyframe(keyframe.id, { value })}
                            min={0}
                            max={1}
                            step={0.01}
                          />
                          <span className="text-sm text-muted-foreground">{Math.round((keyframe.value || 1) * 100)}%</span>
                        </div>
                      );
                    
                    case 'volume':
                      return (
                        <div className="space-y-2">
                          <Label>Volumen</Label>
                          <Slider
                            value={[keyframe.value || 1]}
                            onValueChange={([value]) => updateKeyframe(keyframe.id, { value })}
                            min={0}
                            max={2}
                            step={0.01}
                          />
                          <span className="text-sm text-muted-foreground">{Math.round((keyframe.value || 1) * 100)}%</span>
                        </div>
                      );
                    
                    default:
                      return (
                        <div className="space-y-2">
                          <Label>Valor</Label>
                          <Input
                            type="number"
                            value={keyframe.value || 0}
                            onChange={(e) => updateKeyframe(keyframe.id, { value: parseFloat(e.target.value) })}
                          />
                        </div>
                      );
                  }
                })()}
              </TabsContent>
              
              <TabsContent value="timing" className="space-y-4">
                {(() => {
                  const keyframe = getSelectedKeyframe()!;
                  
                  return (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Tiempo (segundos)</Label>
                        <Input
                          type="number"
                          value={keyframe.time}
                          onChange={(e) => {
                            const newTime = Math.max(0, Math.min(clip.duration, parseFloat(e.target.value)));
                            updateKeyframe(keyframe.id, { time: newTime });
                            onTimeChange(newTime);
                          }}
                          min={0}
                          max={clip.duration}
                          step={0.1}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Tipo de Easing</Label>
                        <Select 
                          value={keyframe.easing}
                          onValueChange={(value) => updateKeyframe(keyframe.id, { easing: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {easingTypes.map(easing => (
                              <SelectItem key={easing.value} value={easing.value}>
                                {easing.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}