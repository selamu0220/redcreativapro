import { useState, useRef, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Download, Play, Square, Sparkles } from 'lucide-react';

interface InfographicTemplate {
  id: string;
  name: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius?: string;
  shadow?: string;
  aspectRatio?: string;
  chromaKey?: boolean;
}

const infographicTemplates: InfographicTemplate[] = [
  // Templates con Chroma Key Verde para DaVinci Resolve
  {
    id: 'chroma-horizontal',
    name: 'Horizontal Chroma Key',
    description: 'Fondo verde horizontal para DaVinci Resolve',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#000000',
    accentColor: '#FF6B35',
    fontFamily: 'Arial, sans-serif',
    aspectRatio: '16:9',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px'
  },
  {
    id: 'chroma-vertical',
    name: 'Vertical Chroma Key',
    description: 'Fondo verde vertical para DaVinci Resolve',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#000000',
    accentColor: '#FF6B35',
    fontFamily: 'Arial, sans-serif',
    aspectRatio: '9:16',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px'
  },
  {
    id: 'chroma-square',
    name: 'Cuadrado Chroma Key',
    description: 'Fondo verde cuadrado para DaVinci Resolve',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#000000',
    accentColor: '#FF6B35',
    fontFamily: 'Arial, sans-serif',
    aspectRatio: '1:1',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px'
  },
  {
    id: 'chroma-professional',
    name: 'Profesional Chroma Key',
    description: 'Estilo profesional con fondo verde para DaVinci',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#1a1a1a',
    accentColor: '#007ACC',
    fontFamily: 'Roboto, sans-serif',
    aspectRatio: '16:9',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
  },
  {
    id: 'chroma-education',
    name: 'Educativo Chroma Key',
    description: 'Estilo educativo con fondo verde para DaVinci',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#2c3e50',
    accentColor: '#3498db',
    fontFamily: 'Open Sans, sans-serif',
    aspectRatio: '16:9',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px'
  },
  {
    id: 'chroma-tech',
    name: 'Tech Chroma Key',
    description: 'Estilo tecnológico con fondo verde para DaVinci',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#0f172a',
    accentColor: '#10b981',
    fontFamily: 'Inter, sans-serif',
    aspectRatio: '16:9',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px'
  },
  {
    id: 'chroma-story-modern',
    name: 'Story Moderno Chroma',
    description: 'Story moderno con fondo verde para DaVinci',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#1f2937',
    accentColor: '#f59e0b',
    fontFamily: 'Poppins, sans-serif',
    aspectRatio: '9:16',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px'
  },
  {
    id: 'chroma-youtube',
    name: 'YouTube Chroma Key',
    description: 'Optimizado para YouTube con fondo verde',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#111827',
    accentColor: '#ef4444',
    fontFamily: 'Roboto, sans-serif',
    aspectRatio: '16:9',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px'
  },
  {
    id: 'chroma-instagram',
    name: 'Instagram Chroma Key',
    description: 'Optimizado para Instagram con fondo verde',
    bgColor: '#00FF00', // Verde chroma key
    textColor: '#374151',
    accentColor: '#8b5cf6',
    fontFamily: 'Inter, sans-serif',
    aspectRatio: '1:1',
    chromaKey: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px'
  }
];

interface AnimationType {
  id: string;
  name: string;
  description: string;
}

const animationTypes: AnimationType[] = [
  {
    id: 'smooth-fade',
    name: 'Fade Profesional',
    description: 'Desvanecimiento suave y profesional para DaVinci'
  },
  {
    id: 'elastic-scale',
    name: 'Zoom Elegante',
    description: 'Zoom suave con entrada elegante'
  },
  {
    id: 'fluid-slide',
    name: 'Slide Cinematográfico',
    description: 'Deslizamiento cinematográfico lateral'
  },
  {
    id: 'gentle-bounce',
    name: 'Bounce Sutil',
    description: 'Rebote muy sutil y profesional'
  },
  {
    id: 'morphing-reveal',
    name: 'Reveal Circular',
    description: 'Revelado circular progresivo'
  },
  {
    id: 'breathing-glow',
    name: 'Glow Dinámico',
    description: 'Brillo dinámico continuo'
  },
  {
    id: 'particles',
    name: 'Partículas',
    description: 'Efecto de partículas flotantes'
  }
];

export function InfographicCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState<InfographicTemplate>(infographicTemplates[0]);
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>(animationTypes[0]);
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Estados para personalización
  const [customColors, setCustomColors] = useState({
    background: '#ffffff',
    cardBackground: '#f8f9fa',
    textColor: '#1a1a1a',
    accentColor: '#007ACC'
  });
  const [borderSettings, setBorderSettings] = useState({
    width: 2,
    radius: 12,
    color: '#e0e0e0'
  });
  const [useCustomColors, setUseCustomColors] = useState(false);
  
  const { toast } = useToast();
  const { incrementUsage, canUseFeature } = useAuth();

  const generateInfographic = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor, describe tu idea para la infografía',
        variant: 'destructive'
      });
      return;
    }

    if (!canUseFeature('aiRequests')) {
      toast({
        title: 'Límite alcanzado',
        description: 'Has alcanzado tu límite diario de consultas de IA',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generar contenido basado en el prompt usando IA
      const content = await generateContentFromPrompt(prompt);
      setGeneratedContent(content);
      
      incrementUsage('aiRequests');
      
      toast({
        title: 'Infografía generada',
        description: 'Tu infografía ha sido creada exitosamente'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al generar la infografía',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContentFromPrompt = async (prompt: string) => {
    try {
      // Importar la función de IA
      const { generateScriptWithAI } = await import('../../lib/ai');
      
      // Prompt especializado para generar infografías para redes sociales
      const aiPrompt = `
Crea una infografía para redes sociales basada en: "${prompt}"

Debes responder ÚNICAMENTE con un JSON válido que contenga:
{
  "title": "Título atractivo para redes sociales (máximo 40 caracteres)",
  "subtitle": "Subtítulo explicativo corto (máximo 30 caracteres)",
  "points": ["Elemento 1", "Elemento 2", "Elemento 3"],
  "recommendedTemplate": "chroma-horizontal|chroma-vertical|chroma-square|chroma-professional|chroma-education|chroma-tech|chroma-story-modern|chroma-youtube|chroma-instagram",
  "recommendedAnimation": "zoom-fade|slide-in|rotation-pulse|bounce|typewriter|particles",
  "infographicType": "lista|ranking|comparación|beneficios|tips|herramientas"
}

Reglas importantes:
- El título debe ser llamativo para redes sociales (ej: "Top 5 IAs que DEBES conocer")
- El subtítulo debe complementar el título
- Incluye exactamente 3-5 elementos específicos y útiles
- Cada punto debe ser el nombre de una herramienta, tip o elemento concreto
- Para temas de IA, incluye nombres reales de herramientas populares
- Selecciona el template más apropiado para el tema
- Elige la animación que mejor complemente el contenido

Responde SOLO con el JSON, sin texto adicional.`;
      
      const aiResponse = await generateScriptWithAI(aiPrompt);
      
      // Intentar parsear la respuesta de la IA
      try {
        const parsedResponse = JSON.parse(aiResponse);
        
        // Validar que tenga la estructura correcta
        if (parsedResponse.title && parsedResponse.points && Array.isArray(parsedResponse.points)) {
          // Actualizar template y animación recomendados
          if (parsedResponse.recommendedTemplate) {
            const recommendedTemplate = infographicTemplates.find(t => t.id === parsedResponse.recommendedTemplate);
            if (recommendedTemplate) {
              setSelectedTemplate(recommendedTemplate);
            }
          }
          
          if (parsedResponse.recommendedAnimation) {
            const recommendedAnimation = animationTypes.find(a => a.id === parsedResponse.recommendedAnimation);
            if (recommendedAnimation) {
              setSelectedAnimation(recommendedAnimation);
            }
          }
          
          return {
            title: parsedResponse.title,
            subtitle: parsedResponse.subtitle || '',
            points: parsedResponse.points,
            type: parsedResponse.infographicType || 'lista'
          };
        }
      } catch (parseError) {
        console.warn('Error parsing AI response, using fallback:', parseError);
      }
    } catch (aiError) {
      console.warn('AI generation failed, using fallback:', aiError);
    }
    
    // Fallback: lógica inteligente para generar contenido específico para redes sociales
    const words = prompt.toLowerCase();
    let title = 'Top 5 Herramientas';
    let subtitle = 'Imprescindibles';
    let points = ['Herramienta 1', 'Herramienta 2', 'Herramienta 3'];
    
    if (words.includes('ia') || words.includes('inteligencia artificial') || words.includes('ai')) {
      title = 'Top 5 IAs que DEBES conocer';
      subtitle = '2024 Edition';
      points = [
        'ChatGPT - Conversación y escritura',
        'Midjourney - Generación de imágenes',
        'Claude - Análisis y razonamiento',
        'Runway - Edición de video con IA',
        'Notion AI - Productividad inteligente'
      ];
    } else if (words.includes('herramientas') || words.includes('apps') || words.includes('software')) {
      title = 'Apps que cambiarán tu vida';
      subtitle = 'Productividad 2024';
      points = [
        'Notion - Organización total',
        'Figma - Diseño colaborativo',
        'Loom - Videos explicativos',
        'Calendly - Gestión de citas'
      ];
    } else if (words.includes('productividad') || words.includes('trabajo')) {
      title = 'Hacks de Productividad';
      subtitle = 'Que funcionan';
      points = [
        'Técnica Pomodoro',
        'Método Getting Things Done',
        'Time Blocking',
        'Regla de los 2 minutos'
      ];
    } else if (words.includes('marketing') || words.includes('redes sociales')) {
      title = 'Estrategias de Marketing';
      subtitle = 'Que SÍ funcionan';
      points = [
        'Storytelling auténtico',
        'Contenido de valor',
        'Engagement genuino',
        'Consistencia en posting'
      ];
    } else if (words.includes('diseño') || words.includes('creatividad')) {
      title = 'Principios de Diseño';
      subtitle = 'Esenciales';
      points = [
        'Contraste efectivo',
        'Jerarquía visual clara',
        'Espacios en blanco',
        'Tipografía legible'
      ];
    } else {
      // Generar contenido genérico pero atractivo para redes sociales
      const cleanPrompt = prompt.trim();
      title = cleanPrompt.length > 25 ? cleanPrompt.substring(0, 25) + '...' : cleanPrompt;
      subtitle = 'Guía práctica';
      points = [
        'Consejo práctico #1',
        'Estrategia clave #2',
        'Tip esencial #3',
        'Resultado garantizado #4'
      ];
    }
    
    return { title, subtitle, points };
  };

  const downloadAsImage = async () => {
    if (!generatedContent) return;
    
    try {
      // Crear un SVG con el contenido de la infografía
      const svgContent = createSVGFromContent(generatedContent, selectedTemplate);
      
      // Crear un canvas y dibujar el SVG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('No se pudo crear el contexto del canvas');
      }
      
      canvas.width = 1920;
      canvas.height = 1080;
      
      // Crear una imagen desde el SVG
      const img = new Image();
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Descargar la imagen
        const link = document.createElement('a');
        link.download = 'infografia.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Limpiar la URL del blob
        URL.revokeObjectURL(url);
        
        toast({
          title: 'Descarga completada',
          description: 'La infografía se ha descargado como imagen'
        });
      };
      
      img.onerror = () => {
        throw new Error('Error al cargar la imagen SVG');
      };
      
      img.src = url;
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo descargar la imagen',
        variant: 'destructive'
      });
    }
  };
  
  const createSVGFromContent = (content: any, template: InfographicTemplate) => {
    // Usar colores personalizados si están habilitados
    const colors = useCustomColors ? {
      bgColor: customColors.background,
      cardBgColor: customColors.cardBackground,
      textColor: customColors.textColor,
      accentColor: customColors.accentColor
    } : {
      bgColor: template.bgColor,
      cardBgColor: 'rgba(255, 255, 255, 0.9)',
      textColor: template.textColor,
      accentColor: template.accentColor
    };
    
    const borders = useCustomColors ? borderSettings : {
      width: 1,
      radius: 12,
      color: 'rgba(0, 0, 0, 0.1)'
    };
    // Determinar dimensiones según el formato
    let width = 1920;
    let height = 1080;
    
    if (template.aspectRatio === '1:1') {
      width = height = 1080; // Cuadrado
    } else if (template.aspectRatio === '9:16') {
      width = 1080;
      height = 1920; // Vertical para stories
    }
    
    // Crear fondo profesional con gradiente
    let backgroundElement = '';
    if (template.chromaKey) {
      // Para chroma key, usar fondo verde
      backgroundElement = `<rect width="100%" height="100%" fill="#00FF00" />`;
    } else {
      // Extraer colores del gradiente o usar color sólido
      const bgColor = colors.bgColor;
      const gradientMatch = bgColor.match(/linear-gradient\(135deg,\s*([^\s]+)\s+0%,\s*([^\s]+)\s+100%\)/);
      if (gradientMatch) {
        const color1 = gradientMatch[1];
        const color2 = gradientMatch[2];
        backgroundElement = `
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
            </linearGradient>
            <filter id="professionalShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="rgba(0,0,0,0.25)"/>
            </filter>
            <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradient)" />`;
      } else {
        backgroundElement = `
          <defs>
            <filter id="professionalShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="rgba(0,0,0,0.25)"/>
            </filter>
            <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="${bgColor}" />`;
      }
    }
    
    // Configuración del contenedor principal profesional
    const containerWidth = width * 0.85;
    const containerHeight = height * 0.8;
    const containerX = (width - containerWidth) / 2;
    const containerY = (height - containerHeight) / 2;
    const containerRadius = 16;
    
    // Ajustar tamaños de fuente de manera profesional
    const titleSize = template.aspectRatio === '9:16' ? 72 : 84;
    const subtitleSize = template.aspectRatio === '9:16' ? 36 : 42;
    const pointSize = template.aspectRatio === '9:16' ? 32 : 38;
    
    // Posiciones optimizadas
    const titleY = containerY + containerHeight * 0.2;
    const subtitleY = containerY + containerHeight * 0.32;
    const pointsStartY = containerY + containerHeight * 0.45;
    const pointSpacing = containerHeight * 0.08;
    
    // Crear elementos decorativos profesionales
    const accentBarWidth = containerWidth * 0.15;
    const accentBarHeight = 6;
    const accentBarX = containerX + (containerWidth - accentBarWidth) / 2;
    const accentBarY = titleY + 20;
    
    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${backgroundElement}
        
        <!-- Contenedor principal con diseño profesional -->
        <rect x="${containerX}" y="${containerY}" 
              width="${containerWidth}" height="${containerHeight}" 
              fill="${colors.cardBgColor}" 
              stroke="${borders.color}" 
              stroke-width="${borders.width}" 
              rx="${borders.radius}" 
              filter="url(#professionalShadow)" />
        
        <!-- Barra decorativa de acento -->
        <rect x="${accentBarX}" y="${accentBarY}" 
              width="${accentBarWidth}" height="${accentBarHeight}" 
              fill="${colors.accentColor}" 
              rx="3" />
        
        <!-- Título con sombra profesional -->
        <text x="${width/2}" y="${titleY}" 
              text-anchor="middle" 
              fill="${colors.textColor}" 
              font-family="${template.fontFamily}" 
              font-size="${titleSize}" 
              font-weight="700" 
              filter="url(#textShadow)">
          ${content.title}
        </text>
        
        <!-- Subtítulo elegante -->
        ${content.subtitle ? `
        <text x="${width/2}" y="${subtitleY}" 
              text-anchor="middle" 
              fill="${colors.textColor}" 
              font-family="${template.fontFamily}" 
              font-size="${subtitleSize}" 
              font-weight="300" 
              opacity="0.8">
          ${content.subtitle}
        </text>` : ''}
        
        <!-- Puntos con diseño profesional -->
        ${content.points.map((point: string, index: number) => {
          const y = pointsStartY + (index * pointSpacing);
          const iconX = containerX + containerWidth * 0.08;
          const textX = containerX + containerWidth * 0.15;
          const lineY = y + 15;
          
          return `
            <!-- Icono profesional -->
            <circle cx="${iconX}" cy="${y}" r="6" fill="${colors.accentColor}" />
            <circle cx="${iconX}" cy="${y}" r="3" fill="white" />
            
            <!-- Texto del punto -->
            <text x="${textX}" y="${y + 6}" 
                  fill="${colors.textColor}" 
                  font-family="${template.fontFamily}" 
                  font-size="${pointSize}" 
                  font-weight="400">
              ${point.length > 60 ? point.substring(0, 57) + '...' : point}
            </text>
            
            <!-- Línea sutil de separación -->
            ${index < content.points.length - 1 ? `
            <line x1="${textX}" y1="${lineY}" x2="${containerX + containerWidth * 0.9}" y2="${lineY}" 
                  stroke="rgba(0,0,0,0.1)" stroke-width="1" />` : ''}
          `;
        }).join('')}
        
        <!-- Elementos decorativos adicionales -->
        <circle cx="${containerX + containerWidth * 0.95}" cy="${containerY + containerHeight * 0.1}" 
                r="4" fill="${colors.accentColor}" opacity="0.3" />
        <circle cx="${containerX + containerWidth * 0.05}" cy="${containerY + containerHeight * 0.9}" 
                r="6" fill="${colors.accentColor}" opacity="0.2" />
      </svg>
    `;
  };

  // Funciones de animación profesionales para el video
  const animateSmoothFade = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Fade profesional con movimiento sutil
    const alpha = progress;
    const translateY = 20 * (1 - progress);
    const blur = Math.max(0, 5 * (1 - progress));
    
    ctx.filter = `blur(${blur}px)`;
    ctx.globalAlpha = alpha;
    ctx.translate(0, translateY);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateElasticScale = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Zoom elegante y sutil
    let scale, opacity;
    if (progress < 0.6) {
      scale = 0.8 + (progress / 0.6) * 0.22; // 0.8 to 1.02
      opacity = (progress / 0.6) * 0.9;
    } else {
      scale = 1.02 - ((progress - 0.6) / 0.4) * 0.02; // 1.02 to 1
      opacity = 0.9 + ((progress - 0.6) / 0.4) * 0.1;
    }
    
    ctx.globalAlpha = opacity;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateFluidSlide = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Deslizamiento cinematográfico lateral
    const translateX = -50 * (1 - progress);
    const alpha = progress;
    
    ctx.globalAlpha = alpha;
    ctx.translate(translateX, 0);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateGentleBounce = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Rebote muy sutil y profesional
    let translateY, opacity;
    if (progress < 0.6) {
      translateY = -20 + (progress / 0.6) * 25; // -20 to 5
      opacity = (progress / 0.6) * 0.8;
    } else {
      translateY = 5 - ((progress - 0.6) / 0.4) * 5; // 5 to 0
      opacity = 0.8 + ((progress - 0.6) / 0.4) * 0.2;
    }
    
    ctx.globalAlpha = opacity;
    ctx.translate(0, translateY);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateMorphingReveal = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Revelado circular progresivo
    const radius = Math.min(canvas.width, canvas.height) * progress / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Crear máscara circular
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateBreathingGlow = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Brillo dinámico continuo
    const breathe = Math.sin(progress * Math.PI * 6) * 0.01 + 1;
    const brightness = Math.sin(progress * Math.PI * 6) * 0.05 + 1;
    const shadowIntensity = Math.sin(progress * Math.PI * 6) * 0.1 + 0.2;
    
    // Filtro de brillo sutil
    ctx.filter = `brightness(${brightness}) drop-shadow(0 0 ${15 + Math.sin(progress * Math.PI * 6) * 10}px rgba(0,0,0,${shadowIntensity}))`;
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(breathe, breathe);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };



  const animateParticles = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    // Imagen base con fade in
    ctx.save();
    const fadeIn = Math.min(1, progress * 1.5);
    ctx.globalAlpha = fadeIn;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Sistema de partículas elegante
    const numParticles = 80;
    ctx.save();
    
    for (let i = 0; i < numParticles; i++) {
      // Movimiento en espiral
      const angle = (i / numParticles) * Math.PI * 2 + progress * Math.PI * 1.5;
      const spiralRadius = 100 + Math.sin(progress * Math.PI + i * 0.1) * 50;
      
      const x = canvas.width / 2 + Math.cos(angle) * spiralRadius;
      const y = canvas.height / 2 + Math.sin(angle) * spiralRadius * 0.7;
      
      // Tamaño y opacidad dinámicos
      const size = 3 + Math.sin(progress * Math.PI * 3 + i * 0.3) * 2;
      const alpha = 0.6 + Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.4;
      
      // Colores variados
      const hue = (i * 137.5 + progress * 90) % 360;
      
      ctx.globalAlpha = alpha * progress;
      ctx.fillStyle = `hsla(${hue}, 80%, 70%, 0.9)`;
      
      // Efecto de brillo
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = size * 3;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
    }
    
    ctx.restore();
  };

  const animatePreview = async () => {
    if (!generatedContent || !containerRef.current) return;
    
    setIsAnimating(true);
    
    // Simulate animation preview with same duration as video (3 seconds)
    const container = containerRef.current;
    const duration = 3000; // 3 seconds - same as video
    
    // Remove any existing animation classes first
    container.classList.remove(
      'animate-smooth-fade',
      'animate-elastic-scale', 
      'animate-fluid-slide',
      'animate-gentle-bounce',
      'animate-morphing-reveal',
      'animate-breathing-glow'
    );
    
    // Force reflow to ensure class removal takes effect
    container.offsetHeight;
    
    // Apply animation class based on selected animation
    container.classList.add(`animate-${selectedAnimation.id}`);
    
    // Show toast notification
    toast({
      title: 'Vista Previa',
      description: `Reproduciendo animación: ${selectedAnimation.name}`
    });
    
    setTimeout(() => {
      container.classList.remove(`animate-${selectedAnimation.id}`);
      setIsAnimating(false);
    }, duration);
  };

  const downloadAsVideo = async () => {
    if (!generatedContent) return;
    
    try {
      // Crear un video MP4 usando MediaRecorder API
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('No se pudo crear el contexto del canvas');
      }
      
      canvas.width = 1920;
      canvas.height = 1080;
      
      // Crear el SVG y convertirlo a imagen
      const svgContent = createSVGFromContent(generatedContent, selectedTemplate);
      const img = new Image();
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = async () => {
         // Configurar MediaRecorder para grabar el canvas
         const stream = canvas.captureStream(30); // 30 FPS
         
         // Intentar diferentes formatos MP4, fallback a WebM si no es compatible
         let mimeType = 'video/mp4';
         if (!MediaRecorder.isTypeSupported('video/mp4')) {
           if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
             mimeType = 'video/webm;codecs=h264';
           } else {
             mimeType = 'video/webm;codecs=vp9';
           }
         }
         
         const mediaRecorder = new MediaRecorder(stream, {
           mimeType: mimeType
         });
         
         const chunks: BlobPart[] = [];
         
         mediaRecorder.ondataavailable = (event) => {
           if (event.data.size > 0) {
             chunks.push(event.data);
           }
         };
         
         mediaRecorder.onstop = () => {
           const blob = new Blob(chunks, { type: mimeType });
           const videoUrl = URL.createObjectURL(blob);
           
           // Determinar la extensión del archivo basada en el tipo MIME
           const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
           
           const link = document.createElement('a');
           link.download = `infografia-video.${extension}`;
           link.href = videoUrl;
           link.click();
           
           URL.revokeObjectURL(videoUrl);
           URL.revokeObjectURL(url);
           
           toast({
             title: 'Video descargado',
             description: `El video de la infografía se ha descargado como ${extension.toUpperCase()}`
           });
         };
        
        // Iniciar grabación
        mediaRecorder.start();
        
        // Animar la infografía durante 3 segundos según el tipo seleccionado
         const duration = 3000;
         const startTime = Date.now();
         
         const animate = () => {
           const elapsed = Date.now() - startTime;
           const progress = Math.min(elapsed / duration, 1);
           
           // Limpiar canvas
           ctx.clearRect(0, 0, canvas.width, canvas.height);
           
           // Aplicar animación según el tipo seleccionado
           switch (selectedAnimation.id) {
             case 'smooth-fade':
               animateSmoothFade(ctx, img, progress, canvas);
               break;
             case 'elastic-scale':
               animateElasticScale(ctx, img, progress, canvas);
               break;
             case 'fluid-slide':
               animateFluidSlide(ctx, img, progress, canvas);
               break;
             case 'gentle-bounce':
               animateGentleBounce(ctx, img, progress, canvas);
               break;
             case 'morphing-reveal':
               animateMorphingReveal(ctx, img, progress, canvas);
               break;
             case 'breathing-glow':
               animateBreathingGlow(ctx, img, progress, canvas);
               break;
             case 'particles':
               animateParticles(ctx, img, progress, canvas);
               break;
             default:
               ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
           }
           
           if (progress < 1) {
             requestAnimationFrame(animate);
           } else {
             // Detener grabación después de la animación
             setTimeout(() => mediaRecorder.stop(), 500);
           }
         };
        
        animate();
      };
      
      img.onerror = () => {
        throw new Error('Error al cargar la imagen para el video');
      };
      
      img.src = url;
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo generar el video. Tu navegador podría no soportar esta función.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Creador de Infografías
        </h1>
        <p className="text-muted-foreground">
          Describe tu infografía y la IA generará una animación visual atractiva
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Generador de Infografías con IA
            </CardTitle>
            <CardDescription>
              Describe cualquier tema y la IA creará automáticamente una infografía profesional con el diseño, colores y animación más adecuados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe tu idea para la infografía</Label>
              <Textarea
                id="prompt"
                placeholder="Describe cualquier tema y la IA creará automáticamente una infografía profesional. Ejemplos:\n\n• Los beneficios del ejercicio físico\n• Cómo mejorar la productividad en el trabajo\n• Pasos para crear un presupuesto personal\n• Consejos para una alimentación saludable\n• El proceso de fotosíntesis en las plantas"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 La IA analizará tu texto y seleccionará automáticamente el mejor diseño, colores y animación
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Elige un estilo</Label>
              <Select
                value={selectedTemplate.id}
                onValueChange={(value) => {
                  const template = infographicTemplates.find(t => t.id === value);
                  if (template) setSelectedTemplate(template);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {infographicTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} - {template.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation">Tipo de animación para video</Label>
              <Select
                value={selectedAnimation.id}
                onValueChange={(value) => {
                  const animation = animationTypes.find(a => a.id === value);
                  if (animation) setSelectedAnimation(animation);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animationTypes.map((animation) => (
                    <SelectItem key={animation.id} value={animation.id}>
                      {animation.name} - {animation.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Controles de personalización */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useCustomColors"
                  checked={useCustomColors}
                  onChange={(e) => setUseCustomColors(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="useCustomColors" className="text-sm font-medium">
                  Usar colores personalizados
                </Label>
              </div>

              {useCustomColors && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-700">Personalización de Colores</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bgColor" className="text-xs">Fondo exterior</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="bgColor"
                          value={customColors.background}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, background: e.target.value }))}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={customColors.background}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, background: e.target.value }))}
                          className="text-xs"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardBgColor" className="text-xs">Fondo interior</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="cardBgColor"
                          value={customColors.cardBackground}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, cardBackground: e.target.value }))}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={customColors.cardBackground}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, cardBackground: e.target.value }))}
                          className="text-xs"
                          placeholder="#f8f9fa"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="textColor" className="text-xs">Color de texto</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="textColor"
                          value={customColors.textColor}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, textColor: e.target.value }))}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={customColors.textColor}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, textColor: e.target.value }))}
                          className="text-xs"
                          placeholder="#1a1a1a"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accentColor" className="text-xs">Color de acento</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="accentColor"
                          value={customColors.accentColor}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={customColors.accentColor}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="text-xs"
                          placeholder="#007ACC"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-700">Configuración de Bordes</h4>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="borderWidth" className="text-xs">Grosor</Label>
                        <Input
                          type="number"
                          id="borderWidth"
                          min="0"
                          max="10"
                          value={borderSettings.width}
                          onChange={(e) => setBorderSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="borderRadius" className="text-xs">Radio</Label>
                        <Input
                          type="number"
                          id="borderRadius"
                          min="0"
                          max="50"
                          value={borderSettings.radius}
                          onChange={(e) => setBorderSettings(prev => ({ ...prev, radius: parseInt(e.target.value) || 0 }))}
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="borderColor" className="text-xs">Color</Label>
                        <div className="flex items-center space-x-1">
                          <input
                            type="color"
                            id="borderColor"
                            value={borderSettings.color}
                            onChange={(e) => setBorderSettings(prev => ({ ...prev, color: e.target.value }))}
                            className="w-6 h-6 rounded border"
                          />
                          <Input
                            value={borderSettings.color}
                            onChange={(e) => setBorderSettings(prev => ({ ...prev, color: e.target.value }))}
                            className="text-xs"
                            placeholder="#e0e0e0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={generateInfographic}
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Infografía
                </>
              )}
            </Button>

            {generatedContent && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">🤖 Análisis de IA</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Tipo de infografía:</strong> {generatedContent.type || 'General'}</p>
                    <p><strong>Template seleccionado:</strong> {selectedTemplate.name}</p>
                    <p><strong>Animación recomendada:</strong> {selectedAnimation.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-4">
                  <Button
                    onClick={animatePreview}
                    variant="outline"
                    size="sm"
                    disabled={isAnimating}
                  >
                    {isAnimating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isAnimating ? 'Animando...' : 'Preview'}
                  </Button>
                  <Button
                    onClick={downloadAsImage}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button
                    onClick={downloadAsVideo}
                    variant="outline"
                    size="sm"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Video
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Vista previa */}
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>
              Así se verá tu infografía
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={containerRef}
              className="relative w-full h-96 rounded-lg overflow-hidden flex items-center justify-center"
              style={{
                background: generatedContent ? 
                  (useCustomColors ? customColors.background : selectedTemplate.bgColor) : 
                  '#f8f9fa',
                color: generatedContent ? 
                  (useCustomColors ? customColors.textColor : selectedTemplate.textColor) : 
                  '#6c757d',
                fontFamily: selectedTemplate.fontFamily,
                border: useCustomColors ? 
                  `${borderSettings.width}px solid ${borderSettings.color}` : 
                  '2px dashed #d1d5db',
                borderRadius: useCustomColors ? `${borderSettings.radius}px` : '8px'
              }}
            >
              {generatedContent ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Fondo interior personalizable */}
                  <div 
                    className="absolute inset-4 rounded-lg shadow-lg flex items-center justify-center"
                    style={{
                      backgroundColor: useCustomColors ? customColors.cardBackground : 'rgba(255, 255, 255, 0.9)',
                      border: useCustomColors ? `1px solid ${borderSettings.color}` : '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: useCustomColors ? `${Math.max(0, borderSettings.radius - 4)}px` : '8px'
                    }}
                  >
                    <div className="text-center space-y-6 p-8 animate-fade-in">
                      <h2 
                        className="text-3xl font-bold mb-6 animate-fade-in-down"
                        style={{
                          color: useCustomColors ? customColors.textColor : selectedTemplate.textColor
                        }}
                      >
                        {generatedContent.title}
                      </h2>
                      {generatedContent.subtitle && (
                        <p 
                          className="text-lg opacity-80 animate-fade-in-down"
                          style={{
                            color: useCustomColors ? customColors.textColor : selectedTemplate.textColor,
                            animationDelay: '0.2s'
                          }}
                        >
                          {generatedContent.subtitle}
                        </p>
                      )}
                      <div className="space-y-4">
                        {generatedContent.points.map((point: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ 
                                backgroundColor: useCustomColors ? 
                                  customColors.accentColor : 
                                  selectedTemplate.accentColor 
                              }}
                            />
                            <span 
                              className="text-lg text-left"
                              style={{
                                color: useCustomColors ? customColors.textColor : selectedTemplate.textColor
                              }}
                            >
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    {prompt ? 'Haz clic en "Generar Infografía" para crear tu diseño' : 'Describe tu idea para comenzar'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>



      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes smoothFade {
          0% { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        
        @keyframes elasticScale {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.02); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fluidSlide {
          0% { transform: translateX(-50px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes gentleBounce {
          0% { transform: translateY(-20px); opacity: 0; }
          60% { transform: translateY(5px); opacity: 0.8; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes morphingReveal {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(100% at 50% 50%); }
        }
        
        @keyframes breathingGlow {
          0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 15px rgba(0,0,0,0.2)); }
          50% { transform: scale(1.01); filter: brightness(1.05) drop-shadow(0 0 25px rgba(0,0,0,0.3)); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-smooth-fade {
          animation: smoothFade 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-elastic-scale {
          animation: elasticScale 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-fluid-slide {
          animation: fluidSlide 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-gentle-bounce {
          animation: gentleBounce 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-morphing-reveal {
          animation: morphingReveal 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-breathing-glow {
          animation: breathingGlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}