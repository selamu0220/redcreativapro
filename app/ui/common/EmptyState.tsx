import { FileText, Calendar, CheckSquare, Palette, LucideIcon } from 'lucide-react';
import { Button } from '../../ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'file' | 'calendar' | 'task' | 'resource';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  description,
  icon = 'file',
  action,
}: EmptyStateProps) {
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case 'file':
        return FileText;
      case 'calendar':
        return Calendar;
      case 'task':
        return CheckSquare;
      case 'resource':
        return Palette;
      default:
        return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
      <div className="bg-muted rounded-full p-6">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 text-muted-foreground max-w-md">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="mt-6">
          {action.label}
        </Button>
      )}
    </div>
  );
}