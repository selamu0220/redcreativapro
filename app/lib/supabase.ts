import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are defined
const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create the Supabase client only if configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper to check if Supabase is available
export const isSupabaseAvailable = () => isSupabaseConfigured && supabase !== null;

// Fallback function for when Supabase is not available
const createFallbackResponse = (error: string = 'Supabase not configured') => 
  Promise.reject(new Error(error));

// Database table helpers
export const db = {
  // Projects
  projects: {
    getAll: () => supabase ? supabase.from('projects').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('projects').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (project: any) => supabase ? supabase.from('projects').insert(project).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('projects').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('projects').delete().eq('id', id) : createFallbackResponse()
  },
  
  // Tasks
  tasks: {
    getAll: () => supabase ? supabase.from('tasks').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('tasks').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (task: any) => supabase ? supabase.from('tasks').insert(task).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('tasks').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('tasks').delete().eq('id', id) : createFallbackResponse()
  },
  
  // Calendar Events
  events: {
    getAll: () => supabase ? supabase.from('calendar_events').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('calendar_events').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (event: any) => supabase ? supabase.from('calendar_events').insert(event).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('calendar_events').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('calendar_events').delete().eq('id', id) : createFallbackResponse()
  },
  
  // Blog Posts
  posts: {
    getAll: () => supabase ? supabase.from('blog_posts').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('blog_posts').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (post: any) => supabase ? supabase.from('blog_posts').insert(post).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('blog_posts').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('blog_posts').delete().eq('id', id) : createFallbackResponse()
  },
  
  // Prompts
  prompts: {
    getAll: () => supabase ? supabase.from('prompts').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('prompts').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (prompt: any) => supabase ? supabase.from('prompts').insert(prompt).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('prompts').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('prompts').delete().eq('id', id) : createFallbackResponse()
  },
  
  // Resources
  resources: {
    getAll: () => supabase ? supabase.from('resources').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('resources').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (resource: any) => supabase ? supabase.from('resources').insert(resource).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('resources').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('resources').delete().eq('id', id) : createFallbackResponse()
  },
  
  // Scripts
  scripts: {
    getAll: () => supabase ? supabase.from('scripts').select('*') : createFallbackResponse(),
    getById: (id: string) => supabase ? supabase.from('scripts').select('*').eq('id', id).single() : createFallbackResponse(),
    create: (script: any) => supabase ? supabase.from('scripts').insert(script).select().single() : createFallbackResponse(),
    update: (id: string, updates: any) => supabase ? supabase.from('scripts').update(updates).eq('id', id).select().single() : createFallbackResponse(),
    delete: (id: string) => supabase ? supabase.from('scripts').delete().eq('id', id) : createFallbackResponse()
  }
};