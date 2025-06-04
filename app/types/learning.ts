export interface Video {
  id: string;
  title: string;
  type: 'youtube' | 'googledrive' | 'vimeo'; // Added vimeo as another option
  url: string; // YouTube video ID or Google Drive embeddable link
  duration: string; // e.g., "10:35"
}

export interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface LearningSection {
  id: string;
  title: string;
  videos: Video[];
  tasks: Task[];
  description?: string;
}

export interface Review {
  id: string;
  userId: string; // or userName: string
  userName: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string; // ISO date string
}

export interface Learning {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnailUrl?: string; // URL for the course thumbnail
  sections: LearningSection[];
  overallRating: number; // Average rating
  reviews: Review[];
  tags?: string[]; // e.g., ['React', 'TypeScript', 'Web Development']
  enrollmentCount?: number;
  lastUpdated: string; // ISO date string
}