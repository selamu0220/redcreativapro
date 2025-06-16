'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';
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
      description: 'InteractÃºa con asistentes de inteligencia artificial',
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
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Red Creativa Pro - Plataforma Integral para Creativos
        </h1>
        <h2 className={styles.subtitle}>
          Tu solución completa para la gestión de proyectos creativos,
        contenido digital y colaboración profesional.
        </p>
      </div>

      {/* Features Grid */}
      <section className={styles.featuresGrid}>
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Nuestros Servicios
        </h2>
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Card 
              key={feature.path} 
              className={styles.featureCard}
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <IconComponent className={`${styles.featureIcon} ${feature.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className={styles.featureTitle}>
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className={styles.featureCardContent}>
                <CardDescription className={styles.featureDescription}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      </section>

      {/* Quick Actions */}
      <section className="bg-muted/50 rounded-lg p-6 space-y-4">
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
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h2 className="col-span-full text-2xl font-semibold text-foreground mb-4">
          Estadísticas de tu Cuenta
        </h2>
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
      </section>
    </div>
  );
};

export default HomePage;
