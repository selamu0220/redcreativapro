import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  trialEndDate: Date | null;
  isTrialActive: boolean;
  subscriptionType: 'trial' | 'monthly' | 'annual' | null;
  subscriptionEndDate: Date | null;
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
  getRemainingTrialDays: () => number;
  hasActiveSubscription: () => boolean;
  getRemainingSubscriptionDays: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Convert date strings back to Date objects
      return {
        ...parsedUser,
        trialEndDate: parsedUser.trialEndDate ? new Date(parsedUser.trialEndDate) : null,
        subscriptionEndDate: parsedUser.subscriptionEndDate ? new Date(parsedUser.subscriptionEndDate) : null
      };
    }
    return null;
  });

  const getRemainingTrialDays = useCallback(() => {
    if (!user?.trialEndDate) return 0;
    const now = new Date();
    const trialEnd = new Date(user.trialEndDate);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [user?.trialEndDate]);

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
    
    // Check trial period
    if (user.subscriptionType === 'trial') {
      return getRemainingTrialDays() > 0;
    }

    // Check paid subscriptions
    if (user.subscriptionType === 'monthly' || user.subscriptionType === 'annual') {
      return getRemainingSubscriptionDays() > 0;
    }

    return false;
  }, [user, getRemainingTrialDays, getRemainingSubscriptionDays]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (email && password) {
        const now = new Date();
        const trialEndDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days trial

        const newUser = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: 'user',
          trialEndDate: trialEndDate,
          isTrialActive: true,
          subscriptionType: 'trial' as const,
          subscriptionEndDate: trialEndDate,
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
        const now = new Date();
        const trialEndDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days trial

        const newUser = {
          id: '1',
          name: name,
          email: email,
          role: 'user',
          trialEndDate: trialEndDate,
          isTrialActive: true,
          subscriptionType: 'trial' as const,
          subscriptionEndDate: trialEndDate,
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
    getRemainingTrialDays,
    hasActiveSubscription,
    getRemainingSubscriptionDays,
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