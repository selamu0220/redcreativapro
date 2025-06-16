export type EventVisibility = 'private';

export interface EventType {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  color?: string;
  script?: string;
  visibility: EventVisibility;
  ownerId: string;
}