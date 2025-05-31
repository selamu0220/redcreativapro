import { Button } from '@/components/ui/button';
import { PlusCircle, KanbanSquare, List } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

interface TasksHeaderProps {
  onAddTask: () => void;
  viewMode: 'board' | 'list';
  onViewModeChange: (mode: 'board' | 'list') => void;
}

export function TasksHeader({
  onAddTask,
  viewMode,
  onViewModeChange,
}: TasksHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">
          Manage your creative tasks and track progress.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-muted rounded-md p-1">
          <Toggle
            pressed={viewMode === 'board'}
            onPressedChange={() => onViewModeChange('board')}
            aria-label="Toggle board view"
            className="data-[state=on]:bg-background"
          >
            <KanbanSquare className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={viewMode === 'list'}
            onPressedChange={() => onViewModeChange('list')}
            aria-label="Toggle list view"
            className="data-[state=on]:bg-background"
          >
            <List className="h-4 w-4" />
          </Toggle>
        </div>
        <Button onClick={onAddTask} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>
    </div>
  );
}