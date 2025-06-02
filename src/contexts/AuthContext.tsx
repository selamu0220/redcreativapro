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

  // Load user profile from Supabase or create if doesn't exist
  const loadUserProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      setLoading(true); // Asegurar que estamos en loading al cargar perfil
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

      const userData: User = {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.full_name,
        subscriptionType: userProfile.subscription_tier,
        subscriptionEndDate: userProfile.subscription_end_date ? new Date(userProfile.subscription_end_date) : null,
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
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      setUser(null); // Limpiar usuario en caso de error
    } finally {
      setLoading(false); // Asegurar que loading se desactiva
    }
  }, []);

  // Auth state listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verificar si estamos en modo demo
        const demoAuth = localStorage.getItem('demo_auth');
        const demoUser = localStorage.getItem('demo_user');
        
        // Descomentado: Lógica para modo demo
        if (demoAuth === 'true' && demoUser) {
          try {
            const parsedUser = JSON.parse(demoUser);
            setUser(parsedUser);
            setLoading(false); // Asegurar setLoading false en modo demo
            console.log('AuthProvider: Demo mode initialized with user:', parsedUser);
            return; // Salir temprano para modo demo
          } catch (error) {
            console.error('Error parsing demo user:', error);
            localStorage.removeItem('demo_auth');
            localStorage.removeItem('demo_user');
          }
        }
        
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          try {
            await loadUserProfile(session.user);
          } catch (error) {
            console.error('Error loading user profile on session check:', error);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          await loadUserProfile(session.user);
          // Limpiar estado de verificación cuando el usuario se loguea exitosamente
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

    return () => subscription.unsubscribe();
  }, [loadUserProfile]);

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
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          // Proporcionar errores más específicos
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
          // Limpiar estados de verificación al hacer login exitoso
          setNeedsEmailVerification(false);
          setPendingVerificationEmail(null);
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

  const updateSubscriptionStatus = useCallback((subscriptionType: 'free' | 'monthly' | 'annual', endDate?: Date) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const updatedUser = {
        ...prevUser,
        subscriptionType,
        subscriptionEndDate: endDate || null
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

  // Usage tracking functions
  const getRemainingUsage = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return 0;
    
    // Check if we need to reset daily usage (new day)
    const today = new Date().toISOString().split('T')[0];
    if (user.dailyUsage.date !== today) {
      // Reset usage for new day
      setUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          dailyUsage: {
            date: today,
            aiRequests: 0,
            promptsUsed: 0,
            scriptsGenerated: 0
          }
        };
      });
      return user.dailyLimits[feature]; // Return full limit for new day
    }
    
    // Return remaining usage
    return Math.max(0, user.dailyLimits[feature] - user.dailyUsage[feature]);
  }, [user]);

  const incrementUsage = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return;
    
    // Check if we need to reset daily usage (new day)
    const today = new Date().toISOString().split('T')[0];
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      // If it's a new day, reset usage
      if (prevUser.dailyUsage.date !== today) {
        return {
          ...prevUser,
          dailyUsage: {
            date: today,
            aiRequests: feature === 'aiRequests' ? 1 : 0,
            promptsUsed: feature === 'promptsUsed' ? 1 : 0,
            scriptsGenerated: feature === 'scriptsGenerated' ? 1 : 0
          }
        };
      }
      
      // Otherwise increment the specific feature
      return {
        ...prevUser,
        dailyUsage: {
          ...prevUser.dailyUsage,
          [feature]: prevUser.dailyUsage[feature] + 1
        }
      };
    });
  }, [user]);

  const canUseFeature = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return false;
    
    // Pro users have unlimited usage
    if (user.subscriptionType !== 'free') return true;
    
    // Check if we need to reset daily usage (new day)
    const today = new Date().toISOString().split('T')[0];
    if (user.dailyUsage.date !== today) {
      return true; // New day, can use feature
    }
    
    // Check if user has reached their limit
    return user.dailyUsage[feature] < user.dailyLimits[feature];
  }, [user]);

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