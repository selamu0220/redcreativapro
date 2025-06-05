// Configuración SEO centralizada para Red Creativa Pro

export const SEO_CONFIG = {
  // Información básica del sitio
  siteName: 'Red Creativa Pro',
  siteUrl: 'https://redcreativa.pro',
  defaultTitle: 'Red Creativa Pro - Plataforma Integral para Creadores de Contenido',
  defaultDescription: 'Plataforma profesional para creadores de contenido con herramientas de IA, gestión de recursos creativos, calendario editorial, generador de miniaturas y scripts.',
  defaultKeywords: [
    'creadores de contenido',
    'herramientas IA',
    'recursos creativos',
    'calendario editorial',
    'marketing digital',
    'social media',
    'content creation',
    'generador miniaturas',
    'scripts',
    'prompts IA',
    'planificación contenido',
    'productividad creativa'
  ],
  
  // Información de la organización
  organization: {
    name: 'Red Creativa Pro',
    url: 'https://redcreativa.pro',
    logo: 'https://redcreativa.pro/logo.png',
    description: 'Plataforma integral para creadores de contenido con herramientas de IA, gestión de recursos creativos, calendario editorial y más.',
    socialMedia: {
      twitter: 'https://twitter.com/redcreativapro',
      instagram: 'https://instagram.com/redcreativapro',
      linkedin: 'https://linkedin.com/company/redcreativapro',
    },
    contact: {
      type: 'customer service',
      languages: ['Spanish', 'English']
    }
  },
  
  // Configuración por páginas
  pages: {
    home: {
      title: 'Red Creativa Pro - Plataforma Integral para Creadores de Contenido | Herramientas IA',
      description: 'Plataforma profesional para creadores de contenido con herramientas de IA, gestión de recursos creativos, calendario editorial, generador de miniaturas y scripts. Optimiza tu flujo de trabajo creativo.',
      keywords: [
        'plataforma creadores contenido',
        'herramientas IA creatividad',
        'gestión recursos creativos',
        'calendario editorial profesional',
        'generador miniaturas',
        'scripts automatizados',
        'productividad creativa'
      ]
    },
    
    blog: {
      title: 'Blog - Red Creativa Pro | Consejos y Estrategias para Creadores',
      description: 'Descubre las últimas tendencias, consejos y estrategias para creadores de contenido. Aprende sobre herramientas de IA, marketing digital, SEO y más.',
      keywords: [
        'blog creadores contenido',
        'consejos marketing digital',
        'estrategias SEO',
        'tendencias redes sociales',
        'herramientas IA contenido',
        'tips productividad creativa'
      ]
    },
    
    recursos: {
      title: 'Recursos Creativos - Red Creativa Pro | Gestión y Organización',
      description: 'Gestiona y organiza todos tus recursos creativos en un solo lugar. Sube, categoriza y encuentra fácilmente imágenes, videos, documentos y más.',
      keywords: [
        'gestión recursos creativos',
        'organización archivos',
        'biblioteca digital',
        'almacenamiento creativo',
        'categorización contenido',
        'búsqueda recursos'
      ]
    },
    
    calendario: {
      title: 'Calendario Editorial - Red Creativa Pro | Planificación de Contenido',
      description: 'Planifica y organiza tu contenido con nuestro calendario editorial inteligente. Programa publicaciones, gestiona deadlines y mantén consistencia.',
      keywords: [
        'calendario editorial',
        'planificación contenido',
        'programación publicaciones',
        'gestión deadlines',
        'organización temporal',
        'estrategia contenido'
      ]
    },
    
    guiones: {
      title: 'Generador de Guiones - Red Creativa Pro | Scripts con IA',
      description: 'Crea guiones profesionales para videos, podcasts y presentaciones con ayuda de inteligencia artificial. Optimiza tu proceso creativo.',
      keywords: [
        'generador guiones IA',
        'scripts videos',
        'guiones podcasts',
        'escritura automatizada',
        'contenido audiovisual',
        'creación scripts'
      ]
    },
    
    miniaturas: {
      title: 'Creador de Miniaturas - Red Creativa Pro | Diseño Automático',
      description: 'Diseña miniaturas atractivas para YouTube, redes sociales y más. Plantillas profesionales y herramientas de diseño intuitivas.',
      keywords: [
        'creador miniaturas',
        'diseño thumbnails',
        'miniaturas YouTube',
        'plantillas diseño',
        'editor gráfico',
        'diseño redes sociales'
      ]
    },
    
    chat: {
      title: 'Chat IA - Red Creativa Pro | Asistente Creativo Inteligente',
      description: 'Interactúa con nuestro asistente de IA especializado en creación de contenido. Obtén ideas, consejos y soluciones personalizadas.',
      keywords: [
        'chat IA creativo',
        'asistente inteligente',
        'consultor IA',
        'ideas contenido',
        'brainstorming IA',
        'soporte creativo'
      ]
    },
    
    prompts: {
      title: 'Biblioteca de Prompts - Red Creativa Pro | Prompts IA Optimizados',
      description: 'Accede a nuestra colección de prompts optimizados para IA. Mejora tus resultados con instrucciones precisas para diferentes tareas creativas.',
      keywords: [
        'prompts IA',
        'instrucciones IA',
        'biblioteca prompts',
        'optimización IA',
        'plantillas prompts',
        'ingeniería de prompts'
      ]
    }
  },
  
  // Configuración de Open Graph
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'Red Creativa Pro',
    title: 'Red Creativa Pro - Plataforma Integral para Creadores de Contenido',
    description: 'Plataforma profesional para creadores de contenido con herramientas de IA, gestión de recursos creativos, calendario editorial, generador de miniaturas y scripts.',
    images: {
      default: 'https://redcreativa.pro/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Red Creativa Pro - Herramientas profesionales para creadores de contenido'
    }
  },
  
  // Configuración de Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@redcreativapro',
    creator: '@redcreativapro',
    images: {
      default: 'https://redcreativa.pro/twitter-image.jpg',
      alt: 'Red Creativa Pro - Herramientas profesionales para creadores'
    }
  },
  
  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    maxImagePreview: 'large',
    maxSnippet: -1,
    maxVideoPreview: -1
  },
  
  // URLs importantes
  urls: {
    canonical: 'https://redcreativa.pro',
    sitemap: 'https://redcreativa.pro/sitemap.xml',
    robots: 'https://redcreativa.pro/robots.txt'
  }
};

// Función helper para generar meta tags
export const generateMetaTags = (pageKey: keyof typeof SEO_CONFIG.pages, customData?: Partial<{
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
}>) => {
  const pageConfig = SEO_CONFIG.pages[pageKey];
  const config = {
    title: customData?.title || pageConfig.title,
    description: customData?.description || pageConfig.description,
    keywords: customData?.keywords || pageConfig.keywords,
    image: customData?.image || SEO_CONFIG.openGraph.images.default,
    url: customData?.url || SEO_CONFIG.siteUrl
  };
  
  return config;
};

// Función para generar datos estructurados
export const generateStructuredData = (type: 'organization' | 'website' | 'article', data?: any) => {
  const baseContext = { '@context': 'https://schema.org' };
  
  switch (type) {
    case 'organization':
      return {
        ...baseContext,
        '@type': 'Organization',
        name: SEO_CONFIG.organization.name,
        url: SEO_CONFIG.organization.url,
        logo: {
          '@type': 'ImageObject',
          url: SEO_CONFIG.organization.logo
        },
        description: SEO_CONFIG.organization.description,
        sameAs: Object.values(SEO_CONFIG.organization.socialMedia),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: SEO_CONFIG.organization.contact.type,
          availableLanguage: SEO_CONFIG.organization.contact.languages
        }
      };
      
    case 'website':
      return {
        ...baseContext,
        '@type': 'WebSite',
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        description: SEO_CONFIG.defaultDescription,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SEO_CONFIG.siteUrl}/recursos?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };
      
    case 'article':
      return {
        ...baseContext,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.organization.name,
          logo: {
            '@type': 'ImageObject',
            url: SEO_CONFIG.organization.logo
          }
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate,
        image: {
          '@type': 'ImageObject',
          url: data.image
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        keywords: data.keywords?.join(', ')
      };
      
    default:
      return baseContext;
  }
};

export default SEO_CONFIG;