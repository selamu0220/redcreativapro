import { Post } from '@/types/blog';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Content Creation',
    content: `# Getting Started with Content Creation

Creating engaging content is essential for building an audience and establishing your brand. Here are some key tips to get started:

## 1. Know Your Audience

Understanding who you're creating content for is crucial. Research your target audience's:
- Interests
- Pain points
- Preferred platforms
- Content consumption habits

## 2. Plan Your Content Strategy

Develop a content calendar that includes:
- Topics
- Publishing schedule
- Content types
- Distribution channels

## 3. Focus on Quality

Quality always trumps quantity. Ensure your content is:
- Well-researched
- Original
- Valuable to your audience
- Professionally presented`,
    excerpt: 'Learn the fundamentals of content creation and how to build an effective content strategy.',
    author: {
      id: '1',
      name: 'Demo User',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-03-15T10:00:00Z',
    tags: ['content creation', 'strategy', 'marketing'],
    imageUrl: 'https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Social Media Marketing Tips for 2025',
    content: `# Social Media Marketing Tips for 2025

Stay ahead of the curve with these essential social media marketing strategies for 2025.

## Emerging Trends

- AI-powered content creation
- Virtual reality experiences
- Short-form video dominance
- Community-driven content

## Best Practices

1. Authenticity is key
2. Engage with your audience
3. Leverage user-generated content
4. Monitor analytics regularly

## Platform-Specific Strategies

### Instagram
- Focus on Reels
- Use interactive stickers
- Optimize your bio

### TikTok
- Participate in trends
- Use popular sounds
- Create native content

### LinkedIn
- Share industry insights
- Engage with thought leaders
- Post consistently`,
    excerpt: 'Discover the latest social media marketing trends and strategies for 2025.',
    author: {
      id: '2',
      name: 'Alex Johnson',
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    },
    createdAt: '2025-03-14T15:30:00Z',
    updatedAt: '2025-03-14T15:30:00Z',
    tags: ['social media', 'marketing', 'trends'],
    imageUrl: 'https://images.pexels.com/photos/3850250/pexels-photo-3850250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];