import { TaskType, TaskPriority } from '@/types/tasks';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import { CalendarDays, ArrowUpCircle, Circle, ArrowDownCircle } from 'lucide-react';

interface TaskCardProps {
  task: TaskType;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const getCompletedSubtasks = () => {
    if (!task.subtasks?.length) return 0;
    return task.subtasks.filter((subtask) => subtask.completed).length;
  };

  const getCompletionPercentage = () => {
    if (!task.subtasks?.length) return 0;
    return (getCompletedSubtasks() / task.subtasks.length) * 100;
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Circle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {task.status === 'done' ? (
                <Checkbox checked disabled />
              ) : (
                getPriorityIcon(task.priority)
              )}
              <h4 className={cn("font-medium line-clamp-1", task.status === 'done' && "line-through text-muted-foreground")}>
                {task.title}
              </h4>
            </div>
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Subtasks: {getCompletedSubtasks()}/{task.subtasks.length}
              </span>
              <span className="font-medium">{Math.round(getCompletionPercentage())}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-1" />
          </div>
        )}
        
        {task.labels && task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.slice(0, 2).map((label, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
            {task.labels.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{task.labels.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex items-center justify-between">
        {task.dueDate && (
          <div className="flex items-center text-xs">
            <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
        
        {task.assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatarUrl} />
            <AvatarFallback>
              {task.assignee.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </CardFooter>
    </Card>
  );
}