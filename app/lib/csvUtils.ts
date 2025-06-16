import { Prompt } from '../types/prompts';
import { EventType } from '../types/calendar';
import { TaskType } from '../types/tasks';
import { Resource } from '../types/resources';
import { Script } from '../types/scripts';
import { Learning } from '../types/learning';
import { VideoProject } from '../types/projects';

// Utilidades para convertir datos a CSV
export function convertToCSV(data: any[], headers: string[]): string {
  const csvHeaders = headers.join(',');
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value).replace(/"/g, '""');
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',');
  });
  return [csvHeaders, ...csvRows].join('\n');
}

// Utilidades para parsear CSV
export function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        let value = values[index];
        // Intentar parsear JSON si es un objeto
        if (value.startsWith('{') || value.startsWith('[')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Si no se puede parsear, mantener como string
          }
        }
        row[header] = value;
      });
      data.push(row);
    }
  }
  
  return data;
}

function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Funciones específicas para cada tipo de datos
export function promptsToCSV(prompts: Prompt[]): string {
  const headers = ['id', 'title', 'content', 'category', 'tags', 'createdAt', 'updatedAt', 'isFavorite', 'usageCount', 'ownerId'];
  return convertToCSV(prompts, headers);
}

export function csvToPrompts(csvText: string): Prompt[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    title: row.title || '',
    content: row.content || '',
    category: row.category || 'blog',
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? row.tags.split(',').map((t: string) => t.trim()) : []),
    createdAt: row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt || new Date().toISOString(),
    isFavorite: row.isFavorite === 'true' || row.isFavorite === true,
    usageCount: parseInt(row.usageCount) || 0,
    visibility: 'private', // Siempre privado ya que no hay funciones de compartir
    ownerId: row.ownerId || 'local-user'
  }));
}

export function eventsToCSV(events: EventType[]): string {
  const headers = ['id', 'title', 'description', 'start', 'end', 'color', 'script', 'ownerId'];
  return convertToCSV(events, headers);
}

export function csvToEvents(csvText: string): EventType[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    title: row.title || '',
    description: row.description || '',
    start: row.start || new Date().toISOString(),
    end: row.end || new Date().toISOString(),
    color: row.color || 'bg-blue-500 text-white',
    script: row.script || '',
    visibility: 'private',
    ownerId: row.ownerId || 'local-user'
  }));
}

export function tasksToCSV(tasks: TaskType[]): string {
  const headers = ['id', 'title', 'description', 'status', 'priority', 'dueDate', 'labels', 'assignee', 'subtasks'];
  return convertToCSV(tasks, headers);
}

export function csvToTasks(csvText: string): TaskType[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    title: row.title || '',
    description: row.description || '',
    status: row.status || 'todo',
    priority: row.priority || 'medium',
    dueDate: row.dueDate || '',
    labels: Array.isArray(row.labels) ? row.labels : (row.labels ? row.labels.split(',').map((l: string) => l.trim()) : []),
    assignee: typeof row.assignee === 'object' ? row.assignee : null,
    subtasks: Array.isArray(row.subtasks) ? row.subtasks : []
  }));
}

export function resourcesToCSV(resources: Resource[]): string {
  const headers = ['id', 'titulo', 'descripcion', 'tipo', 'url', 'etiquetas', 'favorito', 'fecha_creacion', 'fecha_actualizacion', 'autor', 'rating'];
  return convertToCSV(resources, headers);
}

export function csvToResources(csvText: string): Resource[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    titulo: row.titulo || row.title || '',
    descripcion: row.descripcion || row.description || '',
    tipo: (row.tipo || row.type || 'document') as ResourceType,
    url: row.url || '',
    etiquetas: Array.isArray(row.etiquetas) ? row.etiquetas : 
      (row.etiquetas ? row.etiquetas.split(',').map((t: string) => t.trim()) : 
       Array.isArray(row.tags) ? row.tags : 
       (row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [])),
    favorito: row.favorito === 'true' || row.favorito === true || false,
    fecha_creacion: row.fecha_creacion || row.createdAt || new Date().toISOString(),
    fecha_actualizacion: row.fecha_actualizacion || new Date().toISOString(),
    autor: row.autor || row.ownerId || 'local-user',
    rating: parseFloat(row.rating) || 0,
    
    // Campos de compatibilidad
    title: row.titulo || row.title || '',
    description: row.descripcion || row.description || '',
    type: (row.tipo || row.type || 'document') as ResourceType,
    tags: Array.isArray(row.etiquetas) ? row.etiquetas : 
      (row.etiquetas ? row.etiquetas.split(',').map((t: string) => t.trim()) : 
       Array.isArray(row.tags) ? row.tags : 
       (row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [])),
    createdAt: row.fecha_creacion || row.createdAt || new Date().toISOString(),
    size: row.size || '',
    thumbnailUrl: row.thumbnailUrl || '',
    visibility: 'private' as ResourceVisibility,
    ownerId: row.autor || row.ownerId || 'local-user'
  }));
}

// Función para descargar CSV
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Función para leer archivo CSV
export function readCSVFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsText(file);
  });
}

// Funciones CSV para Scripts
export function scriptsToCSV(scripts: Script[]): string {
  const headers = ['id', 'title', 'content', 'status', 'category', 'tags', 'createdAt', 'updatedAt', 'aiGenerated', 'seoKeywords', 'platforms', 'ownerId'];
  return convertToCSV(scripts, headers);
}

export function csvToScripts(csvText: string): Script[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    title: row.title || '',
    content: row.content || '',
    status: row.status || 'draft',
    category: row.category || 'general',
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? row.tags.split(',').map((t: string) => t.trim()) : []),
    createdAt: row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt || new Date().toISOString(),
    versions: [],
    aiGenerated: row.aiGenerated === 'true' || row.aiGenerated === true,
    seoKeywords: Array.isArray(row.seoKeywords) ? row.seoKeywords : (row.seoKeywords ? row.seoKeywords.split(',').map((k: string) => k.trim()) : []),
    platforms: Array.isArray(row.platforms) ? row.platforms : (row.platforms ? row.platforms.split(',').map((p: string) => p.trim()) : []),
    assignees: [],
    visibility: 'private',
    ownerId: row.ownerId || 'local-user'
  }));
}

// Funciones CSV para Learning
export function learningToCSV(learning: Learning[]): string {
  const headers = ['id', 'title', 'description', 'instructor', 'thumbnailUrl', 'overallRating', 'tags', 'enrollmentCount', 'lastUpdated'];
  return convertToCSV(learning, headers);
}

export function csvToLearning(csvText: string): Learning[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    title: row.title || '',
    description: row.description || '',
    instructor: row.instructor || '',
    thumbnailUrl: row.thumbnailUrl || '',
    sections: [],
    overallRating: parseFloat(row.overallRating) || 0,
    reviews: [],
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? row.tags.split(',').map((t: string) => t.trim()) : []),
    enrollmentCount: parseInt(row.enrollmentCount) || 0,
    lastUpdated: row.lastUpdated || new Date().toISOString()
  }));
}

// Funciones CSV para Projects
export function projectsToCSV(projects: VideoProject[]): string {
  const headers = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'status', 'category', 'tags', 'scriptTitle', 'scriptContent'];
  return convertToCSV(projects.map(project => ({
    ...project,
    scriptTitle: project.script?.title || '',
    scriptContent: project.script?.content || ''
  })), headers);
}

export function csvToProjects(csvText: string): VideoProject[] {
  const data = parseCSV(csvText);
  return data.map(row => ({
    id: row.id || '',
    name: row.name || '',
    description: row.description || '',
    createdAt: row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt || new Date().toISOString(),
    status: row.status || 'planning',
    category: row.category || 'general',
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? row.tags.split(',').map((t: string) => t.trim()) : []),
    script: {
      title: row.scriptTitle || '',
      content: row.scriptContent || '',
      notes: '',
      scenes: []
    },
    content: {
      recorded: [],
      edited: [],
      resources: [],
      overlays: [],
      documents: [],
      other: []
    },
    board: {
      tasks: [],
      timeline: [],
      notes: ''
    }
  }));
}