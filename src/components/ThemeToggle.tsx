/**
 * ThemeToggle — cross-platform light/dark switch (React Native Paper IconButton).
 * Icons: `brightness-7` (currently dark -> tap to go light) / `brightness-4`
 * (currently light -> tap to go dark) from MaterialCommunityIcons.
 *
 * HOW THE IMPLEMENT STEP SHOULD WIRE THIS
 * ---------------------------------------
 * Two interchangeable usages — pick whichever fits the app:
 *
 * 1) Controlled via props (zero dependencies, always safe):
 *
 *      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
 *
 * 2) Context-wired (no props needed) once you create the ThemeContext in the
 *    implement step at `../contexts/ThemeContext` exporting a `useThemeMode`
 *    hook of shape `{ isDark: boolean; toggleTheme: () => void }`:
 *
 *      <ThemeToggleConnected />
 *
 * A minimal, ready-to-use context lives in `../contexts/ThemeContext`
 * (ThemeModeProvider + useThemeMode). ThemeToggleConnected resolves the hook
 * lazily and falls back gracefully so this file always compiles even before the
 * context is finalized.
 */

import React from 'react';
import { IconButton } from 'react-native-paper';

export interface ThemeToggleProps {
  /** Whether dark mode is currently active. */
  isDark: boolean;
  /** Called when the user taps the toggle. */
  onToggle: () => void;
  /** Optional icon size (default 24). */
  size?: number;
  /** Optional icon/ripple color override. */
  color?: string;
  /** Optional testID for testing. */
  testID?: string;
}

/**
 * Controlled, fully self-contained toggle. Preferred for predictability.
 */
export function ThemeToggle({
  isDark,
  onToggle,
  size = 24,
  color,
  testID = 'theme-toggle',
}: ThemeToggleProps) {
  return (
    <IconButton
      icon={isDark ? 'brightness-7' : 'brightness-4'}
      size={size}
      iconColor={color}
      onPress={onToggle}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      testID={testID}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Context-wired variant                                                      */
/* -------------------------------------------------------------------------- */

type ThemeModeHook = { isDark: boolean; toggleTheme: () => void };

/**
 * Resolves a `useThemeMode` hook from `../contexts/ThemeContext` if present.
 * Wrapped in try/require so this component compiles and renders even if the
 * context module is not yet available (returns a no-op fallback).
 */
function resolveThemeMode(): ThemeModeHook {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('../contexts/ThemeContext');
    const hook = mod.useThemeMode ?? mod.useTheme ?? mod.default;
    if (typeof hook === 'function') {
      const value = hook();
      if (value && typeof value.toggleTheme === 'function') {
        return { isDark: !!value.isDark, toggleTheme: value.toggleTheme };
      }
    }
  } catch {
    // Context not available yet — fall through to no-op.
  }
  return { isDark: false, toggleTheme: () => undefined };
}

/**
 * Context-wired toggle — no props required. Use once a ThemeContext exposing
 * `useThemeMode(): { isDark, toggleTheme }` exists.
 */
export function ThemeToggleConnected(
  props: Omit<ThemeToggleProps, 'isDark' | 'onToggle'>
) {
  const { isDark, toggleTheme } = resolveThemeMode();
  return <ThemeToggle isDark={isDark} onToggle={toggleTheme} {...props} />;
}

export default ThemeToggle;
