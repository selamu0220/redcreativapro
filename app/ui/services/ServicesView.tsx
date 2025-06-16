'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Button } from '../button';
import { Badge } from '../badge';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  FileText,
  Sparkles,
  Image,
  Video,
  MessageSquare,
  BarChart3,
  Palette,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

export function ServicesView() {
  const router = useRouter();

  const services = [
    {
      title: 'Blog de Marketing Digital',
      description: 'Artículos especializados sobre estrategias de marketing, SEO, redes sociales y creación de contenido.',
      icon: BookOpen,
      features: ['Artículos semanales', 'Guías paso a paso', 'Casos de estudio', 'Tendencias actuales'],
      path: '/blog',
      color: 'text-blue-600',
      badge: 'Más Popular'
    },
    {
      title: 'Recursos Creativos',
      description: 'Biblioteca completa de plantillas, herramientas y recursos para potenciar tu creatividad.',
      icon: Palette,
      features: ['Plantillas descargables', 'Herramientas gratuitas', 'Recursos premium', 'Actualizaciones constantes'],
      path: '/recursos',
      color: 'text-purple-600',
      badge: 'Nuevo'
    },
    {
      title: 'Calendario Editorial',
      description: 'Organiza y planifica tu contenido con nuestro sistema de calendario inteligente.',
      icon: Calendar,
      features: ['Planificación mensual', 'Recordatorios automáticos', 'Colaboración en equipo', 'Analytics integrados'],
      path: '/calendario',
      color: 'text-green-600'
    },
    {
      title: 'Prompts de IA',
      description: 'Biblioteca curada de prompts optimizados para ChatGPT, Claude y otras IAs.',
      icon: Sparkles,
      features: ['500+ prompts', 'Categorías especializadas', 'Actualizaciones semanales', 'Prompts personalizados'],
      path: '/prompts',
      color: 'text-yellow-600',
      badge: 'IA'
    },
    {
      title: 'Diseño de Miniaturas',
      description: 'Crea thumbnails atractivos para YouTube y redes sociales con nuestras plantillas.',
      icon: Image,
      features: ['Plantillas profesionales', 'Editor integrado', 'Múltiples formatos', 'Exportación HD'],
      path: '/miniaturas',
      color: 'text-pink-600'
    },
    {
      title: 'Scripts y Guiones',
      description: 'Plantillas y herramientas para crear guiones de video, podcasts y contenido audiovisual.',
      icon: Video,
      features: ['Plantillas de guiones', 'Estructura narrativa', 'Timing automático', 'Colaboración'],
      path: '/scripts',
      color: 'text-red-600'
    },
    {
      title: 'Chat con IA',
      description: 'Asistente de IA especializado en marketing digital y creatividad.',
      icon: MessageSquare,
      features: ['Consultas ilimitadas', 'Especializado en marketing', 'Respuestas contextuales', 'Historial guardado'],
      path: '/chat',
      color: 'text-cyan-600'
    },
    {
      title: 'Gestión de Tareas',
      description: 'Organiza tus proyectos creativos con nuestro sistema de gestión de tareas.',
      icon: BarChart3,
      features: ['Proyectos ilimitados', 'Seguimiento de progreso', 'Deadlines automáticos', 'Reportes detallados'],
      path: '/tareas',
      color: 'text-orange-600'
    }
  ];

  const benefits = [
    'Acceso completo a todas las herramientas',
    'Actualizaciones constantes de contenido',
    'Soporte técnico especializado',
    'Comunidad de creativos profesionales',
    'Recursos descargables ilimitados',
    'Integración con herramientas populares'
  ];

  const handleServiceClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Nuestros Servicios para Creativos
        </h1>
        <h2 className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Herramientas profesionales diseñadas específicamente para creativos, marketers y profesionales del contenido digital.
        </h2>
      </header>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card 
              key={service.path} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              onClick={() => handleServiceClick(service.path)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                      <IconComponent className={`h-6 w-6 ${service.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      {service.badge && (
                        <Badge variant="secondary" className="mt-1">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Características:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 rounded-lg p-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">
            ¿Por qué elegir Red Creativa Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <Button size="lg" onClick={() => router.push('/auth')}>
              Comenzar Ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold">
          ¿Necesitas ayuda para elegir?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nuestro equipo está aquí para ayudarte a encontrar las herramientas perfectas para tu proyecto. 
          Contáctanos y te asesoraremos sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => router.push('/contacto')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contactar Soporte
          </Button>
          <Button onClick={() => router.push('/blog')}>
            <BookOpen className="mr-2 h-4 w-4" />
            Ver Blog
          </Button>
        </div>
      </section>
    </div>
  );
}