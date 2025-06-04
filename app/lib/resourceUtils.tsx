import { FileText, Image, Link, Sparkles, File } from 'lucide-react';
import { ResourceType } from "../types\resources";

export function getResourceIcon(type: ResourceType) {
  switch (type) {
    case 'document':
      return FileText;
    case 'image':
      return Image;
    case 'link':
      return Link;
    case 'ai-tool':
      return Sparkles;
    default:
      return File;
  }
}
