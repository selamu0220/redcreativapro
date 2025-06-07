export interface VideoProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'archived';
  category: string;
  tags: string[];
  
  // Google Drive Integration
  googleDriveFolder?: {
    id: string;
    name: string;
    url: string;
  };
  
  // Script Information
  script: {
    title: string;
    content: string;
    notes: string;
    duration?: number; // in minutes
    scenes: ScriptScene[];
  };
  
  // Content Organization
  content: {
    recorded: ContentFile[];
    edited: ContentFile[];
    resources: ContentFile[];
    overlays: ContentFile[];
    documents: ContentFile[];
    other: ContentFile[];
  };
  
  // Planning Board
  board: {
    tasks: ProjectTask[];
    timeline: TimelineEvent[];
    notes: string;
  };
}

export interface ScriptScene {
  id: string;
  title: string;
  content: string;
  type?: 'intro' | 'main' | 'transition' | 'outro' | 'other';
  duration?: number;
  notes: string;
  order: number;
  actions?: string[];
}

export interface ContentFile {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'document' | 'overlay' | 'other';
  url?: string;
  googleDriveId?: string;
  size?: number;
  uploadedAt: string;
  description?: string;
  tags: string[];
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  category: 'script' | 'recording' | 'editing' | 'review' | 'publishing' | 'other';
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'deadline' | 'meeting' | 'recording' | 'editing' | 'publishing';
  completed: boolean;
}

export interface ProjectExport {
  project: VideoProject;
  exportedAt: string;
  version: string;
}

export interface ProjectImport {
  project: VideoProject;
  importedAt: string;
  conflicts?: string[];
}