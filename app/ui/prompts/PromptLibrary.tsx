'use client';

import { useState } from 'react';
import { Prompt } from '../../types/prompts';
import { mockPrompts } from '../../data/mockPrompts';
import { PromptList } from './PromptList';
import { PromptDetail } from './PromptDetail';
import { PromptEditor } from './PromptEditor';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Plus, Library } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { usePromptsStorage } from '../../hooks/useLocalStorage';
import { CSVManager } from '../common/CSVManager';

export function PromptLibrary() {
  const { data: prompts, setData: setPrompts, importFromCSV, exportToCSV, hasChanges } = usePromptsStorage(mockPrompts);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const { toast } = useToast();

  const handleSavePrompt = (prompt: Prompt) => {
    if (editingPrompt) {
      setPrompts(prompts.map(p => p.id === prompt.id ? prompt : p));
      toast({
        title: 'Prompt actualizado',
        description: 'Tu prompt ha sido actualizado correctamente.',
      });
    } else {
      setPrompts([prompt, ...prompts]);
      toast({
        title: 'Prompt creado',
        description: 'Tu prompt ha sido creado correctamente.',
      });
    }
    setIsEditorOpen(false);
    setEditingPrompt(null);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setSelectedPrompt(null);
    setIsEditorOpen(true);
  };

  const handleNewPrompt = () => {
    setEditingPrompt(null);
    setIsEditorOpen(true);
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleToggleFavorite = (promptId: string) => {
    setPrompts(prompts.map(p => 
      p.id === promptId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleDeletePrompt = (promptId: string) => {
    setPrompts(prompts.filter(p => p.id !== promptId));
    setSelectedPrompt(null);
    toast({
      title: 'Prompt eliminado',
      description: 'Tu prompt ha sido eliminado correctamente.',
    });
  };

  const handleImportCSV = async (file: File) => {
    await importFromCSV(file);
  };

  const handleExportCSV = () => {
    exportToCSV();
  };

  // Todos los prompts son locales ahora
  const filteredPrompts = prompts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca de Prompts</h1>
          <p className="text-muted-foreground">
            Gestiona y organiza tus prompts de IA localmente
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CSVManager
            onImport={handleImportCSV}
            onExport={handleExportCSV}
            hasChanges={hasChanges}
            dataType="prompts"
            itemCount={prompts.length}
          />
          <Button onClick={handleNewPrompt}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Prompt
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Library className="h-4 w-4" />
        <span>{prompts.length} prompts en tu biblioteca local</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <PromptList
            prompts={filteredPrompts}
            onPromptSelect={handlePromptSelect}
            selectedPrompt={selectedPrompt}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className="col-span-1 lg:col-span-2">
          {selectedPrompt ? (
            <PromptDetail
              prompt={selectedPrompt}
              onEdit={handleEditPrompt}
              onDelete={handleDeletePrompt}
            />
          ) : (
            <div className="border rounded-lg p-8 text-center text-muted-foreground">
              Selecciona un prompt para ver los detalles
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {editingPrompt ? 'Editar Prompt' : 'Nuevo Prompt'}
            </DialogTitle>
          </DialogHeader>
          <PromptEditor
            onSave={handleSavePrompt}
            prompt={editingPrompt}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}