import { Prompt } from '../../types/prompts';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { formatDate } from "../../lib/dateUtils";
import { Edit2, Trash2, Copy, Share2, Globe, Lock, Users } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';

interface PromptDetailProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
  view: 'personal' | 'feed';
}

export function PromptDetail({ prompt, onEdit, onDelete, onShare, view }: PromptDetailProps) {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast({
        title: 'Copiado al portapapeles',
        description: 'El contenido del prompt ha sido copiado.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo copiar el prompt al portapapeles.',
      });
    }
  };

  const getVisibilityIcon = () => {
    switch (prompt.visibility) {
      case 'public':
        return <Globe className="h-4 w-4" />;
      case 'private':
        return <Lock className="h-4 w-4" />;
      case 'shared':
        return <Users className="h-4 w-4" />;
    }
  };

  const getVisibilityLabel = () => {
    switch (prompt.visibility) {
      case 'public':
        return 'PÃºblico';
      case 'private':
        return 'Privado';
      case 'shared':
        return 'Compartido';
    }
  };

  const isOwner = user?.id === prompt.ownerId;

  return (
    <div className="border rounded-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{prompt.title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Creado {formatDate(prompt.createdAt)}</span>
              <span>â€¢</span>
              <span>Usado {prompt.usageCount} veces</span>
              <span>â€¢</span>
              <span className="flex items-center gap-1">
                {getVisibilityIcon()}
                {getVisibilityLabel()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            {isOwner ? (
              <>
                <Button variant="outline" size="icon" onClick={() => onEdit(prompt)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(prompt.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="icon" onClick={() => onShare(prompt.id)}>
                <Share2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="capitalize">
            {prompt.category}
          </Badge>
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <ScrollArea className="h-[400px] mt-6 rounded-md border p-4">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {prompt.content}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
