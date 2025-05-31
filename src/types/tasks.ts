export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskAssignee {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  labels?: string[];
  subtasks?: Subtask[];
  assignee?: TaskAssignee;
}