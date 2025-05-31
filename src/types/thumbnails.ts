import { GradientStop } from './thumbnails';

export interface GradientStop {
  color: string;
  position: number;
}

export interface ThumbnailSettings {
  title: string;
  subtitle?: string;
  bgColor: string;
  textColor: string;
  fontFamily: string;
  bgImageUrl?: string;
  width: number;
  height: number;
  titleFontSize: number;
  subtitleFontSize: number;
  titlePosition: number;
  subtitlePosition: number;
  textShadow: boolean;
  bgImageOpacity: number;
  bgType: 'solid' | 'linear-gradient' | 'radial-gradient';
  gradientAngle: number;
  gradientStops: GradientStop[];
}

export interface ThumbnailImage {
  id: string;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Thumbnail {
  id: string;
  title: string;
  settings: ThumbnailSettings;
  images: ThumbnailImage[];
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  visibility: 'private' | 'public' | 'shared';
  sharedWith?: string[];
}

export interface ThumbnailTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  settings: ThumbnailSettings;
  category: 'gaming' | 'tech' | 'lifestyle' | 'education' | 'business';
}