/**
 * ThemeContext — light/dark mode provider for I-ON apps with AsyncStorage persistence.
 * Light mode is ALWAYS the default. Wraps children in PaperProvider with active theme.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { paperDarkTheme, paperLightTheme } from '../theme/theme';

const STORAGE_KEY = '@ion/theme-mode';

export interface ThemeModeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (value: boolean) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  isDark: false,
  toggleTheme: () => undefined,
  setDark: () => undefined,
});

export function ThemeModeProvider({
  children,
  initialDark = false,
}: {
  children: React.ReactNode;
  initialDark?: boolean;
}) {
  const [isDark, setDarkState] = useState<boolean>(initialDark);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((v) => {
        if (v === 'dark') setDarkState(true);
      })
      .catch(() => undefined);
  }, []);

  const setDark = useCallback((value: boolean) => {
    setDarkState(value);
    AsyncStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light').catch(() => undefined);
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkState((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light').catch(() => undefined);
      return next;
    });
  }, []);

  const value = useMemo<ThemeModeContextValue>(
    () => ({ isDark, toggleTheme, setDark }),
    [isDark, toggleTheme, setDark]
  );

  const theme = isDark ? paperDarkTheme : paperLightTheme;

  return (
    <ThemeModeContext.Provider value={value}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  return useContext(ThemeModeContext);
}

export default ThemeModeContext;
