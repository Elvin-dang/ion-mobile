import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useAuth } from '../../src/contexts/AuthContext';
import { ScreenLoader } from '../../src/components/ui';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <ScreenLoader />;
  if (!isAuthenticated) return <Redirect href="/login" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
