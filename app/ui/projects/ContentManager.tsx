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
  Upload, 
  File, 
  Video, 
  Image, 
  Music, 
  FileText, 
  Link, 
  Download, 
  ExternalLink, 
  Trash2, 
  Edit, 
  Plus, 
  FolderOpen, 
  Cloud, 
  Search,
  Filter,
  Eye,
  Copy
} from 'lucide-react';
import { VideoProject, ContentFile } from '../../types/projects';

interface ContentManagerProps {
  project: VideoProject;
  onUpdate: (project: VideoProject) => void;
}

export function ContentManager({ project, onUpdate }: ContentManagerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [editingFile, setEditingFile] = useState<ContentFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', name: 'Todos', icon: FolderOpen },
    { id: 'recorded', name: 'Contenido Grabado', icon: Video },
    { id: 'edited', name: 'Editado', icon: File },
    { id: 'resources', name: 'Recursos de Edición', icon: Image },
    { id: 'overlays', name: 'Overlays', icon: FileText },
    { id: 'documents', name: 'Documentos', icon: FileText },
    { id: 'audio', name: 'Audio', icon: Music },
    { id: 'other', name: 'Otros', icon: File }
  ];

  const addFile = (file: Omit<ContentFile, 'id' | 'uploadedAt'>) => {
    const newFile: ContentFile = {
      ...file,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };
    
    const updatedProject = {
      ...project,
      content: [...project.content, newFile]
    };
    
    onUpdate(updatedProject);
    setIsAddingFile(false);
  };

  const updateFile = (updatedFile: ContentFile) => {
    const updatedContent = { ...project.content };
    
    // Buscar y actualizar el archivo en todas las categorías
    Object.keys(updatedContent).forEach(category => {
      if (Array.isArray(updatedContent[category as keyof typeof updatedContent])) {
        updatedContent[category as keyof typeof updatedContent] = 
          (updatedContent[category as keyof typeof updatedContent] as ContentFile[])
            .map(file => file.id === updatedFile.id ? updatedFile : file);
      }
    });
    
    const updatedProject = {
      ...project,
      content: updatedContent
    };
    
    onUpdate(updatedProject);
    setEditingFile(null);
  };

  const deleteFile = (fileId: string) => {
    const updatedContent = { ...project.content };
    
    // Buscar y eliminar el archivo de todas las categorías
    Object.keys(updatedContent).forEach(category => {
      if (Array.isArray(updatedContent[category as keyof typeof updatedContent])) {
        updatedContent[category as keyof typeof updatedContent] = 
          (updatedContent[category as keyof typeof updatedContent] as ContentFile[])
            .filter(file => file.id !== fileId);
      }
    });
    
    const updatedProject = {
      ...project,
      content: updatedContent
    };
    
    onUpdate(updatedProject);
  };

  const handleFileUpload = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = Date.now().toString() + i;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Simulate upload with progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(uploadInterval);
            
            // Add file to project after upload completes
            const newFile: ContentFile = {
              id: fileId,
              name: file.name,
              type: getFileType(file.type),
              category: 'other',
              url: URL.createObjectURL(file), // In real app, this would be the uploaded URL
              driveId: '', // Would be set after Google Drive upload
              size: file.size,
              uploadedAt: new Date().toISOString(),
              description: ''
            };
            
            const updatedProject = {
              ...project,
              content: [...project.content, newFile]
            };
            
            onUpdate(updatedProject);
            
            // Remove from progress tracking
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
            
            return prev;
          }
          
          return {
            ...prev,
            [fileId]: Math.min(currentProgress + Math.random() * 20, 100)
          };
        });
      }, 200);
    }
  };

  const getFileType = (mimeType: string): ContentFile['type'] => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('document') || mimeType.includes('pdf')) return 'document';
    return 'other';
  };

  const getFileIcon = (type: ContentFile['type']) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'audio': return <Music className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Obtener todos los archivos de todas las categorías
  const allFiles: ContentFile[] = [];
  Object.values(project.content).forEach(categoryFiles => {
    if (Array.isArray(categoryFiles)) {
      allFiles.push(...categoryFiles);
    }
  });
  
  const filteredFiles = allFiles.filter(file => {
    const matchesCategory = activeCategory === 'all' || 
      Object.entries(project.content).some(([category, files]) => 
        category === activeCategory && Array.isArray(files) && files.some(f => f.id === file.id)
      );
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Gestor de Contenido</h2>
          <p className="text-gray-600">Organiza todos los archivos y recursos de tu proyecto</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir Archivos
          </Button>
          
          <Dialog open={isAddingFile} onOpenChange={setIsAddingFile}>
            <DialogTrigger asChild>
              <Button>
                <Link className="h-4 w-4 mr-2" />
                Añadir Enlace
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir Enlace de Google Drive</DialogTitle>
                <DialogDescription>
                  Añade un enlace a un archivo almacenado en Google Drive
                </DialogDescription>
              </DialogHeader>
              <FileForm onSubmit={addFile} onCancel={() => setIsAddingFile(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Subiendo archivos...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Archivo {fileId}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {category.name}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* File Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{file.name}</h4>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {file.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingFile(file)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Description */}
                {file.description && (
                  <p className="text-xs text-gray-600">{file.description}</p>
                )}
                
                {/* Badges */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {categories.find(c => c.id === file.category)?.name || file.category}
                  </Badge>
                  
                  <Badge variant="secondary">
                    {file.type}
                  </Badge>
                </div>
                
                {/* Google Drive Info */}
                {file.driveId && (
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Cloud className="h-3 w-3 mr-1" />
                      Google Drive
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(file.driveId!)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {/* Upload Date */}
                <div className="text-xs text-gray-500">
                  Subido: {new Date(file.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm || activeCategory !== 'all' 
                ? 'No se encontraron archivos' 
                : 'No hay archivos en este proyecto'
              }
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || activeCategory !== 'all'
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza subiendo archivos o añadiendo enlaces de Google Drive'
              }
            </p>
            {!searchTerm && activeCategory === 'all' && (
              <div className="flex justify-center space-x-2">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Archivos
                </Button>
                <Button variant="outline" onClick={() => setIsAddingFile(true)}>
                  <Link className="h-4 w-4 mr-2" />
                  Añadir Enlace
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit File Dialog */}
      {editingFile && (
        <Dialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Archivo</DialogTitle>
              <DialogDescription>
                Modifica la información del archivo
              </DialogDescription>
            </DialogHeader>
            <FileForm 
              file={editingFile} 
              onSubmit={updateFile} 
              onCancel={() => setEditingFile(null)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// File Form Component
function FileForm({ 
  file, 
  onSubmit, 
  onCancel 
}: { 
  file?: ContentFile; 
  onSubmit: (file: any) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: file?.name || '',
    description: file?.description || '',
    url: file?.url || '',
    driveId: file?.driveId || '',
    category: file?.category || 'other',
    type: file?.type || 'other'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) return;
    
    const fileData = {
      ...formData,
      size: file?.size || 0
    };
    
    onSubmit(fileData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Nombre del archivo *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nombre del archivo"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>URL del archivo *</Label>
        <Input
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://drive.google.com/file/d/..."
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>ID de Google Drive</Label>
        <Input
          value={formData.driveId}
          onChange={(e) => setFormData({ ...formData, driveId: e.target.value })}
          placeholder="ID del archivo en Google Drive"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción del archivo"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recorded">Contenido Grabado</SelectItem>
              <SelectItem value="edited">Editado</SelectItem>
              <SelectItem value="resources">Recursos de Edición</SelectItem>
              <SelectItem value="overlays">Overlays</SelectItem>
              <SelectItem value="documents">Documentos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="other">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Tipo</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="image">Imagen</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="document">Documento</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {file ? 'Actualizar' : 'Añadir'} Archivo
        </Button>
      </div>
    </form>
  );
}