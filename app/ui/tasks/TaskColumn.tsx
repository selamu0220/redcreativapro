import { TaskType, TaskStatus } from '@/types/tasks';
import { TaskCard } from './TaskCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskColumnProps {
  title: string;
  tasks: TaskType[];
  status: TaskStatus;
  onTaskClick: (task: TaskType) => void;
  onDragEnd: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskColumn({
  title,
  tasks,
  status,
  onTaskClick,
  onDragEnd,
}: TaskColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onDragEnd(taskId, status);
  };

  return (
    <div
      className="h-full flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="bg-muted text-muted-foreground text-xs font-medium rounded-full px-2 py-0.5 w-6 text-center">
          {tasks.length}
        </div>
      </div>
      
      <ScrollArea className="flex-1 h-[65vh]">
        <div className="space-y-3 pr-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="h-24 border border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground">
              No tasks
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}