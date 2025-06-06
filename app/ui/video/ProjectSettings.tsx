'use client';

import React, { useState } from 'react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Label } from '../label';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Badge } from '../badge';
import { Separator } from '../separator';
import { 
  Settings, 
  X, 
  Video, 
  Palette, 
  Clock, 
  HardDrive, 
  Save,
  RotateCcw,
  Info
} from 'lucide-react';
import { VideoProject, VIDEO_RESOLUTIONS, FRAME_RATES } from '../../types/video';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

interface ProjectSettingsProps {
  project: VideoProject;
  onClose: () => void;
  onSave: (project: VideoProject) => void;
}

export function ProjectSettings({ project, onClose, onSave }: ProjectSettingsProps) {
  const [editedProject, setEditedProject] = useState<VideoProject>({ ...project });
  const [hasChanges, setHasChanges] = useState(false);

  // Actualizar configuración del proyecto
  const updateProject = (updates: Partial<VideoProject>) => {
    setEditedProject(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  // Actualizar configuración específica
  const updateSettings = (key: string, value: any) => {
    setEditedProject(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  // Guardar cambios
  const handleSave = () => {
    const updatedProject = {
      ...editedProject,
      updatedAt: new Date()
    };
    onSave(updatedProject);
  };

  // Restablecer cambios
  const handleReset = () => {
    setEditedProject({ ...project });
    setHasChanges(false);
  };

  // Formatos de exportación disponibles
  const exportFormats = [
    { value: 'mp4', label: 'MP4 (H.264)' },
    { value: 'webm', label: 'WebM (VP9)' },
    { value: 'mov', label: 'MOV (QuickTime)' },
    { value: 'avi', label: 'AVI' },
    { value: 'mkv', label: 'MKV (Matroska)' }
  ];

  // Calidades disponibles
  const qualityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'ultra', label: 'Ultra' }
  ];

  // Sample rates de audio
  const audioSampleRates = [22050, 44100, 48000, 96000];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuración del Proyecto</span>
            {hasChanges && (
              <Badge variant="secondary" className="ml-2">
                Cambios sin guardar
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="export">Exportación</TabsTrigger>
          </TabsList>
          
          {/* Configuración General */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Info className="w-5 h-5" />
                  <span>Información del Proyecto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Nombre del Proyecto</Label>
                    <Input
                      id="project-name"
                      value={editedProject.name}
                      onChange={(e) => updateProject({ name: e.target.value })}
                      placeholder="Mi Proyecto de Video"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project-status">Estado</Label>
                    <Select 
                      value={editedProject.status}
                      onValueChange={(value) => updateProject({ status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="in_progress">En Progreso</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                        <SelectItem value="archived">Archivado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-description">Descripción</Label>
                  <Textarea
                    id="project-description"
                    value={editedProject.description || ''}
                    onChange={(e) => updateProject({ description: e.target.value })}
                    placeholder="Descripción del proyecto..."
                    rows={3}
                  />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Creado</Label>
                    <p>{editedProject.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Modificado</Label>
                    <p>{editedProject.updatedAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Pistas</Label>
                    <p>{editedProject.tracks.length} pistas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configuración de Video */}
          <TabsContent value="video" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Configuración de Video</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Resolución</Label>
                    <Select 
                      value={`${editedProject.resolution.width}x${editedProject.resolution.height}`}
                      onValueChange={(value) => {
                        const resolution = VIDEO_RESOLUTIONS.find(r => `${r.width}x${r.height}` === value);
                        if (resolution) {
                          updateProject({ resolution });
                          updateSettings('resolution', resolution);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VIDEO_RESOLUTIONS.map((res, index) => (
                          <SelectItem key={`resolution-${index}`} value={`${res.width}x${res.height}`}>
                            <div>
                              <div className="font-medium">{res.label}</div>
                              <div className="text-xs text-muted-foreground">{res.width}×{res.height}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fotogramas por Segundo</Label>
                    <Select 
                      value={editedProject.frameRate.toString()}
                      onValueChange={(value) => {
                        const frameRate = parseInt(value);
                        updateProject({ frameRate });
                        updateSettings('frameRate', frameRate);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FRAME_RATES.map(fps => (
                          <SelectItem key={fps} value={fps.toString()}>
                            {fps} fps
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Color de Fondo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={editedProject.settings.backgroundColor}
                      onChange={(e) => updateSettings('backgroundColor', e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={editedProject.settings.backgroundColor}
                      onChange={(e) => updateSettings('backgroundColor', e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Aspecto</Label>
                    <p>{(editedProject.resolution.width / editedProject.resolution.height).toFixed(2)}:1</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Píxeles Totales</Label>
                    <p>{(editedProject.resolution.width * editedProject.resolution.height / 1000000).toFixed(1)}MP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configuración de Audio */}
          <TabsContent value="audio" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <HardDrive className="w-5 h-5" />
                  <span>Configuración de Audio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frecuencia de Muestreo</Label>
                  <Select 
                    value={editedProject.settings.audioSampleRate.toString()}
                    onValueChange={(value) => updateSettings('audioSampleRate', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {audioSampleRates.map(rate => (
                        <SelectItem key={rate} value={rate.toString()}>
                          {rate} Hz {rate === 44100 ? '(CD Quality)' : rate === 48000 ? '(DVD Quality)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Pistas de Audio</Label>
                  {editedProject.tracks.filter(track => track.type === 'audio').map(track => (
                    <div key={track.id} className="p-3 bg-muted rounded border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{track.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {track.clips.length} clip{track.clips.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Volumen: {track.volume || 100}%
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {editedProject.tracks.filter(track => track.type === 'audio').length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No hay pistas de audio en el proyecto
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configuración de Exportación */}
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Configuración de Exportación</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Formato por Defecto</Label>
                    <Select 
                      value={editedProject.settings.exportFormat}
                      onValueChange={(value) => updateSettings('exportFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {exportFormats.map(format => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Calidad por Defecto</Label>
                    <Select 
                      value={editedProject.settings.quality}
                      onValueChange={(value) => updateSettings('quality', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {qualityOptions.map(quality => (
                          <SelectItem key={quality.value} value={quality.value}>
                            {quality.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Información del Proyecto</Label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-muted-foreground">Duración Total</Label>
                      <p>{Math.floor(editedProject.duration / 60)}:{(editedProject.duration % 60).toFixed(0).padStart(2, '0')}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Total de Clips</Label>
                      <p>{editedProject.tracks.reduce((total, track) => total + track.clips.length, 0)}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Pistas de Video</Label>
                      <p>{editedProject.tracks.filter(t => t.type === 'video').length}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Pistas de Audio</Label>
                      <p>{editedProject.tracks.filter(t => t.type === 'audio').length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botones de Acción */}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {hasChanges && (
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restablecer
              </Button>
            )}
          </div>
          
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}