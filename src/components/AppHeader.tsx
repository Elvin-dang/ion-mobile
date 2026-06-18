/**
 * AppHeader — Paper Appbar with Logo / title, optional back, notifications bell
 * (with unread badge), and the theme toggle. Surface bg, no elevation until scrolled.
 */

import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Appbar, Badge, useTheme } from 'react-native-paper';
import { notifications } from '../data/mockData';
import { useThemeMode } from '../contexts/ThemeContext';
import Logo from './Logo';

export interface AppHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  showNotifications?: boolean;
  elevated?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export default function AppHeader({
  title,
  showLogo,
  showBack,
  showNotifications = true,
  elevated,
  rightIcon,
  onRightIconPress,
}: AppHeaderProps) {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeMode();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Appbar.Header
      mode="small"
      elevated={elevated}
      style={{ backgroundColor: theme.colors.surface }}
    >
      {showBack ? (
        <Appbar.BackAction onPress={() => (router.canGoBack() ? router.back() : router.replace('/(app)/(tabs)/dashboard'))} />
      ) : null}
      {showLogo ? (
        <View style={{ paddingLeft: 8 }}>
          <Logo size="sm" />
        </View>
      ) : (
        <Appbar.Content title={title ?? ''} titleStyle={{ fontSize: 20, fontWeight: '700' }} />
      )}
      {showLogo ? <Appbar.Content title="" /> : null}
      {rightIcon ? (
        <Appbar.Action icon={rightIcon} onPress={onRightIconPress ?? (() => {})} />
      ) : null}
      {showNotifications ? (
        <View>
          <Appbar.Action icon="bell-outline" onPress={() => router.push('/notifications')} />
          {unread > 0 ? (
            <Badge style={{ position: 'absolute', top: 6, right: 6 }} size={16}>
              {unread}
            </Badge>
          ) : null}
        </View>
      ) : null}
      <Appbar.Action icon={isDark ? 'brightness-7' : 'brightness-4'} onPress={toggleTheme} />
    </Appbar.Header>
  );
}
