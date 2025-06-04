import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { ScrollArea } from '../../ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { ThumbnailTemplate } from '../../types/thumbnails';
import { thumbnailTemplates } from '../../data/thumbnailTemplates';
import { useState, useEffect } from 'react';
import { Trash2, User } from 'lucide-react';

interface ThumbnailTemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: ThumbnailTemplate) => void;
}

export function ThumbnailTemplateSelector({
  open,
  onOpenChange,
  onSelectTemplate,
}: ThumbnailTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customTemplates, setCustomTemplates] = useState<ThumbnailTemplate[]>([]);

  useEffect(() => {
    const loadCustomTemplates = () => {
      const saved = localStorage.getItem('customThumbnailTemplates');
      if (saved) {
        setCustomTemplates(JSON.parse(saved));
      }
    };
    
    if (open) {
      loadCustomTemplates();
    }
  }, [open]);

  const deleteCustomTemplate = (templateId: string) => {
    const updatedTemplates = customTemplates.filter(t => t.id !== templateId);
    setCustomTemplates(updatedTemplates);
    localStorage.setItem('customThumbnailTemplates', JSON.stringify(updatedTemplates));
  };

  const getFilteredTemplates = () => {
    if (selectedCategory === 'custom') {
      return customTemplates;
    }
    
    return selectedCategory === 'all'
      ? thumbnailTemplates
      : thumbnailTemplates.filter(t => t.category === selectedCategory);
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Plantillas de Miniaturas</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mis Plantillas ({customTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="education">Educación</TabsTrigger>
            <TabsTrigger value="business">Negocios</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[500px] pr-4">
          {filteredTemplates.length === 0 && selectedCategory === 'custom' ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tienes plantillas personalizadas</h3>
              <p className="text-muted-foreground mb-4">
                Crea tu primera plantilla personalizada usando el botón "Guardar Plantilla"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group relative cursor-pointer"
                >
                  <div 
                    className="aspect-video overflow-hidden rounded-lg border"
                    onClick={() => {
                      onSelectTemplate(template);
                      onOpenChange(false);
                    }}
                  >
                    {template.preview ? (
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {selectedCategory === 'custom' && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCustomTemplate(template.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                  
                  <div 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={() => {
                      onSelectTemplate(template);
                      onOpenChange(false);
                    }}
                  >
                    <div className="text-center text-white p-4">
                      <h3 className="font-bold">{template.name}</h3>
                      <p className="text-sm text-gray-200">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}