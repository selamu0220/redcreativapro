import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

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
  isAuthenticated: boolean;
  needsEmailVerification: boolean;
  pendingVerificationEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  hasActiveSubscription: () => boolean;
  getRemainingSubscriptionDays: () => number;
  canUseFeature: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => boolean;
  incrementUsage: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => void;
  getRemainingUsage: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => number;
  resetDailyUsage: () => void;
  forceUpdateLimits: () => void;
  updateSubscriptionStatus: (subscriptionType: 'free' | 'monthly' | 'annual', endDate?: Date) => void;
  clearEmailVerification: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);

  // Load user profile from Supabase or create if doesn't exist
  const loadUserProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      // Try to get existing profile
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      let userProfile;
      if (!profile) {
        // Create new profile
        const newProfile = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email!.split('@')[0],
          subscription_tier: 'free' as const,
          subscription_status: 'free' as const,
          subscription_end_date: null,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('users')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          return;
        }
        userProfile = createdProfile;
      } else {
        userProfile = profile;
      }

      // Load daily usage from localStorage
      const today = new Date().toISOString().split('T')[0];
      const savedUsage = localStorage.getItem(`usage_${userProfile.id}`);
      let dailyUsage = {
        date: today,
        aiRequests: 0,
        promptsUsed: 0,
        scriptsGenerated: 0
      };

      if (savedUsage) {
        const parsed = JSON.parse(savedUsage);
        if (parsed.date === today) {
          dailyUsage = parsed;
        }
      }

      const userData: User = {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.full_name,
        subscriptionType: userProfile.subscription_tier,
        subscriptionEndDate: userProfile.subscription_end_date ? new Date(userProfile.subscription_end_date) : null,
        dailyUsage,
        dailyLimits: {
          aiRequests: userProfile.subscription_tier === 'free' ? 100 : -1,
          promptsUsed: userProfile.subscription_tier === 'free' ? 20 : -1,
          scriptsGenerated: userProfile.subscription_tier === 'free' ? 5 : -1
        }
      };

      setUser(userData);
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    }
  }, []);

  // Auth state listener
  useEffect(() => {
    // Verificar si estamos en modo demo
    const demoAuth = localStorage.getItem('demo_auth');
    const demoUser = localStorage.getItem('demo_user');
    
    if (demoAuth === 'true' && demoUser) {
      try {
        const parsedUser = JSON.parse(demoUser);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing demo user:', error);
        localStorage.removeItem('demo_auth');
        localStorage.removeItem('demo_user');
      }
    }
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
        // Limpiar estado de verificación cuando el usuario se loguea exitosamente
        setNeedsEmailVerification(false);
        setPendingVerificationEmail(null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setNeedsEmailVerification(false);
        setPendingVerificationEmail(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadUserProfile]);



  const hasActiveSubscription = useCallback(() => {
    if (!user) return false;
    if (user.subscriptionType === 'free') return false;
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

  const canUseFeature = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return false;
    
    // Pro users have unlimited usage
    if (user.subscriptionType === 'monthly' || user.subscriptionType === 'annual') {
      return true;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const limit = user.dailyLimits[feature];
    const used = user.dailyUsage.date === today ? user.dailyUsage[feature] : 0;
    
    return used < limit;
  }, [user]);

  const incrementUsage = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedUser = {
        ...prevUser,
        dailyUsage: {
          ...prevUser.dailyUsage,
          date: today,
          [feature]: prevUser.dailyUsage.date === today 
            ? prevUser.dailyUsage[feature] + 1 
            : 1
        }
      };
      
      // Save usage to localStorage with user ID
      localStorage.setItem(`usage_${prevUser.id}`, JSON.stringify(updatedUser.dailyUsage));
      return updatedUser;
    });
  }, [user]);

  const getRemainingUsage = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return 0;
    
    // Pro users have unlimited usage
    if (user.subscriptionType === 'monthly' || user.subscriptionType === 'annual') {
      return -1; // Unlimited
    }
    
    const today = new Date().toISOString().split('T')[0];
    const limit = user.dailyLimits[feature];
    const used = user.dailyUsage.date === today ? user.dailyUsage[feature] : 0;
    
    return Math.max(0, limit - used);
  }, [user]);

  const resetDailyUsage = useCallback(() => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedUser = {
        ...prevUser,
        dailyUsage: {
          date: today,
          aiRequests: 0,
          promptsUsed: 0,
          scriptsGenerated: 0
        }
      };
      
      localStorage.setItem(`usage_${prevUser.id}`, JSON.stringify(updatedUser.dailyUsage));
      return updatedUser;
    });
  }, [user]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        
        if (data.user) {
          await loadUserProfile(data.user);
        }
      } catch (error: any) {
        console.error('Login error:', error);
        throw new Error(error.message || 'Error al iniciar sesión');
      }
    },
    [loadUserProfile]
  );

  const logout = useCallback(async () => {
    try {
      // Verificar si estamos en modo demo
      const demoAuth = localStorage.getItem('demo_auth');
      
      if (demoAuth === 'true') {
        localStorage.removeItem('demo_auth');
        localStorage.removeItem('demo_user');
        setUser(null);
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Error al cerrar sesión');
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      try {
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
        
        // No cargar el perfil inmediatamente después del signup
        // El usuario necesita verificar su email primero
        console.log('Signup successful, verification email sent to:', email);
        
        // Establecer estado de verificación pendiente
        setNeedsEmailVerification(true);
        setPendingVerificationEmail(email);
        
        // Solo cargar el perfil si el usuario ya está confirmado (caso raro)
        if (data.user && data.user.email_confirmed_at) {
          await loadUserProfile(data.user);
          setNeedsEmailVerification(false);
          setPendingVerificationEmail(null);
        }
      } catch (error: any) {
        console.error('Signup error:', error);
        throw new Error(error.message || 'Error al crear la cuenta');
      }
    },
    [loadUserProfile]
  );

  const forceUpdateLimits = useCallback(() => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedUser = {
        ...prevUser,
        dailyLimits: {
          aiRequests: prevUser.subscriptionType === 'free' ? 100 : -1,
          promptsUsed: prevUser.subscriptionType === 'free' ? 20 : -1,
          scriptsGenerated: prevUser.subscriptionType === 'free' ? 5 : -1
        }
      };
      
      return updatedUser;
    });
  }, [user]);

  const updateSubscriptionStatus = useCallback((subscriptionType: 'free' | 'monthly' | 'annual', endDate?: Date) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedUser = {
        ...prevUser,
        subscriptionType,
        subscriptionEndDate: endDate || null,
        dailyLimits: {
          aiRequests: subscriptionType === 'free' ? 100 : -1,
          promptsUsed: subscriptionType === 'free' ? 20 : -1,
          scriptsGenerated: subscriptionType === 'free' ? 5 : -1
        }
      };
      
      // Update user profile in Supabase
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
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    needsEmailVerification,
    pendingVerificationEmail,
    login,
    logout,
    signup,
    hasActiveSubscription,
    getRemainingSubscriptionDays,
    canUseFeature,
    incrementUsage,
    getRemainingUsage,
    resetDailyUsage,
    forceUpdateLimits,
    updateSubscriptionStatus,
    clearEmailVerification,
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