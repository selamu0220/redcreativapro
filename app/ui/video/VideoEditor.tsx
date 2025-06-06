'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { Slider } from '../slider';
import { Badge } from '../badge';
import { Separator } from '../separator';
import { ScrollArea } from '../scroll-area';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Scissors, 
  Type, 
  Image, 
  Music, 
  Video, 
  Download, 
  Upload, 
  Settings, 
  Layers, 
  Zap,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Grid,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Move,
  Menu,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Palette,
  Calendar,
  FileText,
  Sparkles,
  MessageSquare,
  GraduationCap,
  BarChart3,
  FolderOpen,
  FileImage,
  Youtube,
  User
} from 'lucide-react';
import { VideoProject, VideoTrack, VideoClip, TimelineState, MediaAsset, VIDEO_RESOLUTIONS, FRAME_RATES } from '../../types/video';
import { MediaLibrary } from './MediaLibrary';
import { Timeline } from './Timeline';
import { VideoPreview } from './VideoPreview';
import { EffectsPanel } from './EffectsPanel';
import { ExportDialog } from './ExportDialog';
import { ProjectSettings } from './ProjectSettings';
import { ThemeSelector } from '../common/ThemeSelector';

export function VideoEditor() {
  const router = useRouter();
  const [project, setProject] = useState<VideoProject | null>(null);
  const [timeline, setTimeline] = useState<TimelineState>({
    currentTime: 0,
    zoom: 1,
    selectedClips: [],
    playbackRate: 1,
    isPlaying: false,
    loop: false,
    snapToGrid: true
  });
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [selectedTool, setSelectedTool] = useState<'select' | 'cut' | 'text' | 'effects'>('select');
  const [activeTab, setActiveTab] = useState('media');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showProjectSettings, setShowProjectSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHover, setSidebarHover] = useState(false);
  const sidebarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Crear nuevo proyecto
  const createNewProject = () => {
    const newProject: VideoProject = {
      id: `project_${Date.now()}`,
      name: 'Nuevo Proyecto',
      duration: 0,
      resolution: VIDEO_RESOLUTIONS[0],
      frameRate: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      tracks: [
        {
          id: 'video_track_1',
          type: 'video',
          name: 'Video 1',
          clips: [],
          isVisible: true,
          isLocked: false,
          order: 0
        },
        {
          id: 'audio_track_1',
          type: 'audio',
          name: 'Audio 1',
          clips: [],
          isVisible: true,
          isLocked: false,
          volume: 100,
          order: 1
        }
      ],
      settings: {
        resolution: VIDEO_RESOLUTIONS[0],
        frameRate: 30,
        audioSampleRate: 44100,
        backgroundColor: '#000000',
        exportFormat: 'mp4',
        quality: 'high'
      }
    };
    setProject(newProject);
  };

  // Controles de reproducción
  const togglePlayback = () => {
    setTimeline(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const stopPlayback = () => {
    setTimeline(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  };

  const seekBackward = () => {
    setTimeline(prev => ({ 
      ...prev, 
      currentTime: Math.max(0, prev.currentTime - 5) 
    }));
  };

  const seekForward = () => {
    if (project) {
      setTimeline(prev => ({ 
        ...prev, 
        currentTime: Math.min(project.duration, prev.currentTime + 5) 
      }));
    }
  };

  // Herramientas
  const tools = [
    { id: 'select', icon: Move, label: 'Seleccionar' },
    { id: 'cut', icon: Scissors, label: 'Cortar' },
    { id: 'text', icon: Type, label: 'Texto' },
    { id: 'effects', icon: Zap, label: 'Efectos' }
  ];

  // Herramientas de Red Creativa Pro
  const redCreativaTools = [
    { title: 'Blog', icon: BookOpen, path: '/blog', color: 'text-blue-600' },
    { title: 'Recursos', icon: Palette, path: '/recursos', color: 'text-purple-600' },
    { title: 'Calendario', icon: Calendar, path: '/calendario', color: 'text-green-600' },
    { title: 'Guiones', icon: FileText, path: '/scripts', color: 'text-orange-600' },
    { title: 'Prompts', icon: Sparkles, path: '/prompts', color: 'text-yellow-600' },
    { title: 'Miniaturas', icon: Image, path: '/miniaturas', color: 'text-pink-600' },
    { title: 'Tareas', icon: BarChart3, path: '/tareas', color: 'text-indigo-600' },
    { title: 'Chat', icon: MessageSquare, path: '/chat', color: 'text-cyan-600' },
    { title: 'Aprendizaje', icon: GraduationCap, path: '/aprendizaje', color: 'text-emerald-600' },
    { title: 'Proyectos', icon: FolderOpen, path: '/proyectos', color: 'text-slate-600' },
    { title: 'SVG Viewer', icon: FileImage, path: '/svg-viewer', color: 'text-teal-600' },
    { title: 'Sobre Red Creativa', icon: Youtube, path: '/sobre-red-creativa', color: 'text-red-600' },
    { title: 'Sobre el Creador', icon: User, path: '/sobre-el-creador', color: 'text-gray-600' }
  ];

  // Manejar hover del sidebar
  const handleSidebarMouseEnter = () => {
    if (sidebarTimeoutRef.current) {
      clearTimeout(sidebarTimeoutRef.current);
    }
    setSidebarHover(true);
    setSidebarCollapsed(false);
  };

  const handleSidebarMouseLeave = () => {
    setSidebarHover(false);
    sidebarTimeoutRef.current = setTimeout(() => {
      setSidebarCollapsed(true);
    }, 1000); // 1 segundo de delay antes de colapsar
  };

  // Navegación a otras herramientas
  const handleToolNavigation = (path: string) => {
    try {
      router.push(path);
    } catch (error) {
      console.error('Error al navegar:', error);
      // Fallback: mostrar mensaje si la ruta no existe
      alert(`La página ${path} no está disponible aún. Funcionalidad en desarrollo.`);
    }
  };

  useEffect(() => {
    // Crear proyecto por defecto al cargar
    createNewProject();
  }, []);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">Editor de Video</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Crea un nuevo proyecto para comenzar a editar
            </p>
            <Button onClick={createNewProject} className="w-full">
              <Video className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background text-foreground">
      {/* Red Creativa Pro Sidebar */}
      <div 
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out bg-card border-r border-border flex-shrink-0 z-30`}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h2 className="font-bold text-sm">Red Creativa Pro</h2>
                  <p className="text-xs text-muted-foreground">Herramientas</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {redCreativaTools.map((tool) => (
                <Button
                  key={tool.path}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start h-10 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => handleToolNavigation(tool.path)}
                  title={sidebarCollapsed ? tool.title : undefined}
                >
                  <tool.icon className={`w-4 h-4 ${tool.color} ${sidebarCollapsed ? '' : 'mr-3'}`} />
                  {!sidebarCollapsed && (
                    <span className="text-sm">{tool.title}</span>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className={`w-full ${sidebarCollapsed ? 'px-2' : 'justify-start px-3'}`}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-3" />
                  <span className="text-sm">Colapsar</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Video Editor Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Editor de Video</h1>
            <Badge variant="secondary">{project.name}</Badge>
            <Badge variant="outline" className="text-xs">
              {project.resolution.label} • {project.frameRate}fps
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeSelector />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowProjectSettings(true)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setShowExportDialog(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Video Editor Sidebar */}
          <div className="w-80 flex-shrink-0 bg-card border-r border-border">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="effects">Efectos</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
              </TabsList>
            
            <TabsContent value="media" className="h-full mt-0">
              <MediaLibrary 
                assets={mediaAssets}
                onAssetsChange={setMediaAssets}
                onAddToTimeline={(asset) => {
                  if (!project) return;
                  
                  // Crear nuevo clip
                  const newClip: VideoClip = {
                    id: `clip_${Date.now()}`,
                    type: asset.type,
                    name: asset.name,
                    source: asset.url,
                    startTime: project.duration, // Agregar al final
                    duration: asset.duration || 5,
                    trimStart: 0,
                    trimEnd: asset.duration || 5,
                    volume: asset.type === 'audio' ? 100 : undefined,
                    position: {
                      x: 0,
                      y: 0,
                      width: project.resolution.width,
                      height: project.resolution.height
                    },
                    effects: [],
                    transitions: []
                  };
                  
                  // Determinar la pista apropiada
                  const targetTrackType = asset.type === 'audio' ? 'audio' : 'video';
                  const targetTrack = project.tracks.find(track => 
                    track.type === targetTrackType && !track.isLocked
                  );
                  
                  if (targetTrack) {
                    // Calcular nueva duración del proyecto
                    const newClipEndTime = newClip.startTime + newClip.duration;
                    
                    // Actualizar proyecto
                    const updatedProject = {
                      ...project,
                      duration: Math.max(project.duration, newClipEndTime),
                      tracks: project.tracks.map(track => 
                        track.id === targetTrack.id
                          ? { ...track, clips: [...track.clips, newClip] }
                          : track
                      ),
                      updatedAt: new Date()
                    };
                    
                    setProject(updatedProject);
                    
                    // Mover timeline al nuevo clip
                    setTimeline(prev => ({
                      ...prev,
                      currentTime: newClip.startTime,
                      selectedClips: [newClip.id]
                    }));
                  }
                }}
              />
            </TabsContent>
            
            <TabsContent value="effects" className="h-full mt-0">
              <EffectsPanel 
                selectedClips={timeline.selectedClips}
                onApplyEffect={(effect) => {
                  console.log('Applying effect:', effect);
                }}
              />
            </TabsContent>
            
            <TabsContent value="audio" className="h-full mt-0">
              <div className="p-4">
                <h3 className="font-medium mb-4">Controles de Audio</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Volumen Master</label>
                    <Slider defaultValue={[100]} max={100} step={1} className="mt-2" />
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Pistas de Audio</h4>
                    {project.tracks.filter(t => t.type === 'audio').map(track => (
                      <div key={track.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{track.name}</span>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            {track.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            </Tabs>
          </div>

          {/* Center - Preview and Timeline */}
          <div className="flex-1 flex flex-col">
          {/* Preview Area - Fixed and Large */}
          <div className="sticky top-0 z-20 bg-black border-b-2 border-gray-700" style={{ height: '60vh', minHeight: '400px' }}>
            <VideoPreview 
              project={project}
              currentTime={timeline.currentTime}
              isPlaying={timeline.isPlaying}
              onTimeUpdate={(time) => setTimeline(prev => ({ ...prev, currentTime: time }))}
            />
            
            {/* Toolbar */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {tools.map(tool => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedTool(tool.id as any)}
                  title={tool.label}
                >
                  <tool.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Controls - CapCut Style */}
          <div className="bg-card p-6 border-t border-border">
            <div className="flex items-center justify-center space-x-8">
              {/* Seek Backward */}
              <Button 
                variant="outline" 
                size="lg" 
                onClick={seekBackward}
                className="w-14 h-14 rounded-full border-2 hover:scale-110 transition-transform"
              >
                <SkipBack className="w-7 h-7" />
              </Button>
              
              {/* Main Play/Pause Button */}
              <Button 
                variant={timeline.isPlaying ? "destructive" : "default"} 
                size="lg" 
                onClick={togglePlayback}
                className="w-20 h-20 rounded-full border-2 shadow-lg hover:scale-110 transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-white/20"
              >
                {timeline.isPlaying ? 
                  <Pause className="w-8 h-8" /> : 
                  <Play className="w-8 h-8 ml-1" />
                }
              </Button>
              
              {/* Stop Button */}
              <Button 
                variant="outline" 
                size="lg" 
                onClick={stopPlayback}
                className="w-14 h-14 rounded-full border-2 hover:scale-110 transition-transform"
              >
                <Square className="w-7 h-7" />
              </Button>
              
              {/* Seek Forward */}
              <Button 
                variant="outline" 
                size="lg" 
                onClick={seekForward}
                className="w-14 h-14 rounded-full border-2 hover:scale-110 transition-transform"
              >
                <SkipForward className="w-7 h-7" />
              </Button>
              
              <Separator orientation="vertical" className="h-8" />
              
              {/* Time Display */}
              <div className="flex items-center space-x-3 bg-muted/50 px-4 py-2 rounded-lg">
                <span className="text-lg font-mono font-semibold text-foreground">
                  {Math.floor(timeline.currentTime / 60)}:{(timeline.currentTime % 60).toFixed(0).padStart(2, '0')}
                </span>
                <span className="text-muted-foreground text-lg">/</span>
                <span className="text-lg font-mono font-semibold text-muted-foreground">
                  {Math.floor(project.duration / 60)}:{(project.duration % 60).toFixed(0).padStart(2, '0')}
                </span>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setTimeline(prev => ({ ...prev, zoom: Math.max(0.1, prev.zoom - 0.1) }))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                  {Math.round(timeline.zoom * 100)}%
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setTimeline(prev => ({ ...prev, zoom: Math.min(5, prev.zoom + 0.1) }))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Timeline Area */}
          <div className="flex-1 overflow-y-auto bg-card">
            {/* Timeline */}
            <div className="h-80 bg-card border-t border-border">
              <Timeline 
                project={project}
                timeline={timeline}
                onTimelineChange={setTimeline}
                onProjectChange={setProject}
              />
            </div>
            
            {/* Additional Timeline Space */}
            <div className="h-40 bg-muted/20 border-t border-border/50">
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-sm">Espacio adicional para más pistas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Dialogs */}
        {showExportDialog && (
          <ExportDialog 
            project={project}
            onClose={() => setShowExportDialog(false)}
            onExport={(settings) => {
              console.log('Exporting with settings:', settings);
              setShowExportDialog(false);
            }}
          />
        )}
        
        {showProjectSettings && (
          <ProjectSettings 
            project={project}
            onClose={() => setShowProjectSettings(false)}
            onSave={(updatedProject) => {
              setProject(updatedProject);
              setShowProjectSettings(false);
            }}
          />
        )}
      </div>
    );
  }