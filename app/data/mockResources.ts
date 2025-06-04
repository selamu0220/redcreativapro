import { Resource } from '@/types/resources';

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Brand Style Guide',
    description: 'Official company brand style guide with logos, colors, and typography',
    type: 'document',
    tags: ['branding', 'design', 'guidelines'],
    createdAt: '2025-05-10T10:30:00Z',
    rating: 4.5,
    size: '2.3 MB',
    thumbnailUrl: 'https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1',
    comments: [
      {
        id: '1',
        resourceId: '1',
        userId: '2',
        userName: 'Alex Johnson',
        userAvatar: 'https://avatars.githubusercontent.com/u/124599?v=4',
        content: 'Excelente guía, muy completa y bien estructurada.',
        createdAt: '2025-05-10T11:30:00Z',
        updatedAt: '2025-05-10T11:30:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Marketing Campaign Photos',
    description: 'Professional photos for the summer marketing campaign',
    type: 'image',
    tags: ['marketing', 'photography', 'campaign'],
    createdAt: '2025-05-09T14:15:00Z',
    rating: 4.8,
    size: '15.7 MB',
    thumbnailUrl: 'https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'private',
    ownerId: '1'
  },
  {
    id: '3',
    title: 'Content Calendar Template',
    description: 'Spreadsheet template for planning content across multiple channels',
    type: 'document',
    tags: ['planning', 'content', 'template'],
    createdAt: '2025-05-08T09:45:00Z',
    rating: 4.2,
    size: '1.1 MB',
    thumbnailUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1'
  },
  {
    id: '4',
    title: 'DALL-E 3',
    description: 'Advanced AI image generation tool',
    type: 'ai-tool',
    tags: ['ai', 'graphics', 'generation'],
    createdAt: '2025-05-07T16:20:00Z',
    rating: 4.9,
    url: 'https://openai.com/dall-e-3',
    thumbnailUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1'
  },
  {
    id: '5',
    title: 'SEO Best Practices 2025',
    description: 'Latest guide on search engine optimization techniques',
    type: 'document',
    tags: ['seo', 'marketing', 'guide'],
    createdAt: '2025-05-06T11:10:00Z',
    rating: 4.4,
    size: '3.2 MB',
    thumbnailUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1'
  },
  {
    id: '6',
    title: 'Canva Pro',
    description: 'Online graphic design platform with templates',
    type: 'link',
    tags: ['design', 'graphics', 'tool'],
    createdAt: '2025-05-05T08:30:00Z',
    rating: 4.6,
    url: 'https://www.canva.com/pro/',
    thumbnailUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1'
  },
  {
    id: '7',
    title: 'Social Media Engagement Report',
    description: 'Q1 2025 report on social media performance metrics',
    type: 'document',
    tags: ['report', 'social media', 'analytics'],
    createdAt: '2025-05-04T13:25:00Z',
    rating: 4.1,
    size: '5.7 MB',
    thumbnailUrl: 'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1'
  },
  {
    id: '8',
    title: 'ChatGPT',
    description: 'AI-powered conversation and content generation assistant',
    type: 'ai-tool',
    tags: ['ai', 'writing', 'assistant'],
    createdAt: '2025-05-03T09:15:00Z',
    rating: 4.7,
    url: 'https://chat.openai.com/',
    thumbnailUrl: 'https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    visibility: 'public',
    ownerId: '1'
  }
];