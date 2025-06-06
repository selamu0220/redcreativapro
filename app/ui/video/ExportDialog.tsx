'use client';

import React, { useState } from 'react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Label } from '../label';
import { Input } from '../input';
import { Slider } from '../slider';
import { Badge } from '../badge';
import { Progress } from '../progress';
import { Separator } from '../separator';
import { 
  Download, 
  X, 
  Settings, 
  Video, 
  HardDrive, 
  Clock, 
  FileVideo, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Play
} from 'lucide-react';
import { VideoProject, ExportSettings, VIDEO_RESOLUTIONS, FRAME_RATES } from '../../types/video';
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

interface ExportDialogProps {
  project: VideoProject;
  onClose: () => void;
  onExport: (settings: ExportSettings) => void;
}

export function ExportDialog({ project, onClose, onExport }: ExportDialogProps) {
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'mp4',
    resolution: project.resolution,
    frameRate: project.frameRate,
    quality: 'high',
    bitrate: 8000,
    audioQuality: 'high',
    audioBitrate: 320,
    filename: project.name || 'video_export'
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'completed' | 'error'>('idle');
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  // Formatos de exportación disponibles
  const exportFormats = [
    { value: 'mp4', label: 'MP4 (H.264)', description: 'Mejor compatibilidad' },
    { value: 'webm', label: 'WebM (VP9)', description: 'Optimizado para web' },
    { value: 'mov', label: 'MOV (QuickTime)', description: 'Para edición profesional' },
    { value: 'avi', label: 'AVI', description: 'Formato clásico' },
    { value: 'mkv', label: 'MKV (Matroska)', description: 'Contenedor flexible' }
  ];

  // Presets de calidad
  const qualityPresets = {
    low: { bitrate: 2000, audioBitrate: 128, label: 'Baja (2 Mbps)', description: 'Archivos pequeños' },
    medium: { bitrate: 5000, audioBitrate: 192, label: 'Media (5 Mbps)', description: 'Equilibrio calidad/tamaño' },
    high: { bitrate: 8000, audioBitrate: 320, label: 'Alta (8 Mbps)', description: 'Buena calidad' },
    ultra: { bitrate: 15000, audioBitrate: 320, label: 'Ultra (15 Mbps)', description: 'Máxima calidad' }
  };

  // Calcular tamaño estimado del archivo
  const calculateEstimatedSize = () => {
    const durationInSeconds = project.duration;
    const videoBitrate = exportSettings.bitrate * 1000; // Convert to bps
    const audioBitrate = exportSettings.audioBitrate * 1000;
    const totalBitrate = videoBitrate + audioBitrate;
    const sizeInBytes = (totalBitrate * durationInSeconds) / 8;
    return sizeInBytes;
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Actualizar configuración
  const updateSettings = (key: keyof ExportSettings, value: any) => {
    setExportSettings(prev => ({ ...prev, [key]: value }));
  };

  // Aplicar preset de calidad
  const applyQualityPreset = (quality: keyof typeof qualityPresets) => {
    const preset = qualityPresets[quality];
    setExportSettings(prev => ({
      ...prev,
      quality,
      bitrate: preset.bitrate,
      audioBitrate: preset.audioBitrate
    }));
  };

  // Iniciar exportación
  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('exporting');
    setExportProgress(0);
    
    // Simular proceso de exportación
    const totalSteps = 100;
    const stepDuration = 50; // ms por paso
    
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setExportProgress((i / totalSteps) * 100);
      
      // Simular diferentes etapas
      if (i < 20) {
        // Preparación
      } else if (i < 80) {
        // Renderizado
      } else {
        // Finalización
      }
    }
    
    setExportStatus('completed');
    setIsExporting(false);
    
    // Llamar callback de exportación
    onExport(exportSettings);
  };

  // Calcular tiempo estimado
  React.useEffect(() => {
    const renderingSpeed = 2; // segundos de video por segundo de renderizado
    const estimated = project.duration / renderingSpeed;
    setEstimatedTime(estimated);
    setFileSize(calculateEstimatedSize());
  }, [project.duration, exportSettings]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Exportar Video</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {exportStatus === 'idle' && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              </TabsList>
              
              {/* Configuración Básica */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Nombre del archivo */}
                  <div className="space-y-2">
                    <Label htmlFor="filename">Nombre del archivo</Label>
                    <Input
                      id="filename"
                      value={exportSettings.filename}
                      onChange={(e) => updateSettings('filename', e.target.value)}
                      placeholder="nombre_del_video"
                    />
                  </div>
                  
                  {/* Formato */}
                  <div className="space-y-2">
                    <Label>Formato</Label>
                    <Select 
                      value={exportSettings.format} 
                      onValueChange={(value) => updateSettings('format', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {exportFormats.map(format => (
                          <SelectItem key={format.value} value={format.value}>
                            <div>
                              <div className="font-medium">{format.label}</div>
                              <div className="text-xs text-muted-foreground">{format.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Presets de Calidad */}
                <div className="space-y-2">
                  <Label>Calidad</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(qualityPresets).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant={exportSettings.quality === key ? "default" : "outline"}
                        onClick={() => applyQualityPreset(key as keyof typeof qualityPresets)}
                        className="h-auto p-3 text-left"
                      >
                        <div>
                          <div className="font-medium">{preset.label}</div>
                          <div className="text-xs text-muted-foreground">{preset.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Resolución */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Resolución</Label>
                    <Select 
                      value={`${exportSettings.resolution.width}x${exportSettings.resolution.height}`}
                      onValueChange={(value) => {
                        const resolution = VIDEO_RESOLUTIONS.find(r => `${r.width}x${r.height}` === value);
                        if (resolution) updateSettings('resolution', resolution);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VIDEO_RESOLUTIONS.map((res, index) => (
                          <SelectItem key={`export-resolution-${index}`} value={`${res.width}x${res.height}`}>
                            {res.label} ({res.width}×{res.height})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>FPS</Label>
                    <Select 
                      value={exportSettings.frameRate.toString()}
                      onValueChange={(value) => updateSettings('frameRate', parseInt(value))}
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
              </TabsContent>
              
              {/* Configuración Avanzada */}
              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Bitrate de Video */}
                  <div className="space-y-2">
                    <Label>Bitrate de Video (kbps)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[exportSettings.bitrate]}
                        onValueChange={([value]) => updateSettings('bitrate', value)}
                        min={1000}
                        max={50000}
                        step={500}
                      />
                      <div className="text-sm text-muted-foreground">
                        {exportSettings.bitrate} kbps
                      </div>
                    </div>
                  </div>
                  
                  {/* Bitrate de Audio */}
                  <div className="space-y-2">
                    <Label>Bitrate de Audio (kbps)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[exportSettings.audioBitrate]}
                        onValueChange={([value]) => updateSettings('audioBitrate', value)}
                        min={64}
                        max={320}
                        step={32}
                      />
                      <div className="text-sm text-muted-foreground">
                        {exportSettings.audioBitrate} kbps
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Calidad de Audio */}
                <div className="space-y-2">
                  <Label>Calidad de Audio</Label>
                  <Select 
                    value={exportSettings.audioQuality}
                    onValueChange={(value) => updateSettings('audioQuality', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja (64-128 kbps)</SelectItem>
                      <SelectItem value="medium">Media (128-192 kbps)</SelectItem>
                      <SelectItem value="high">Alta (192-320 kbps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              {/* Vista Previa */}
              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumen de Exportación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <FileVideo className="w-4 h-4" />
                          <span className="font-medium">Archivo</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exportSettings.filename}.{exportSettings.format}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Video className="w-4 h-4" />
                          <span className="font-medium">Resolución</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {exportSettings.resolution.width}×{exportSettings.resolution.height} @ {exportSettings.frameRate}fps
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span className="font-medium">Bitrate</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Video: {exportSettings.bitrate} kbps<br />
                          Audio: {exportSettings.audioBitrate} kbps
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Duración</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(project.duration / 60)}:{(project.duration % 60).toFixed(0).padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <HardDrive className="w-4 h-4" />
                          <span className="font-medium">Tamaño Estimado</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {fileSize ? formatFileSize(fileSize) : 'Calculando...'}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Tiempo Estimado</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {estimatedTime ? `${Math.ceil(estimatedTime)} segundos` : 'Calculando...'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
          
          {/* Estado de Exportación */}
          {exportStatus === 'exporting' && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-medium">Exportando Video...</h3>
                    <p className="text-sm text-muted-foreground">
                      Procesando {exportSettings.filename}.{exportSettings.format}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Progress value={exportProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      {Math.round(exportProgress)}% completado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Exportación Completada */}
          {exportStatus === 'completed' && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">¡Exportación Completada!</h3>
                    <p className="text-sm text-muted-foreground">
                      Tu video ha sido exportado exitosamente
                    </p>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Reproducir
                    </Button>
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Botones de Acción */}
        {exportStatus === 'idle' && (
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleExport} disabled={!exportSettings.filename}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Video
            </Button>
          </div>
        )}
        
        {exportStatus === 'completed' && (
          <div className="flex justify-end">
            <Button onClick={onClose}>
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}