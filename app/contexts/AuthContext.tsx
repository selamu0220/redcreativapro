'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'free' | 'monthly' | 'annual';
  subscriptionEndDate: Date | null;
  dailyUsage: {
    date: string;
    aiRequests: number;
    promptsUsed: number;
    scriptsGenerated: number;
  };
  dailyLimits: {
    aiRequests: number;
    promptsUsed: number;
    scriptsGenerated: number;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  needsEmailVerification: boolean;
  pendingVerificationEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  hasActiveSubscription: () => boolean;
  getRemainingSubscriptionDays: () => number;
  updateSubscriptionStatus: (subscriptionType: 'free' | 'monthly' | 'annual', endDate?: Date) => void;
  clearEmailVerification: () => void;
  getRemainingUsage: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => number;
  incrementUsage: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => void;
  canUseFeature: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  
  console.log('AuthProvider: Rendering with loading:', loading, 'user:', user ? 'exists' : 'null');

  // Create a local user profile
  const createLocalUser = useCallback((email: string, name: string, id?: string): User => {
    const userId = id || `local-${Date.now()}`;
    return {
      id: userId,
      email,
      name,
      subscriptionType: 'free',
      subscriptionEndDate: null,
      dailyUsage: {
        date: new Date().toISOString().split('T')[0],
        aiRequests: 0,
        promptsUsed: 0,
        scriptsGenerated: 0
      },
      dailyLimits: {
        aiRequests: 100,
        promptsUsed: 20,
        scriptsGenerated: 5
      }
    };
  }, []);

  // Load user from localStorage
  const loadLocalUser = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('local_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Check if we need to reset daily usage (new day)
        const today = new Date().toISOString().split('T')[0];
        if (userData.dailyUsage.date !== today) {
          userData.dailyUsage = {
            date: today,
            aiRequests: 0,
            promptsUsed: 0,
            scriptsGenerated: 0
          };
          localStorage.setItem('local_user', JSON.stringify(userData));
        }
        setUser(userData);
        return userData;
      }
    } catch (error) {
      console.error('Error loading local user:', error);
      localStorage.removeItem('local_user');
    }
    return null;
  }, []);

  // Save user to localStorage
  const saveLocalUser = useCallback((userData: User) => {
    try {
      localStorage.setItem('local_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving local user:', error);
    }
  }, []);

  // Load user profile (works with both Supabase and local)
  const loadUserProfile = useCallback(async (supabaseUser?: any) => {
    try {
      setLoading(true);
      
      // If Supabase is available and we have a Supabase user, try to load from Supabase
      if (isSupabaseAvailable() && supabase && supabaseUser) {
        console.log('Loading profile from Supabase for user:', supabaseUser.id);
        
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (!error && profile) {
          const userData: User = {
            id: profile.id,
            email: profile.email,
            name: profile.full_name,
            subscriptionType: profile.subscription_tier,
            subscriptionEndDate: profile.subscription_end_date ? new Date(profile.subscription_end_date) : null,
            dailyUsage: {
              date: new Date().toISOString().split('T')[0],
              aiRequests: 0,
              promptsUsed: 0,
              scriptsGenerated: 0
            },
            dailyLimits: {
              aiRequests: 100,
              promptsUsed: 20,
              scriptsGenerated: 5
            }
          };
          setUser(userData);
          return;
        }
      }
      
      // Fallback to local storage
      loadLocalUser();
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      // Fallback to local storage on any error
      loadLocalUser();
    } finally {
      setLoading(false);
    }
  }, [loadLocalUser]);


  // Auth state listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Check for demo mode first
        const demoAuth = localStorage.getItem('demo_auth');
        const demoUser = localStorage.getItem('demo_user');
        
        if (demoAuth === 'true' && demoUser) {
          try {
            const parsedUser = JSON.parse(demoUser);
            setUser(parsedUser);
            console.log('AuthProvider: Demo mode initialized with user:', parsedUser);
            return;
          } catch (error) {
            console.error('Error parsing demo user:', error);
            localStorage.removeItem('demo_auth');
            localStorage.removeItem('demo_user');
          }
        }
        
        // Try Supabase if available
        if (isSupabaseAvailable() && supabase) {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
              await loadUserProfile(session.user);
              return;
            }
          } catch (error) {
            console.error('Error with Supabase session:', error);
          }
        }
        
        // Fallback to local authentication
        loadLocalUser();
      } catch (error) {
        console.error('Error initializing auth:', error);
        loadLocalUser();
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();

    // Listen for auth changes only if Supabase is available
    let subscription: any = null;
    if (isSupabaseAvailable() && supabase) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            await loadUserProfile(session.user);
            setNeedsEmailVerification(false);
            setPendingVerificationEmail(null);
          } catch (error) {
            console.error('Error loading user profile on auth change:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setNeedsEmailVerification(false);
          setPendingVerificationEmail(null);
        }
      });
      subscription = data.subscription;
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [loadUserProfile, loadLocalUser]);

  const hasActiveSubscription = useCallback(() => {
    if (!user) return false;
    // Permitir acceso a usuarios gratuitos también
    if (user.subscriptionType === 'free') return true;
    if (!user.subscriptionEndDate) return true;
    return new Date() < user.subscriptionEndDate;
  }, [user]);

  const getRemainingSubscriptionDays = useCallback(() => {
    if (!user || !user.subscriptionEndDate) return 0;
    const now = new Date();
    const endDate = user.subscriptionEndDate;
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [user]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // Try Supabase login if available
        if (isSupabaseAvailable() && supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) {
            if (error.message.includes('Email not confirmed')) {
              setNeedsEmailVerification(true);
              setPendingVerificationEmail(email);
              throw new Error('Email not confirmed');
            }
            if (error.message.includes('Invalid login credentials')) {
              throw new Error('Invalid login credentials');
            }
            throw error;
          }
          
          if (data.user) {
            setNeedsEmailVerification(false);
            setPendingVerificationEmail(null);
            await loadUserProfile(data.user);
            return;
          }
        }
        
        // Local authentication fallback
        const storedUsers = localStorage.getItem('local_users') || '{}';
        const users = JSON.parse(storedUsers);
        
        if (users[email] && users[email].password === password) {
          const userData = createLocalUser(email, users[email].name, users[email].id);
          saveLocalUser(userData);
          setNeedsEmailVerification(false);
          setPendingVerificationEmail(null);
        } else {
          throw new Error('Invalid login credentials');
        }
      } catch (error: any) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Error al iniciar sesión');
      }
    },
    [loadUserProfile, createLocalUser, saveLocalUser]
  );

  const logout = useCallback(async () => {
    try {
      // Check for demo mode
      const demoAuth = localStorage.getItem('demo_auth');
      
      if (demoAuth === 'true') {
        localStorage.removeItem('demo_auth');
        localStorage.removeItem('demo_user');
        setUser(null);
        return;
      }
      
      // Try Supabase logout if available
      if (isSupabaseAvailable() && supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      
      // Clear local user data
      localStorage.removeItem('local_user');
      setUser(null);
      setNeedsEmailVerification(false);
      setPendingVerificationEmail(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Error al cerrar sesión');
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        // Try Supabase signup if available
        if (isSupabaseAvailable() && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name
              }
            }
          });

          if (error) throw error;
          
          console.log('Signup successful, verification email sent to:', email);
          setNeedsEmailVerification(true);
          setPendingVerificationEmail(email);
          
          if (data.user && data.user.email_confirmed_at) {
            await loadUserProfile(data.user);
            setNeedsEmailVerification(false);
            setPendingVerificationEmail(null);
          }
          return;
        }
        
        // Local authentication fallback
        const storedUsers = localStorage.getItem('local_users') || '{}';
        const users = JSON.parse(storedUsers);
        
        // Check if user already exists
        if (users[email]) {
          throw new Error('User already exists');
        }
        
        // Create new local user
        const userId = `local-${Date.now()}`;
        users[email] = {
          id: userId,
          password,
          name
        };
        
        localStorage.setItem('local_users', JSON.stringify(users));
        
        // Create and save user profile
        const userData = createLocalUser(email, name, userId);
        saveLocalUser(userData);
        
        console.log('Local signup successful for:', email);
      } catch (error: any) {
        console.error('Signup error:', error);
        throw new Error(error.message || 'Error al crear la cuenta');
      }
    },
    [loadUserProfile, createLocalUser, saveLocalUser]
  );

  const updateSubscriptionStatus = useCallback((subscriptionType: 'free' | 'monthly' | 'annual', endDate?: Date) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedUser = {
        ...prevUser,
        subscriptionType,
        subscriptionEndDate: endDate || null
      };
      
      // Update user profile in Supabase if available
      if (isSupabaseAvailable() && supabase) {
        supabase
          .from('users')
          .update({
            subscription_tier: subscriptionType,
            subscription_status: subscriptionType === 'free' ? 'free' : 'active'
          })
          .eq('id', prevUser.id)
          .then(({ error }) => {
            if (error) console.error('Error updating subscription:', error);
          });
      }
      
      // Update local storage
      try {
        localStorage.setItem('local_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating local user:', error);
      }
      
      return updatedUser;
    });
    
    // Dispatch custom event for subscription update
    window.dispatchEvent(new CustomEvent('subscriptionUpdated', {
      detail: { subscriptionType, endDate }
    }));
  }, [user]);

  const clearEmailVerification = useCallback(() => {
    setNeedsEmailVerification(false);
    setPendingVerificationEmail(null);
    
    // Clear from local storage as well
    try {
      localStorage.removeItem('pending_verification_email');
    } catch (error) {
      console.error('Error clearing verification state:', error);
    }
  }, []);

  // Helper function to get usage limits based on subscription type
  const getUsageLimits = useCallback((subscriptionType: 'free' | 'monthly' | 'annual') => {
    switch (subscriptionType) {
      case 'free':
        return { prompts: 20, scripts: 5, resources: 10 };
      case 'monthly':
      case 'annual':
        return { prompts: 1000, scripts: 500, resources: 1000 };
      default:
        return { prompts: 20, scripts: 5, resources: 10 };
    }
  }, []);

  // Usage tracking functions
  const getRemainingUsage = useCallback(async () => {
    if (!user) return { prompts: 0, scripts: 0, resources: 0 };
    
    try {
      let usage = { prompts_used: 0, scripts_used: 0, resources_used: 0 };
      
      // Try to get usage from Supabase if available
      if (isSupabaseAvailable() && supabase) {
        const { data, error } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching usage:', error);
        } else if (data) {
          usage = data;
        }
      } else {
        // Get usage from local storage
        const localUsage = localStorage.getItem(`usage_${user.id}`);
        if (localUsage) {
          usage = JSON.parse(localUsage);
        }
      }
      
      const limits = getUsageLimits(user.subscriptionType);
      
      return {
        prompts: Math.max(0, limits.prompts - usage.prompts_used),
        scripts: Math.max(0, limits.scripts - usage.scripts_used),
        resources: Math.max(0, limits.resources - usage.resources_used)
      };
    } catch (error) {
      console.error('Error getting remaining usage:', error);
      return { prompts: 0, scripts: 0, resources: 0 };
    }
  }, [user, getUsageLimits]);

  const incrementUsage = useCallback(async (feature: 'prompts' | 'scripts' | 'resources') => {
    if (!user) return;
    
    try {
      let currentUsage = { prompts_used: 0, scripts_used: 0, resources_used: 0 };
      
      // Get current usage
      if (isSupabaseAvailable() && supabase) {
        const { data } = await supabase
          .from('user_usage')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (data) currentUsage = data;
      } else {
        const localUsage = localStorage.getItem(`usage_${user.id}`);
        if (localUsage) {
          currentUsage = JSON.parse(localUsage);
        }
      }
      
      // Increment the specific feature
      const featureKey = `${feature}_used` as keyof typeof currentUsage;
      currentUsage[featureKey] = (currentUsage[featureKey] || 0) + 1;
      
      // Save updated usage
      if (isSupabaseAvailable() && supabase) {
        await supabase
          .from('user_usage')
          .upsert({
            user_id: user.id,
            ...currentUsage
          });
      } else {
        localStorage.setItem(`usage_${user.id}`, JSON.stringify(currentUsage));
      }
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  }, [user]);

  const canUseFeature = useCallback(async (feature: 'prompts' | 'scripts' | 'resources') => {
    if (!user) return false;
    
    // Pro users have unlimited usage
    if (user.subscriptionType !== 'free') return true;
    
    try {
      const remainingUsage = await getRemainingUsage();
      return remainingUsage[feature] > 0;
    } catch (error) {
      console.error('Error checking feature availability:', error);
      return false;
    }
  }, [user, getRemainingUsage]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    needsEmailVerification,
    pendingVerificationEmail,
    login,
    logout,
    signup,
    hasActiveSubscription,
    getRemainingSubscriptionDays,
    updateSubscriptionStatus,
    clearEmailVerification,
    getRemainingUsage,
    incrementUsage,
    canUseFeature
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};