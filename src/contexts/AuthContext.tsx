/**
 * AuthContext — mock auth with AsyncStorage persistence for I-ON CMMS.
 * Three role-based demo accounts: Building Manager, MSP Supervisor, MSP Technician.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Role = 'BM' | 'SUP' | 'TECH';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string; // initials
  phone?: string;
  userGroup?: string;
}

export const DEMO_USERS: Record<Role, User> = {
  BM: {
    id: 'u-bm-01',
    name: 'David Chen',
    email: 'david.chen@ion-cmms.com',
    role: 'BM',
    avatar: 'DC',
    phone: '+65 9123 4567',
    userGroup: 'Building Management',
  },
  SUP: {
    id: 'u-sup-01',
    name: 'Maria Santos',
    email: 'maria.santos@msp-services.com',
    role: 'SUP',
    avatar: 'MS',
    phone: '+65 9234 5678',
    userGroup: 'MSP Operations',
  },
  TECH: {
    id: 'u-tech-01',
    name: 'James Wong',
    email: 'james.wong@msp-services.com',
    role: 'TECH',
    avatar: 'JW',
    phone: '+65 9345 6789',
    userGroup: 'MSP Field Team',
  },
};

const STORAGE_KEY = '@ion/auth-user';

export interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: Role) => boolean;
  updateUser: (patch: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => undefined,
  logout: async () => undefined,
  hasRole: () => false,
  updateUser: () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((v) => {
        if (v) setCurrentUser(JSON.parse(v));
      })
      .catch(() => undefined)
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (user: User) => {
    setCurrentUser(user);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const hasRole = useCallback((role: Role) => currentUser?.role === role, [currentUser]);

  const updateUser = useCallback((patch: Partial<User>) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthenticated: !!currentUser,
      isLoading,
      login,
      logout,
      hasRole,
      updateUser,
    }),
    [currentUser, isLoading, login, logout, hasRole, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export default AuthContext;
