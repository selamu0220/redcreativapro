export type ResourceType = 'document' | 'image' | 'link' | 'ai-tool';
export type ResourceVisibility = 'private';

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
  titulo: string;
  descripcion?: string;
  tipo: ResourceType;
  url?: string;
  etiquetas: string[];
  favorito: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  autor: string;
  rating: number;
  
  // Campos adicionales para compatibilidad
  title?: string;
  description?: string;
  type?: ResourceType;
  tags?: string[];
  createdAt?: string;
  size?: string;
  thumbnailUrl?: string;
  visibility?: ResourceVisibility;
  ownerId?: string;
  comments?: ResourceComment[];
}