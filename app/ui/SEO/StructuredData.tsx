import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
}

interface ArticleData {
  headline: string;
  description: string;
  author: {
    name: string;
    url?: string;
  };
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  keywords: string[];
}

interface WebsiteData {
  name: string;
  url: string;
  description: string;
  potentialAction: {
    target: string;
    queryInput: string;
  };
}

interface StructuredDataProps {
  type: 'organization' | 'article' | 'website' | 'breadcrumb';
  data: OrganizationData | ArticleData | WebsiteData | any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseContext = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'organization':
        const orgData = data as OrganizationData;
        return {
          ...baseContext,
          '@type': 'Organization',
          name: orgData.name,
          url: orgData.url,
          logo: {
            '@type': 'ImageObject',
            url: orgData.logo,
          },
          description: orgData.description,
          sameAs: orgData.sameAs,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['Spanish', 'English'],
          },
        };

      case 'article':
        const articleData = data as ArticleData;
        return {
          ...baseContext,
          '@type': 'Article',
          headline: articleData.headline,
          description: articleData.description,
          author: {
            '@type': 'Person',
            name: articleData.author.name,
            url: articleData.author.url,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Red Creativa Pro',
            logo: {
              '@type': 'ImageObject',
              url: 'https://redcreativa.pro/logo.png',
            },
          },
          datePublished: articleData.datePublished,
          dateModified: articleData.dateModified,
          image: {
            '@type': 'ImageObject',
            url: articleData.image,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleData.url,
          },
          keywords: articleData.keywords.join(', '),
        };

      case 'website':
        const websiteData = data as WebsiteData;
        return {
          ...baseContext,
          '@type': 'WebSite',
          name: websiteData.name,
          url: websiteData.url,
          description: websiteData.description,
          potentialAction: {
            '@type': 'SearchAction',
            target: websiteData.potentialAction.target,
            'query-input': websiteData.potentialAction.queryInput,
          },
        };

      case 'breadcrumb':
        return {
          ...baseContext,
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };

      default:
        return baseContext;
    }
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

// Componentes específicos para facilitar el uso
export const OrganizationStructuredData: React.FC = () => {
  const organizationData: OrganizationData = {
    name: 'Red Creativa Pro',
    url: 'https://redcreativa.pro',
    logo: 'https://redcreativa.pro/logo.png',
    description: 'Plataforma integral para creadores de contenido con herramientas de IA, gestión de recursos creativos, calendario editorial y más.',
    sameAs: [
      'https://twitter.com/redcreativapro',
      'https://instagram.com/redcreativapro',
      'https://linkedin.com/company/redcreativapro',
    ],
  };

  return <StructuredData type="organization" data={organizationData} />;
};

export const WebsiteStructuredData: React.FC = () => {
  const websiteData: WebsiteData = {
    name: 'Red Creativa Pro',
    url: 'https://redcreativa.pro',
    description: 'Herramientas profesionales para creadores de contenido: IA, recursos creativos, calendario editorial y más.',
    potentialAction: {
      target: 'https://redcreativa.pro/recursos?q={search_term_string}',
      queryInput: 'required name=search_term_string',
    },
  };

  return <StructuredData type="website" data={websiteData} />;
};

export const BlogArticleStructuredData: React.FC<{
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  imageUrl: string;
  articleUrl: string;
  keywords: string[];
}> = ({ title, description, author, publishedDate, modifiedDate, imageUrl, articleUrl, keywords }) => {
  const articleData: ArticleData = {
    headline: title,
    description,
    author: {
      name: author,
      url: `https://redcreativa.pro/author/${author.toLowerCase().replace(/\s+/g, '-')}`,
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    image: imageUrl,
    url: articleUrl,
    keywords,
  };

  return <StructuredData type="article" data={articleData} />;
};

export default StructuredData;