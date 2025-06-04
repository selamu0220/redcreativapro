export type ResourceType = 'document' | 'image' | 'link' | 'ai-tool';
export type ResourceVisibility = 'private' | 'public' | 'shared';

export interface ResourceComment {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: ResourceType;
  tags: string[];
  createdAt: string;
  rating: number;
  size?: string;
  url?: string;
  thumbnailUrl?: string;
  visibility: ResourceVisibility;
  sharedWith?: string[];
  ownerId: string;
  comments?: ResourceComment[];
}