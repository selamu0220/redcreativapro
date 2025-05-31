import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  hasActiveSubscription: () => boolean;
  getRemainingSubscriptionDays: () => number;
  canUseFeature: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => boolean;
  incrementUsage: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => void;
  getRemainingUsage: (feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => number;
  resetDailyUsage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const today = new Date().toISOString().split('T')[0];
      
      // Reset daily usage if it's a new day
      const shouldResetUsage = !parsedUser.dailyUsage || parsedUser.dailyUsage.date !== today;
      
      const updatedUser = {
        ...parsedUser,
        // Ensure all required properties exist
        subscriptionEndDate: parsedUser.subscriptionEndDate || null,
        subscriptionType: parsedUser.subscriptionType || 'free',
        dailyUsage: shouldResetUsage ? {
          date: today,
          aiRequests: 0,
          promptsUsed: 0,
          scriptsGenerated: 0
        } : parsedUser.dailyUsage,
        dailyLimits: parsedUser.dailyLimits || {
          aiRequests: parsedUser.subscriptionType === 'free' ? 10 : -1,
          promptsUsed: parsedUser.subscriptionType === 'free' ? 20 : -1,
          scriptsGenerated: parsedUser.subscriptionType === 'free' ? 5 : -1
        }
      };
      
      setUser(updatedUser);
      
      // Save updated user if changes were made
      if (shouldResetUsage || !parsedUser.dailyLimits) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
    
    // Listen for usage updates from AI calls
    const handleUsageUpdate = (event: CustomEvent) => {
      setUser(event.detail);
    };
    
    window.addEventListener('userUsageUpdated', handleUsageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('userUsageUpdated', handleUsageUpdate as EventListener);
    };
  }, []);



  const getRemainingSubscriptionDays = useCallback(() => {
    if (!user?.subscriptionEndDate) return 0;
    const now = new Date();
    const subscriptionEnd = new Date(user.subscriptionEndDate);
    const diffTime = subscriptionEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [user?.subscriptionEndDate]);

  const hasActiveSubscription = useCallback(() => {
    if (!user) return false;

    // Free users always have access
    if (user.subscriptionType === 'free') {
      return true;
    }

    // Check paid subscription
    if (user.subscriptionType === 'monthly' || user.subscriptionType === 'annual') {
      return getRemainingSubscriptionDays() > 0;
    }

    return false;
  }, [user, getRemainingSubscriptionDays]);

  const canUseFeature = useCallback((feature: 'aiRequests' | 'promptsUsed' | 'scriptsGenerated') => {
    if (!user) return false;
    
    // Pro users have unlimited access
    if (user.subscriptionType === 'monthly' || user.subscriptionType === 'annual') {
      return getRemainingSubscriptionDays() > 0;
    }
    
    // Free users check daily limits
    if (user.subscriptionType === 'free') {
      const today = new Date().toISOString().split('T')[0];
      
      // Reset usage if it's a new day
      if (user.dailyUsage.date !== today) {
        return true; // Allow usage on new day
      }
      
      const limit = user.dailyLimits[feature];
      const used = user.dailyUsage[feature];
      
      return limit === -1 || used < limit;
    }
    
    return false;
  }, [user, getRemainingSubscriptionDays]);

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
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, [user]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (email && password) {
        const today = new Date().toISOString().split('T')[0];
        const newUser = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: 'user' as const,
          subscriptionType: 'free' as const,
          subscriptionEndDate: null,
          dailyUsage: {
            date: today,
            aiRequests: 0,
            promptsUsed: 0,
            scriptsGenerated: 0
          },
          dailyLimits: {
            aiRequests: 10,
            promptsUsed: 20,
            scriptsGenerated: 5
          }
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        throw new Error('Email y contraseña son requeridos');
      }
    },
    []
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (name && email && password) {
        const today = new Date().toISOString().split('T')[0];
        const newUser = {
          id: '1',
          name: name,
          email: email,
          role: 'user' as const,
          subscriptionType: 'free' as const,
          subscriptionEndDate: null,
          dailyUsage: {
            date: today,
            aiRequests: 0,
            promptsUsed: 0,
            scriptsGenerated: 0
          },
          dailyLimits: {
            aiRequests: 10,
            promptsUsed: 20,
            scriptsGenerated: 5
          }
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        throw new Error('Todos los campos son requeridos');
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signup,
    hasActiveSubscription,
    getRemainingSubscriptionDays,
    canUseFeature,
    incrementUsage,
    getRemainingUsage,
    resetDailyUsage,
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