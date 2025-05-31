import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThumbnailTemplate } from '@/types/thumbnails';
import { thumbnailTemplates } from '@/data/thumbnailTemplates';
import { useState } from 'react';

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

  const filteredTemplates = selectedCategory === 'all'
    ? thumbnailTemplates
    : thumbnailTemplates.filter(t => t.category === selectedCategory);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Plantillas de Miniaturas</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="education">Educación</TabsTrigger>
            <TabsTrigger value="business">Negocios</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative cursor-pointer"
                onClick={() => {
                  onSelectTemplate(template);
                  onOpenChange(false);
                }}
              >
                <div className="aspect-video overflow-hidden rounded-lg border">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="font-bold">{template.name}</h3>
                    <p className="text-sm text-gray-200">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}