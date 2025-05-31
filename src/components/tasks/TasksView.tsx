import { useState } from 'react';
import { TasksHeader } from './TasksHeader';
import { TaskBoard } from './TaskBoard';
import { TaskDialog } from './TaskDialog';
import { TaskType, TaskStatus } from '@/types/tasks';
import { mockTasks } from '@/data/mockTasks';

export function TasksView() {
  const [tasks, setTasks] = useState<TaskType[]>(mockTasks);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  const handleAddTask = (task: TaskType) => {
    setTasks([...tasks, task]);
    setIsTaskDialogOpen(false);
  };

  const handleEditTask = (updatedTask: TaskType) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setIsTaskDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setIsTaskDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDragEnd = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const openNewTaskDialog = () => {
    setSelectedTask(null);
    setIsTaskDialogOpen(true);
  };

  const openEditTaskDialog = (task: TaskType) => {
    setSelectedTask(task);
    setIsTaskDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <TasksHeader
        onAddTask={openNewTaskDialog}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <TaskBoard
        tasks={tasks}
        onTaskClick={openEditTaskDialog}
        onDragEnd={handleDragEnd}
      />
      
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onSave={selectedTask ? handleEditTask : handleAddTask}
        onDelete={selectedTask ? handleDeleteTask : undefined}
        task={selectedTask}
      />
    </div>
  );
}