export interface VideoProject {
  id: string;
  name: string;
  description?: string;
  duration: number; // en segundos
  resolution: VideoResolution;
  frameRate: number;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  status: 'draft' | 'editing' | 'rendering' | 'completed';
  tracks: VideoTrack[];
  settings: ProjectSettings;
}

export interface VideoTrack {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image';
  name: string;
  clips: VideoClip[];
  isVisible: boolean;
  isLocked: boolean;
  volume?: number; // para tracks de audio
  order: number;
}

export interface VideoClip {
  id: string;
  type: 'video' | 'audio' | 'image' | 'text';
  name: string;
  source: string; // URL o path del archivo
  startTime: number; // tiempo de inicio en la timeline
  duration: number; // duración del clip
  trimStart?: number; // recorte al inicio del clip original
  trimEnd?: number; // recorte al final del clip original
  volume?: number;
  effects: VideoEffect[];
  transitions: VideoTransition[];
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  text?: {
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    alignment: 'left' | 'center' | 'right';
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  };
}

export interface VideoEffect {
  id: string;
  type: 'filter' | 'color' | 'blur' | 'brightness' | 'contrast' | 'saturation' | 'fade' | 'zoom' | 'rotate';
  name: string;
  parameters: Record<string, any>;
  startTime: number;
  duration: number;
  intensity: number; // 0-100
}

export interface VideoTransition {
  id: string;
  type: 'fade' | 'slide' | 'wipe' | 'dissolve' | 'zoom' | 'flip';
  duration: number; // en segundos
  direction?: 'left' | 'right' | 'up' | 'down';
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface VideoResolution {
  width: number;
  height: number;
  label: string; // ej: '1920x1080', '1280x720'
}

export interface ProjectSettings {
  resolution: VideoResolution;
  frameRate: number;
  audioSampleRate: number;
  backgroundColor: string;
  exportFormat: 'mp4' | 'mov' | 'avi' | 'webm';
  quality: 'low' | 'medium' | 'high' | 'ultra';
}

export interface ExportSettings {
  format: 'mp4' | 'mov' | 'avi' | 'webm' | 'gif';
  resolution: VideoResolution;
  frameRate: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  bitrate?: number;
  audioQuality?: 'low' | 'medium' | 'high';
  startTime?: number;
  endTime?: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image';
  url: string;
  thumbnail?: string;
  duration?: number; // para video y audio
  size: number; // en bytes
  format: string;
  resolution?: VideoResolution;
  createdAt: Date;
  tags: string[];
  audioInfo?: {
    channels: number;
    sampleRate: number;
    bitrate: number;
  };
}

export interface TimelineState {
  currentTime: number;
  zoom: number; // factor de zoom de la timeline
  selectedClips: string[];
  playbackRate: number;
  isPlaying: boolean;
  loop: boolean;
  snapToGrid: boolean;
}

export interface VideoEditorState {
  project: VideoProject | null;
  timeline: TimelineState;
  mediaLibrary: MediaAsset[];
  selectedTool: 'select' | 'cut' | 'text' | 'effects';
  previewQuality: 'low' | 'medium' | 'high';
  isExporting: boolean;
  exportProgress: number;
}

// Presets comunes de resolución
export const VIDEO_RESOLUTIONS: VideoResolution[] = [
  { width: 1920, height: 1080, label: 'Full HD (1920x1080)' },
  { width: 1280, height: 720, label: 'HD (1280x720)' },
  { width: 1080, height: 1920, label: 'Vertical 1080p (1080x1920)' },
  { width: 720, height: 1280, label: 'Vertical 720p (720x1280)' },
  { width: 1920, height: 1080, label: 'YouTube (1920x1080)' },
  { width: 1080, height: 1080, label: 'Instagram Square (1080x1080)' },
  { width: 1080, height: 1920, label: 'Instagram Stories (1080x1920)' },
  { width: 1200, height: 630, label: 'Facebook Cover (1200x630)' },
  { width: 1280, height: 720, label: 'Twitter Video (1280x720)' }
];

// Presets de frame rate
export const FRAME_RATES = [24, 25, 30, 50, 60];

// Tipos de efectos disponibles
export const VIDEO_EFFECTS = [
  { type: 'brightness', name: 'Brillo', icon: '☀️' },
  { type: 'contrast', name: 'Contraste', icon: '🔆' },
  { type: 'saturation', name: 'Saturación', icon: '🎨' },
  { type: 'blur', name: 'Desenfoque', icon: '🌫️' },
  { type: 'fade', name: 'Fade In/Out', icon: '🌅' },
  { type: 'zoom', name: 'Zoom', icon: '🔍' },
  { type: 'rotate', name: 'Rotación', icon: '🔄' }
];

// Tipos de transiciones disponibles
export const VIDEO_TRANSITIONS = [
  { type: 'fade', name: 'Fade', icon: '🌅' },
  { type: 'slide', name: 'Deslizar', icon: '➡️' },
  { type: 'wipe', name: 'Limpiar', icon: '🧹' },
  { type: 'dissolve', name: 'Disolver', icon: '💫' },
  { type: 'zoom', name: 'Zoom', icon: '🔍' },
  { type: 'flip', name: 'Voltear', icon: '🔄' }
];