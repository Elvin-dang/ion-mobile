import { Redirect } from 'expo-router';
import React from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { ScreenLoader } from '../src/components/ui';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <ScreenLoader />;
  return <Redirect href={isAuthenticated ? '/dashboard' : '/login'} />;
}
