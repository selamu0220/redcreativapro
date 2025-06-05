import { ThumbnailTemplate } from "../types/thumbnails";

export const thumbnailTemplates: ThumbnailTemplate[] = [
  // Plantillas para TikTok (Formato Vertical 9:16)
  {
    id: 'tiktok-modern',
    name: 'TikTok Moderno',
    description: 'DiseÃ±o vertical moderno para TikTok e Instagram Stories',
    preview: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
    category: 'tech',
    settings: {
      title: 'TÃTULO VIRAL',
      subtitle: 'Contenido Impactante',
      bgColor: '#000000',
      textColor: '#ffffff',
      fontFamily: 'Impact',
      width: 1080,
      height: 1920,
      titleFontSize: 120,
      subtitleFontSize: 60,
      titlePosition: 25,
      subtitlePosition: 35,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 180,
      gradientStops: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 }
      ]
    }
  },
  {
    id: 'tiktok-neon',
    name: 'TikTok NeÃ³n',
    description: 'Estilo neÃ³n vibrante para contenido de gaming y tech',
    preview: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
    category: 'gaming',
    settings: {
      title: 'GAMING TIPS',
      subtitle: 'Pro Level',
      bgColor: '#0a0a0a',
      textColor: '#00ff88',
      fontFamily: 'Arial',
      width: 1080,
      height: 1920,
      titleFontSize: 110,
      subtitleFontSize: 55,
      titlePosition: 20,
      subtitlePosition: 30,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'radial-gradient',
      gradientAngle: 0,
      gradientStops: [
        { color: '#1a1a2e', position: 0 },
        { color: '#16213e', position: 50 },
        { color: '#0f3460', position: 100 }
      ]
    }
  },
  {
    id: 'tiktok-education',
    name: 'TikTok Educativo',
    description: 'DiseÃ±o limpio y profesional para contenido educativo',
    preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'education',
    settings: {
      title: 'APRENDE RÃPIDO',
      subtitle: 'Tips Diarios',
      bgColor: '#ffffff',
      textColor: '#2c3e50',
      fontFamily: 'Arial',
      width: 1080,
      height: 1920,
      titleFontSize: 100,
      subtitleFontSize: 50,
      titlePosition: 25,
      subtitlePosition: 35,
      textShadow: false,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 135,
      gradientStops: [
        { color: '#74b9ff', position: 0 },
        { color: '#0984e3', position: 100 }
      ]
    }
  },
  {
    id: 'tiktok-lifestyle',
    name: 'TikTok Lifestyle',
    description: 'Estilo cÃ¡lido y acogedor para contenido de estilo de vida',
    preview: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg',
    category: 'lifestyle',
    settings: {
      title: 'VIDA SALUDABLE',
      subtitle: 'Consejos Diarios',
      bgColor: '#ffeaa7',
      textColor: '#2d3436',
      fontFamily: 'Georgia',
      width: 1080,
      height: 1920,
      titleFontSize: 95,
      subtitleFontSize: 48,
      titlePosition: 30,
      subtitlePosition: 40,
      textShadow: false,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 45,
      gradientStops: [
        { color: '#ffecd2', position: 0 },
        { color: '#fcb69f', position: 100 }
      ]
    }
  },
  
  // Plantillas para YouTube (Formato Horizontal 16:9)
  {
    id: 'modern-gradient',
    name: 'Gradiente Moderno',
    description: 'DiseÃ±o con degradado suave y tipografÃ­a moderna',
    preview: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
    category: 'tech',
    settings: {
      title: 'TÃTULO PRINCIPAL',
      subtitle: 'SubtÃ­tulo Impactante',
      bgColor: '#000000',
      textColor: '#ffffff',
      fontFamily: 'Arial',
      width: 1280,
      height: 720,
      titleFontSize: 100,
      subtitleFontSize: 50,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 45,
      gradientStops: [
        { color: '#FF416C', position: 0 },
        { color: '#FF4B2B', position: 100 }
      ]
    }
  },
  {
    id: 'neon-vibes',
    name: 'Vibes NeÃ³n',
    description: 'Estilo neÃ³n con efectos brillantes',
    preview: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
    category: 'gaming',
    settings: {
      title: 'NEON VIBES',
      subtitle: '2025 Edition',
      bgColor: '#000000',
      textColor: '#00ff00',
      fontFamily: 'Impact',
      width: 1280,
      height: 720,
      titleFontSize: 120,
      subtitleFontSize: 60,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'radial-gradient',
      gradientAngle: 0,
      gradientStops: [
        { color: '#000000', position: 0 },
        { color: '#1a1a1a', position: 50 },
        { color: '#000000', position: 100 }
      ]
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimalista',
    description: 'DiseÃ±o limpio y minimalista',
    preview: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
    category: 'tech',
    settings: {
      title: 'MINIMAL',
      subtitle: 'Less is More',
      bgColor: '#ffffff',
      textColor: '#000000',
      fontFamily: 'Arial',
      width: 1280,
      height: 720,
      titleFontSize: 90,
      subtitleFontSize: 45,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: false,
      bgImageOpacity: 100,
      bgType: 'solid',
      gradientAngle: 0,
      gradientStops: [
        { color: '#ffffff', position: 0 },
        { color: '#ffffff', position: 100 }
      ]
    }
  },
  {
    id: 'sunset-vibes',
    name: 'Atardecer',
    description: 'Gradientes cÃ¡lidos tipo atardecer',
    preview: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    category: 'lifestyle',
    settings: {
      title: 'SUNSET VIBES',
      subtitle: 'Summer Collection',
      bgColor: '#ff6b6b',
      textColor: '#ffffff',
      fontFamily: 'Arial',
      width: 1280,
      height: 720,
      titleFontSize: 110,
      subtitleFontSize: 55,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 135,
      gradientStops: [
        { color: '#f2994a', position: 0 },
        { color: '#f2c94c', position: 50 },
        { color: '#ff6b6b', position: 100 }
      ]
    }
  },
  {
    id: 'cyber-punk',
    name: 'Cyberpunk',
    description: 'Estilo futurista cyberpunk',
    preview: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
    category: 'gaming',
    settings: {
      title: 'CYBER 2077',
      subtitle: 'Future is Now',
      bgColor: '#000000',
      textColor: '#00fff5',
      fontFamily: 'Impact',
      width: 1280,
      height: 720,
      titleFontSize: 120,
      subtitleFontSize: 60,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 45,
      gradientStops: [
        { color: '#000000', position: 0 },
        { color: '#00fff5', position: 50 },
        { color: '#ff00ff', position: 100 }
      ]
    }
  },
  {
    id: 'retro-wave',
    name: 'Retro Wave',
    description: 'Estilo retro de los 80s',
    preview: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg',
    category: 'gaming',
    settings: {
      title: 'RETRO WAVE',
      subtitle: '80s Style',
      bgColor: '#000000',
      textColor: '#ff00ff',
      fontFamily: 'Impact',
      width: 1280,
      height: 720,
      titleFontSize: 120,
      subtitleFontSize: 60,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 180,
      gradientStops: [
        { color: '#fc00ff', position: 0 },
        { color: '#00dbde', position: 100 }
      ]
    }
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    description: 'Suaves tonos pastel',
    preview: 'https://images.pexels.com/photos/3738183/pexels-photo-3738183.jpeg',
    category: 'lifestyle',
    settings: {
      title: 'SOFT VIBES',
      subtitle: 'Pastel Collection',
      bgColor: '#ffd1dc',
      textColor: '#ffffff',
      fontFamily: 'Arial',
      width: 1280,
      height: 720,
      titleFontSize: 100,
      subtitleFontSize: 50,
      titlePosition: 45,
      subtitlePosition: 60,
      textShadow: true,
      bgImageOpacity: 100,
      bgType: 'linear-gradient',
      gradientAngle: 45,
      gradientStops: [
        { color: '#ffd1dc', position: 0 },
        { color: '#b5eaea', position: 50 },
        { color: '#ffd1dc', position: 100 }
      ]
    }
  }
];
