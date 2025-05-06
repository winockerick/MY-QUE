import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  register: (name: string, phone: string, email?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from storage
    const checkUser = async () => {
      // In a real app, we'd check for a stored token or user data
      setIsLoading(false);
      
      // For demo purposes only - remove this in production
      // This auto-directs to either auth or app screens based on auth state
      if (!user) {
        router.replace('/(auth)');
      }
    };
    
    checkUser();
  }, [user]);

  const login = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      // In a real app, send these credentials to an API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        id: '1',
        name: 'John Doe',
        phone: phone,
      });
      
      router.replace('/(app)');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, phone: string, email?: string) => {
    setIsLoading(true);
    try {
      // In a real app, send registration data to an API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      setUser({
        id: '1',
        name: name,
        phone: phone,
        email: email,
      });
      
      router.replace('/(app)');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    router.replace('/(auth)');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};