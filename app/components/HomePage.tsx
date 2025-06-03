'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  FileText, 
  FolderOpen, 
  MessageSquare, 
  Lightbulb, 
  Video, 
  Image,
  BookOpen,
  CheckSquare
} from 'lucide-react';

const HomePage = () => {
  const router = useRouter();

  const features = [
    {
      title: 'Blog',
      description: 'Gestiona y publica contenido de blog profesional',
      icon: FileText,
      path: '/blog',
      color: 'text-blue-600'
    },
    {
      title: 'Calendario',
      description: 'Organiza eventos y citas importantes',
      icon: Calendar,
      path: '/calendario',
      color: 'text-green-600'
    },
    {
      title: 'Proyectos',
      description: 'Administra proyectos creativos y colaborativos',
      icon: FolderOpen,
      path: '/proyectos',
      color: 'text-purple-600'
    },
    {
      title: 'Tareas',
      description: 'Organiza y da seguimiento a tus tareas',
      icon: CheckSquare,
      path: '/tareas',
      color: 'text-orange-600'
    },
    {
      title: 'Chat IA',
      description: 'Interactúa con asistentes de inteligencia artificial',
      icon: MessageSquare,
      path: '/chat',
      color: 'text-cyan-600'
    },
    {
      title: 'Prompts',
      description: 'Biblioteca de prompts para IA optimizados',
      icon: Lightbulb,
      path: '/prompts',
      color: 'text-yellow-600'
    },
    {
      title: 'Scripts',
      description: 'Guiones y scripts para contenido audiovisual',
      icon: Video,
      path: '/scripts',
      color: 'text-red-600'
    },
    {
      title: 'Miniaturas',
      description: 'Diseña thumbnails atractivos para tus videos',
      icon: Image,
      path: '/miniaturas',
      color: 'text-pink-600'
    },
    {
      title: 'Recursos',
      description: 'Biblioteca de recursos digitales y plantillas',
      icon: BookOpen,
      path: '/recursos',
      color: 'text-indigo-600'
    }
  ];

  const handleFeatureClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Bienvenido a Red Creativa Pro
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tu plataforma integral para la gestión de proyectos creativos, 
          contenido digital y colaboración profesional.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card 
              key={feature.path} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                    <IconComponent className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Acciones Rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => router.push('/proyectos')} 
            className="flex items-center space-x-2"
          >
            <FolderOpen className="h-4 w-4" />
            <span>Nuevo Proyecto</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/blog')} 
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Escribir Post</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/chat')} 
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat con IA</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/calendario')} 
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Ver Calendario</span>
          </Button>
        </div>
      </div>

      {/* Stats or Recent Activity could go here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proyectos Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Posts Publicados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              +5 esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recursos Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Plantillas y recursos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;