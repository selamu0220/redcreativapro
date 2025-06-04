'use client';

import { useState } from 'react';
import { Prompt } from '../../types/prompts';
import { mockPrompts } from '../../data/mockPrompts';
import { PromptList } from './PromptList';
import { PromptDetail } from './PromptDetail';
import { PromptEditor } from './PromptEditor';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Plus, Library, Globe } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';

export function PromptLibrary() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [view, setView] = useState<'personal' | 'feed'>('personal');
  const { toast } = useToast();
  const { user } = useAuth();

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

  const handleShare = (promptId: string) => {
    // Implementar lógica de compartir
    toast({
      title: 'Compartir prompt',
      description: 'Próximamente podrás compartir tus prompts con otros usuarios.',
    });
  };

  const filteredPrompts = prompts.filter(prompt => {
    if (view === 'personal') {
      return true; // Mostrar todos los prompts personales
    } else {
      return prompt.isFavorite; // En el feed mostrar solo los favoritos por ahora
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca de Prompts</h1>
          <p className="text-muted-foreground">
            Gestiona y organiza tus prompts de IA
          </p>
        </div>
        <Button onClick={handleNewPrompt}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Prompt
        </Button>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as 'personal' | 'feed')} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <Library className="h-4 w-4" />
            Mi Biblioteca
          </TabsTrigger>
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Feed Público
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <PromptList
            prompts={filteredPrompts}
            onPromptSelect={handlePromptSelect}
            selectedPrompt={selectedPrompt}
            onToggleFavorite={handleToggleFavorite}
            view={view}
          />
        </div>
        <div className="col-span-1 lg:col-span-2">
          {selectedPrompt ? (
            <PromptDetail
              prompt={selectedPrompt}
              onEdit={handleEditPrompt}
              onDelete={handleDeletePrompt}
              onShare={handleShare}
              view={view}
            />
          ) : (
            <div className="border rounded-lg p-8 text-center text-muted-foreground">
              {view === 'personal' ? 
                'Selecciona un prompt para ver los detalles' :
                'Explora y guarda prompts de otros creadores'
              }
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