'use client';

import { useState } from 'react';
import { TasksHeader } from './TasksHeader';
import { TaskBoard } from './TaskBoard';
import { TaskDialog } from './TaskDialog';
import { TaskType, TaskStatus } from '../../types/tasks';
import { useTasksStorage } from '../../hooks/useLocalStorage';
import { CSVManager } from '../common/CSVManager';
import { useToast } from '../../hooks/use-toast';

export function TasksView() {
  const { tasks, addTask, updateTask, deleteTask, importFromCSV, exportToCSV, hasUnsavedChanges } = useTasksStorage();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const { toast } = useToast();

  const handleAddTask = (task: TaskType) => {
    addTask(task);
    setIsTaskDialogOpen(false);
  };

  const handleEditTask = (updatedTask: TaskType) => {
    updateTask(updatedTask.id, updatedTask);
    setIsTaskDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setIsTaskDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDragEnd = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { ...task, status: newStatus });
    }
  };

  const handleImportCSV = async (file: File) => {
    try {
      await importFromCSV(file);
      toast({
        title: 'Éxito',
        description: 'Tareas importadas correctamente desde CSV',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al importar tareas desde CSV',
        variant: 'destructive',
      });
    }
  };

  const handleExportCSV = () => {
    try {
      exportToCSV();
      toast({
        title: 'Éxito',
        description: 'Tareas exportadas correctamente a CSV',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al exportar tareas a CSV',
        variant: 'destructive',
      });
    }
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
      <div className="flex justify-between items-center">
        <TasksHeader
          onAddTask={openNewTaskDialog}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <CSVManager
          onImport={handleImportCSV}
          onExport={handleExportCSV}
          hasUnsavedChanges={hasUnsavedChanges}
          dataType="tareas"
        />
      </div>
      
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