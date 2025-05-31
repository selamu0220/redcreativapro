'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';

interface LandingPresentationProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Red Creativa",
    subtitle: "Tu plataforma todo en uno para creación de contenido",
  },
  {
    title: "Recursos Creativos",
    subtitle: "Gestiona y organiza todos tus recursos digitales",
  },
  {
    title: "Calendario Editorial",
    subtitle: "Planifica y programa tu contenido eficientemente",
  },
  {
    title: "Guiones Inteligentes",
    subtitle: "Crea guiones optimizados con IA",
  },
  {
    title: "Blog y Recursos",
    subtitle: "Aprende y comparte conocimiento",
  }
];

export default function LandingPresentation({ onComplete }: LandingPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative p-4">
      {/* Botón saltar */}
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute top-4 right-4 border-2 border-black"
        onClick={onComplete}
      >
        <X className="h-4 w-4 mr-2" />
        Saltar
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold">{slides[currentSlide].title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">{slides[currentSlide].subtitle}</p>

            {currentSlide === slides.length - 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                <Button
                  size="lg"
                  onClick={onComplete}
                  className="border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
                >
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles para navegar */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="border-2 border-black"
          >
            Atrás
          </Button>
          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="border-2 border-black"
          >
            Siguiente
          </Button>
        </div>

        {/* Dots de progreso */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 border-2 border-black rounded-full transition-colors cursor-pointer ${
                index === currentSlide ? 'bg-black' : 'bg-white'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') setCurrentSlide(index);
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
