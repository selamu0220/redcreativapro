'use client';

import { useEffect } from 'react';
import { SEO_CONFIG, generateMetaTags } from '../config/seo';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
}

// Configuración SEO por defecto
const DEFAULT_SEO = {
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.defaultKeywords,
  ogTitle: SEO_CONFIG.openGraph.title,
  ogDescription: SEO_CONFIG.openGraph.description,
  ogImage: SEO_CONFIG.openGraph.images.default,
  canonical: SEO_CONFIG.siteUrl
};

export function useSEO(seoData: SEOData = {}) {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;
    
    // Combinar datos SEO con valores por defecto
    const finalSEO = { ...DEFAULT_SEO, ...seoData };

    // Actualizar título de la página
    if (finalSEO.title) {
      document.title = finalSEO.title;
    }

    // Función helper para actualizar o crear meta tags
    const updateMetaTag = (selector: string, content: string, attribute: string = 'content') => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Actualizar meta description
    if (finalSEO.description) {
      updateMetaTag('meta[name="description"]', finalSEO.description);
    }

    // Actualizar keywords
    if (finalSEO.keywords && finalSEO.keywords.length > 0) {
      updateMetaTag('meta[name="keywords"]', finalSEO.keywords.join(', '));
    }

    // Actualizar robots meta tag
    if (finalSEO.noindex) {
      updateMetaTag('meta[name="robots"]', 'noindex, nofollow');
    } else {
      updateMetaTag('meta[name="robots"]', 'index, follow');
    }

    // Open Graph tags
    if (finalSEO.ogTitle) {
      updateMetaTag('meta[property="og:title"]', finalSEO.ogTitle);
    }
    if (finalSEO.ogDescription) {
      updateMetaTag('meta[property="og:description"]', finalSEO.ogDescription);
    }
    if (finalSEO.ogImage) {
      updateMetaTag('meta[property="og:image"]', finalSEO.ogImage);
    }

    // Twitter Card tags
    if (finalSEO.twitterTitle) {
      updateMetaTag('meta[name="twitter:title"]', finalSEO.twitterTitle);
    }
    if (finalSEO.twitterDescription) {
      updateMetaTag('meta[name="twitter:description"]', finalSEO.twitterDescription);
    }
    if (finalSEO.twitterImage) {
      updateMetaTag('meta[name="twitter:image"]', finalSEO.twitterImage);
    }

    // Canonical URL
    if (finalSEO.canonical) {
      let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.rel = 'canonical';
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.href = finalSEO.canonical;
    }

    // Structured Data (JSON-LD)
    if (finalSEO.structuredData) {
      let structuredDataElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!structuredDataElement) {
        structuredDataElement = document.createElement('script') as HTMLScriptElement;
        structuredDataElement.type = 'application/ld+json';
        document.head.appendChild(structuredDataElement);
      }
      structuredDataElement.textContent = JSON.stringify(finalSEO.structuredData);
    }

    // Cleanup function para restaurar valores por defecto al desmontar
    return () => {
      document.title = DEFAULT_SEO.title;
      updateMetaTag('meta[name="description"]', DEFAULT_SEO.description);
      updateMetaTag('meta[name="keywords"]', DEFAULT_SEO.keywords.join(', '));
      updateMetaTag('meta[property="og:title"]', DEFAULT_SEO.ogTitle);
      updateMetaTag('meta[property="og:description"]', DEFAULT_SEO.ogDescription);
      updateMetaTag('meta[property="og:image"]', DEFAULT_SEO.ogImage);
      
      const canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalElement) {
        canonicalElement.href = DEFAULT_SEO.canonical;
      }
    };
  }, [seoData]);
}

// Hook específico para el blog
export const useBlogSEO = (post: {
  title: string;
  excerpt: string;
  author: { name: string };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  imageUrl?: string;
} | null = null) => {
  useEffect(() => {
    if (post) {
      const blogConfig = generateMetaTags('blog');
      const seoData: SEOData = {
        title: `${post.title} - ${blogConfig.title}`,
        description: post.excerpt,
        keywords: post.tags,
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.imageUrl,
        twitterTitle: post.title,
        twitterDescription: post.excerpt,
        twitterImage: post.imageUrl,
        canonical: `${SEO_CONFIG.siteUrl}/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Person',
            name: post.author.name,
          },
          publisher: {
            '@type': 'Organization',
            name: SEO_CONFIG.organization?.name || 'Red Creativa',
            logo: {
              '@type': 'ImageObject',
              url: SEO_CONFIG.organization?.logo || 'https://redcreativa.pro/logo.svg',
            },
          },
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          image: {
            '@type': 'ImageObject',
            url: post.imageUrl,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SEO_CONFIG.siteUrl}/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
          },
          keywords: post.tags.join(', '),
        },
      };
      useSEO(seoData);
    } else {
      // SEO para la página principal del blog
      const blogConfig = generateMetaTags('blog');
      const seoData: SEOData = {
        title: blogConfig.title,
        description: blogConfig.description,
        keywords: blogConfig.keywords,
        ogTitle: blogConfig.title,
        ogDescription: blogConfig.description,
        ogImage: SEO_CONFIG.openGraph?.images?.default || 'https://redcreativa.pro/og-image.jpg',
        canonical: `${SEO_CONFIG.siteUrl}/blog`,
      };
      useSEO(seoData);
    }
  }, [post]);
};

// Hook para páginas de recursos
export function useResourceSEO() {
  const resourcesConfig = generateMetaTags('recursos');
  const seoData: SEOData = {
    title: resourcesConfig.title,
    description: resourcesConfig.description,
    keywords: resourcesConfig.keywords,
    ogTitle: resourcesConfig.title,
    ogDescription: resourcesConfig.description,
    ogImage: SEO_CONFIG.openGraph.images.default,
    canonical: `${SEO_CONFIG.siteUrl}/recursos`
  };

  useSEO(seoData);
}

// Hook para calendario editorial
export function useCalendarSEO() {
  const calendarConfig = generateMetaTags('calendario');
  const seoData: SEOData = {
    title: calendarConfig.title,
    description: calendarConfig.description,
    keywords: calendarConfig.keywords,
    ogTitle: calendarConfig.title,
    ogDescription: calendarConfig.description,
    ogImage: SEO_CONFIG.openGraph.images.default,
    canonical: `${SEO_CONFIG.siteUrl}/calendario`
  };

  useSEO(seoData);
}



// Hook para creador de miniaturas
export function useThumbnailsSEO() {
  const thumbnailsConfig = generateMetaTags('miniaturas');
  const seoData: SEOData = {
    title: thumbnailsConfig.title,
    description: thumbnailsConfig.description,
    keywords: thumbnailsConfig.keywords,
    ogTitle: thumbnailsConfig.title,
    ogDescription: thumbnailsConfig.description,
    ogImage: SEO_CONFIG.openGraph.images.default,
    canonical: `${SEO_CONFIG.siteUrl}/miniaturas`
  };

  useSEO(seoData);
}

// Hook para prompts
export function usePromptsSEO() {
  const promptsConfig = generateMetaTags('prompts');
  const seoData: SEOData = {
    title: promptsConfig.title,
    description: promptsConfig.description,
    keywords: promptsConfig.keywords,
    ogTitle: promptsConfig.title,
    ogDescription: promptsConfig.description,
    ogImage: SEO_CONFIG.openGraph.images.default,
    canonical: `${SEO_CONFIG.siteUrl}/prompts`
  };

  useSEO(seoData);
}

// Hook para scripts
export function useScriptsSEO() {
  const scriptsConfig = generateMetaTags('guiones');
  const seoData: SEOData = {
    title: scriptsConfig.title,
    description: scriptsConfig.description,
    keywords: scriptsConfig.keywords,
    ogTitle: scriptsConfig.title,
    ogDescription: scriptsConfig.description,
    ogImage: SEO_CONFIG.openGraph.images.default,
    canonical: `${SEO_CONFIG.siteUrl}/scripts`
  };

  useSEO(seoData);
}

// Hook para chat IA
export function useChatSEO() {
  const chatConfig = generateMetaTags('chat');
  const seoData: SEOData = {
    title: chatConfig.title,
    description: chatConfig.description,
    keywords: chatConfig.keywords,
    ogTitle: chatConfig.title,
    ogDescription: chatConfig.description,
    ogImage: SEO_CONFIG.openGraph.images.default,
    canonical: `${SEO_CONFIG.siteUrl}/chat`
  };

  useSEO(seoData);
}