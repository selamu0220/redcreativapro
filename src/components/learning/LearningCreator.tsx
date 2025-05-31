import React, { useState } from 'react';
import { Learning, LearningSection, Video } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Save, Video as VideoIcon, Youtube, HardDrive, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LearningCreatorProps {
  onSave: (learning: Learning) => void;
  onCancel: () => void;
}

interface VideoForm {
  title: string;
  type: 'youtube' | 'googledrive';
  url: string;
  duration: string;
}

interface SectionForm {
  id: string;
  title: string;
  description: string;
  videos: VideoForm[];
}

const LearningCreator: React.FC<LearningCreatorProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    thumbnailUrl: '',
    tags: [] as string[],
  });
  
  const [sections, setSections] = useState<SectionForm[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const [videoForm, setVideoForm] = useState<VideoForm>({
    title: '',
    type: 'youtube',
    url: '',
    duration: ''
  });

  const extractVideoId = (url: string, type: 'youtube' | 'googledrive'): string => {
    if (type === 'youtube') {
      // Extraer ID de YouTube de diferentes formatos de URL
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return url; // Si no coincide con ningún patrón, devolver la URL original
    }
    
    if (type === 'googledrive') {
      // Extraer ID de Google Drive
      const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (match) return match[1];
      return url; // Si no coincide, devolver la URL original
    }
    
    return url;
  };

  const addSection = () => {
    const newSection: SectionForm = {
      id: `section-${Date.now()}`,
      title: '',
      description: '',
      videos: []
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (index: number, field: keyof SectionForm, value: string) => {
    const updatedSections = [...sections];
    if (field === 'videos') return; // Los videos se manejan por separado
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const openVideoDialog = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setVideoForm({ title: '', type: 'youtube', url: '', duration: '' });
    setShowVideoDialog(true);
  };

  const addVideo = () => {
    if (currentSectionIndex === null) return;
    
    if (!videoForm.title || !videoForm.url) {
      toast({
        title: "Error",
        description: "Por favor completa el título y la URL del video.",
        variant: "destructive"
      });
      return;
    }

    const processedUrl = extractVideoId(videoForm.url, videoForm.type);
    const newVideo: VideoForm = {
      ...videoForm,
      url: processedUrl
    };

    const updatedSections = [...sections];
    updatedSections[currentSectionIndex].videos.push(newVideo);
    setSections(updatedSections);
    
    setShowVideoDialog(false);
    setVideoForm({ title: '', type: 'youtube', url: '', duration: '' });
    
    toast({
      title: "Video agregado",
      description: "El video se ha agregado correctamente a la sección."
    });
  };

  const removeVideo = (sectionIndex: number, videoIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.splice(videoIndex, 1);
    setSections(updatedSections);
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.instructor) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    if (sections.length === 0) {
      toast({
        title: "Error",
        description: "Debes agregar al menos una sección con videos.",
        variant: "destructive"
      });
      return;
    }

    const processedSections: LearningSection[] = sections.map(section => ({
      id: section.id,
      title: section.title,
      description: section.description,
      videos: section.videos.map((video, index) => ({
        id: `${section.id}-video-${index}`,
        title: video.title,
        type: video.type,
        url: video.url,
        duration: video.duration || '0:00'
      })),
      tasks: [] // Por ahora sin tareas, se pueden agregar después
    }));

    const newLearning: Learning = {
      id: `learning-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      instructor: formData.instructor,
      thumbnailUrl: formData.thumbnailUrl || undefined,
      sections: processedSections,
      overallRating: 0,
      reviews: [],
      tags: formData.tags,
      enrollmentCount: 0,
      lastUpdated: new Date().toISOString()
    };

    onSave(newLearning);
    
    toast({
      title: "Aprendizaje creado",
      description: "El nuevo aprendizaje se ha creado exitosamente."
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Crear Nuevo Aprendizaje</h1>
        <p className="text-muted-foreground">Crea contenido educativo importando videos de YouTube y Google Drive</p>
      </div>

      <div className="space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Datos generales del aprendizaje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Curso de React Avanzado"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe de qué trata este aprendizaje..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="instructor">Instructor *</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="Nombre del instructor"
              />
            </div>
            
            <div>
              <Label htmlFor="thumbnail">URL de Miniatura (opcional)</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            
            <div>
              <Label>Etiquetas</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Agregar etiqueta"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Secciones y Videos</CardTitle>
                <CardDescription>Organiza el contenido en secciones temáticas</CardDescription>
              </div>
              <Button onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Sección
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {sections.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <VideoIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay secciones creadas. Agrega una sección para comenzar.</p>
              </div>
            ) : (
              <Accordion type="multiple" defaultValue={sections.map(s => s.id)} className="w-full">
                {sections.map((section, sectionIndex) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full mr-4">
                        <span>{section.title || `Sección ${sectionIndex + 1}`}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{section.videos.length} videos</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSection(sectionIndex);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label>Título de la Sección</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                          placeholder="Ej: Módulo 1: Fundamentos"
                        />
                      </div>
                      
                      <div>
                        <Label>Descripción</Label>
                        <Textarea
                          value={section.description}
                          onChange={(e) => updateSection(sectionIndex, 'description', e.target.value)}
                          placeholder="Describe el contenido de esta sección..."
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label>Videos</Label>
                          <Button
                            onClick={() => openVideoDialog(sectionIndex)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Video
                          </Button>
                        </div>
                        
                        {section.videos.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground border-2 border-dashed rounded-lg">
                            <p>No hay videos en esta sección</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {section.videos.map((video, videoIndex) => (
                              <div key={videoIndex} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  {video.type === 'youtube' ? (
                                    <Youtube className="h-5 w-5 text-red-500" />
                                  ) : (
                                    <HardDrive className="h-5 w-5 text-blue-500" />
                                  )}
                                  <div>
                                    <p className="font-medium">{video.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {video.duration} • {video.type === 'youtube' ? 'YouTube' : 'Google Drive'}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeVideo(sectionIndex, videoIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Aprendizaje
          </Button>
        </div>
      </div>

      {/* Dialog para agregar videos */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Video</DialogTitle>
            <DialogDescription>
              Importa un video desde YouTube o Google Drive
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Plataforma</Label>
              <Select
                value={videoForm.type}
                onValueChange={(value: 'youtube' | 'googledrive') => 
                  setVideoForm({ ...videoForm, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-red-500" />
                      YouTube
                    </div>
                  </SelectItem>
                  <SelectItem value="googledrive">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-blue-500" />
                      Google Drive
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Título del Video</Label>
              <Input
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                placeholder="Ej: Introducción a React"
              />
            </div>
            
            <div>
              <Label>URL del Video</Label>
              <Input
                value={videoForm.url}
                onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                placeholder={
                  videoForm.type === 'youtube' 
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://drive.google.com/file/d/.../view"
                }
              />
            </div>
            
            <div>
              <Label>Duración (opcional)</Label>
              <Input
                value={videoForm.duration}
                onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                placeholder="Ej: 15:30"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVideoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={addVideo}>
              Agregar Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningCreator;