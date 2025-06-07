'use client';

import React, { useState, useEffect } from 'react';
import { Learning, Video } from '../../types/learning';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { Star, PlayCircle, ListChecks, ArrowLeft, Plus } from 'lucide-react';
import LearningCreator from './LearningCreator';
import { toast } from '../../hooks/use-toast';

// Datos de ejemplo mejorados
const initialMockLearning: Learning[] = [
  {
    id: '1',
    title: 'Curso de React Avanzado y Moderno',
    description: 'Domina React desde los fundamentos hasta técnicas avanzadas como Hooks, Context API, y patrones de rendimiento. Crea aplicaciones web interactivas y eficientes.',
    instructor: 'Juanita Pérez',
    thumbnailUrl: 'https://via.placeholder.com/350x200/6366F1/FFFFFF?text=React+Pro',
    sections: [
      {
        id: 's1',
        title: 'Módulo 1: Fundamentos Esenciales y Hooks',
        videos: [
          { id: 'v1', title: 'Introducción a JSX y Componentes Funcionales', type: 'youtube', url: 'dQw4w9WgXcQ', duration: '10:32' },
          { id: 'v2', title: 'Estado con useState y Efectos con useEffect', type: 'youtube', url: 'rokGy0huYEA', duration: '18:45' },
          { id: 'v2b', title: 'Manejo de Estado Global con useContext', type: 'vimeo', url: '123456789', duration: '14:20' }, // Ejemplo Vimeo
        ],
        tasks: [
          { id: 't1', description: 'Crear un componente de contador simple usando useState.', isCompleted: false },
          { id: 't2', description: 'Implementar un fetch de datos con useEffect y mostrar loading/error states.', isCompleted: false },
        ],
        description: 'Comprende los bloques de construcción de React y cómo manejar el estado y los efectos secundarios de manera efectiva.'
      },
      {
        id: 's2',
        title: 'Módulo 2: Optimización, Patrones y Rutas',
        videos: [
          { id: 'v3', title: 'Memoización con React.memo, useMemo, useCallback', type: 'googledrive', url: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs', duration: '22:10' }, 
          { id: 'v4', title: 'Lazy Loading y Code Splitting', type: 'youtube', url: 'exampleVideoId2', duration: '16:50' },
        ],
        tasks: [
          { id: 't3', description: 'Optimizar un componente de lista usando React.memo.', isCompleted: false },
          { id: 't4', description: 'Configurar rutas básicas con React Router.', isCompleted: false },
        ],
        description: 'Aprende a optimizar tus aplicaciones React y a estructurar la navegación con React Router.'
      },
    ],
    overallRating: 4.8,
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'Ana López', rating: 5, comment: '¡Excelente curso! Muy bien explicado y con ejemplos prácticos. Lo recomiendo totalmente.', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() }, // Hace 5 días
      { id: 'r2', userId: 'u2', userName: 'Carlos Ruiz', rating: 4, comment: 'Buen contenido, el instructor explica claro. Me gustaría más ejemplos con TypeScript.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() }, // Hace 2 días
    ],
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Rendimiento'],
    enrollmentCount: 1850,
    lastUpdated: new Date(Date.now() - 86400000 * 10).toISOString(), // Hace 10 días
  },
  {
    id: '2',
    title: 'Backend con Node.js, Express y MongoDB',
    description: 'Construye APIs RESTful robustas y escalables. Aprende a integrar bases de datos NoSQL y a implementar autenticación y seguridad.',
    instructor: 'Roberto Gómez',
    thumbnailUrl: 'https://via.placeholder.com/350x200/10B981/FFFFFF?text=Node.js+Backend',
    sections: [
      {
        id: 's3',
        title: 'Fundamentos de Node.js y Express',
        videos: [
          { id: 'v5', title: 'Configuración del Entorno y Primer Servidor', type: 'youtube', url: 'anotherYoutubeId1', duration: '12:00' },
          { id: 'v6', title: 'Rutas, Middlewares y Manejo de Errores', type: 'googledrive', url: 'anotherGoogleDriveId', duration: '20:15' },
        ],
        tasks: [
          { id: 't5', description: 'Crear un endpoint GET básico que devuelva un JSON.', isCompleted: false },
        ],
        description: 'Iníciate en el desarrollo backend con las herramientas más populares del ecosistema JavaScript.'
      },
    ],
    overallRating: 4.6,
    reviews: [
      { id: 'r3', userId: 'u3', userName: 'Laura García', rating: 5, comment: 'Muy práctico y directo al grano. Ideal para empezar con backend.', createdAt: new Date(Date.now() - 86400000 * 7).toISOString() },
    ],
    tags: ['Node.js', 'Express', 'MongoDB', 'Backend', 'API'],
    enrollmentCount: 980,
    lastUpdated: new Date(Date.now() - 86400000 * 3).toISOString(),
  }
];

const VideoPlayer: React.FC<{ video: Video | null }> = ({ video }) => {
  if (!video) {
    return (
      <div className="aspect-video w-full bg-muted/20 flex items-center justify-center rounded-lg border">
        <div className="flex flex-col items-center gap-2">
          <PlayCircle className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Selecciona un video de la lista</p>
        </div>
      </div>
    );
  }

  const getEmbedUrl = () => {
    if (video.type === 'youtube') {
      return `https://www.youtube.com/embed/${video.url}`;
    }
    // Temporalmente deshabilitado para depuración
    // if (video.type === 'googledrive') {
    //   // Ajuste para URLs de Google Drive más comunes (reemplazar /view por /preview)
    //   if (video.url.includes('/view')) {
    //     return video.url.replace('/view', '/preview');
    //   } 
    //   // Para URLs con /file/d/FILE_ID/edit o similar, transformarlas a /file/d/FILE_ID/preview
    //   const fileIdMatch = video.url.match(/\/file\/d\/([^\/]+)/);
    //   if (fileIdMatch && fileIdMatch[1]) {
    //     return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    //   }
    //   return video.url; // Fallback si no se puede transformar
    // }
    // if (video.type === 'vimeo') {
    //   return `https://player.vimeo.com/video/${video.url}`;
    // }
    return '';
  };

  const embedUrl = getEmbedUrl();

  if (!embedUrl) {
    return (
      <div className="aspect-video w-full bg-destructive/10 flex items-center justify-center rounded-lg border border-destructive/20">
        <p className="text-destructive">Error: Formato de video no soportado o URL inválida</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border">
      <iframe
        src={embedUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

const LearningView: React.FC = () => {
  const [learningItems, setLearningItems] = useState<Learning[]>(initialMockLearning);
  const [selectedLearning, setSelectedLearning] = useState<Learning | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, Record<string, boolean>>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (selectedLearning) {
      const initialTasks: Record<string, Record<string, boolean>> = {};
      initialTasks[selectedLearning.id] = {};
      selectedLearning.sections.forEach(section => {
        section.tasks.forEach(task => {
          initialTasks[selectedLearning.id][task.id] = task.isCompleted;
        });
      });
      setCompletedTasks(prev => ({ ...prev, ...initialTasks }));
      if (selectedLearning.sections.length > 0 && selectedLearning.sections[0].videos.length > 0) {
        setSelectedVideo(selectedLearning.sections[0].videos[0]);
      } else {
        setSelectedVideo(null);
      }
    } else {
      setSelectedVideo(null);
    }
  }, [selectedLearning]);

  const handleToggleTask = (learningId: string, taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [learningId]: {
        ...prev[learningId],
        [taskId]: !prev[learningId]?.[taskId],
      },
    }));
  };

  if (selectedLearning) {
    const currentLearningTasks = completedTasks[selectedLearning.id] || {};
    return (
      <div className="p-6">
        <Button onClick={() => setSelectedLearning(null)} variant="outline" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Aprendizaje
        </Button>

        <div className="lg:flex lg:space-x-6">
          {/* Columna Izquierda: Video Player y Detalles del Curso */}
          <div className="lg:w-2/3 mb-6 lg:mb-0">
            <VideoPlayer video={selectedVideo} />
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{selectedLearning.title}</CardTitle>
                <CardDescription>Por: {selectedLearning.instructor}</CardDescription>
                <p className="text-sm text-muted-foreground">Última actualización: {new Date(selectedLearning.lastUpdated).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{selectedLearning.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha: Secciones, Videos y Tareas */}
          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contenido del Aprendizaje</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="multiple" defaultValue={selectedLearning.sections.map(s => s.id)} className="w-full">
              {selectedLearning.sections.map((section, _sectionIndex) => (
                <AccordionItem value={section.id} key={section.id} className="px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col text-left">
                        <span className="font-semibold">{section.title}</span>
                        <span className="text-xs text-muted-foreground">{section.videos.length} videos, {section.tasks.length} tareas</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-4">
                    {section.description && <p className="px-0 pb-3 text-sm text-muted-foreground">{section.description}</p>}
                    <ul className="list-none p-0 m-0">
                      {section.videos.map((video) => (
                        <li
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`px-0 py-2 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between rounded-md ${selectedVideo?.id === video.id ? 'bg-primary text-primary-foreground' : ''}`}
                        >
                          <div className="flex items-center gap-2 px-2">
                            <PlayCircle className="h-4 w-4" />
                            <span className="text-sm">{video.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground px-2">{video.duration}</span>
                        </li>
                      ))}
                    </ul>
                    {section.tasks.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <ListChecks className="h-4 w-4" /> Tareas de esta sección:
                        </h4>
                        <ul className="space-y-2">
                          {section.tasks.map((task) => (
                            <li key={task.id} className="flex items-start gap-2">
                              <Checkbox
                                id={`task-${selectedLearning.id}-${task.id}`}
                                checked={currentLearningTasks[task.id] || false}
                                onCheckedChange={() => handleToggleTask(selectedLearning.id, task.id)}
                                className="mt-0.5"
                              />
                              <label htmlFor={`task-${selectedLearning.id}-${task.id}`} className={`text-sm cursor-pointer ${currentLearningTasks[task.id] ? 'line-through text-muted-foreground' : ''}`}>
                                {task.description}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de Reseñas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Reseñas ({selectedLearning.reviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLearning.reviews.length > 0 ? (
              <div className="space-y-4">
                {selectedLearning.reviews.map(review => (
                  <Card key={review.id} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{review.userName}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aún no hay reseñas para este aprendizaje. ¡Sé el primero en dejar una!</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSaveLearning = (newLearning: Learning) => {
    setLearningItems([newLearning, ...learningItems]);
    setIsCreating(false);
    toast({
      title: "Aprendizaje creado",
      description: "El nuevo aprendizaje se ha agregado a tu lista."
    });
  };

  if (isCreating) {
    return <LearningCreator onSave={handleSaveLearning} onCancel={() => setIsCreating(false)} />;
  }

  // Vista de lista de aprendizajes
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Aprendizaje</h1>
          <p className="text-muted-foreground">Descubre nuestros contenidos de aprendizaje</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Crear Aprendizaje
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningItems.map(learning => (
          <Card 
            key={learning.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => setSelectedLearning(learning)}
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img 
                  src={learning.thumbnailUrl || 'https://via.placeholder.com/350x200/6366F1/FFFFFF?text=Aprendizaje'} 
                  alt={learning.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-1 line-clamp-2">{learning.title}</CardTitle>
              <CardDescription className="text-sm mb-2">Por: {learning.instructor}</CardDescription>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{learning.description}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < learning.overallRating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({learning.overallRating.toFixed(1)})</span>
                </div>
                {learning.enrollmentCount && 
                  <span className="text-xs text-muted-foreground">{learning.enrollmentCount} estudiantes</span>
                }
              </div>
              {learning.tags && learning.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {learning.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={(e) => { e.stopPropagation(); setSelectedLearning(learning); }} className="w-full" size="sm">
                Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningView;