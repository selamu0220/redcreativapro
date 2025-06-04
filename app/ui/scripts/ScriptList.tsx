import { Script } from '../../types/scripts';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../lib/utils';
import { FileText, Star, Calendar } from 'lucide-react';
import { formatDate } from './c:\Users\programar\Documents\GitHub\redcreativapro\app\lib\dateUtils';
import { Badge } from '../../ui/badge';

interface ScriptListProps {
  scripts: Script[];
  onScriptSelect: (script: Script) => void;
  selectedScript: Script | null;
}

export function ScriptList({
  scripts,
  onScriptSelect,
  selectedScript,
}: ScriptListProps) {
  const getStatusColor = (status: Script['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'review':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'final':
        return 'bg-green-500/20 text-green-700 dark:text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-2 pr-4">
        {scripts.map((script) => (
          <div
            key={script.id}
            className={cn(
              'border rounded-lg p-4 cursor-pointer transition-colors',
              selectedScript?.id === script.id
                ? 'bg-accent'
                : 'hover:bg-accent/50'
            )}
            onClick={() => onScriptSelect(script)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {script.eventId ? (
                    <Calendar className="h-4 w-4 text-primary" />
                  ) : (
                    <FileText className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium line-clamp-1">{script.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    Updated {formatDate(script.updatedAt)}
                  </p>
                </div>
              </div>
              {script.aiGenerated && (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn('text-xs', getStatusColor(script.status))}
              >
                {script.status}
              </Badge>
              {script.category && (
                <Badge variant="outline" className="text-xs">
                  {script.category}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}