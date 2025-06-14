
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  subscription: {
    plan: 'trial' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt: string;
    instancesUsed: number;
    instancesLimit: number;
    messagesUsed: number;
    messagesLimit: number;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simular login - em produção seria uma chamada API real
      if (email === 'admin@datafy.com' && password === 'senha123') {
        const mockUser: User = {
          id: '1',
          email: 'admin@datafy.com',
          name: 'Administrador Datafy',
          subscription: {
            plan: 'trial',
            status: 'active',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            instancesUsed: 2,
            instancesLimit: 1,
            messagesUsed: 45,
            messagesLimit: 100
          }
        };
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simular registro - em produção seria uma chamada API real
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        subscription: {
          plan: 'trial',
          status: 'active',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          instancesUsed: 0,
          instancesLimit: 1,
          messagesUsed: 0,
          messagesLimit: 100
        }
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const checkSubscription = async () => {
    // Simular verificação de assinatura
    if (user) {
      const updatedUser = { ...user };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      checkSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
};
