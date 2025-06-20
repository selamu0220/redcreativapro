import { Prompt } from "../types/prompts";

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Blog Post Introduction',
    content: 'Write an engaging introduction for a blog post about {topic}. The tone should be {tone} and the target audience is {audience}. Include a hook that captures attention and clearly states the value proposition for the reader.',
    category: 'blog',
    tags: ['blog', 'writing', 'introduction'],
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
    isFavorite: true,
    usageCount: 15,
    visibility: 'private',
    ownerId: 'local-user',
  },
  {
    id: '2',
    title: 'Social Media Caption',
    content: 'Create a compelling social media caption for {platform} about {topic}. Include relevant hashtags and a call-to-action. The caption should be engaging and align with the brand voice while encouraging user interaction.',
    category: 'social',
    tags: ['social media', 'caption', 'engagement'],
    createdAt: '2025-03-14T15:30:00Z',
    updatedAt: '2025-03-14T15:30:00Z',
    isFavorite: false,
    usageCount: 8,
    visibility: 'private',
    ownerId: 'local-user',
  },
  {
    id: '3',
    title: 'Marketing Campaign Outline',
    content: 'Develop a comprehensive marketing campaign outline for {product/service}. Target audience: {audience}. Include key messaging points, campaign objectives, distribution channels, and success metrics. Focus on creating a cohesive strategy that aligns with business goals.',
    category: 'marketing',
    tags: ['marketing', 'campaign', 'strategy'],
    createdAt: '2025-03-13T09:45:00Z',
    updatedAt: '2025-03-13T09:45:00Z',
    isFavorite: true,
    usageCount: 12,
    visibility: 'private',
    ownerId: 'local-user',
  },
];
