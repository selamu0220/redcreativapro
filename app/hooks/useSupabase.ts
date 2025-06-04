import { useState, useEffect } from 'react';
import { supabase, db } from "../lib\supabase";
import { useAuth } from "../contexts\AuthContext";

// Generic hook for CRUD operations
export function useSupabaseTable<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setData(result || []);
    } catch (err: any) {
      setError(err.message);
      console.error(`Error fetching ${tableName}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert({ ...item, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      setData(prev => [result, ...prev]);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: string, updates: Partial<T>) => {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();
      
      if (error) throw error;
      setData(prev => prev.map(item => 
        (item as any).id === id ? result : item
      ));
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);
      
      if (error) throw error;
      setData(prev => prev.filter(item => (item as any).id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id, tableName]);

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refetch: fetchData
  };
}

// Specific hooks for each table
export const useProjects = () => useSupabaseTable('projects');
export const useTasks = () => useSupabaseTable('tasks');
export const useCalendarEvents = () => useSupabaseTable('calendar_events');
export const useBlogPosts = () => useSupabaseTable('blog_posts');
export const usePrompts = () => useSupabaseTable('prompts');
export const useResources = () => useSupabaseTable('resources');
export const useScripts = () => useSupabaseTable('scripts');

// Real-time subscriptions
export function useRealtimeSubscription(tableName: string, callback: (payload: any) => void) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel(`${tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
          filter: `user_id=eq.${user.id}`
        },
        callback
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tableName, user?.id, callback]);
}

// File upload helper
export async function uploadFile(file: File, bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { data, publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Delete file helper
export async function deleteFile(bucket: string, path: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
