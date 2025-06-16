export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  imageUrl?: string;
  // SEO fields
  metaDescription?: string;
  keywords?: string[];
  slug?: string;
  // Content organization
  category?: string;
  readingTime?: number; // in minutes
  featured?: boolean;
  // Social sharing
  socialImage?: string;
  // Content quality
  status?: 'draft' | 'published' | 'archived';
}