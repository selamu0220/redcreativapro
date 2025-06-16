import { useState, useEffect } from 'react';
import { Prompt } from '../types/prompts';
import { EventType } from '../types/calendar';
import { TaskType } from '../types/tasks';
import { Resource } from '../types/resources';
import { Script } from '../types/scripts';
import { Learning } from '../types/learning';
import { VideoProject } from '../types/projects';
import {
  promptsToCSV,
  csvToPrompts,
  eventsToCSV,
  csvToEvents,
  tasksToCSV,
  csvToTasks,
  resourcesToCSV,
  csvToResources,
  scriptsToCSV,
  csvToScripts,
  learningToCSV,
  csvToLearning,
  projectsToCSV,
  csvToProjects,
  downloadCSV,
  readCSVFile
} from '../lib/csvUtils';

type DataType = 'prompts' | 'events' | 'tasks' | 'resources' | 'scripts' | 'learning' | 'projects';

interface UseLocalStorageReturn<T> {
  data: T[];
  setData: (data: T[]) => void;
  importFromCSV: (file: File) => Promise<void>;
  exportToCSV: (filename?: string) => void;
  hasChanges: boolean;
  resetChanges: () => void;
}

export function useLocalStorage<T>(
  key: string,
  initialData: T[],
  dataType: DataType
): UseLocalStorageReturn<T> {
  const [data, setDataState] = useState<T[]>(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDataState(parsedData);
      } else {
        // Si no hay datos almacenados, usar los datos iniciales
        setDataState(initialData);
        localStorage.setItem(key, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Error al cargar datos del localStorage:', error);
      setDataState(initialData);
    }
    setInitialDataLoaded(true);
  }, [key]);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (initialDataLoaded) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        setHasChanges(true);
      } catch (error) {
        console.error('Error al guardar datos en localStorage:', error);
      }
    }
  }, [data, key, initialDataLoaded]);

  const setData = (newData: T[]) => {
    setDataState(newData);
  };

  const importFromCSV = async (file: File): Promise<void> => {
    try {
      const csvText = await readCSVFile(file);
      let importedData: T[];

      switch (dataType) {
        case 'prompts':
          importedData = csvToPrompts(csvText) as T[];
          break;
        case 'events':
          importedData = csvToEvents(csvText) as T[];
          break;
        case 'tasks':
          importedData = csvToTasks(csvText) as T[];
          break;
        case 'resources':
          importedData = csvToResources(csvText) as T[];
          break;
        case 'scripts':
          importedData = csvToScripts(csvText) as T[];
          break;
        case 'learning':
          importedData = csvToLearning(csvText) as T[];
          break;
        case 'projects':
          importedData = csvToProjects(csvText) as T[];
          break;
        default:
          throw new Error('Tipo de datos no soportado');
      }

      setData(importedData);
    } catch (error) {
      console.error('Error al importar CSV:', error);
      throw error;
    }
  };

  const exportToCSV = (filename?: string): void => {
    try {
      let csvContent: string;
      const defaultFilename = filename || `${dataType}_${new Date().toISOString().split('T')[0]}.csv`;

      switch (dataType) {
        case 'prompts':
          csvContent = promptsToCSV(data as Prompt[]);
          break;
        case 'events':
          csvContent = eventsToCSV(data as EventType[]);
          break;
        case 'tasks':
          csvContent = tasksToCSV(data as TaskType[]);
          break;
        case 'resources':
          csvContent = resourcesToCSV(data as Resource[]);
          break;
        case 'scripts':
          csvContent = scriptsToCSV(data as Script[]);
          break;
        case 'learning':
          csvContent = learningToCSV(data as Learning[]);
          break;
        case 'projects':
          csvContent = projectsToCSV(data as VideoProject[]);
          break;
        default:
          throw new Error('Tipo de datos no soportado');
      }

      downloadCSV(csvContent, defaultFilename);
      setHasChanges(false); // Marcar como guardado después de exportar
    } catch (error) {
      console.error('Error al exportar CSV:', error);
      throw error;
    }
  };

  const resetChanges = () => {
    setHasChanges(false);
  };

  return {
    data,
    setData,
    importFromCSV,
    exportToCSV,
    hasChanges,
    resetChanges
  };
}

// Hooks específicos para cada tipo de datos
export function usePromptsStorage(initialData: Prompt[] = []) {
  return useLocalStorage('prompts', initialData, 'prompts');
}

export function useEventsStorage(initialData: EventType[] = []) {
  return useLocalStorage('events', initialData, 'events');
}

export function useTasksStorage(initialData: TaskType[] = []) {
  return useLocalStorage('tasks', initialData, 'tasks');
}

export function useResourcesStorage(initialData: Resource[] = []) {
  return useLocalStorage('resources', initialData, 'resources');
}

export function useScriptsStorage(initialData: Script[] = []) {
  return useLocalStorage('scripts', initialData, 'scripts');
}

export function useLearningStorage(initialData: Learning[] = []) {
  return useLocalStorage('learning', initialData, 'learning');
}

export function useProjectsStorage(initialData: VideoProject[] = []) {
  return useLocalStorage('projects', initialData, 'projects');
}