import React, { useState, useRef } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  FileText, 
  Video, 
  Camera, 
  Eye, 
  Download, 
  Save, 
  Copy, 
  Play, 
  Pause, 
  RotateCcw,
  Timer
} from 'lucide-react';
import { VideoProject, ScriptScene } from '../../types/projects';

// Define a more specific type for the form data
interface ScriptSceneFormData {
  id?: string; // Add id as optional
  title: string;
  type: 'intro' | 'main' | 'transition' | 'outro' | 'other';
  content: string;
  duration: number;
  order: number;
  actions: string[];
  notes: string;
}

interface ScriptEditorProps {
  project: VideoProject;
  onUpdate: (project: VideoProject) => void;
}

export function ScriptEditor({ project, onUpdate }: ScriptEditorProps) {
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const [isAddingScene, setIsAddingScene] = useState(false);
  const [editingScene, setEditingScene] = useState<ScriptScene | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [timer, setTimer] = useState({ isRunning: false, seconds: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const addScene = (sceneData: ScriptSceneFormData) => { // addScene now takes ScriptSceneFormData
    // Ensure sceneData for addScene doesn't have an id, or handle it appropriately
    // For adding a new scene, the id is generated, so we use Omit<ScriptScene, 'id'> for the newScene object structure
    const scenePayload: Omit<ScriptScene, 'id'> = {
        title: sceneData.title,
        type: sceneData.type,
        content: sceneData.content,
        duration: sceneData.duration,
        order: sceneData.order,
        actions: sceneData.actions,
        notes: sceneData.notes,
    };
    const newScene: ScriptScene = {
      ...scenePayload, // Correctly use scenePayload
      id: Date.now().toString()
    };
    
    const updatedProject = {
      ...project,
      script: {
        ...project.script,
        scenes: [...project.script.scenes, newScene]
      }
    };
    
    onUpdate(updatedProject);
    setIsAddingScene(false);
  };

  const updateScene = (sceneData: ScriptSceneFormData) => { // updateScene now takes ScriptSceneFormData
    if (!sceneData.id) {
      console.error("Attempted to update scene without an ID");
      return;
    }
    const updatedScene: ScriptScene = {
      id: sceneData.id, // id is now part of sceneData
      title: sceneData.title,
      content: sceneData.content,
      type: sceneData.type,
      duration: sceneData.duration,
      order: sceneData.order,
      actions: sceneData.actions,
      notes: sceneData.notes,
    };
    const updatedProject = {
      ...project,
      script: {
        ...project.script,
        scenes: project.script.scenes.map(scene => 
          scene.id === updatedScene.id ? updatedScene : scene
        )
      }
    };
    
    onUpdate(updatedProject);
    setEditingScene(null);
  };

  const deleteScene = (sceneId: string) => {
    const updatedProject = {
      ...project,
      script: {
        ...project.script,
        scenes: project.script.scenes.filter(scene => scene.id !== sceneId)
      }
    };
    
    onUpdate(updatedProject);
    if (activeScene === sceneId) {
      setActiveScene(null);
    }
  };

  const updateScriptInfo = (updates: Partial<typeof project.script>) => {
    const updatedProject = {
      ...project,
      script: {
        ...project.script,
        ...updates
      }
    };
    
    onUpdate(updatedProject);
  };

  const duplicateScene = (scene: ScriptScene) => {
    // Ensure duplicatedScene conforms to ScriptSceneFormData for addScene
    const duplicatedSceneData: ScriptSceneFormData = {
      title: `${scene.title} (Copia)`,
      type: scene.type || 'main', // Provide a default if scene.type is undefined
      content: scene.content,
      duration: scene.duration || 0, // Provide a default if scene.duration is undefined
      order: project.script.scenes.length,
      actions: scene.actions || [], // Provide a default if scene.actions is undefined
      notes: scene.notes,
      // id is not needed here as addScene will generate it
    };
    
    addScene(duplicatedSceneData);
  };

  const _reorderScenes = (fromIndex: number, toIndex: number) => {
    const scenes = [...project.script.scenes];
    const [movedScene] = scenes.splice(fromIndex, 1);
    scenes.splice(toIndex, 0, movedScene);
    
    // Update order numbers
    const reorderedScenes = scenes.map((scene, index) => ({
      ...scene,
      order: index
    }));
    
    const updatedProject = {
      ...project,
      script: {
        ...project.script,
        scenes: reorderedScenes
      }
    };
    
    onUpdate(updatedProject);
  };

  const startTimer = () => {
    setTimer({ isRunning: true, seconds: 0 });
    timerRef.current = setInterval(() => {
      setTimer(prev => ({ ...prev, seconds: prev.seconds + 1 }));
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    stopTimer();
    setTimer({ isRunning: false, seconds: 0 });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    return project.script.scenes.reduce((total, scene) => total + (scene.duration || 0), 0);
  };

  const getSceneTypeIcon = (type: string) => {
    switch (type) {
      case 'intro': return <Play className="h-4 w-4" />;
      case 'main': return <Video className="h-4 w-4" />;
      case 'transition': return <RotateCcw className="h-4 w-4" />;
      case 'outro': return <Pause className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const exportScript = () => {
    const scriptData = {
      project: project.name,
      script: project.script,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(scriptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}-script.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sortedScenes = [...project.script.scenes].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Editor de Guión</h2>
          <p className="text-gray-600">Crea y organiza el guión de tu video</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Timer */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Timer className="h-4 w-4" />
            <span className="font-mono text-sm">{formatTime(timer.seconds)}</span>
            {timer.isRunning ? (
              <Button size="sm" variant="ghost" onClick={stopTimer}>
                <Pause className="h-3 w-3" />
              </Button>
            ) : (
              <Button size="sm" variant="ghost" onClick={startTimer}>
                <Play className="h-3 w-3" />
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={resetTimer}>
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
          
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Editar' : 'Vista Previa'}
          </Button>
          
          <Button variant="outline" onClick={exportScript}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Script Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información del Guión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Título del Video</Label>
              <Input
                value={project.script.title}
                onChange={(e) => updateScriptInfo({ title: e.target.value })}
                placeholder="Título del video"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Duración Estimada</Label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{getTotalDuration()} segundos</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Escenas Totales</Label>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{project.script.scenes.length} escenas</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={project.script.notes}
              onChange={(e) => updateScriptInfo({ notes: e.target.value })}
              placeholder="Descripción del video y notas generales"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenes List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Escenas</h3>
            <Dialog open={isAddingScene} onOpenChange={setIsAddingScene}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Escena
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Escena</DialogTitle>
                  <DialogDescription>
                    Añade una nueva escena al guión
                  </DialogDescription>
                </DialogHeader>
                <SceneForm 
                  onSubmit={addScene} 
                  onCancel={() => setIsAddingScene(false)}
                  sceneCount={project.script.scenes.length}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sortedScenes.map((scene, _index) => (
              <Card 
                key={scene.id} 
                className={`cursor-pointer transition-all ${
                  activeScene === scene.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveScene(scene.id)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSceneTypeIcon(scene.type || 'main')}
                        <span className="font-medium text-sm">{scene.title}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateScene(scene);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingScene(scene);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteScene(scene.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {scene.type}
                      </Badge>
                      {scene.duration && (
                        <span>{scene.duration}s</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {sortedScenes.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">No hay escenas</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setIsAddingScene(true)}
                  >
                    Crear Primera Escena
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Scene Editor */}
        <div className="lg:col-span-2">
          {activeScene ? (
            <SceneEditor 
              scene={sortedScenes.find(s => s.id === activeScene)!}
              onUpdate={updateScene}
              previewMode={previewMode}
            />
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Selecciona una escena</h3>
                <p className="text-gray-600 mb-4">
                  Elige una escena de la lista para editarla o crea una nueva
                </p>
                <Button onClick={() => setIsAddingScene(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Nueva Escena
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Scene Dialog */}
      {editingScene && (
        <Dialog open={!!editingScene} onOpenChange={() => setEditingScene(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Escena</DialogTitle>
              <DialogDescription>
                Modifica los detalles de la escena
              </DialogDescription>
            </DialogHeader>
            <SceneForm 
              scene={editingScene}
              onSubmit={updateScene} 
              onCancel={() => setEditingScene(null)}
              sceneCount={project.script.scenes.length}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Scene Editor Component
function SceneEditor({ 
  scene, 
  onUpdate, 
  previewMode 
}: { 
  scene: ScriptScene; 
  onUpdate: (scene: ScriptSceneFormData) => void; // Changed to expect ScriptSceneFormData
  previewMode: boolean; 
}) {
  const [localScene, setLocalScene] = useState(scene);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof ScriptScene, value: any) => {
    const updatedScene = { ...localScene, [field]: value };
    setLocalScene(updatedScene);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Ensure localScene conforms to ScriptSceneFormData before calling onUpdate
    const sceneDataToUpdate: ScriptSceneFormData = {
      id: localScene.id, // id is present in localScene (it's a ScriptScene)
      title: localScene.title,
      type: localScene.type || 'main', // Default if undefined
      content: localScene.content,
      duration: localScene.duration || 0, // Default if undefined
      order: localScene.order,
      actions: localScene.actions || [], // Default if undefined
      notes: localScene.notes,
    };
    onUpdate(sceneDataToUpdate);
    setHasChanges(false);
  };

  const resetChanges = () => {
    setLocalScene(scene);
    setHasChanges(false);
  };

  React.useEffect(() => {
    setLocalScene(scene);
    setHasChanges(false);
  }, [scene]);

  if (previewMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getSceneTypeIcon(scene.type || 'main')}
            <span>{scene.title}</span>
            <Badge>{scene.type || 'main'}</Badge>
          </CardTitle>
          {scene.duration && (
            <CardDescription>
              Duración: {scene.duration} segundos
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scene.content && (
              <div>
                <h4 className="font-medium mb-2">Contenido</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{scene.content}</p>
                </div>
              </div>
            )}
            
            {scene.actions && scene.actions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Acciones</h4>
                <ul className="space-y-1">
                  {scene.actions.map((action, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-gray-500" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {scene.notes && (
              <div>
                <h4 className="font-medium mb-2">Notas</h4>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="whitespace-pre-wrap text-sm">{scene.notes}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Editando: {localScene.title}</CardTitle>
          {hasChanges && (
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={resetChanges}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Descartar
              </Button>
              <Button size="sm" onClick={handleSave}> // Changed saveChanges to handleSave
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="actions">Acciones</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={localScene.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Título de la escena"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Duración (segundos)</Label>
                <Input
                  type="number"
                  value={localScene.duration || ''}
                  onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                  placeholder="30"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Contenido / Texto</Label>
              <Textarea
                value={localScene.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Escribe aquí el contenido o texto que se dirá en esta escena..."
                rows={8}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-4">
            <div className="space-y-2">
              <Label>Acciones de Cámara / Visuales</Label>
              <div className="space-y-2">
                {localScene.actions?.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={action}
                      onChange={(e) => {
                        const newActions = [...(localScene.actions || [])];
                        newActions[index] = e.target.value;
                        handleChange('actions', newActions);
                      }}
                      placeholder="Ej: Zoom in, Corte a plano medio, etc."
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newActions = localScene.actions?.filter((_, i) => i !== index) || [];
                        handleChange('actions', newActions);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newActions = [...(localScene.actions || []), ''];
                    handleChange('actions', newActions);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Acción
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="space-y-2">
              <Label>Notas de Producción</Label>
              <Textarea
                value={localScene.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Notas para el equipo de producción, recordatorios, ideas, etc."
                rows={6}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Scene Form Component
function SceneForm({ 
  scene, 
  onSubmit, 
  onCancel,
  sceneCount
}: { 
  scene?: ScriptScene; 
  onSubmit: (scene: ScriptSceneFormData) => void; // onSubmit now expects ScriptSceneFormData (which can include id)
  onCancel: () => void;
  sceneCount: number;
}) {
  const [formData, setFormData] = useState<ScriptSceneFormData>({ // Use the new specific type
    title: scene?.title || '',
    type: scene?.type || 'main', // Ensure 'main' is a valid initial type according to ScriptSceneFormData
    content: scene?.content || '', // Changed from dialogue to content
    duration: scene?.duration || 30,
    order: scene?.order ?? sceneCount,
    actions: scene?.actions || [],
    notes: scene?.notes || ''
  } as ScriptSceneFormData); // Add type assertion for initial state if needed, or ensure all fields match

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // If editing, include the original scene's id
    const dataToSubmit: ScriptSceneFormData = {
      ...formData,
      id: scene?.id, // Include id if scene exists (i.e., editing)
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Título *</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Título de la escena"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Tipo</Label>
          <Select value={formData.type} onValueChange={(newValue: string) => {
            // The newValue from Select is a string, ensure it's a valid type for ScriptSceneFormData.type
            const newSceneType = newValue as ScriptSceneFormData['type']; 
            setFormData(prevFormData => ({
              ...prevFormData,
              type: newSceneType
            }));
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intro">Introducción</SelectItem>
              <SelectItem value="main">Principal</SelectItem>
              <SelectItem value="transition">Transición</SelectItem>
              <SelectItem value="outro">Cierre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Duración (segundos)</Label>
        <Input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
          placeholder="30"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Contenido / Diálogo</Label>
          <Textarea
            value={formData.content} // Changed from dialogue to content
            onChange={(e) => setFormData({ ...formData, content: e.target.value })} // Changed from dialogue to content
            placeholder="Contenido o diálogo de la escena..."
            rows={4}
          />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {scene ? 'Actualizar' : 'Crear'} Escena
        </Button>
      </div>
    </form>
  );
}

function getSceneTypeIcon(type: string) {
  switch (type) {
    case 'intro': return <Play className="h-4 w-4" />;
    case 'main': return <Video className="h-4 w-4" />;
    case 'transition': return <RotateCcw className="h-4 w-4" />;
    case 'outro': return <Pause className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
}