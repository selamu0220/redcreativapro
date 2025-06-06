'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar, Code, Palette, Lightbulb, Award, BookOpen, Coffee, User } from 'lucide-react';
import AppLayout from '../components/AppLayout';

export default function SobreElCreadorPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Sobre el Creador
            </h1>
            <p className="text-muted-foreground">
              Conoce la historia, experiencia y pasión detrás de Red Creativa Pro
            </p>
          </div>
        </div>

        {/* Información Personal */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Perfil Principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Mi Historia
                </CardTitle>
                <CardDescription>
                  El camino hacia la creatividad digital
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Soy un desarrollador Full Stack apasionado por la intersección entre tecnología y creatividad. 
                  Mi viaje comenzó hace más de 8 años cuando descubrí que el código podía ser una forma de arte 
                  y expresión creativa.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  A lo largo de mi carrera, he trabajado en proyectos que van desde aplicaciones web complejas 
                  hasta herramientas creativas innovadoras. Mi objetivo siempre ha sido democratizar el acceso 
                  a la tecnología y ayudar a otros a materializar sus ideas.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Red Creativa Pro nació de la necesidad de crear un espacio donde la creatividad y la 
                  productividad se encuentren, ofreciendo herramientas y recursos que potencien el trabajo 
                  de diseñadores, desarrolladores y creadores de contenido.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-muted-foreground">España</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">8+ años de experiencia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-muted-foreground">Adicto al café ☕</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conecta Conmigo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href="mailto:contacto@redcreativa.pro">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Habilidades y Tecnologías */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Tecnologías
              </CardTitle>
              <CardDescription>
                Stack tecnológico y herramientas favoritas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2 text-foreground text-sm">Frontend</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Next.js</Badge>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs">Tailwind CSS</Badge>
                    <Badge variant="secondary" className="text-xs">Framer Motion</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-foreground text-sm">Backend</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">Python</Badge>
                    <Badge variant="secondary" className="text-xs">Supabase</Badge>
                    <Badge variant="secondary" className="text-xs">PostgreSQL</Badge>
                    <Badge variant="secondary" className="text-xs">API REST</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-foreground text-sm">Herramientas</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Git</Badge>
                    <Badge variant="secondary" className="text-xs">Docker</Badge>
                    <Badge variant="secondary" className="text-xs">Vercel</Badge>
                    <Badge variant="secondary" className="text-xs">Figma</Badge>
                    <Badge variant="secondary" className="text-xs">VS Code</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-600" />
                Especialidades
              </CardTitle>
              <CardDescription>
                Áreas de expertise y pasión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1 text-sm">Desarrollo Full Stack</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Creación de aplicaciones web completas desde el frontend hasta el backend.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-1 text-sm">UI/UX Design</h4>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Diseño de interfaces intuitivas y experiencias de usuario excepcionales.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-1 text-sm">Educación Tech</h4>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Creación de contenido educativo y mentoring para desarrolladores.
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-1 text-sm">Herramientas Creativas</h4>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Desarrollo de aplicaciones que potencian la creatividad y productividad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experiencia */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Experiencia y Logros
            </CardTitle>
            <CardDescription>
              Hitos importantes en mi carrera profesional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-medium text-sm">Fundador de Red Creativa Pro</h3>
                <p className="text-muted-foreground text-xs mb-1">2023 - Presente</p>
                <p className="text-muted-foreground text-xs">
                  Creación de una plataforma integral para creativos y desarrolladores, 
                  integrando herramientas de gestión de proyectos, recursos creativos y IA.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-sm">Desarrollador Senior Full Stack</h3>
                <p className="text-muted-foreground text-xs mb-1">2020 - 2023</p>
                <p className="text-muted-foreground text-xs">
                  Liderazgo de equipos de desarrollo en proyectos de gran escala, 
                  implementando arquitecturas modernas y mejores prácticas.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-sm">Creador de Contenido Educativo</h3>
                <p className="text-muted-foreground text-xs mb-1">2019 - Presente</p>
                <p className="text-muted-foreground text-xs">
                  Canal de YouTube con más de 1000 suscriptores, tutoriales de programación 
                  y desarrollo web con enfoque práctico.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-sm">Desarrollador Frontend</h3>
                <p className="text-muted-foreground text-xs mb-1">2016 - 2020</p>
                <p className="text-muted-foreground text-xs">
                  Especialización en React y tecnologías frontend modernas, 
                  desarrollo de interfaces de usuario complejas y responsivas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filosofía */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Mi Filosofía
            </CardTitle>
            <CardDescription>
              Principios que guían mi trabajo y visión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-medium mb-2 text-sm">Código Limpio</h3>
                <p className="text-xs text-muted-foreground">
                  Creo en escribir código que sea legible, mantenible y escalable.
                </p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-medium mb-2 text-sm">Innovación Constante</h3>
                <p className="text-xs text-muted-foreground">
                  Siempre buscando nuevas formas de resolver problemas.
                </p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-medium mb-2 text-sm">Aprendizaje Continuo</h3>
                <p className="text-xs text-muted-foreground">
                  La tecnología evoluciona constantemente, y yo evoluciono con ella.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}