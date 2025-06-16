export type PromptCategory = 
  | 'blog' 
  | 'social' 
  | 'marketing' 
  | 'seo' 
  | 'creative' 
  | 'video' 
  | 'podcast' 
  | 'email' 
  | 'ads' 
  | 'product' 
  | 'technical' 
  | 'research' 
  | 'storytelling' 
  | 'educational' 
  | 'copywriting';

export type PromptVisibility = 'private';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  usageCount: number;
  visibility: PromptVisibility;
  ownerId: string;
}