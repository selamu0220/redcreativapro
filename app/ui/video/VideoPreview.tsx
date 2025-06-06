'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../button';
import { Badge } from '../badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Grid,
  Crosshair,
  Square
} from 'lucide-react';
import { VideoProject } from '../../types/video';
import { Slider } from '../slider';

interface VideoPreviewProps {
  project: VideoProject;
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
}

export function VideoPreview({ project, currentTime, isPlaying, onTimeUpdate }: VideoPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [loadedMedia, setLoadedMedia] = useState<Map<string, HTMLVideoElement | HTMLImageElement>>(new Map());
  
  // Cache estático para evitar re-renders
  const staticMediaCache = useRef<Map<string, HTMLVideoElement | HTMLImageElement>>(new Map());
  const staticErrorCache = useRef<Set<string>>(new Set());

  // Calcular tamaño del canvas basado en el contenedor
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const aspectRatio = project.resolution.width / project.resolution.height;
    
    // Calcular el tamaño máximo disponible para el preview fijo y grande
    const maxWidth = Math.max(containerRect.width - 100, 400); // menos padding, mínimo 400px
    const maxHeight = Math.max(containerRect.height - 100, 300); // menos padding, mínimo 300px
    
    let width, height;
    
    // Calcular por ancho primero
    width = maxWidth;
    height = width / aspectRatio;
    
    // Si la altura excede el máximo, calcular por altura
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
    
    // Tamaño más grande para el preview fijo
    width = Math.min(width, 800); // máximo 800px de ancho (aumentado)
    height = Math.min(height, 500); // máximo 500px de alto (aumentado)
    
    // Cálculo silencioso del tamaño del canvas
    
    setCanvasSize({ width, height });
  }, [project.resolution]);

  // Refs para evitar re-renders
  const isPlayingRef = useRef(isPlaying);
  const currentTimeRef = useRef(currentTime);
  const projectRef = useRef(project);
  const showGridRef = useRef(showGrid);
  const showSafeZonesRef = useRef(showSafeZones);
  const loadedMediaRef = useRef(loadedMedia);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  
  // Actualizar refs cuando cambien las props
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);
  
  useEffect(() => {
    projectRef.current = project;
  }, [project]);
  
  useEffect(() => {
    showGridRef.current = showGrid;
  }, [showGrid]);
  
  useEffect(() => {
    showSafeZonesRef.current = showSafeZones;
  }, [showSafeZones]);
  
  useEffect(() => {
    loadedMediaRef.current = loadedMedia;
  }, [loadedMedia]);
  
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  // Loop de animación estable sin dependencias
  useEffect(() => {
    let lastUpdateTime = 0;
    let lastRenderTime = 0;
    const targetFPS = 24; // Reducir FPS para menos parpadeo
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number) => {
      // Actualizar tiempo solo si está reproduciendo
      if (isPlayingRef.current && timestamp - lastUpdateTime >= frameInterval) {
        const deltaTime = (timestamp - lastTimeRef.current) / 1000;
        lastTimeRef.current = timestamp;
        
        if (deltaTime > 0 && deltaTime < 0.1) {
          const newTime = currentTimeRef.current + deltaTime;
          if (newTime <= projectRef.current.duration) {
            onTimeUpdateRef.current(newTime);
          } else {
            onTimeUpdateRef.current(0);
          }
        }
        lastUpdateTime = timestamp;
      } else if (!isPlayingRef.current) {
        lastTimeRef.current = timestamp;
      }
      
      // Renderizar con throttling más agresivo
      if (canvasRef.current && timestamp - lastRenderTime >= frameInterval * 2) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Usar willReadFrequently para optimizar
          if (!ctx.getContextAttributes()?.willReadFrequently) {
            const newCtx = canvas.getContext('2d', { willReadFrequently: true });
            if (newCtx) {
              // Limpiar canvas
              newCtx.clearRect(0, 0, canvas.width, canvas.height);
              newCtx.fillStyle = projectRef.current.settings?.backgroundColor || '#000000';
              newCtx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Renderizar clips activos
              projectRef.current.tracks.forEach(track => {
                if (!track.isVisible) return;
                
                track.clips.forEach(clip => {
                  const clipStartTime = clip.startTime || 0;
                  const clipEndTime = clipStartTime + (clip.duration || 0);
                  
                  if (currentTimeRef.current >= clipStartTime && currentTimeRef.current < clipEndTime) {
                    renderClipOptimized(newCtx, clip, currentTimeRef.current - clipStartTime);
                  }
                });
              });
              
              // Renderizar overlays solo si es necesario
              if (showGridRef.current) {
                renderGrid(newCtx, canvas.width, canvas.height);
              }
              
              if (showSafeZonesRef.current) {
                renderSafeZones(newCtx, canvas.width, canvas.height);
              }
            }
          } else {
            // Limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = projectRef.current.settings?.backgroundColor || '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Renderizar clips activos
            projectRef.current.tracks.forEach(track => {
              if (!track.isVisible) return;
              
              track.clips.forEach(clip => {
                const clipStartTime = clip.startTime || 0;
                const clipEndTime = clipStartTime + (clip.duration || 0);
                
                if (currentTimeRef.current >= clipStartTime && currentTimeRef.current < clipEndTime) {
                  renderClipOptimized(ctx, clip, currentTimeRef.current - clipStartTime);
                }
              });
            });
            
            // Renderizar overlays solo si es necesario
            if (showGridRef.current) {
              renderGrid(ctx, canvas.width, canvas.height);
            }
            
            if (showSafeZonesRef.current) {
              renderSafeZones(ctx, canvas.width, canvas.height);
            }
          }
        }
        lastRenderTime = timestamp;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Sin dependencias para evitar re-renders

  // Función ultra-optimizada para renderizar clips sin parpadeo
  const renderClipOptimized = (ctx: CanvasRenderingContext2D, clip: any, relativeTime: number) => {
    if (clip.type === 'video' || clip.type === 'image') {
      const mediaKey = `${clip.source}_${clip.type}`;
      let mediaElement = staticMediaCache.current.get(mediaKey);
      
      if (!mediaElement) {
        // Crear elemento solo si no existe en cache estático
        if (clip.type === 'video') {
          const video = document.createElement('video');
          video.src = clip.source;
          video.muted = true;
          video.crossOrigin = 'anonymous';
          video.preload = 'metadata';
          video.playsInline = true;
          
          // Agregar al cache estático inmediatamente
          staticMediaCache.current.set(mediaKey, video);
          
          video.addEventListener('loadeddata', () => {
            // No actualizar estado, solo marcar como listo internamente
          });
          
          video.addEventListener('error', () => {
            staticErrorCache.current.add(mediaKey);
          });
          
          video.load();
          mediaElement = video;
        } else {
          const img = document.createElement('img');
          img.src = clip.source;
          img.crossOrigin = 'anonymous';
          
          // Agregar al cache estático inmediatamente
          staticMediaCache.current.set(mediaKey, img);
          
          img.addEventListener('load', () => {
            // No actualizar estado
          });
          
          img.addEventListener('error', () => {
            staticErrorCache.current.add(mediaKey);
          });
          
          mediaElement = img;
        }
        
        // Renderizar placeholder mientras carga
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x, y, width, height);
        return;
      }
      
      // Verificar si hay error en cache estático
      if (staticErrorCache.current.has(mediaKey)) {
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x, y, width, height);
        return;
      }
      
      // Verificar si está listo
      const isReady = mediaElement instanceof HTMLImageElement ? 
        mediaElement.complete && mediaElement.naturalWidth > 0 : 
        (mediaElement as HTMLVideoElement).readyState >= 2;
      
      if (isReady) {
        // Actualizar tiempo del video de forma más eficiente
        if (mediaElement instanceof HTMLVideoElement) {
          const targetTime = Math.max(0, Math.min(relativeTime + (clip.trimStart || 0), mediaElement.duration || 0));
          if (Math.abs(mediaElement.currentTime - targetTime) > 0.15) {
            mediaElement.currentTime = targetTime;
          }
        }
        
        // Dibujar directamente sin cálculos complejos
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        
        // Usar save/restore para optimizar el contexto
        ctx.save();
        try {
          ctx.drawImage(mediaElement, x, y, width, height);
        } catch (e) {
          // Fallback ultra-simple
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(x, y, width, height);
        } finally {
          ctx.restore();
        }
      } else {
        // Placeholder simple
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x, y, width, height);
      }
    } else if (clip.type === 'audio') {
      // Audio no necesita renderizado visual
      return;
    } else if (clip.type === 'text') {
      // Renderizado de texto ultra-simple
      const { x = 50, y = 50 } = clip.position || {};
      ctx.save();
      ctx.fillStyle = clip.style?.color || '#ffffff';
      ctx.font = `${clip.style?.fontSize || 24}px ${clip.style?.fontFamily || 'Arial'}`;
      ctx.fillText(clip.content || 'Texto', x, y);
      ctx.restore();
    }
  };

  // Renderizar un clip individual con cache mejorado (función original mantenida para compatibilidad)
  const renderClip = (ctx: CanvasRenderingContext2D, clip: any, relativeTime: number) => {
    if (clip.type === 'video' || clip.type === 'image') {
      const mediaKey = `${clip.source}_${clip.type}`;
      let mediaElement = loadedMedia.get(mediaKey);
      
      if (!mediaElement) {
        // Crear elemento de media solo una vez
        if (clip.type === 'video') {
          const video = document.createElement('video');
          video.src = clip.source;
          video.muted = true;
          video.crossOrigin = 'anonymous';
          video.preload = 'metadata';
          video.playsInline = true;
          
          // Agregar inmediatamente al cache para evitar recreación
          setLoadedMedia(prev => new Map(prev.set(mediaKey, video)));
          
          video.addEventListener('loadeddata', () => {
            // El elemento ya está en el cache, solo forzar re-render
            setLoadedMedia(prev => new Map(prev));
          });
          
          video.addEventListener('error', () => {
            // Marcar como error en el cache
            setLoadedMedia(prev => {
              const newMap = new Map(prev);
              newMap.set(mediaKey + '_error', true);
              return newMap;
            });
          });
          
          video.load();
          mediaElement = video;
        } else {
          const img = document.createElement('img');
          img.src = clip.source;
          img.crossOrigin = 'anonymous';
          
          // Agregar inmediatamente al cache
          setLoadedMedia(prev => new Map(prev.set(mediaKey, img)));
          
          img.addEventListener('load', () => {
            setLoadedMedia(prev => new Map(prev));
          });
          
          img.addEventListener('error', () => {
            setLoadedMedia(prev => {
              const newMap = new Map(prev);
              newMap.set(mediaKey + '_error', true);
              return newMap;
            });
          });
          
          mediaElement = img;
        }
        
        // Renderizar placeholder de forma más eficiente
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⏳', x + width / 2, y + height / 2);
        return;
      }
      
      // Verificar si hay error en el cache
      if (loadedMedia.get(mediaKey + '_error')) {
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = '#ff6b6b';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('❌', x + width / 2, y + height / 2);
        return;
      }
      
      // Verificar si el media está listo de forma optimizada
      const isReady = mediaElement instanceof HTMLImageElement ? 
        mediaElement.complete && mediaElement.naturalWidth > 0 : 
        (mediaElement as HTMLVideoElement).readyState >= 2;
      
      if (isReady) {
        // Actualizar tiempo del video de forma más eficiente
        if (mediaElement instanceof HTMLVideoElement) {
          const targetTime = Math.max(0, Math.min(relativeTime + (clip.trimStart || 0), mediaElement.duration || 0));
          if (Math.abs(mediaElement.currentTime - targetTime) > 0.05) {
            try {
              mediaElement.currentTime = targetTime;
            } catch (e) {
              // Ignorar errores de seek silenciosamente
            }
          }
        }
        
        // Calcular dimensiones una sola vez
        const { x = 0, y = 0 } = clip.position || {};
        let { width, height } = clip.position || {};
        
        if (!width || !height) {
          const mediaAspectRatio = mediaElement instanceof HTMLVideoElement ? 
            (mediaElement.videoWidth || 16) / (mediaElement.videoHeight || 9) :
            (mediaElement.naturalWidth || 16) / (mediaElement.naturalHeight || 9);
          
          const canvasAspectRatio = ctx.canvas.width / ctx.canvas.height;
          
          if (mediaAspectRatio > canvasAspectRatio) {
            width = ctx.canvas.width;
            height = width / mediaAspectRatio;
          } else {
            height = ctx.canvas.height;
            width = height * mediaAspectRatio;
          }
        }
        
        // Renderizar media de forma segura
        try {
          ctx.drawImage(mediaElement, x, y, width, height);
        } catch (error) {
          // Fallback simple
          ctx.fillStyle = '#2a2a2a';
          ctx.fillRect(x, y, width, height);
        }
      } else {
        // Placeholder simple mientras carga
        const { x = 0, y = 0, width = ctx.canvas.width, height = ctx.canvas.height } = clip.position || {};
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⏳', x + width / 2, y + height / 2);
      }
    } else if (clip.type === 'audio') {
      // Placeholder para audio
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(clip.x || 0, clip.y || 0, clip.width || 100, clip.height || 20);
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Audio: ${clip.name}`, (clip.x || 0) + 5, (clip.y || 0) + 15);
    } else if (clip.type === 'text') {
      // Renderizar texto
      ctx.fillStyle = clip.color || '#ffffff';
      ctx.font = `${clip.fontSize || 24}px ${clip.fontFamily || 'Arial'}`;
      ctx.textAlign = 'left';
      ctx.fillText(clip.text || '', clip.x || 0, clip.y || 50);
    }
  };

  // Renderizar grilla
  const renderGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    const gridSize = 50;
    
    // Líneas verticales
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Líneas horizontales
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  // Renderizar zonas seguras
  const renderSafeZones = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const safeMargin = 0.1; // 10% de margen
    const safeWidth = width * (1 - safeMargin * 2);
    const safeHeight = height * (1 - safeMargin * 2);
    const safeX = (width - safeWidth) / 2;
    const safeY = (height - safeHeight) / 2;
    
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(safeX, safeY, safeWidth, safeHeight);
    ctx.setLineDash([]);
  };

  // Manejar click en el canvas para posicionar elementos
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Aquí se podría implementar la lógica para posicionar elementos
  };

  // Controles de zoom
  const zoomIn = () => setPreviewScale(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setPreviewScale(prev => Math.max(prev - 0.1, 0.1));
  const resetZoom = () => setPreviewScale(1);

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-black relative">
      {/* Preview Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        {/* Zoom Controls */}
        <div className="bg-black/50 rounded-lg p-2 flex items-center space-x-2">
          <Button size="sm" variant="ghost" onClick={zoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm min-w-[50px] text-center">
            {Math.round(previewScale * 100)}%
          </span>
          <Button size="sm" variant="ghost" onClick={zoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={resetZoom}>
            <Square className="w-4 h-4" />
          </Button>
        </div>
        
        {/* View Options */}
        <div className="bg-black/50 rounded-lg p-2 flex flex-col space-y-1">
          <Button 
            size="sm" 
            variant={showGrid ? "default" : "ghost"}
            onClick={() => setShowGrid(!showGrid)}
            title="Mostrar grilla"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant={showSafeZones ? "default" : "ghost"}
            onClick={() => setShowSafeZones(!showSafeZones)}
            title="Mostrar zonas seguras"
          >
            <Crosshair className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" title="Pantalla completa">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/50 rounded-lg p-2 flex items-center space-x-2">
          <Badge variant="secondary">
            {project.resolution.label}
          </Badge>
          <Badge variant="outline">
            {project.frameRate}fps
          </Badge>
          <Badge variant="outline">
            {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')}
          </Badge>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-900">
        <div 
          className="relative border-2 border-gray-600 rounded-lg shadow-2xl bg-black overflow-hidden"
          style={{
            transform: `scale(${previewScale})`,
            transformOrigin: 'center',
            width: canvasSize.width,
            height: canvasSize.height
          }}
        >
          <canvas
            ref={canvasRef}
            width={project.resolution.width}
            height={project.resolution.height}
            style={{
              width: '100%',
              height: '100%',
              display: 'block'
            }}
            className="cursor-crosshair"
            onClick={handleCanvasClick}
          />
          
          {/* Canvas Overlay Info */}
          <div className="absolute bottom-2 left-2 bg-background/70 rounded px-2 py-1 text-xs text-foreground">
            {project.resolution.width} × {project.resolution.height}
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black/50 rounded-lg p-2 flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted || volume === 0 ? 
              <VolumeX className="w-4 h-4" /> : 
              <Volume2 className="w-4 h-4" />
            }
          </Button>
          <div className="w-20">
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={([value]) => {
                setVolume(value);
                if (value > 0) setIsMuted(false);
              }}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <span className="text-white text-xs min-w-[30px]">
            {isMuted ? 0 : volume}%
          </span>
        </div>
      </div>

      {/* Loading/Error States */}
      {project.tracks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/70">
            <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Vista Previa</p>
            <p className="text-sm">
              Agrega clips a la timeline para ver la vista previa
            </p>
          </div>
        </div>
      )}
    </div>
  );
}