import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { tabsForRole } from '../../../src/config/routes';
import { useAuth } from '../../../src/contexts/AuthContext';

export default function TabsLayout() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const role = currentUser?.role ?? 'BM';
  const tabs = tabsForRole(role);
  const visibleNames = new Set(tabs.map((t) => t.name));

  // All possible tab files; non-role tabs are hidden via href: null.
  const allTabs = ['dashboard', 'requests', 'workorders', 'assets', 'more'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {allTabs.map((name) => {
        const def = tabs.find((t) => t.name === name);
        const visible = visibleNames.has(name);
        return (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              href: visible ? undefined : null,
              title: def?.title ?? name,
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons
                  name={(focused ? def?.activeIcon : def?.icon) ?? 'circle-outline'}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
