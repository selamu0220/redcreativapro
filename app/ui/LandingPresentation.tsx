'use client';

import React, { useState, useEffect } from 'react';
import { ModeToggle } from './common/ModeToggle';
import { Sparkles, Rocket, Zap, Star, ArrowRight } from 'lucide-react';

interface LandingPresentationProps {
  onComplete: () => void;
}

// Componente de partículas flotantes
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  
  useEffect(() => {
    // Generar partículas solo en el cliente para evitar errores de hidratación
    const newParticles = Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        >
          <div className="w-1 h-1 bg-white/30 rounded-full" />
        </div>
      ))}
    </div>
  );
};

// Componente de ondas animadas
const AnimatedWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

// Componente de características destacadas
const FeatureHighlight = ({ icon: Icon, title, delay }: { icon: any, title: string, delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`flex items-center space-x-3 transition-all duration-1000 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-white/80 font-medium">{title}</span>
    </div>
  );
};

export default function LandingPresentation({ onComplete }: LandingPresentationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const features = [
    { icon: Rocket, title: "Gestión de Proyectos" },
    { icon: Sparkles, title: "Recursos Creativos" },
    { icon: Zap, title: "Automatización IA" },
    { icon: Star, title: "Colaboración en Equipo" }
  ];

  useEffect(() => {
    // Progreso de carga animado
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoading(false);
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Animación de características
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % features.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete, features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo */}
      <FloatingParticles />
      <AnimatedWaves />
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>
      
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        {/* Logo y título principal */}
        <div className="mb-12">
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full" />
            <h1 className="relative text-6xl md:text-8xl font-black text-white drop-shadow-2xl tracking-wider mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Red Creativa Pro
            </h1>
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide">
              Plataforma de Gestión Creativa
            </p>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Una herramienta integral para organizar proyectos creativos, recursos digitales y colaboración en equipo.
            </p>
          </div>
        </div>
        
        {/* Características destacadas */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <FeatureHighlight
                key={index}
                icon={feature.icon}
                title={feature.title}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
        
        {/* Barra de progreso y estado de carga */}
        <div className="space-y-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm font-medium">Inicializando aplicación</span>
              <span className="text-white/60 text-sm font-mono">{progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Indicador de característica actual */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            <span className="text-white/60 text-sm">
              Cargando: {features[currentStep]?.title}
            </span>
          </div>
          
          {/* Botón de acceso rápido */}
          <div className="pt-4">
            <button
              onClick={() => {
                setProgress(100);
                setTimeout(() => {
                  setIsLoading(false);
                  onComplete();
                }, 200);
              }}
              className="group inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/30 transition-all duration-300 text-white/80 hover:text-white"
            >
              <span className="text-sm font-medium">Acceder ahora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Efectos de esquinas */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl" />
    </div>
  );
}

