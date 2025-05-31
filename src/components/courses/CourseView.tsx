import React, { useState, useEffect } from 'react';
import { Course, Video, Review, Task } from '@/types/courses'; // Asegúrate que la ruta sea correcta
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, PlayCircle, ListChecks, ArrowLeft } from 'lucide-react';

// Datos de ejemplo mejorados
const initialMockCourses: Course[] = [
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
  console.log('VideoPlayer props:', video); // Log para depuración
  if (!video) {
    return (
      <div className="aspect-video w-full bg-gray-700 flex items-center justify-center rounded-lg">
        <PlayCircle className="h-16 w-16 text-gray-500" />
        <p className="ml-4 text-gray-400 text-lg">Selecciona un video de la lista.</p>
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
    return <div className="aspect-video w-full bg-gray-700 flex items-center justify-center rounded-lg text-red-400"><p>Error: Formato de video no soportado o URL inválida.</p></div>;
  }

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
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

const CourseView: React.FC = () => {
  console.log('CourseView component mounted'); // Log para depuración
  const [courses, setCourses] = useState<Course[]>(initialMockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    if (selectedCourse) {
      const initialTasks: Record<string, Record<string, boolean>> = {};
      initialTasks[selectedCourse.id] = {};
      selectedCourse.sections.forEach(section => {
        section.tasks.forEach(task => {
          initialTasks[selectedCourse.id][task.id] = task.isCompleted;
        });
      });
      setCompletedTasks(prev => ({ ...prev, ...initialTasks }));
      // Seleccionar el primer video de la primera sección por defecto
      if (selectedCourse.sections.length > 0 && selectedCourse.sections[0].videos.length > 0) {
        setSelectedVideo(selectedCourse.sections[0].videos[0]);
      } else {
        setSelectedVideo(null);
      }
    } else {
      setSelectedVideo(null); // Limpiar video si no hay curso seleccionado
    }
  }, [selectedCourse]);

  const handleToggleTask = (courseId: string, taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [taskId]: !prev[courseId]?.[taskId],
      },
    }));
    // Aquí se podría añadir lógica para persistir este cambio (e.g., API call)
  };

  if (selectedCourse) {
    const currentCourseTasks = completedTasks[selectedCourse.id] || {};
    return (
      <div className="p-4 md:p-6 bg-gray-900 text-gray-100 min-h-screen">
        <Button onClick={() => setSelectedCourse(null)} className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out flex items-center shadow-md">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Cursos
        </Button>

        <div className="lg:flex lg:space-x-6">
          {/* Columna Izquierda: Video Player y Detalles del Curso */}
          <div className="lg:w-2/3 mb-6 lg:mb-0">
            <VideoPlayer video={selectedVideo} />
            <Card className="mt-6 bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-white">{selectedCourse.title}</CardTitle>
                <CardDescription className="text-indigo-400">Por: {selectedCourse.instructor}</CardDescription>
                <p className="text-sm text-gray-400">Última actualización: {new Date(selectedCourse.lastUpdated).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{selectedCourse.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha: Secciones, Videos y Tareas */}
          <div className="lg:w-1/3 bg-gray-800 p-1 rounded-lg shadow-xl" >
            <div className="overflow-y-auto h-full max-h-[calc(100vh-120px)] p-5 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-850">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-3">Contenido del Curso</h2>
            <Accordion type="multiple" defaultValue={selectedCourse.sections.map(s => s.id)} className="w-full">
              {selectedCourse.sections.map((section, sectionIndex) => (
                <AccordionItem value={section.id} key={section.id} className="border-b-0 mb-3 bg-gray-750 rounded-lg overflow-hidden">
                  <AccordionTrigger className="hover:bg-gray-700 px-4 py-3 text-indigo-300 hover:text-indigo-200">
                    <div className="flex flex-col text-left">
                        <span className="font-semibold">{section.title}</span>
                        <span className="text-xs text-gray-400">{section.videos.length} videos, {section.tasks.length} tareas</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-750 px-0 pb-0">
                    {section.description && <p className="px-4 pb-2 pt-1 text-sm text-gray-400">{section.description}</p>}
                    <ul className="list-none p-0 m-0">
                      {section.videos.map((video) => (
                        <li
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`px-4 py-3 border-t border-gray-700 cursor-pointer hover:bg-gray-700 transition duration-150 flex items-center justify-between ${selectedVideo?.id === video.id ? 'bg-indigo-600 text-white font-semibold' : 'text-gray-300 hover:text-indigo-300'}`}
                        >
                          <div className="flex items-center">
                            <PlayCircle className={`h-5 w-5 mr-3 ${selectedVideo?.id === video.id ? 'text-white' : 'text-indigo-400'}`} />
                            {video.title}
                          </div>
                          <span className="text-xs text-gray-400">{video.duration}</span>
                        </li>
                      ))}
                    </ul>
                    {section.tasks.length > 0 && (
                      <div className="mt-2 p-4 border-t border-gray-700">
                        <h4 className="text-sm font-semibold text-indigo-400 mb-2 flex items-center">
                          <ListChecks className="h-4 w-4 mr-2" /> Tareas de esta sección:
                        </h4>
                        <ul className="space-y-2">
                          {section.tasks.map((task) => (
                            <li key={task.id} className="text-gray-300 flex items-center">
                              <Checkbox
                                id={`task-${selectedCourse.id}-${task.id}`}
                                checked={currentCourseTasks[task.id] || false}
                                onCheckedChange={() => handleToggleTask(selectedCourse.id, task.id)}
                                className="form-checkbox h-4 w-4 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-400 mr-2 cursor-pointer"
                              />
                              <label htmlFor={`task-${selectedCourse.id}-${task.id}`} className={`text-sm cursor-pointer ${currentCourseTasks[task.id] ? 'line-through text-gray-500' : ''}`}>
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
            </div>
          </div>
        </div>

        {/* Sección de Reseñas */}
        <Card className="mt-8 bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Reseñas ({selectedCourse.reviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCourse.reviews.length > 0 ? (
              <div className="space-y-4">
                {selectedCourse.reviews.map(review => (
                  <Card key={review.id} className="bg-gray-750 border-gray-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-indigo-400">{review.userName}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 whitespace-pre-line">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Aún no hay reseñas para este curso. ¡Sé el primero en dejar una!</p>
            )}
            {/* TODO: Formulario para añadir nuevas reseñas */}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Vista de lista de cursos
  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-12">Descubre Nuestros Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <Card 
            key={course.id} 
            className="bg-gray-800 border-gray-700 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer group"
            onClick={() => setSelectedCourse(course)}
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={course.thumbnailUrl || 'https://via.placeholder.com/350x200/4B5563/FFFFFF?text=Curso'} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold text-white mb-1 truncate" title={course.title}>{course.title}</CardTitle>
              <CardDescription className="text-indigo-400 text-sm mb-2">Por: {course.instructor}</CardDescription>
              <p className="text-gray-400 text-sm mb-3 h-16 overflow-hidden leading-relaxed">{course.description.substring(0, 100)}{course.description.length > 100 ? '...' : ''}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < course.overallRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  ))}
                  <span className="text-gray-400 text-xs ml-1">({course.overallRating.toFixed(1)} de {course.reviews.length} reseñas)</span>
                </div>
                {course.enrollmentCount && 
                  <span className="text-xs text-gray-400">{course.enrollmentCount} estudiantes</span>
                }
              </div>
              {course.tags && course.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="inline-block bg-gray-700 text-indigo-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Ver Detalles del Curso
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseView;