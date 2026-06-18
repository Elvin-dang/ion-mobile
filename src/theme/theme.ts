/**
 * I-ON CMMS — Dual Theme (React Native Paper MD3 + MUI v7)
 * ---------------------------------------------------------
 * This file is SAFE TO IMPORT IN THE EXPO NATIVE BUNDLE.
 *
 *  - React Native Paper themes (paperLightTheme / paperDarkTheme) import only from
 *    `react-native-paper`, which the implement step installs.
 *  - The MUI v7 theme (muiTheme / muiDarkTheme) is a SELF-CONTAINED plain object
 *    produced by a local factory. It deliberately does NOT `import` from
 *    `@mui/material/styles`, so `npx expo export --platform web` will never fail on a
 *    missing @mui dependency. The shape mirrors MUI's `ThemeOptions` and can be passed
 *    straight into `createTheme(muiTheme)` on the web entry if/when MUI is installed:
 *
 *        // web-only entry (e.g. App.web.tsx)
 *        import { createTheme, ThemeProvider } from '@mui/material/styles';
 *        import { muiTheme } from './src/theme/theme';
 *        const theme = createTheme(muiTheme as any);
 *
 *  - `mobilePatterns` exposes every Mobile UI Component Pattern from the styleguide as
 *    structured data components can reference programmatically.
 */

import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
  type MD3Theme,
} from 'react-native-paper';

/* ============================================================================
 * 1. RAW COLOR TOKENS
 * ========================================================================== */

export const palette = {
  // Brand core
  primary: '#0E7C86',
  primaryDark: '#3FD0DC',
  primaryContainer: '#B8ECF0',
  primaryContainerDark: '#0A4A50',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#053C42',

  secondary: '#1F9D57',
  secondaryDark: '#4ADE80',
  secondaryContainer: '#C6F0D6',
  secondaryContainerDark: '#0C4527',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#06371D',

  // Accents
  accentAmber: '#F59E0B',
  accentVioletDark: '#A48BFF',
  accentViolet: '#7C5CFC',
  accentCoral: '#FF6B5C',
  accentCyan: '#0891B2',

  // Semantics (light)
  error: '#DC2F3C',
  errorDark: '#FF6B72',
  warning: '#F59E0B',
  warningDark: '#FBBF24',
  info: '#2563EB',
  infoDark: '#60A5FA',
  success: '#1F9D57',
  successDark: '#4ADE80',
  successDeep: '#15803D',
  onError: '#FFFFFF',

  // Neutrals — light
  backgroundLight: '#F7F8FA',
  surfaceLight: '#FFFFFF',
  surfaceVariantLight: '#EEF1F5',
  outlineLight: '#D5DBE2',
  onSurfaceLight: '#11181C',
  onSurfaceVariantLight: '#566273',

  // Neutrals — dark
  backgroundDark: '#0B1013',
  surfaceDark: '#11181C',
  surfaceVariantDark: '#1B252B',
  outlineDark: '#2B3A43',
  onSurfaceDark: '#EAF0F3',
  onSurfaceVariantDark: '#9AA9B4',

  white: '#FFFFFF',
  black: '#000000',
};

/* ----------------------------------------------------------------------------
 * Work-order / request STATUS colors (light + dark + tinted backgrounds)
 * -------------------------------------------------------------------------- */

export interface StatusColor {
  main: string;
  dark: string;
  tint: string; // light-mode tinted background
  tintDark: string; // dark-mode tinted background
}

export const statusColors: Record<string, StatusColor> = {
  draft: { main: '#64748B', dark: '#94A3B8', tint: '#E8EDF2', tintDark: '#1E2A31' },
  pending: { main: '#F59E0B', dark: '#FBBF24', tint: '#FEF3DD', tintDark: '#3A2A05' },
  approved: { main: '#0E7C86', dark: '#3FD0DC', tint: '#D7F0F2', tintDark: '#0A3A40' },
  assigned: { main: '#7C5CFC', dark: '#A48BFF', tint: '#EAE4FF', tintDark: '#2A2150' },
  inProgress: { main: '#2563EB', dark: '#60A5FA', tint: '#DCE7FF', tintDark: '#15233F' },
  inReview: { main: '#0891B2', dark: '#22D3EE', tint: '#D6F0F7', tintDark: '#0A3540' },
  verified: { main: '#1F9D57', dark: '#4ADE80', tint: '#DCF5E6', tintDark: '#0C3D22' },
  completed: { main: '#15803D', dark: '#4ADE80', tint: '#D6F0DF', tintDark: '#0C3320' },
  declined: { main: '#DC2F3C', dark: '#FF6B72', tint: '#FCE0E2', tintDark: '#3D1417' },
  cancelled: { main: '#94A3B8', dark: '#64748B', tint: '#EEF1F5', tintDark: '#222C33' },
  overdue: { main: '#FF6B5C', dark: '#FF8A7D', tint: '#FFE3DF', tintDark: '#3D1A15' },
};

/* ============================================================================
 * 2. TYPOGRAPHY (Plus Jakarta Sans)
 * ========================================================================== */

export const fontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semibold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extrabold: 'PlusJakartaSans-ExtraBold',
};

// Web font stack fallback (used by MUI / when custom fonts are not yet loaded)
export const fontFamilyWeb =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

const paperFontConfig = {
  displayLarge: {
    fontFamily: fontFamily.extrabold,
    fontWeight: '800' as FontWeight,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as FontWeight,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as FontWeight,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as FontWeight,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as FontWeight,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: fontFamily.semibold,
    fontWeight: '600' as FontWeight,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as FontWeight,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: fontFamily.semibold,
    fontWeight: '600' as FontWeight,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  titleSmall: {
    fontFamily: fontFamily.semibold,
    fontWeight: '600' as FontWeight,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontWeight: '400' as FontWeight,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontWeight: '400' as FontWeight,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontWeight: '400' as FontWeight,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  labelLarge: {
    fontFamily: fontFamily.semibold,
    fontWeight: '600' as FontWeight,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: fontFamily.semibold,
    fontWeight: '600' as FontWeight,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelSmall: {
    fontFamily: fontFamily.semibold,
    fontWeight: '600' as FontWeight,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

/* ============================================================================
 * 3. SHARED DESIGN TOKENS
 * ========================================================================== */

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const roundness = 12;

/* ============================================================================
 * 4. REACT NATIVE PAPER MD3 THEMES
 * ========================================================================== */

const paperFonts = configureFonts({ config: paperFontConfig as any });

export const paperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness,
  fonts: paperFonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    onPrimary: palette.onPrimary,
    primaryContainer: palette.primaryContainer,
    onPrimaryContainer: palette.onPrimaryContainer,

    secondary: palette.secondary,
    onSecondary: palette.onSecondary,
    secondaryContainer: palette.secondaryContainer,
    onSecondaryContainer: palette.onSecondaryContainer,

    // tertiary maps to the violet accent
    tertiary: palette.accentViolet,
    onTertiary: palette.white,
    tertiaryContainer: '#EAE4FF',
    onTertiaryContainer: '#2A2150',

    error: palette.error,
    onError: palette.onError,
    errorContainer: '#FCE0E2',
    onErrorContainer: '#3D1417',

    background: palette.backgroundLight,
    onBackground: palette.onSurfaceLight,
    surface: palette.surfaceLight,
    onSurface: palette.onSurfaceLight,
    surfaceVariant: palette.surfaceVariantLight,
    onSurfaceVariant: palette.onSurfaceVariantLight,

    outline: palette.outlineLight,
    outlineVariant: '#E3E8EE',

    inverseSurface: '#1F2A30',
    inverseOnSurface: '#EAF0F3',
    inversePrimary: palette.primaryDark,

    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#F4F7F8',
      level3: '#EFF4F5',
      level4: '#ECF2F3',
      level5: '#E8F0F1',
    },
    surfaceDisabled: 'rgba(17,24,28,0.12)',
    onSurfaceDisabled: 'rgba(17,24,28,0.38)',
    backdrop: 'rgba(6,22,27,0.45)',
  },
};

export const paperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness,
  fonts: paperFonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.primaryDark,
    onPrimary: '#053C42',
    primaryContainer: palette.primaryContainerDark,
    onPrimaryContainer: palette.primaryContainer,

    secondary: palette.secondaryDark,
    onSecondary: '#06371D',
    secondaryContainer: palette.secondaryContainerDark,
    onSecondaryContainer: palette.secondaryContainer,

    tertiary: palette.accentVioletDark,
    onTertiary: '#2A2150',
    tertiaryContainer: '#2A2150',
    onTertiaryContainer: '#EAE4FF',

    error: palette.errorDark,
    onError: '#3D1417',
    errorContainer: '#3D1417',
    onErrorContainer: '#FCE0E2',

    background: palette.backgroundDark,
    onBackground: palette.onSurfaceDark,
    surface: palette.surfaceDark,
    onSurface: palette.onSurfaceDark,
    surfaceVariant: palette.surfaceVariantDark,
    onSurfaceVariant: palette.onSurfaceVariantDark,

    outline: palette.outlineDark,
    outlineVariant: '#22303A',

    inverseSurface: '#EAF0F3',
    inverseOnSurface: '#1F2A30',
    inversePrimary: palette.primary,

    elevation: {
      level0: 'transparent',
      level1: '#161F24',
      level2: '#19242A',
      level3: '#1D2A31',
      level4: '#1F2E36',
      level5: '#22333B',
    },
    surfaceDisabled: 'rgba(234,240,243,0.12)',
    onSurfaceDisabled: 'rgba(234,240,243,0.38)',
    backdrop: 'rgba(0,0,0,0.6)',
  },
};

/* ============================================================================
 * 5. MUI v7 THEME (self-contained plain object — no @mui import)
 *    Pass into createTheme(muiTheme as any) on the web entry.
 * ========================================================================== */

function buildMuiTheme(mode: 'light' | 'dark') {
  const isDark = mode === 'dark';
  return {
    palette: {
      mode,
      primary: {
        main: isDark ? palette.primaryDark : palette.primary,
        contrastText: isDark ? '#053C42' : palette.onPrimary,
      },
      secondary: {
        main: isDark ? palette.secondaryDark : palette.secondary,
        contrastText: isDark ? '#06371D' : palette.onSecondary,
      },
      error: { main: isDark ? palette.errorDark : palette.error, contrastText: '#FFFFFF' },
      warning: { main: isDark ? palette.warningDark : palette.warning },
      info: { main: isDark ? palette.infoDark : palette.info },
      success: { main: isDark ? palette.successDark : palette.success },
      background: {
        default: isDark ? palette.backgroundDark : palette.backgroundLight,
        paper: isDark ? palette.surfaceDark : palette.surfaceLight,
      },
      text: {
        primary: isDark ? palette.onSurfaceDark : palette.onSurfaceLight,
        secondary: isDark ? palette.onSurfaceVariantDark : palette.onSurfaceVariantLight,
      },
      divider: isDark ? palette.outlineDark : palette.outlineLight,
    },
    shape: { borderRadius: roundness },
    typography: {
      fontFamily: fontFamilyWeb,
      h1: { fontWeight: 800, fontSize: '2.25rem', lineHeight: 1.22 },
      h2: { fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.28 },
      h3: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.33 },
      h4: { fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.4 },
      h5: { fontWeight: 600, fontSize: '1.0625rem', lineHeight: 1.41 },
      h6: { fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.33 },
      body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5 },
      body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.43 },
      button: { fontWeight: 600, fontSize: '0.9375rem', textTransform: 'none' as const },
      caption: { fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.03em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? palette.backgroundDark : palette.backgroundLight,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: radius.lg,
            border: 'none',
            boxShadow: isDark
              ? '0 4px 14px rgba(0,0,0,0.40)'
              : '0 4px 14px rgba(14,42,51,0.10)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radius.md,
            textTransform: 'none' as const,
            fontWeight: 600,
            padding: '10px 20px',
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: radius.pill, fontWeight: 600 },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' as const },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: radius.md } },
      },
      MuiPaper: {
        styleOverrides: { rounded: { borderRadius: radius.lg } },
      },
    },
  };
}

/** MUI v7 light theme options (DEFAULT). createTheme(muiTheme as any). */
export const muiTheme = buildMuiTheme('light');
/** MUI v7 dark theme options. createTheme(muiDarkTheme as any). */
export const muiDarkTheme = buildMuiTheme('dark');

/* ============================================================================
 * 6. mobilePatterns — structured specs for programmatic use
 * ========================================================================== */

// Helper: hex + alpha (0..1) -> 8-digit hex
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${a}`;
}

export const elevations = {
  flat: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  card: {
    shadowColor: '#0E2A33',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  raised: {
    shadowColor: '#0E2A33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  floating: {
    shadowColor: '#0E2A33',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
  modal: {
    shadowColor: '#06161B',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 16,
  },
};

export const elevationsDark = {
  flat: elevations.flat,
  card: { ...elevations.card, shadowColor: '#000000', shadowOpacity: 0.14 },
  raised: { ...elevations.raised, shadowColor: '#000000', shadowOpacity: 0.16 },
  floating: { ...elevations.floating, shadowColor: '#000000', shadowOpacity: 0.2 },
  modal: { ...elevations.modal, shadowColor: '#000000', shadowOpacity: 0.24 },
};

/** Distinct tinted icon containers by category (NEVER one flat color). */
export const iconColorMap = {
  navigation: { color: palette.primary, bg: withAlpha(palette.primary, 0.15) },
  account: { color: palette.accentViolet, bg: withAlpha(palette.accentViolet, 0.15) },
  notifications: { color: palette.accentAmber, bg: withAlpha(palette.accentAmber, 0.15) },
  support: { color: palette.secondary, bg: withAlpha(palette.secondary, 0.15) },
  danger: { color: palette.error, bg: withAlpha(palette.error, 0.15) },
  workOrder: { color: palette.info, bg: withAlpha(palette.info, 0.15) },
  asset: { color: palette.accentCyan, bg: withAlpha(palette.accentCyan, 0.15) },
  request: { color: palette.accentViolet, bg: withAlpha(palette.accentViolet, 0.15) },
  inventory: { color: palette.successDeep, bg: withAlpha(palette.successDeep, 0.15) },
} as const;

export const iconContainer = {
  size: 40,
  radius: radius.md,
  iconSize: 22,
};

/** Inline metadata pill badge style (duration, count, dates, status). */
export const badge = {
  borderRadius: radius.pill,
  paddingVertical: 4,
  paddingHorizontal: 10,
  iconSize: 14,
  gap: 4,
  tintAlpha: 0.14,
  /** build a badge style for a given solid color */
  build: (color: string) => ({
    backgroundColor: withAlpha(color, 0.14),
    color,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  }),
};

/** Accent usage rules (min 3 locations each) — for lint/review reference. */
export const accentUsage = {
  secondary: [
    'completed/approved status chips',
    'success toasts & success empty states',
    'dashboard Completed/Closed KPI highlight',
    'progress-bar completed segments',
  ],
  amber: [
    'pending status chips & due-soon date pills',
    'Pending Approval / Technician Requests KPI highlight',
    'notifications icon container',
    'warning banners',
  ],
  violet: [
    'assigned status chip & assigned-technician emphasis',
    'account/profile & request icon containers',
    'category chips (Asset System/Type)',
    'chart series',
  ],
  coral: [
    'overdue date pills/labels',
    'destructive-adjacent highlights',
    'chart overdue/rejected series',
  ],
} as const;

/** Pressable interaction feedback (beyond plain opacity). */
export const pressFeedback = {
  scale: 0.97,
  opacity: 0.92,
  tintAlpha: 0.08,
  durationMs: 120,
  spring: { damping: 18, stiffness: 220, mass: 0.6 },
};

/** Image overlay (gradient) + glassmorphism params for image cards. */
export const gradients = {
  imageOverlay: {
    colors: ['rgba(6,22,27,0)', 'rgba(6,22,27,0.72)'] as [string, string],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    coverage: 0.55, // bottom 55% of the image
  },
  glass: {
    backgroundColor: 'rgba(17,24,28,0.55)',
    blurAmount: 12,
    borderColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderRadius: radius.md,
  },
  authGlowLight: ['#E3F4F5', '#F7F8FA'] as [string, string],
  authGlowDark: ['#0E2A30', '#0B1013'] as [string, string],
};

/** Section header decoration. */
export const sectionHeader = {
  accentBar: { width: 4, height: 18, borderRadius: 2, gap: 10 },
  titleVariant: 'titleMedium' as const,
  iconSize: 20,
  iconGap: 8,
};

/** Card mount / list entry animations. */
export const animations = {
  cardEntry: {
    fadeFrom: 0,
    fadeTo: 1,
    translateYFrom: 16,
    translateYTo: 0,
    durationMs: 320,
    easing: 'ease-out' as const,
  },
  staggerDelayMs: 60,
  staggerMaxIndex: 8,
  skeletonShimmerMs: 1200,
};

/** Settings item style. */
export const settingsItem = {
  minHeight: 56,
  paddingHorizontal: spacing.md,
  chevron: { icon: 'chevron-right', size: 22 },
  dangerUsesChevron: false,
  containerElevation: 'raised' as const,
};

/** Login / auth role-based color coding for demo accounts. */
export const authRoles = {
  buildingManager: {
    label: 'Building Manager',
    color: palette.primary,
    bg: withAlpha(palette.primary, 0.15),
    icon: 'account-tie',
  },
  mspSupervisor: {
    label: 'MSP Supervisor',
    color: palette.accentViolet,
    bg: withAlpha(palette.accentViolet, 0.15),
    icon: 'account-supervisor',
  },
  mspTechnician: {
    label: 'MSP Technician',
    color: palette.accentAmber,
    bg: withAlpha(palette.accentAmber, 0.15),
    icon: 'account-hard-hat',
  },
} as const;

/** Domain MaterialCommunityIcons vocabulary (NO emoji). */
export const iconNames = {
  dashboard: 'view-dashboard-outline',
  workOrder: 'clipboard-text-outline',
  workOrderDone: 'clipboard-check-outline',
  asset: 'cube-outline',
  request: 'file-document-outline',
  approve: 'check-circle-outline',
  decline: 'close-circle-outline',
  assign: 'account-arrow-right-outline',
  technician: 'account-hard-hat',
  checklist: 'format-list-checks',
  photo: 'camera-outline',
  part: 'wrench-outline',
  qr: 'qrcode-scan',
  drawing: 'map-marker-outline',
  inventory: 'package-variant-closed',
  notifications: 'bell-outline',
  settings: 'cog-outline',
  account: 'account-circle-outline',
  support: 'lifebuoy',
  logout: 'logout',
  themeLight: 'brightness-7',
  themeDark: 'brightness-4',
} as const;

export const mobilePatterns = {
  spacing,
  radius,
  roundness,
  elevations,
  elevationsDark,
  statusColors,
  iconColorMap,
  iconContainer,
  badge,
  accentUsage,
  pressFeedback,
  gradients,
  sectionHeader,
  animations,
  settingsItem,
  authRoles,
  iconNames,
  withAlpha,
} as const;

export type MobilePatterns = typeof mobilePatterns;
export default mobilePatterns;
