import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckSquare, 
  AlertCircle, 
  Flag, 
  User, 
  Edit, 
  Trash2,
  Target
} from 'lucide-react';
import { VideoProject, ProjectTask, TimelineEvent } from '../../types/projects';

interface ProjectBoardProps {
  project: VideoProject;
  onUpdate: (project: VideoProject) => void;
}

export function ProjectBoard({ project, onUpdate }: ProjectBoardProps) {
  const [activeTab, setActiveTab] = useState<'kanban' | 'timeline' | 'notes'>('kanban');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  const addTask = (task: Omit<ProjectTask, 'id' | 'createdAt'>) => {
    const newTask: ProjectTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        tasks: [...project.board.tasks, newTask]
      }
    };
    
    onUpdate(updatedProject);
    setIsAddingTask(false);
  };

  const updateTask = (updatedTask: ProjectTask) => {
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        tasks: project.board.tasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        )
      }
    };
    
    onUpdate(updatedProject);
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        tasks: project.board.tasks.filter(task => task.id !== taskId)
      }
    };
    
    onUpdate(updatedProject);
  };

  const addTimelineEvent = (event: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: Date.now().toString()
    };
    
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        timeline: [...project.board.timeline, newEvent].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      }
    };
    
    onUpdate(updatedProject);
    setIsAddingEvent(false);
  };

  const updateTimelineEvent = (updatedEvent: TimelineEvent) => {
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        timeline: project.board.timeline.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      }
    };
    
    onUpdate(updatedProject);
    setEditingEvent(null);
  };

  const deleteTimelineEvent = (eventId: string) => {
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        timeline: project.board.timeline.filter(event => event.id !== eventId)
      }
    };
    
    onUpdate(updatedProject);
  };

  const updateNotes = (notes: string) => {
    const updatedProject = {
      ...project,
      board: {
        ...project.board,
        notes
      }
    };
    
    onUpdate(updatedProject);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Target className="h-4 w-4" />;
      case 'deadline': return <AlertCircle className="h-4 w-4" />;
      case 'meeting': return <User className="h-4 w-4" />;
      case 'recording': return <CheckSquare className="h-4 w-4" />;
      case 'editing': return <Edit className="h-4 w-4" />;
      case 'publishing': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const tasksByStatus = {
    todo: project.board.tasks.filter(task => task.status === 'todo'),
    'in-progress': project.board.tasks.filter(task => task.status === 'in-progress'),
    review: project.board.tasks.filter(task => task.status === 'review'),
    done: project.board.tasks.filter(task => task.status === 'done')
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('kanban')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'kanban'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CheckSquare className="h-4 w-4 inline mr-2" />
          Tablero Kanban
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'timeline'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock className="h-4 w-4 inline mr-2" />
          Cronograma
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'notes'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Edit className="h-4 w-4 inline mr-2" />
          Notas
        </button>
      </div>

      {/* Kanban Board */}
      {activeTab === 'kanban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tablero de Tareas</h2>
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Tarea
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Tarea</DialogTitle>
                  <DialogDescription>
                    Añade una nueva tarea al tablero de planificación
                  </DialogDescription>
                </DialogHeader>
                <TaskForm onSubmit={addTask} onCancel={() => setIsAddingTask(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(tasksByStatus).map(([status, tasks]) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">
                    {status === 'todo' ? 'Por Hacer' :
                     status === 'in-progress' ? 'En Progreso' :
                     status === 'review' ? 'Revisión' : 'Completado'}
                  </h3>
                  <Badge variant="secondary">{tasks.length}</Badge>
                </div>
                
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingTask(task)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteTask(task.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {task.description && (
                            <p className="text-xs text-gray-600">{task.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <Badge className={getPriorityColor(task.priority)} variant="outline">
                              <Flag className="h-3 w-3 mr-1" />
                              {task.priority}
                            </Badge>
                            
                            {task.dueDate && (
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          
                          <Badge className={getStatusColor(task.status)} variant="outline">
                            {task.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Cronograma del Proyecto</h2>
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Evento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Evento</DialogTitle>
                  <DialogDescription>
                    Añade un evento al cronograma del proyecto
                  </DialogDescription>
                </DialogHeader>
                <TimelineEventForm onSubmit={addTimelineEvent} onCancel={() => setIsAddingEvent(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {project.board.timeline.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${
                    event.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  {index < project.board.timeline.length - 1 && (
                    <div className="w-px h-8 bg-gray-300 mt-2" />
                  )}
                </div>
                
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant={event.completed ? 'default' : 'secondary'}>
                            {event.type}
                          </Badge>
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-gray-600">{event.description}</p>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTimelineEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            
            {project.board.timeline.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hay eventos en el cronograma</h3>
                  <p className="text-gray-600 mb-4">
                    Añade eventos importantes como fechas límite, reuniones o hitos del proyecto
                  </p>
                  <Button onClick={() => setIsAddingEvent(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Primer Evento
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notas del Proyecto</h2>
          
          <Card>
            <CardContent className="p-6">
              <Textarea
                value={project.board.notes}
                onChange={(e) => updateNotes(e.target.value)}
                placeholder="Escribe aquí tus notas, ideas, recordatorios o cualquier información importante sobre el proyecto..."
                rows={15}
                className="resize-none"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Task Dialog */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarea</DialogTitle>
              <DialogDescription>
                Modifica los detalles de la tarea
              </DialogDescription>
            </DialogHeader>
            <TaskForm 
              task={editingTask} 
              onSubmit={updateTask} 
              onCancel={() => setEditingTask(null)} 
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Timeline Event Dialog */}
      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Evento</DialogTitle>
              <DialogDescription>
                Modifica los detalles del evento
              </DialogDescription>
            </DialogHeader>
            <TimelineEventForm 
              event={editingEvent} 
              onSubmit={updateTimelineEvent} 
              onCancel={() => setEditingEvent(null)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Task Form Component
function TaskForm({ 
  task, 
  onSubmit, 
  onCancel 
}: { 
  task?: ProjectTask; 
  onSubmit: (task: any) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    category: task?.category || 'other',
    assignee: task?.assignee || '',
    dueDate: task?.dueDate || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Título *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título de la tarea"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción detallada de la tarea"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Estado</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as ProjectTask['status'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Por Hacer</SelectItem>
              <SelectItem value="in-progress">En Progreso</SelectItem>
              <SelectItem value="review">Revisión</SelectItem>
              <SelectItem value="done">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Prioridad</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as ProjectTask['priority'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baja</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as ProjectTask['category'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="script">Guión</SelectItem>
              <SelectItem value="recording">Grabación</SelectItem>
              <SelectItem value="editing">Edición</SelectItem>
              <SelectItem value="review">Revisión</SelectItem>
              <SelectItem value="publishing">Publicación</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Fecha Límite</Label>
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Asignado a</Label>
        <Input
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
          placeholder="Nombre de la persona asignada"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {task ? 'Actualizar' : 'Crear'} Tarea
        </Button>
      </div>
    </form>
  );
}

// Timeline Event Form Component
function TimelineEventForm({ 
  event, 
  onSubmit, 
  onCancel 
}: { 
  event?: TimelineEvent; 
  onSubmit: (event: any) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
    type: event?.type || 'milestone',
    completed: event?.completed || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date) return;
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Título *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título del evento"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción del evento"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Fecha *</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Tipo</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as TimelineEvent['type'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="milestone">Hito</SelectItem>
              <SelectItem value="deadline">Fecha Límite</SelectItem>
              <SelectItem value="meeting">Reunión</SelectItem>
              <SelectItem value="recording">Grabación</SelectItem>
              <SelectItem value="editing">Edición</SelectItem>
              <SelectItem value="publishing">Publicación</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completed"
          checked={formData.completed}
          onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
          className="rounded"
        />
        <Label htmlFor="completed">Evento completado</Label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {event ? 'Actualizar' : 'Crear'} Evento
        </Button>
      </div>
    </form>
  );
}