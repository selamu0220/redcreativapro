import React from 'react';
import { ScriptLibrary } from './ScriptLibrary';
import { useScriptsSEO } from '@/hooks/useSEO';

export function ScriptsView() {
  // Aplicar SEO específico para la página de scripts
  useScriptsSEO();
  
  return <ScriptLibrary />;
}