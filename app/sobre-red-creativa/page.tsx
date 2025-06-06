'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Youtube, Users, Video, Calendar, ExternalLink, Play } from 'lucide-react';

export default function SobreRedCreativaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Sobre Red Creativa
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Descubre el canal de YouTube donde la creatividad y la tecnología se encuentran para impulsar tus proyectos.
          </p>
        </div>

        {/* Video de Presentación */}
        <div className="mb-16">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-red-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Play className="w-6 h-6" />
                Video de Presentación
              </CardTitle>
              <CardDescription className="text-red-100">
                Conoce más sobre Red Creativa y lo que ofrecemos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-slate-900">
                {/* Placeholder para el video - reemplaza con tu video ID de YouTube */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
                  title="Red Creativa - Video de Presentación"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información del Canal */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Canal de YouTube */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Youtube className="w-6 h-6 text-red-600" />
                Canal de YouTube
              </CardTitle>
              <CardDescription>
                Contenido creativo y educativo para desarrolladores y diseñadores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Red Creativa Pro</h3>
                  <p className="text-slate-600 dark:text-slate-300">@redcreativapro</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Users className="w-5 h-5 mx-auto mb-1 text-red-600" />
                  <p className="text-sm font-medium">Suscriptores</p>
                  <p className="text-lg font-bold">1.2K+</p>
                </div>
                <div className="text-center p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Video className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <p className="text-sm font-medium">Videos</p>
                  <p className="text-lg font-bold">50+</p>
                </div>
              </div>
              
              <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                <a href="https://youtube.com/@redcreativapro" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 mr-2" />
                  Visitar Canal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Sobre el Creador */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Sobre el Creador</CardTitle>
              <CardDescription>
                Conoce la historia detrás de Red Creativa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">RC</span>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-center">
                Desarrollador Full Stack y creador de contenido apasionado por la tecnología, 
                el diseño y la educación digital. Especializado en crear herramientas que 
                potencien la creatividad y productividad.
              </p>
              
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">React & Next.js</Badge>
                <Badge variant="secondary" className="mr-2">UI/UX Design</Badge>
                <Badge variant="secondary" className="mr-2">Content Creation</Badge>
                <Badge variant="secondary">Educación Tech</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido del Canal */}
        <Card className="shadow-xl mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">¿Qué encontrarás en el canal?</CardTitle>
            <CardDescription>
              Contenido variado para impulsar tu creatividad y habilidades técnicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Tutoriales de Desarrollo</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Aprende las últimas tecnologías web con ejemplos prácticos y proyectos reales.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Diseño Creativo</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Técnicas de diseño UI/UX, herramientas creativas y tendencias actuales.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Proyectos en Vivo</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Desarrollo de aplicaciones completas desde cero hasta el despliegue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">¡Únete a la Comunidad!</h2>
              <p className="text-xl mb-6 text-red-100">
                Suscríbete al canal y forma parte de una comunidad apasionada por la creatividad y la tecnología.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="https://youtube.com/@redcreativapro" target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-5 h-5 mr-2" />
                    Suscribirse al Canal
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  <Video className="w-5 h-5 mr-2" />
                  Ver Últimos Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}