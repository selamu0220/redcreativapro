import { Prompt } from '@/types/prompts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Star, FileText } from 'lucide-react';
import { formatDate } from '@/lib/dateUtils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PromptListProps {
  prompts: Prompt[];
  onPromptSelect: (prompt: Prompt) => void;
  selectedPrompt: Prompt | null;
  onToggleFavorite: (promptId: string) => void;
  view: 'personal' | 'feed';
}

export function PromptList({
  prompts,
  onPromptSelect,
  selectedPrompt,
  onToggleFavorite,
  view,
}: PromptListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-2 pr-4">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className={cn(
              'border rounded-lg p-4 cursor-pointer transition-colors',
              selectedPrompt?.id === prompt.id
                ? 'bg-accent'
                : 'hover:bg-accent/50'
            )}
            onClick={() => onPromptSelect(prompt)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium line-clamp-1">{prompt.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Actualizado {formatDate(prompt.updatedAt)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(prompt.id);
                }}
              >
                <Star
                  className={cn(
                    'h-4 w-4',
                    prompt.isFavorite && 'fill-yellow-500 text-yellow-500'
                  )}
                />
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {prompt.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Usado {prompt.usageCount} veces
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}