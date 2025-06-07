'use client';

import React, { useState, useRef } from 'react';
import { Button } from '../button';
import { ScrollArea } from '../scroll-area';

import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Volume2, 
  Plus, 
  Trash2, 
  Copy, 
  Scissors,
  MoreVertical,
  GripVertical
} from 'lucide-react';
import { VideoProject, VideoTrack, VideoClip, TimelineState } from '../../types/video';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Badge } from '../badge';

interface TimelineProps {
  project: VideoProject;
  timeline: TimelineState;
  onTimelineChange: (timeline: TimelineState) => void;
  onProjectChange: (project: VideoProject) => void;
}

export function Timeline({ project, timeline, onTimelineChange, onProjectChange }: TimelineProps) {
  const [draggedClip, setDraggedClip] = useState<VideoClip | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  // Configuración de la timeline
  const PIXELS_PER_SECOND = 50 * timeline.zoom;
  const TRACK_HEIGHT = 60;
  const RULER_HEIGHT = 30;
  const _SNAP_THRESHOLD = 10;

  // Calcular duración total del proyecto
  const clipDurations = project.tracks.flatMap(track => 
    track.clips.map(clip => (clip.startTime || 0) + (clip.duration || 0))
  ).filter(duration => !isNaN(duration));
  
  const totalDuration = Math.max(
    project.duration || 0,
    ...clipDurations,
    60 // Duración mínima de 60 segundos
  );

  // Generar marcas de tiempo para la regla
  const generateTimeMarks = () => {
    const marks = [];
    const interval = timeline.zoom > 2 ? 1 : timeline.zoom > 1 ? 5 : 10;
    
    for (let i = 0; i <= totalDuration; i += interval) {
      marks.push({
        time: i,
        position: i * PIXELS_PER_SECOND,
        label: `${Math.floor(i / 60)}:${(i % 60).toFixed(0).padStart(2, '0')}`
      });
    }
    
    return marks;
  };

  // Manejar click en la timeline para mover el playhead
  const handleTimelineClick = (event: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const time = Math.max(0, x / PIXELS_PER_SECOND);
    
    onTimelineChange({
      ...timeline,
      currentTime: Math.min(time, totalDuration)
    });
  };

  // Manejar drag de clips
  const handleClipDragStart = (clip: VideoClip, event: React.MouseEvent) => {
    event.stopPropagation();
    setDraggedClip(clip);
    
    const rect = event.currentTarget.getBoundingClientRect();
    setDragOffset(event.clientX - rect.left);
  };

  const handleClipDrag = (event: React.MouseEvent) => {
    if (!draggedClip || !timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - dragOffset;
    const newStartTime = Math.max(0, x / PIXELS_PER_SECOND);
    
    // Snap to grid si está habilitado
    const snappedTime = timeline.snapToGrid 
      ? Math.round(newStartTime) 
      : newStartTime;
    
    // Actualizar posición del clip
    const updatedTracks = project.tracks.map(track => ({
      ...track,
      clips: track.clips.map(clip => 
        clip.id === draggedClip.id 
          ? { ...clip, startTime: snappedTime }
          : clip
      )
    }));
    
    onProjectChange({ ...project, tracks: updatedTracks });
  };

  const handleClipDragEnd = () => {
    setDraggedClip(null);
    setDragOffset(0);
  };

  // Seleccionar clip
  const selectClip = (clipId: string, addToSelection = false) => {
    const newSelection = addToSelection 
      ? timeline.selectedClips.includes(clipId)
        ? timeline.selectedClips.filter(id => id !== clipId)
        : [...timeline.selectedClips, clipId]
      : [clipId];
    
    onTimelineChange({
      ...timeline,
      selectedClips: newSelection
    });
  };

  // Toggle visibilidad de track
  const toggleTrackVisibility = (trackId: string) => {
    const updatedTracks = project.tracks.map(track => 
      track.id === trackId 
        ? { ...track, isVisible: !track.isVisible }
        : track
    );
    onProjectChange({ ...project, tracks: updatedTracks });
  };

  // Toggle lock de track
  const toggleTrackLock = (trackId: string) => {
    const updatedTracks = project.tracks.map(track => 
      track.id === trackId 
        ? { ...track, isLocked: !track.isLocked }
        : track
    );
    onProjectChange({ ...project, tracks: updatedTracks });
  };

  // Agregar nueva pista
  const addTrack = (type: 'video' | 'audio') => {
    const newTrack: VideoTrack = {
      id: `${type}_track_${Date.now()}`,
      type,
      name: `${type === 'video' ? 'Video' : 'Audio'} ${project.tracks.filter(t => t.type === type).length + 1}`,
      clips: [],
      isVisible: true,
      isLocked: false,
      order: project.tracks.length,
      ...(type === 'audio' && { volume: 100 })
    };
    
    onProjectChange({
      ...project,
      tracks: [...project.tracks, newTrack]
    });
  };

  // Eliminar clip
  const deleteClip = (clipId: string) => {
    const updatedTracks = project.tracks.map(track => ({
      ...track,
      clips: track.clips.filter(clip => clip.id !== clipId)
    }));
    
    onProjectChange({ ...project, tracks: updatedTracks });
    
    // Remover de selección si estaba seleccionado
    onTimelineChange({
      ...timeline,
      selectedClips: timeline.selectedClips.filter(id => id !== clipId)
    });
  };

  // Duplicar clip
  const duplicateClip = (clip: VideoClip) => {
    const newClip: VideoClip = {
      ...clip,
      id: `clip_${Date.now()}`,
      startTime: clip.startTime + clip.duration
    };
    
    const updatedTracks = project.tracks.map(track => 
      track.clips.some(c => c.id === clip.id)
        ? { ...track, clips: [...track.clips, newClip] }
        : track
    );
    
    onProjectChange({ ...project, tracks: updatedTracks });
  };

  const timeMarks = generateTimeMarks();

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium text-sm">Timeline</h3>
          <Badge variant="outline" className="text-xs">
            {timeline.zoom.toFixed(1)}x
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => addTrack('video')}
            title="Agregar pista de video"
          >
            <Plus className="w-4 h-4" />
            Video
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => addTrack('audio')}
            title="Agregar pista de audio"
          >
            <Plus className="w-4 h-4" />
            Audio
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Track Headers */}
        <div className="w-48 bg-background border-r border-border">
          {/* Track headers */}
          <div className="h-8 border-b border-border bg-card" />
          
          {/* Track headers */}
          <ScrollArea className="h-full">
            {project.tracks.map(track => (
              <div 
                key={track.id} 
                className="h-15 border-b border-border p-2 flex items-center justify-between"
                style={{ height: TRACK_HEIGHT }}
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{track.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {track.clips.length} clip{track.clips.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => toggleTrackVisibility(track.id)}
                    title={track.isVisible ? 'Ocultar' : 'Mostrar'}
                  >
                    {track.isVisible ? 
                      <Eye className="w-4 h-4" /> : 
                      <EyeOff className="w-4 h-4" />
                    }
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => toggleTrackLock(track.id)}
                    title={track.isLocked ? 'Desbloquear' : 'Bloquear'}
                  >
                    {track.isLocked ? 
                      <Lock className="w-4 h-4" /> : 
                      <Unlock className="w-4 h-4" />
                    }
                  </Button>
                  
                  {track.type === 'audio' && (
                    <Button size="sm" variant="ghost" title="Volumen">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 relative overflow-hidden">
          {/* Time Ruler */}
          <div 
            className="h-8 bg-card border-b border-border relative"
            style={{ height: RULER_HEIGHT }}
          >
            <div className="relative h-full">
              {timeMarks.map(mark => (
                <div 
                  key={mark.time}
                  className="absolute top-0 h-full flex flex-col justify-center"
                  style={{ left: mark.position }}
                >
                  <div className="w-px h-full bg-border" />
                  <span className="text-xs text-muted-foreground absolute top-1 left-1">
                    {mark.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tracks */}
          <ScrollArea className="h-full">
            <div 
              ref={timelineRef}
              className="relative cursor-pointer"
              onClick={handleTimelineClick}
              onMouseMove={draggedClip ? handleClipDrag : undefined}
              onMouseUp={handleClipDragEnd}
              style={{ width: Math.max(800, totalDuration * PIXELS_PER_SECOND) }}
            >
              {project.tracks.map(track => (
                <div 
                  key={track.id}
                  className="border-b border-border relative"
                  style={{ height: TRACK_HEIGHT }}
                >
                  {/* Track background */}
                  <div className={`w-full h-full ${
                    track.type === 'video' ? 'bg-blue-900/20' : 'bg-green-900/20'
                  } ${!track.isVisible ? 'opacity-50' : ''}`} />
                  
                  {/* Clips */}
                  {track.clips.map(clip => {
                    const clipWidth = clip.duration * PIXELS_PER_SECOND;
                    const clipLeft = clip.startTime * PIXELS_PER_SECOND;
                    const isSelected = timeline.selectedClips.includes(clip.id);
                    
                    return (
                      <div
                        key={clip.id}
                        className={`absolute top-1 h-14 rounded cursor-move border-2 ${
                          isSelected 
                            ? 'border-blue-400 bg-blue-600' 
                            : track.type === 'video'
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-green-500 bg-green-500'
                        } ${track.isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                        style={{
                          left: clipLeft,
                          width: Math.max(clipWidth, 20),
                          height: TRACK_HEIGHT - 8
                        }}
                        onMouseDown={(e) => !track.isLocked && handleClipDragStart(clip, e)}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectClip(clip.id, e.ctrlKey || e.metaKey);
                        }}
                      >
                        <div className="p-2 h-full flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-white truncate">
                              {clip.name}
                            </span>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="h-4 w-4 p-0 text-white hover:bg-white/20"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => duplicateClip(clip)}>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Scissors className="w-4 h-4 mr-2" />
                                  Cortar
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => deleteClip(clip.id)}
                                  className="text-red-400"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="text-xs text-white/70">
                            {Math.floor(clip.duration)}s
                          </div>
                        </div>
                        
                        {/* Resize handles */}
                        {!track.isLocked && (
                          <>
                            <div className="absolute left-0 top-0 w-2 h-full cursor-ew-resize bg-white/20" />
                            <div className="absolute right-0 top-0 w-2 h-full cursor-ew-resize bg-white/20" />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Playhead */}
              <div 
                ref={playheadRef}
                className="absolute top-0 w-0.5 bg-red-500 z-10 pointer-events-none"
                style={{
                  left: timeline.currentTime * PIXELS_PER_SECOND,
                  height: project.tracks.length * TRACK_HEIGHT + RULER_HEIGHT
                }}
              >
                <div className="w-3 h-3 bg-red-500 -translate-x-1/2 -translate-y-1" />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}