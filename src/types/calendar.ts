export type EventVisibility = 'private' | 'public' | 'shared';

export interface EventType {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  color?: string;
  script?: string;
  visibility: EventVisibility;
  sharedWith?: string[];
  ownerId: string;
}