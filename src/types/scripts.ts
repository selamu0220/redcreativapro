export type ScriptStatus = 'draft' | 'review' | 'final';
export type ScriptVisibility = 'private' | 'public' | 'shared';

export interface ScriptVersion {
  id: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  comment?: string;
}

export interface Script {
  id: string;
  title: string;
  content: string;
  status: ScriptStatus;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  versions: ScriptVersion[];
  eventId?: string;
  aiGenerated: boolean;
  seoKeywords?: string[];
  platforms?: string[];
  assignees?: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];
  visibility: ScriptVisibility;
  sharedWith?: string[];
  ownerId: string;
}