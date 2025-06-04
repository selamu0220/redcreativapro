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
}

const infographicTemplates: InfographicTemplate[] = [
  {
    id: 'modern-blue',
    name: 'Azul Moderno',
    description: 'Diseño limpio con tonos azules',
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    accentColor: '#4facfe',
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'warm-sunset',
    name: 'Atardecer Cálido',
    description: 'Colores cálidos y acogedores',
    bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#ffffff',
    accentColor: '#ff6b6b',
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'nature-green',
    name: 'Verde Naturaleza',
    description: 'Inspirado en la naturaleza',
    bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    textColor: '#ffffff',
    accentColor: '#00d4aa',
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'dark-elegant',
    name: 'Elegante Oscuro',
    description: 'Diseño elegante y profesional',
    bgColor: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    textColor: '#ecf0f1',
    accentColor: '#3498db',
    fontFamily: 'Inter, sans-serif'
  },
  {
    id: 'vibrant-purple',
    name: 'Púrpura Vibrante',
    description: 'Colores vibrantes y energéticos',
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    accentColor: '#9b59b6',
    fontFamily: 'Inter, sans-serif'
  }
];

interface AnimationType {
  id: string;
  name: string;
  description: string;
}

const animationTypes: AnimationType[] = [
  {
    id: 'zoom-fade',
    name: 'Zoom y Desvanecimiento',
    description: 'Efecto de zoom con desvanecimiento suave'
  },
  {
    id: 'slide-in',
    name: 'Deslizamiento',
    description: 'Los elementos aparecen deslizándose'
  },
  {
    id: 'rotation-pulse',
    name: 'Rotación y Pulso',
    description: 'Rotación sutil con efecto de pulso'
  },
  {
    id: 'bounce',
    name: 'Rebote',
    description: 'Efecto de rebote dinámico'
  },
  {
    id: 'typewriter',
    name: 'Máquina de Escribir',
    description: 'Texto aparece como si se escribiera'
  },
  {
    id: 'particles',
    name: 'Partículas',
    description: 'Efecto de partículas flotantes'
  }
];

export function InfographicCreator() {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<InfographicTemplate>(infographicTemplates[0]);
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>(animationTypes[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      const { generateScriptWithAI } = await import('../lib/ai');
      
      // Prompt especializado para generar infografías
      const aiPrompt = `
Crea una infografía basada en el siguiente texto: "${prompt}"

Debes responder ÚNICAMENTE con un JSON válido que contenga:
{
  "title": "Título principal de la infografía (máximo 50 caracteres)",
  "points": ["Punto 1", "Punto 2", "Punto 3", "Punto 4"],
  "recommendedTemplate": "modern-blue|warm-sunset|nature-green|dark-elegant|vibrant-purple",
  "recommendedAnimation": "zoom-fade|slide-in|rotation-pulse|bounce|typewriter|particles",
  "infographicType": "estadísticas|proceso|comparación|beneficios|tips|timeline"
}

Reglas importantes:
- El título debe ser claro y atractivo
- Incluye entre 3-6 puntos clave
- Cada punto debe ser conciso (máximo 80 caracteres)
- Selecciona el template más apropiado para el tema
- Elige la animación que mejor complemente el contenido
- Identifica el tipo de infografía más adecuado

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
            points: parsedResponse.points,
            type: parsedResponse.infographicType || 'general'
          };
        }
      } catch (parseError) {
        console.warn('Error parsing AI response, using fallback:', parseError);
      }
    } catch (aiError) {
      console.warn('AI generation failed, using fallback:', aiError);
    }
    
    // Fallback: lógica simple para generar contenido basado en el prompt
    const words = prompt.toLowerCase();
    let title = 'Infografía Generada';
    let points = ['Punto 1', 'Punto 2', 'Punto 3'];
    
    if (words.includes('meditación') || words.includes('mindfulness')) {
      title = 'Beneficios de la Meditación';
      points = [
        'Reduce el estrés y la ansiedad',
        'Mejora la concentración',
        'Aumenta la autoconciencia',
        'Promueve el bienestar emocional'
      ];
    } else if (words.includes('ejercicio') || words.includes('fitness')) {
      title = 'Beneficios del Ejercicio';
      points = [
        'Fortalece el sistema cardiovascular',
        'Mejora la fuerza muscular',
        'Aumenta la energía',
        'Reduce el riesgo de enfermedades'
      ];
    } else if (words.includes('productividad') || words.includes('trabajo')) {
      title = 'Tips de Productividad';
      points = [
        'Establece metas claras',
        'Elimina distracciones',
        'Toma descansos regulares',
        'Organiza tu espacio de trabajo'
      ];
    } else {
      // Generar contenido genérico basado en el prompt
      title = prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt;
      points = [
        'Aspecto importante 1',
        'Consideración clave 2',
        'Beneficio principal 3',
        'Resultado esperado 4'
      ];
    }
    
    return { title, points };
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
    const width = 1920;
    const height = 1080;
    
    // Extraer colores del gradiente
    const gradientMatch = template.bgColor.match(/linear-gradient\(135deg,\s*([^\s]+)\s+0%,\s*([^\s]+)\s+100%\)/);
    const color1 = gradientMatch ? gradientMatch[1] : '#667eea';
    const color2 = gradientMatch ? gradientMatch[2] : '#764ba2';
    
    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Fondo -->
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        
        <!-- Título -->
        <text x="${width/2}" y="200" 
              text-anchor="middle" 
              fill="${template.textColor}" 
              font-family="${template.fontFamily}" 
              font-size="72" 
              font-weight="bold">
          ${content.title}
        </text>
        
        <!-- Puntos -->
        ${content.points.map((point: string, index: number) => {
          const y = 350 + (index * 120);
          return `
            <circle cx="240" cy="${y}" r="12" fill="${template.accentColor}" />
            <text x="300" y="${y + 12}" 
                  fill="${template.textColor}" 
                  font-family="${template.fontFamily}" 
                  font-size="40">
              ${point}
            </text>
          `;
        }).join('')}
      </svg>
    `;
  };

  // Funciones de animación profesionales para el video
  const animateZoomFade = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Easing suave para zoom profesional
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);
    
    // Zoom dramático desde 0.8 a 1.0
    const scale = 0.8 + (0.2 * easedProgress);
    const alpha = Math.min(1, progress * 1.5);
    
    // Efecto de brillo al final
    if (progress > 0.7) {
      const glowIntensity = (progress - 0.7) / 0.3;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 30 * glowIntensity;
    }
    
    ctx.globalAlpha = alpha;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateSlideIn = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Easing suave para deslizamiento elegante
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const easedProgress = easeOutQuart(progress);
    
    // Deslizamiento desde la derecha con efecto de desenfoque
    const offsetX = canvas.width * (1 - easedProgress);
    const alpha = Math.min(1, progress * 1.8);
    
    // Desenfoque durante el movimiento
    if (progress < 0.8) {
      const blurAmount = (1 - progress) * 5;
      ctx.filter = `blur(${blurAmount}px)`;
    }
    
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, offsetX, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateRotationPulse = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Rotación elegante con pulso
    const rotation = Math.sin(progress * Math.PI * 2) * 0.05;
    const pulseScale = 0.95 + Math.sin(progress * Math.PI * 3) * 0.05;
    const breatheAlpha = 0.9 + Math.sin(progress * Math.PI * 4) * 0.1;
    
    // Efecto de brillo pulsante
    const brightness = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
    ctx.filter = `brightness(${brightness}) contrast(1.1)`;
    
    ctx.globalAlpha = breatheAlpha;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    ctx.scale(pulseScale, pulseScale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateBounce = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Función de rebote realista
    const bounceEase = (t: number) => {
      if (t < 1/2.75) {
        return 7.5625 * t * t;
      } else if (t < 2/2.75) {
        return 7.5625 * (t -= 1.5/2.75) * t + 0.75;
      } else if (t < 2.5/2.75) {
        return 7.5625 * (t -= 2.25/2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
      }
    };
    
    const bounceProgress = bounceEase(progress);
    const scale = 0.7 + (0.3 * bounceProgress);
    const alpha = Math.min(1, progress * 2);
    
    // Sombra durante el rebote
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 8;
    
    ctx.globalAlpha = alpha;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const animateTypewriter = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, progress: number, canvas: HTMLCanvasElement) => {
    ctx.save();
    
    // Dibujar imagen base con fade in
    const baseAlpha = Math.min(1, progress * 2);
    ctx.globalAlpha = baseAlpha;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Efecto de máquina de escribir con gradiente
    ctx.save();
    const revealWidth = canvas.width * progress;
    
    // Gradiente suave para el revelado
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(Math.max(0, (revealWidth - 100) / canvas.width), 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(revealWidth / canvas.width, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(Math.min(1, (revealWidth + 50) / canvas.width), 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cursor parpadeante
    if (progress < 0.95) {
      const cursorOpacity = Math.sin(Date.now() * 0.008) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(0, 0, 0, ${cursorOpacity})`;
      ctx.fillRect(revealWidth, canvas.height * 0.2, 4, canvas.height * 0.6);
    }
    
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
             case 'zoom-fade':
               animateZoomFade(ctx, img, progress, canvas);
               break;
             case 'slide-in':
               animateSlideIn(ctx, img, progress, canvas);
               break;
             case 'rotation-pulse':
               animateRotationPulse(ctx, img, progress, canvas);
               break;
             case 'bounce':
               animateBounce(ctx, img, progress, canvas);
               break;
             case 'typewriter':
               animateTypewriter(ctx, img, progress, canvas);
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
                
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <Button
                    onClick={downloadAsImage}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar PNG
                  </Button>
                  <Button
                    onClick={downloadAsVideo}
                    variant="outline"
                    size="sm"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Descargar Video
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
              className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center"
              style={{
                background: generatedContent ? selectedTemplate.bgColor : '#f8f9fa',
                color: generatedContent ? selectedTemplate.textColor : '#6c757d',
                fontFamily: selectedTemplate.fontFamily
              }}
            >
              {generatedContent ? (
                <div className="text-center space-y-6 p-8 animate-fade-in">
                  <h2 className="text-3xl font-bold mb-6 animate-fade-in-down">
                    {generatedContent.title}
                  </h2>
                  <div className="space-y-4">
                    {generatedContent.points.map((point: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: selectedTemplate.accentColor }}
                        />
                        <span className="text-lg">{point}</span>
                      </div>
                    ))}
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
      `}</style>
    </div>
  );
}