'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, Sparkles, Zap, Rocket, Brain, Calendar, FileText } from 'lucide-react';

interface LandingPresentationProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Red Creativa",
    subtitle: "Plataforma de gestión de contenido creativo",
    description: "Una herramienta integral para organizar y gestionar proyectos creativos, recursos digitales y colaboración en equipo.",
    icon: Rocket,
    gradient: "from-slate-600 to-slate-800"
  },
  {
    title: "Gestión de Recursos",
    subtitle: "Organiza tus archivos y materiales",
    description: "Sistema de almacenamiento y categorización de recursos digitales: imágenes, videos, documentos y plantillas. Acceso rápido y búsqueda avanzada.",
    icon: Sparkles,
    gradient: "from-blue-600 to-blue-800"
  },
  {
    title: "Calendario Editorial",
    subtitle: "Planifica y programa tu contenido",
    description: "Herramienta de planificación para programar publicaciones, gestionar fechas de entrega y coordinar equipos de trabajo.",
    icon: Calendar,
    gradient: "from-green-600 to-green-800"
  },
  {
    title: "Biblioteca de Prompts",
    subtitle: "Plantillas y guiones para IA",
    description: "Colección de prompts optimizados para diferentes herramientas de IA. Crea, guarda y comparte plantillas de texto efectivas.",
    icon: Brain,
    gradient: "from-purple-600 to-purple-800"
  },
  {
    title: "Comunidad y Aprendizaje",
    subtitle: "Comparte conocimiento y colabora",
    description: "Espacio para compartir recursos, intercambiar ideas y aprender de otros creativos. Blog integrado y sistema de comentarios.",
    icon: FileText,
    gradient: "from-orange-600 to-orange-800"
  }
];

// Componente de partículas flotantes
const FloatingParticles = ({ count, gradient }: { count: number; gradient: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r ${gradient} rounded-full opacity-60`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function LandingPresentation({ onComplete }: LandingPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIsExploding(true);
    setTimeout(() => {
      setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
      setIsExploding(false);
    }, 200);
  };

  const prevSlide = () => {
    setIsExploding(true);
    setTimeout(() => {
      setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
      setIsExploding(false);
    }, 200);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center relative overflow-hidden`}>
      {/* Partículas flotantes */}
      {/* <FloatingParticles count={currentSlideData.particles} gradient={currentSlideData.gradient} /> */}
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
      
      {/* Botón saltar mejorado */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-6 right-6 z-50"
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="border-2 border-white/50 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
          onClick={onComplete}
        >
          <X className="h-4 w-4 mr-2" />
          SALTAR
        </Button>
      </motion.div>

      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full mx-4 relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 100, rotateX: -90 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              scale: isExploding ? 1.1 : 1
            }}
            exit={{ opacity: 0, y: -100, rotateX: 90 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.8
            }}
            className="text-center space-y-8 bg-black/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl"
          >
            {/* Icono animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className={`w-24 h-24 bg-gradient-to-r ${currentSlideData.gradient} rounded-full flex items-center justify-center shadow-2xl`}
                >
                  <IconComponent className="h-12 w-12 text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.gradient} rounded-full`}
                />
              </div>
            </motion.div>

            {/* Título principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl tracking-wider"
              style={{
                textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3)'
              }}
            >
              {currentSlideData.title}
            </motion.h1>
            
            {/* Subtítulo */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-4xl font-bold text-white/90 tracking-wide"
            >
              {currentSlideData.subtitle}
            </motion.p>
            
            {/* Descripción */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              {currentSlideData.description}
            </motion.p>

            {/* Botón final */}
            {currentSlide === slides.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="pt-8"
              >
                <Button
                  size="lg"
                  onClick={onComplete}
                  className="text-xl px-12 py-6 bg-white text-black hover:bg-black hover:text-white border-4 border-white transition-all duration-300 shadow-2xl hover:shadow-white/50 font-black tracking-wider"
                >
                  <Zap className="mr-3 h-6 w-6" />
                  COMENZAR REVOLUCIÓN
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles mejorados */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-between items-center mt-12"
        >
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="border-2 border-white/50 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 px-8 py-4 text-lg font-bold"
          >
            ← ANTERIOR
          </Button>
          
          <div className="flex gap-4">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg shadow-white/50' 
                    : 'bg-transparent hover:bg-white/30'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="border-2 border-white/50 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 px-8 py-4 text-lg font-bold"
          >
            SIGUIENTE →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
