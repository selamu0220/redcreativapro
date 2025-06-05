import { Post } from "../types/blog";
import { EventType } from "../types/calendar";
import { Resource } from "../types/resources";
import { Script } from "../types/scripts";

export type SearchResult = {
  id: string;
  type: 'blog' | 'event' | 'resource' | 'script';
  title: string;
  description?: string;
  tags?: string[];
  url?: string;
  date?: string;
  relevance: number;
};

export type SearchFilters = {
  type?: ('blog' | 'event' | 'resource' | 'script')[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
};

export async function searchContent(
  query: string,
  content: {
    posts?: Post[];
    events?: EventType[];
    resources?: Resource[];
    scripts?: Script[];
  },
  filters?: SearchFilters
): Promise<SearchResult[]> {
  let results: SearchResult[] = [];

  const searchQuery = query.toLowerCase();
  const searchTerms = searchQuery.split(/\s+/).filter(Boolean);

  if (content.posts && (!filters?.type || filters.type.includes('blog'))) {
    const postResults = content.posts.map(post => ({
      id: post.id,
      type: 'blog' as const,
      title: post.title,
      description: post.excerpt,
      tags: post.tags,
      date: post.createdAt,
      relevance: calculateRelevance(searchTerms, post.title, post.content, post.tags),
      url: `/blog/${post.id}`
    }));
    results = [...results, ...postResults];
  }

  if (content.resources && (!filters?.type || filters.type.includes('resource'))) {
    const resourceResults = content.resources.map(resource => ({
      id: resource.id,
      type: 'resource' as const,
      title: resource.title,
      description: resource.description,
      tags: resource.tags,
      url: resource.url,
      relevance: calculateRelevance(searchTerms, resource.title, resource.description || '', resource.tags) * 1.5, // Priorizar recursos
    }));
    results = [...results, ...resourceResults];
  }

  if (content.scripts && (!filters?.type || filters.type.includes('script'))) {
    const scriptResults = content.scripts.map(script => ({
      id: script.id,
      type: 'script' as const,
      title: script.title,
      description: script.content.slice(0, 150) + '...',
      tags: script.tags,
      date: script.updatedAt,
      relevance: calculateRelevance(searchTerms, script.title, script.content, script.tags),
    }));
    results = [...results, ...scriptResults];
  }

  if (content.events && (!filters?.type || filters.type.includes('event'))) {
    const eventResults = content.events.map(event => ({
      id: event.id,
      type: 'event' as const,
      title: event.title,
      description: event.description,
      date: event.start,
      relevance: calculateRelevance(searchTerms, event.title, event.description || '', []),
      url: `/calendar?event=${event.id}`
    }));
    results = [...results, ...eventResults];
  }

  if (filters?.dateRange) {
    results = results.filter(result => {
      if (!result.date) return true;
      const date = new Date(result.date);
      return date >= filters.dateRange!.start && date <= filters.dateRange!.end;
    });
  }

  if (filters?.tags && filters.tags.length > 0) {
    results = results.filter(result => 
      result.tags?.some(tag => filters.tags!.includes(tag))
    );
  }

  return results.sort((a, b) => b.relevance - a.relevance);
}

function calculateRelevance(
  searchTerms: string[],
  title: string,
  content: string,
  tags: string[]
): number {
  let relevance = 0;
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  const tagsLower = tags.map(t => t.toLowerCase());

  for (const term of searchTerms) {
    // TÃ­tulo exacto
    if (titleLower === term) {
      relevance += 20;
    }
    // TÃ­tulo contiene tÃ©rmino
    else if (titleLower.includes(term)) {
      relevance += 10;
    }

    // Tag exacto
    if (tagsLower.includes(term)) {
      relevance += 8;
    }
    // Tag parcial
    else if (tagsLower.some(tag => tag.includes(term))) {
      relevance += 5;
    }

    // Contenido contiene tÃ©rmino
    if (contentLower.includes(term)) {
      relevance += 3;
    }
  }

  return relevance;
}
