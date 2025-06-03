import React from 'react';
import { PromptLibrary } from './PromptLibrary';
import { usePromptsSEO } from '@/hooks/useSEO';

export function PromptsView() {
  // Aplicar SEO específico para la página de prompts
  usePromptsSEO();
  
  return <PromptLibrary />;
}