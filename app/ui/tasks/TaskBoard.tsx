import { TaskType, TaskStatus } from '@/types/tasks';
import { TaskColumn } from './TaskColumn';
import { Card } from '@/components/ui/card';

interface TaskBoardProps {
  tasks: TaskType[];
  onTaskClick: (task: TaskType) => void;
  onDragEnd: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskBoard({ tasks, onTaskClick, onDragEnd }: TaskBoardProps) {
  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => (
        <Card key={column.id} className="p-4">
          <TaskColumn
            title={column.title}
            tasks={getTasksByStatus(column.id)}
            status={column.id}
            onTaskClick={onTaskClick}
            onDragEnd={onDragEnd}
          />
        </Card>
      ))}
    </div>
  );
}