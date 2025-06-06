'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '../card';
import { Button } from '../button';
import { Slider } from '../slider';
import { Badge } from '../badge';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Waveform,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { VideoClip } from '../../types/video';

interface AudioWaveformProps {
  clip: VideoClip;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  onTimeChange: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onPlayToggle: () => void;
  className?: string;
}

interface WaveformData {
  peaks: number[];
  duration: number;
  sampleRate: number;
}

export function AudioWaveform({
  clip,
  currentTime,
  isPlaying,
  volume,
  isMuted,
  onTimeChange,
  onVolumeChange,
  onMuteToggle,
  onPlayToggle,
  className = ''
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [waveformData, setWaveformData] = useState<WaveformData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showSpectrum, setShowSpectrum] = useState(false);
  const [waveformHeight, setWaveformHeight] = useState(120);

  // Generar datos de waveform simulados
  useEffect(() => {
    const generateWaveformData = () => {
      setIsLoading(true);
      
      // Simular carga de datos de audio
      setTimeout(() => {
        const duration = clip.duration;
        const sampleRate = 44100;
        const samplesPerPixel = Math.floor(sampleRate * duration / 1000); // 1000 píxeles por defecto
        const peaks: number[] = [];
        
        // Generar picos simulados basados en el tipo de clip
        for (let i = 0; i < 1000; i++) {
          const progress = i / 1000;
          let amplitude = 0;
          
          if (clip.type === 'audio') {
            // Simular diferentes patrones de audio
            if (clip.name.toLowerCase().includes('music')) {
              // Música: variaciones más complejas
              amplitude = Math.sin(progress * Math.PI * 8) * 0.8 + 
                         Math.sin(progress * Math.PI * 32) * 0.3 +
                         Math.random() * 0.2;
            } else if (clip.name.toLowerCase().includes('voice')) {
              // Voz: patrones más irregulares
              amplitude = Math.sin(progress * Math.PI * 12) * 0.6 + 
                         Math.random() * 0.4;
            } else {
              // Audio genérico
              amplitude = Math.sin(progress * Math.PI * 6) * 0.7 + 
                         Math.random() * 0.3;
            }
          } else {
            // Video con audio
            amplitude = Math.sin(progress * Math.PI * 4) * 0.5 + 
                       Math.random() * 0.2;
          }
          
          // Aplicar envolvente (fade in/out)
          const fadeIn = Math.min(1, progress * 10);
          const fadeOut = Math.min(1, (1 - progress) * 10);
          amplitude *= fadeIn * fadeOut;
          
          peaks.push(Math.max(-1, Math.min(1, amplitude)));
        }
        
        setWaveformData({
          peaks,
          duration,
          sampleRate
        });
        setIsLoading(false);
      }, 500);
    };
    
    generateWaveformData();
  }, [clip]);

  // Dibujar waveform
  useEffect(() => {
    if (!waveformData || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Configurar canvas
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr * zoom;
    canvas.height = waveformHeight * dpr;
    canvas.style.width = `${rect.width * zoom}px`;
    canvas.style.height = `${waveformHeight}px`;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = rect.width * zoom;
    const height = waveformHeight;
    const centerY = height / 2;
    
    // Dibujar fondo
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar línea central
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Dibujar waveform
    const peaks = waveformData.peaks;
    const samplesPerPixel = peaks.length / width;
    
    ctx.lineWidth = 1;
    
    for (let x = 0; x < width; x++) {
      const sampleIndex = Math.floor(x * samplesPerPixel);
      if (sampleIndex >= peaks.length) break;
      
      const peak = peaks[sampleIndex];
      const amplitude = Math.abs(peak);
      const barHeight = amplitude * (height / 2 - 10);
      
      // Color basado en la posición temporal
      const progress = x / width;
      const currentProgress = currentTime / clip.duration;
      
      if (progress <= currentProgress) {
        // Parte reproducida
        ctx.fillStyle = showSpectrum 
          ? `hsl(${240 + amplitude * 60}, 70%, 60%)` 
          : '#3b82f6';
      } else {
        // Parte no reproducida
        ctx.fillStyle = showSpectrum 
          ? `hsl(${200 + amplitude * 40}, 50%, 80%)` 
          : '#cbd5e1';
      }
      
      // Dibujar barra
      ctx.fillRect(x, centerY - barHeight, 1, barHeight * 2);
    }
    
    // Dibujar indicador de posición actual
    const currentX = (currentTime / clip.duration) * width;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(currentX, 0);
    ctx.lineTo(currentX, height);
    ctx.stroke();
    
    // Dibujar marcadores de tiempo
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    const timeInterval = Math.max(1, Math.floor(clip.duration / 10));
    
    for (let t = 0; t <= clip.duration; t += timeInterval) {
      const x = (t / clip.duration) * width;
      const minutes = Math.floor(t / 60);
      const seconds = Math.floor(t % 60);
      const timeLabel = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      ctx.fillText(timeLabel, x + 2, height - 5);
      
      // Línea de marcador
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, height - 15);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
  }, [waveformData, currentTime, clip.duration, zoom, showSpectrum, waveformHeight]);

  // Manejar clic en waveform
  const handleWaveformClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current || !waveformData) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const progress = x / (rect.width * zoom);
    const newTime = Math.max(0, Math.min(clip.duration, progress * clip.duration));
    
    onTimeChange(newTime);
  };

  // Formatear tiempo
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Obtener información del audio
  const getAudioInfo = () => {
    if (!waveformData) return null;
    
    const peaks = waveformData.peaks;
    const maxAmplitude = Math.max(...peaks.map(Math.abs));
    const avgAmplitude = peaks.reduce((sum, peak) => sum + Math.abs(peak), 0) / peaks.length;
    
    return {
      maxAmplitude: (maxAmplitude * 100).toFixed(1),
      avgAmplitude: (avgAmplitude * 100).toFixed(1),
      duration: formatTime(clip.duration),
      sampleRate: waveformData.sampleRate
    };
  };

  const audioInfo = getAudioInfo();

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Waveform className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-medium">{clip.name}</h3>
              <p className="text-sm text-muted-foreground">
                {clip.type === 'audio' ? 'Audio' : 'Video con Audio'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {audioInfo && (
              <div className="text-xs text-muted-foreground space-x-4">
                <span>Max: {audioInfo.maxAmplitude}%</span>
                <span>Avg: {audioInfo.avgAmplitude}%</span>
                <span>{audioInfo.duration}</span>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSpectrum(!showSpectrum)}
            >
              {showSpectrum ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Controles de reproducción */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onTimeChange(0)}>
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={onPlayToggle}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => onTimeChange(clip.duration)}>
              <SkipForward className="w-4 h-4" />
            </Button>
            
            <div className="text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(clip.duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Control de volumen */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={onMuteToggle}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={([value]) => onVolumeChange(value / 100)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <span className="text-xs text-muted-foreground w-8">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
            
            {/* Control de zoom */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Zoom:</span>
              <div className="w-16">
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={0.5}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>
              <span className="text-xs text-muted-foreground w-8">
                {zoom}x
              </span>
            </div>
          </div>
        </div>
        
        {/* Waveform */}
        <div className="relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-32 bg-muted rounded">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Cargando waveform...</p>
              </div>
            </div>
          ) : (
            <div 
              ref={containerRef}
              className="relative overflow-x-auto border rounded bg-white"
              style={{ height: waveformHeight }}
            >
              <canvas
                ref={canvasRef}
                onClick={handleWaveformClick}
                className="cursor-pointer"
                style={{ display: 'block' }}
              />
            </div>
          )}
        </div>
        
        {/* Información adicional */}
        {audioInfo && (
          <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Duración</p>
              <p className="font-medium">{audioInfo.duration}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Amplitud Máx</p>
              <p className="font-medium">{audioInfo.maxAmplitude}%</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Amplitud Prom</p>
              <p className="font-medium">{audioInfo.avgAmplitude}%</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Sample Rate</p>
              <p className="font-medium">{audioInfo.sampleRate} Hz</p>
            </div>
          </div>
        )}
        
        {/* Controles adicionales */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant={showSpectrum ? 'default' : 'secondary'}>
              {showSpectrum ? 'Vista Espectro' : 'Vista Normal'}
            </Badge>
            
            {clip.type === 'audio' && (
              <Badge variant="outline">
                Solo Audio
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Altura:</span>
            <div className="w-20">
              <Slider
                value={[waveformHeight]}
                onValueChange={([value]) => setWaveformHeight(value)}
                min={80}
                max={200}
                step={20}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}