'use client';

import { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '../button';
// import { ArrowRight, X, Sparkles, Zap, Rocket, Brain, Calendar, FileText } from 'lucide-react';

interface LandingPresentationProps {
  onComplete: () => void;
}

// const slides = [
//   {
//     title: "Red Creativa",
//     subtitle: "Plataforma de gestiÃ³n de contenido creativo",
//     description: "Una herramienta integral para organizar y gestionar proyectos creativos, recursos digitales y colaboraciÃ³n en equipo.",
//     icon: Rocket,
//     gradient: "from-slate-600 to-slate-800"
//   },
//   {
//     title: "GestiÃ³n de Recursos",
//     subtitle: "Organiza tus archivos y materiales",
//     description: "Sistema de almacenamiento y categorizaciÃ³n de recursos digitales: imÃ¡genes, videos, documentos y plantillas. Acceso rÃ¡pido y bÃºsqueda avanzada.",
//     icon: Sparkles,
//     gradient: "from-blue-600 to-blue-800"
//   },
//   {
//     title: "Calendario Editorial",
//     subtitle: "Planifica y programa tu contenido",
//     description: "Herramienta de planificaciÃ³n para programar publicaciones, gestionar fechas de entrega y coordinar equipos de trabajo.",
//     icon: Calendar,
//     gradient: "from-green-600 to-green-800"
//   },
//   {
//     title: "Biblioteca de Prompts",
//     subtitle: "Plantillas y guiones para IA",
//     description: "ColecciÃ³n de prompts optimizados para diferentes herramientas de IA. Crea, guarda y comparte plantillas de texto efectivas.",
//     icon: Brain,
//     gradient: "from-purple-600 to-purple-800"
//   },
//   {
//     title: "Comunidad y Aprendizaje",
//     subtitle: "Comparte conocimiento y colabora",
//     description: "Espacio para compartir recursos, intercambiar ideas y aprender de otros creativos. Blog integrado y sistema de comentarios.",
//     icon: FileText,
//     gradient: "from-orange-600 to-orange-800"
//   }
// ];

// // Componente de partÃ­culas flotantes
// const FloatingParticles = ({ count, gradient }: { count: number; gradient: string }) => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {Array.from({ length: count }).map((_, i) => (
//         <motion.div
//           key={i}
//           className={`absolute w-2 h-2 bg-gradient-to-r ${gradient} rounded-full opacity-60`}
//           initial={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             scale: Math.random() * 0.5 + 0.5
//           }}
//           animate={{
//             x: Math.random() * window.innerWidth,
//             y: Math.random() * window.innerHeight,
//             scale: [0.5, 1.5, 0.5],
//             rotate: [0, 360]
//           }}
//           transition={{
//             duration: Math.random() * 10 + 10,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       ))}
//     </div>
//   );
// };

export default function LandingPresentation({ onComplete }: LandingPresentationProps) {
  useEffect(() => {
    // Auto-complete after 3 seconds for demo purposes
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl tracking-wider mb-6">
            Red Creativa Pro
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide mb-4">
            Plataforma de GestiÃ³n Creativa
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Una herramienta integral para organizar proyectos creativos, recursos digitales y colaboraciÃ³n en equipo.
          </p>
        </div>
        
        <div className="text-white/60 text-sm">
          Cargando aplicaciÃ³n...
        </div>
      </div>
    </div>

  );
}

