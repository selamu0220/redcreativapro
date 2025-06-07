'use client';

import React, { useState, useCallback } from 'react';
import { Script } from '../../types/scripts';
import { mockScripts } from '../../data/mockScripts';
import { ScriptList } from './ScriptList';
import { ScriptDetail } from './ScriptDetail';
import { ScriptFilters } from './ScriptFilters';
import { Button } from '../../ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent } from '../../ui/dialog';
import { ScriptEditor } from './ScriptEditor';
import { useToast } from '../../hooks/use-toast';
import { useScriptsSEO } from '../../hooks/useSEO';

export function ScriptLibrary() {
  const [scripts, setScripts] = useState<Script[]>(mockScripts);
  const [filteredScripts, setFilteredScripts] = useState<Script[]>(mockScripts);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  // Aplicar SEO específico para la página de guiones
  useScriptsSEO();

  const handleFilter = useCallback((filtered: Script[]) => {
    setFilteredScripts(filtered);
  }, []);

  const handleScriptSelect = (script: Script) => {
    setSelectedScript(script);
  };

  const handleScriptSave = (updatedScript: Script) => {
    if (selectedScript) {
      setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
      setFilteredScripts(filteredScripts.map(s => s.id === updatedScript.id ? updatedScript : s));
    } else {
      setScripts([...scripts, updatedScript]);
      setFilteredScripts([...filteredScripts, updatedScript]);
    }
    setIsEditorOpen(false);
    setSelectedScript(null);
    toast({
      title: selectedScript ? 'Guion actualizado' : 'Guion creado',
      description: `Se ha ${selectedScript ? 'actualizado' : 'creado'} exitosamente "${updatedScript.title}"`,
    });
  };

  const handleNewScript = () => {
    setSelectedScript(null);
    setIsEditorOpen(true);
  };

  const handleEditScript = (script: Script) => {
    setSelectedScript(script);
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca de Guiones</h1>
          <p className="text-muted-foreground">
            Gestiona y organiza tus guiones de video y contenido.
          </p>
        </div>
        <Button onClick={handleNewScript} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Nuevo Guion</span>
        </Button>
      </div>

      <ScriptFilters scripts={scripts} onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <ScriptList
            scripts={filteredScripts}
            onScriptSelect={handleScriptSelect}
            selectedScript={selectedScript}
          />
        </div>
        <div className="col-span-1 lg:col-span-2">
          {selectedScript ? (
            <ScriptDetail
              script={selectedScript}
              onEdit={handleEditScript}
            />
          ) : (
            <div className="border rounded-lg p-8 text-center text-muted-foreground">
              Selecciona un guion para ver los detalles
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <ScriptEditor
            script={selectedScript}
            onSave={handleScriptSave}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}