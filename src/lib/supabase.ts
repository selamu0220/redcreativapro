import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  // Throw an error if Supabase environment variables are missing
  throw new Error('Supabase environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Please check your .env file or environment configuration.');
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Database table helpers
export const db = {
  // Projects
  projects: {
    getAll: () => supabase.from('projects').select('*'),
    getById: (id: string) => supabase.from('projects').select('*').eq('id', id).single(),
    create: (project: any) => supabase.from('projects').insert(project).select().single(),
    update: (id: string, updates: any) => supabase.from('projects').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('projects').delete().eq('id', id)
  },
  
  // Tasks
  tasks: {
    getAll: () => supabase.from('tasks').select('*'),
    getById: (id: string) => supabase.from('tasks').select('*').eq('id', id).single(),
    create: (task: any) => supabase.from('tasks').insert(task).select().single(),
    update: (id: string, updates: any) => supabase.from('tasks').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('tasks').delete().eq('id', id)
  },
  
  // Calendar Events
  events: {
    getAll: () => supabase.from('calendar_events').select('*'),
    getById: (id: string) => supabase.from('calendar_events').select('*').eq('id', id).single(),
    create: (event: any) => supabase.from('calendar_events').insert(event).select().single(),
    update: (id: string, updates: any) => supabase.from('calendar_events').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('calendar_events').delete().eq('id', id)
  },
  
  // Blog Posts
  posts: {
    getAll: () => supabase.from('blog_posts').select('*'),
    getById: (id: string) => supabase.from('blog_posts').select('*').eq('id', id).single(),
    create: (post: any) => supabase.from('blog_posts').insert(post).select().single(),
    update: (id: string, updates: any) => supabase.from('blog_posts').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('blog_posts').delete().eq('id', id)
  },
  
  // Prompts
  prompts: {
    getAll: () => supabase.from('prompts').select('*'),
    getById: (id: string) => supabase.from('prompts').select('*').eq('id', id).single(),
    create: (prompt: any) => supabase.from('prompts').insert(prompt).select().single(),
    update: (id: string, updates: any) => supabase.from('prompts').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('prompts').delete().eq('id', id)
  },
  
  // Resources
  resources: {
    getAll: () => supabase.from('resources').select('*'),
    getById: (id: string) => supabase.from('resources').select('*').eq('id', id).single(),
    create: (resource: any) => supabase.from('resources').insert(resource).select().single(),
    update: (id: string, updates: any) => supabase.from('resources').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('resources').delete().eq('id', id)
  },
  
  // Scripts
  scripts: {
    getAll: () => supabase.from('scripts').select('*'),
    getById: (id: string) => supabase.from('scripts').select('*').eq('id', id).single(),
    create: (script: any) => supabase.from('scripts').insert(script).select().single(),
    update: (id: string, updates: any) => supabase.from('scripts').update(updates).eq('id', id).select().single(),
    delete: (id: string) => supabase.from('scripts').delete().eq('id', id)
  }
};