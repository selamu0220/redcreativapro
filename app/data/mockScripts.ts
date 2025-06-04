import { Script } from '@/types/scripts';

export const mockScripts: Script[] = [
  {
    id: '1',
    title: 'Product Launch Video Script',
    content: '# Introduction\n\nWelcome to our exciting new product launch...',
    status: 'final',
    category: 'Marketing',
    tags: ['product', 'launch', 'promotional'],
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-18T14:30:00Z',
    versions: [
      {
        id: '1-1',
        content: '# Initial Draft\n\nFirst version of the product launch...',
        createdAt: '2025-03-15T10:00:00Z',
        createdBy: {
          id: '1',
          name: 'Demo User',
        },
      },
      {
        id: '1-2',
        content: '# Introduction\n\nWelcome to our exciting new product launch...',
        createdAt: '2025-03-18T14:30:00Z',
        createdBy: {
          id: '1',
          name: 'Demo User',
        },
        comment: 'Final revisions after team review',
      },
    ],
    aiGenerated: false,
    seoKeywords: ['product launch', 'innovation', 'technology'],
    platforms: ['YouTube', 'Instagram'],
    assignees: [
      {
        id: '1',
        name: 'Demo User',
        avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
      },
    ],
  },
  {
    id: '2',
    title: 'Weekly Tutorial Series: Episode 5',
    content: '# Tutorial Overview\n\nIn this week\'s episode, we\'ll cover...',
    status: 'review',
    category: 'Education',
    tags: ['tutorial', 'series', 'weekly'],
    createdAt: '2025-03-20T09:15:00Z',
    updatedAt: '2025-03-20T15:45:00Z',
    versions: [
      {
        id: '2-1',
        content: '# Tutorial Overview\n\nIn this week\'s episode, we\'ll cover...',
        createdAt: '2025-03-20T09:15:00Z',
        createdBy: {
          id: '2',
          name: 'Alex Johnson',
        },
      },
    ],
    aiGenerated: true,
    seoKeywords: ['tutorial', 'learning', 'education'],
    platforms: ['YouTube', 'Blog'],
  },
  {
    id: '3',
    title: 'Social Media Campaign Script',
    content: '# Campaign Strategy\n\nThis month\'s social media campaign...',
    status: 'draft',
    category: 'Social Media',
    tags: ['campaign', 'social', 'strategy'],
    createdAt: '2025-03-22T11:30:00Z',
    updatedAt: '2025-03-22T11:30:00Z',
    versions: [
      {
        id: '3-1',
        content: '# Campaign Strategy\n\nThis month\'s social media campaign...',
        createdAt: '2025-03-22T11:30:00Z',
        createdBy: {
          id: '3',
          name: 'Sam Taylor',
        },
      },
    ],
    aiGenerated: false,
    platforms: ['Instagram', 'TikTok', 'Twitter'],
  },
];