'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { useToast } from '../../hooks/use-toast';
import { 
  Plus, 
  Download, 
  Upload, 
  FolderOpen, 
  FileText, 
  Video, 
  Image, 
  Music, 
  File, 
  Calendar,
  CheckSquare,
  Clock,
  Tag,
  ExternalLink,
  Trash2,
  Edit,
  Search,
  Filter
} from 'lucide-react';
import { VideoProject, ContentFile, ProjectTask, TimelineEvent } from '../../types/projects';
import { ProjectBoard } from './ProjectBoard';
import { ScriptEditor } from './ScriptEditor';
import { ContentManager } from './ContentManager';
import { useProjectsStorage } from '../../hooks/useLocalStorage';
import { CSVManager } from '../common/CSVManager';

export function ProjectManager() {
  const { data: projects, setData: setProjects, importFromCSV, exportToCSV } = useProjectsStorage();
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setHasChanges(true);
  }, [projects]);

  const handleImportCSV = async (file: File) => {
    try {
      await importFromCSV(file);
      toast({
        title: "Importación exitosa",
        description: "Los proyectos se han importado correctamente."
      });
    } catch (error) {
      toast({
        title: "Error en la importación",
        description: "No se pudieron importar los proyectos. Verifica el formato del archivo.",
        variant: "destructive"
      });
    }
  };

  const handleExportCSV = () => {
    try {
      exportToCSV();
      toast({
        title: "Exportación exitosa",
        description: "Los proyectos se han exportado correctamente."
      });
    } catch (error) {
      toast({
        title: "Error en la exportación",
        description: "No se pudieron exportar los proyectos.",
        variant: "destructive"
      });
    }
  };

  // Save projects to localStorage
  const saveProjects = (updatedProjects: VideoProject[]) => {
    setProjects(updatedProjects);
  };

  const createNewProject = () => {
    const newProject: VideoProject = {
      id: Date.now().toString(),
      name: 'Nuevo Proyecto',
      description: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'planning',
      category: 'general',
      tags: [],
      script: {
        title: 'Nuevo Proyecto',
        content: '',
        notes: '',
        scenes: []
      },
      content: {
        recorded: [],
        edited: [],
        resources: [],
        overlays: [],
        documents: [],
        other: []
      },
      board: {
        tasks: [],
        timeline: [],
        notes: ''
      }
    };
    
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    setSelectedProject(newProject);
    setIsCreating(false);
    
    toast({
      title: 'Proyecto creado',
      description: 'Tu nuevo proyecto ha sido creado exitosamente'
    });
  };

  const updateProject = (updatedProject: VideoProject) => {
    const updatedProjects = projects.map(p => 
      p.id === updatedProject.id ? { ...updatedProject, updatedAt: new Date().toISOString() } : p
    );
    saveProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    saveProjects(updatedProjects);
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
    
    toast({
      title: 'Proyecto eliminado',
      description: 'El proyecto ha sido eliminado exitosamente'
    });
  };

  const exportProject = (project: VideoProject) => {
    const exportData = {
      project,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}_project.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Proyecto exportado',
      description: 'El archivo JSON ha sido descargado exitosamente'
    });
  };

  const importProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string);
        const importedProject = importData.project;
        
        // Generate new ID to avoid conflicts
        importedProject.id = Date.now().toString();
        importedProject.name = `${importedProject.name} (Importado)`;
        importedProject.updatedAt = new Date().toISOString();
        
        const updatedProjects = [...projects, importedProject];
        saveProjects(updatedProjects);
        
        toast({
          title: 'Proyecto importado',
          description: 'El proyecto ha sido importado exitosamente'
        });
      } catch (_error) {
        toast({
          title: 'Error de importación',
          description: 'El archivo JSON no es válido',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedProject) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setSelectedProject(null)}
            >
              ← Volver a Proyectos
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedProject.name}</h1>
              <p className="text-gray-600">{selectedProject.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(selectedProject.status)}>
              {selectedProject.status}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportProject(selectedProject)}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="script">Guión</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="board">Planificación</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProjectOverview 
              project={selectedProject} 
              onUpdate={updateProject}
            />
          </TabsContent>

          <TabsContent value="script">
            <ScriptEditor 
              project={selectedProject} 
              onUpdate={updateProject}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager 
              project={selectedProject} 
              onUpdate={updateProject}
            />
          </TabsContent>

          <TabsContent value="board">
            <ProjectBoard 
              project={selectedProject} 
              onUpdate={updateProject}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight">Gestión de Proyectos</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">Organiza tus proyectos de video con Google Drive</p>
        </div>
        <div className="flex items-center space-x-2">
          <CSVManager
            onImport={handleImportCSV}
            onExport={handleExportCSV}
            hasChanges={hasChanges}
            dataType="projects"
            itemCount={projects.length}
          />
          <input
            type="file"
            accept=".json"
            onChange={importProject}
            className="hidden"
            id="import-project"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('import-project')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button onClick={createNewProject}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proyecto
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="planning">Planificación</SelectItem>
                  <SelectItem value="in-progress">En Progreso</SelectItem>
                  <SelectItem value="review">Revisión</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="vlog">Vlog</SelectItem>
                  <SelectItem value="educational">Educativo</SelectItem>
                  <SelectItem value="entertainment">Entretenimiento</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description || 'Sin descripción'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Abrir
                  </Button>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportProject(project)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
            <p className="text-gray-600 mb-4">
              {projects.length === 0 
                ? 'Crea tu primer proyecto para comenzar'
                : 'No se encontraron proyectos con los filtros aplicados'
              }
            </p>
            {projects.length === 0 && (
              <Button onClick={createNewProject}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Proyecto
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Project Overview Component
function ProjectOverview({ project, onUpdate }: { project: VideoProject; onUpdate: (project: VideoProject) => void }) {
  const [editingProject, setEditingProject] = useState(project);

  const handleSave = () => {
    onUpdate(editingProject);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información del Proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre del Proyecto</Label>
              <Input
                value={editingProject.name}
                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select 
                value={editingProject.status} 
                onValueChange={(value: any) => setEditingProject({ ...editingProject, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planificación</SelectItem>
                  <SelectItem value="in-progress">En Progreso</SelectItem>
                  <SelectItem value="review">Revisión</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select 
              value={editingProject.category} 
              onValueChange={(value) => setEditingProject({ ...editingProject, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tutorial">Tutorial</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="vlog">Vlog</SelectItem>
                <SelectItem value="educational">Educativo</SelectItem>
                <SelectItem value="entertainment">Entretenimiento</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tags (separados por comas)</Label>
            <Input
              value={editingProject.tags.join(', ')}
              onChange={(e) => setEditingProject({ 
                ...editingProject, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
              })}
              placeholder="tutorial, youtube, principiantes"
            />
          </div>
          
          <Button onClick={handleSave}>
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>
      
      {/* Google Drive Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="h-5 w-5 mr-2" />
            Integración con Google Drive
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingProject.googleDriveFolder ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-semibold">{editingProject.googleDriveFolder.name}</p>
                  <p className="text-sm text-gray-600">Carpeta vinculada</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(editingProject.googleDriveFolder?.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProject({ ...editingProject, googleDriveFolder: undefined })}
                  >
                    Desvincular
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay carpeta vinculada</h3>
              <p className="text-gray-600 mb-4">
                Vincula una carpeta de Google Drive para organizar todos tus archivos
              </p>
              <Button
                onClick={() => {
                  // Aquí iría la integración real con Google Drive API
                  const mockFolder = {
                    id: 'mock-folder-id',
                    name: `${editingProject.name} - Archivos`,
                    url: 'https://drive.google.com/drive/folders/mock-folder-id'
                  };
                  setEditingProject({ ...editingProject, googleDriveFolder: mockFolder });
                }}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Vincular Carpeta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}