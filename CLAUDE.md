# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

I-ON CMMS — a Computerized Maintenance Management System mobile app suite built with Expo/React Native. Targets iOS, Android, and Web from a single codebase with three distinct user roles: Building Manager (BM), MSP Supervisor (SUP), and MSP Technician (TECH).

## Commands

```bash
# Start dev server (choose platform interactively)
npx expo start

# Platform-specific
npx expo start --android
npx expo start --ios
npx expo start --web

# Build web output to dist/
npx expo export --platform web
```

No test runner or linter is configured yet.

## TypeScript Path Aliases

Defined in `tsconfig.json` — use these instead of relative imports:

| Alias | Resolves to |
|---|---|
| `@theme` | `src/theme/theme.ts` |
| `@components` | `src/components/` |
| `@contexts` | `src/contexts/` |
| `@config` | `src/config/` |
| `@data` | `src/data/mockData.ts` |

## Architecture

### Role-Based Single Codebase

All three roles share one codebase. Role differentiation happens via:
1. `AuthContext` (`src/contexts/AuthContext.tsx`) — `currentUser.role` and `hasRole()` guard access.
2. `(app)/(tabs)/_layout.tsx` — dynamically renders only the tabs permitted for the current role.
3. Screen-level conditional logic for role-specific actions (e.g., SUP can assign technicians; TECH can execute checklists).

Demo credentials are hardcoded — David Chen (BM), Maria Santos (SUP), James Wong (TECH). Auth state persists via AsyncStorage.

### Navigation (Expo Router)

File-based routing under `app/`:
- `(auth)/` — unauthenticated screens (login, forgot-password).
- `(app)/` — auth-gated; `_layout.tsx` redirects unauthenticated users to login.
- `(app)/(tabs)/` — bottom tab bar, role-filtered.
- Dynamic routes: `work-order/[id].tsx`, `asset/[id].tsx`, `request/[id].tsx`, `spare-part/[id].tsx`.

Route definitions and role→tab mappings live in `src/config/routes.ts`.

### State Management

React Context only — no Redux/Zustand:
- `AuthContext` — session, user identity, role.
- `ThemeContext` — light/dark mode; wraps the tree in `PaperProvider`.
- `LanguageContext` — i18n language switching.
- `SnackbarContext` — toast notifications.

All providers are composed in `app/_layout.tsx`.

### Theme System

`src/theme/theme.ts` exports two theme shapes:
- `paperLightTheme` / `paperDarkTheme` — for React Native Paper (MD3), used on native.
- `muiTheme` / `muiDarkTheme` — plain objects compatible with MUI v7, used on web.

Primary color: `#0E7C86` (teal-blue). Secondary: `#1F9D57` (green). Status colors (Draft, Pending, Assigned, In Progress, Completed, Rejected, etc.) are defined as semantic tokens in the theme and must be used via `StatusChip` rather than hardcoded hex values.

### Shared UI Primitives (`src/components/ui.tsx`)

Core building blocks — use these before reaching for raw React Native components:
- `ElevatedCard` — content card with configurable elevation.
- `PressableScale` — press feedback (0.97 scale + tint overlay).
- `StatusChip` — color-coded status badge driven by theme status tokens.
- `IconContainer` — icon with category-based background color.
- `EmptyState` — empty list fallback with icon + message.
- `SkeletonList` — loading placeholder list.
- `AnimatedEntrance` — fade-in wrapper.

Card variants for domain entities are in `src/components/cards.tsx`.

### Data Layer

All data is mocked in `src/data/mockData.ts` with domain types: `Building`, `Asset`, `WorkOrder`, `Request`, `Technician`, `Supervisor`, `SparePart`, `Notification`. The structure mirrors what a real API would return — swap fetch calls here when a backend is added.

## Key Docs

- `docs/WBS_Feature_Checklist.md` — 59 planned screens with 740 verification items; reference when implementing new features.
- `docs/Branding_Styleguide.md` — design tokens, color system, typography, component patterns.
- `docs/DemoMobileConfig.md` — demo user configuration and role capabilities.
