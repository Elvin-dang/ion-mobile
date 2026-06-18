# I-ON CMMS — Premium Branding Styleguide (Mobile-First)

**Product:** I-ON / EZAxis — Facility & Asset Maintenance Management System (CMMS)
**Targets:** Building Manager App, MSP Supervisor App, MSP Technician App (Expo / React Native, native + web)
**Design tokens delivered in:** `src/theme/theme.ts` (MUI v7 web theme + React Native Paper MD3 theme + `mobilePatterns`)
**Date:** 2026-06-17

---

## 1. Domain Analysis

**Detected domain:** Enterprise B2B field-operations / maintenance-management software (CMMS — Computerized Maintenance Management System), delivered as a suite of three role-specific native mobile apps.

**Rationale.** The WBS describes a closed maintenance lifecycle — request → approve → assign → execute → review → sign-off & close — operated across three roles (Building Manager, MSP Supervisor, MSP Technician). The dominant UI surfaces are status-heavy work-order lists, asset lists/details, request approvals, multi-stage progress steppers, checklists, photo upload, QR scan, and push notifications. These are the canonical patterns of CMMS / field-service products (UpKeep, MaintainX, Fiix, Limble, ServiceTitan).

**Target audience.**
- **Building Managers** — approvers/overseers. Want trust, clarity, at-a-glance KPIs, confident approve/decline actions. Office + on-site, mid-range devices.
- **MSP Supervisors** — orchestrators. Assign technicians, review completions, request parts. Mobile in the field, moving between sites.
- **MSP Technicians** — executors. Hands-on, often gloved, in plant rooms / poor light / offline. Need large tap targets, high contrast, fast checklist + photo + QR flows.

**Product tone.** Trustworthy, professional, efficient, field-ready. Industrial-but-modern: reliability and precision without feeling like dated enterprise software. Status legibility is a first-class requirement, not decoration.

---

## 2. Design Inspiration References

Five leading mobile apps in the CMMS / field-service space were studied for palette, type, card styling, and navigation.

1. **MaintainX** — Mobile-first CMMS. Signature confident blue with teal-leaning accents; clean card-based work-order feed, strong status pills, bottom tab navigation. Takeaway: a saturated trustworthy blue primary + clear status color coding reads as "reliable operations tool."
2. **UpKeep** — Mobile-first maintenance. Blue/indigo brand with bright accent highlights; card lists, prominent FAB for "create work order," tab bar. Takeaway: indigo-blue conveys dependability; a vivid accent drives the primary create action.
3. **Limble CMMS** — Click-reduction philosophy, visually organized card layouts and clear menus. Green/blue palette. Takeaway: green is a strong "completed / healthy asset" semantic and a fresh secondary.
4. **Fiix** (Rockwell) — Asset/PM-heavy CMMS, mobile-first for field teams. Orange + deep blue industrial pairing. Takeaway: a warm accent (amber/orange) is the industry's natural "warning / pending / due-soon" cue.
5. **ServiceTitan** — Technician-empowerment field app: log in, review jobs, navigate, complete with checklists, photos, signatures. Blue brand, dense but legible. Takeaway: technician execution screens must prioritize contrast, large targets, and unmistakable progress state.

**Synthesis for I-ON:** a confident industrial **teal-blue primary** (reliability), a fresh **green secondary** (completion/health), and **amber + violet** accents (pending/due and highlights). This is recognizably "in-category" yet more modern and vibrant than the incumbents.

---

## 3. Brand Personality

**Trustworthy · Professional · Efficient · Field-Ready · Modern-Industrial**

Five adjectives, in priority order. Every visual decision should be testable against these — e.g., "does this status pill make the work-order state instantly unambiguous to a technician in a dim plant room?" (Field-Ready), "does this screen look like a dependable system of record?" (Trustworthy).

---

## 4. Color System

A vibrant, modern, professional palette. All foreground/background pairings below meet **WCAG AA** (≥ 4.5:1 body text, ≥ 3:1 large text / UI components). Ratios are stated against the surface the token is used on.

### 4.1 Brand core

| Role | Token | Hex | Notes / Contrast |
|------|-------|-----|------------------|
| Primary | `primary` | `#0E7C86` | Industrial teal-blue. On white 4.83:1 (AA body). |
| Primary (dark mode) | `primaryDark` | `#3FD0DC` | Brightened teal for dark surfaces. On `#11181C` 9.1:1. |
| Primary container (light) | `primaryContainer` | `#B8ECF0` | Tinted fill; text `#053C42` on it ≥ 7:1. |
| On primary | `onPrimary` | `#FFFFFF` | On `#0E7C86` 4.83:1. |
| Secondary | `secondary` | `#1F9D57` | Fresh reliability green (completed / healthy). On white 3.6:1 → use for large text/UI/fills, pair `onSecondary` white (3.6:1 AA large). |
| Secondary (dark) | `secondaryDark` | `#4ADE80` | On `#11181C` 10.2:1. |
| On secondary | `onSecondary` | `#FFFFFF` | |

### 4.2 Accents (vivid highlights, badges, charts)

| Accent | Token | Hex | Where it is used |
|--------|-------|-----|------------------|
| Amber | `accentAmber` | `#F59E0B` | Pending / due-soon / warning highlights, stat callouts, category chips. |
| Violet | `accentViolet` | `#7C5CFC` | Highlights, "assigned" emphasis, charts, account/profile category. |
| Coral | `accentCoral` | `#FF6B5C` | Sparing emphasis: overdue accents, danger-adjacent highlights, charts. |

Each accent has a **min 3 mandated usage locations** — see §10 Accent Color Usage Rules.

### 4.3 Semantic / status colors

Modern saturated semantics. These also drive the work-order / request **status chip** system, which is the single most important color subsystem in this product.

| Semantic | Hex (light) | Hex (dark) | On-color |
|----------|-------------|------------|----------|
| Error / Reject / Declined | `#DC2F3C` | `#FF6B72` | white |
| Warning / Pending | `#F59E0B` | `#FBBF24` | `#3A2A00` |
| Info / In Review | `#2563EB` | `#60A5FA` | white |
| Success / Completed / Approved | `#1F9D57` | `#4ADE80` | white |

**Work-order / request status color map** (used by chips, steppers, list badges):

| Status | Token | Light hex | Tint bg (light) | Meaning |
|--------|-------|-----------|-----------------|---------|
| Draft | `statusColors.draft` | `#64748B` | `#E8EDF2` | Preparation |
| Pending / Awaiting approval | `statusColors.pending` | `#F59E0B` | `#FEF3DD` | New, needs decision |
| Approved / Unassigned | `statusColors.approved` | `#0E7C86` | `#D7F0F2` | Ready to assign |
| Assigned | `statusColors.assigned` | `#7C5CFC` | `#EAE4FF` | Allocated to tech |
| In Progress / Started | `statusColors.inProgress` | `#2563EB` | `#DCE7FF` | Work happening |
| In Review / Completed | `statusColors.inReview` | `#0891B2` | `#D6F0F7` | Awaiting sign-off |
| Verified | `statusColors.verified` | `#1F9D57` | `#DCF5E6` | BM sign-off pending close |
| Completed / Closed | `statusColors.completed` | `#15803D` | `#D6F0DF` | Terminal success |
| Declined / Rejected | `statusColors.declined` | `#DC2F3C` | `#FCE0E2` | Terminal/return reject |
| Cancelled | `statusColors.cancelled` | `#94A3B8` | `#EEF1F5` | Terminal neutral |
| Overdue | `statusColors.overdue` | `#FF6B5C` | `#FFE3DF` | Past due emphasis |

All status text-on-tint pairings meet AA (dark text token on its light tint ≥ 4.5:1).

### 4.4 Neutrals & backgrounds

**Light mode (default).** Warm off-whites — never pure clinical white.

| Token | Hex | Use |
|-------|-----|-----|
| `background` | `#F7F8FA` | App background (cool warm-grey). |
| `surface` | `#FFFFFF` | Cards, sheets. |
| `surfaceVariant` | `#EEF1F5` | Grouped settings, input fills, chip bg. |
| `outline` | `#D5DBE2` | Borders, dividers. |
| `onSurface` | `#11181C` | Primary text (15.8:1 on white). |
| `onSurfaceVariant` | `#566273` | Secondary text (4.9:1 on white). |

**Dark mode.** Rich, slightly blue-cool darks — not flat black.

| Token | Hex | Use |
|-------|-----|-----|
| `background` | `#0B1013` | App background. |
| `surface` | `#11181C` | Cards, sheets. |
| `surfaceVariant` | `#1B252B` | Grouped settings, input fills. |
| `outline` | `#2B3A43` | Borders. |
| `onSurface` | `#EAF0F3` | Primary text (14.6:1). |
| `onSurfaceVariant` | `#9AA9B4` | Secondary text (6.1:1). |

---

## 5. Typography System

**Primary typeface:** **Plus Jakarta Sans** (Google Fonts) — geometric humanist sans with a confident, modern, slightly distinctive personality; excellent at UI sizes. Used for everything (display → body → labels).
**Numeric/mono companion (optional):** **JetBrains Mono** for WO IDs, asset codes, counters where tabular alignment helps. If not bundled, fall back to system mono.

Weights bundled: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold for display/KPI numbers).

### Type scale (mobile-optimized)

| Token | Size / Line | Weight | Use |
|-------|-------------|--------|-----|
| `displayLarge` | 36 / 44 | 800 | KPI hero numbers |
| `displaySmall` | 28 / 36 | 700 | Screen hero / big counts |
| `headlineMedium` | 24 / 32 | 700 | Screen titles |
| `titleLarge` | 20 / 28 | 700 | Card titles, asset name |
| `titleMedium` | 17 / 24 | 600 | Section headers, list primary |
| `bodyLarge` | 16 / 24 | 400 | Body / detail text |
| `bodyMedium` | 14 / 20 | 400 | Secondary body, metadata |
| `labelLarge` | 15 / 20 | 600 | Buttons (≥15 for tap clarity) |
| `labelMedium` | 13 / 16 | 600 | Chip / pill labels |
| `labelSmall` | 11 / 16 | 600 | Overlines, caption tags (UPPERCASE, +0.5 tracking) |

Minimum body size on technician screens is **16** for field legibility. Line-height never below 1.4× for paragraph text.

---

## 6. Depth & Elevation

Soft, layered shadows (never harsh). Cards float on the warm background; this is the primary depth language of the product. Dark mode shifts to subtler shadows plus a faint surface-tint to convey elevation.

| Level | Token | Use | Shadow (light) |
|-------|-------|-----|----------------|
| 0 | `flat` | Background, dividers | none |
| 1 | `card` | **Minimum for any content card / list item** | color `#0E2A33`, offset (0,2), opacity 0.08, radius 8, elevation 2 |
| 2 | `raised` | Settings groups, list containers, KPI cards | color `#0E2A33`, offset (0,4), opacity 0.10, radius 14, elevation 4 |
| 3 | `floating` | FAB, active/pressed cards, popovers | color `#0E2A33`, offset (0,6), opacity 0.14, radius 20, elevation 8 |
| 4 | `modal` | Bottom sheets, dialogs | color `#06161B`, offset (0,-4), opacity 0.18, radius 28, elevation 16 |

**Rule:** content cards are NEVER elevation 0. Minimum is Level 1 (`card`). Grouped/settings/list containers use Level 2 (`raised`).

---

## 7. Spacing & Layout

**Spacing scale (4pt base):** `xxs 4 · xs 8 · sm 12 · md 16 · lg 20 · xl 24 · xxl 32 · xxxl 40`.

**Border radius:** `sm 8 · md 12 · lg 16 · xl 20 · pill 999`. Global `roundness = 12`. Cards 16; KPI cards 20; chips/pills 999; buttons 12; bottom sheets 28 (top corners).

**Mobile layout constraints.**
- Screen horizontal padding: 16. Card internal padding: 16.
- **Min tap target 44×44pt** (icon buttons 44, list rows ≥ 56, primary buttons height 52).
- Bottom tab bar: height 64 + safe-area; 4–5 items; active item shows filled icon + label + primary tint.
- Sticky action buttons (Approve / Sign Off & Close / Submit) live in a bottom bar OUTSIDE the scroll, full-width, with safe-area inset.
- Lists: pull-to-refresh, infinite scroll, skeleton loaders (never blank), explicit empty states.
- Max content width on web (MUI): 1080 centered; touch sizing preserved.

---

## 8. Component Styling

### React Native Paper (MD3) overrides
- **Card:** mode `elevated`, radius 16, `raised` shadow, surface bg, 16 padding.
- **Button (contained):** radius 12, height 52, `labelLarge`, no uppercase, primary bg.
- **Chip:** pill radius, `labelMedium`, tinted bg per status/category (see status map), 32 height.
- **TextInput:** mode `outlined`, radius 12, `surfaceVariant` fill on focus, 56 height, error in semantic error color.
- **FAB:** primary, `floating` shadow, bottom-right 16, used for Create Ad-hoc WO.
- **Appbar:** surface bg, `titleLarge`, no elevation until scrolled (then `card`).
- **BottomNavigation:** surface bg, active primary tint + filled icon, inactive `onSurfaceVariant`.

### MUI v7 (web) overrides
- `shape.borderRadius = 12`. `MuiCard`: radius 16, `raised` boxShadow, no default border.
- `MuiButton`: radius 12, `textTransform: none`, weight 600, padding 10×20.
- `MuiChip`: pill, weight 600.
- `MuiTextField`: outlined default, radius 12.
- Typography uses Plus Jakarta Sans across all variants.

---

## 9. Iconography

**Library:** `MaterialCommunityIcons` (ships with `@expo/vector-icons` / react-native-paper). **NO emoji anywhere** in product UI.

Domain icon vocabulary (consistency mandatory):
- Work order: `clipboard-text-outline` / `clipboard-check-outline` (completed)
- Asset: `cube-outline` / `cog-outline`
- Request: `file-document-outline` / `inbox-arrow-down`
- Approve: `check-circle-outline` · Decline/Reject: `close-circle-outline`
- Assign: `account-arrow-right-outline` · Technician: `account-hard-hat`
- Checklist: `format-list-checks` · Photo: `camera-outline` · Part: `wrench-outline`
- QR scan: `qrcode-scan` · Drawing/Map: `map-marker-outline`
- Spare part / inventory: `package-variant-closed`
- Notifications: `bell-outline` · Dashboard: `view-dashboard-outline`
- Settings: `cog-outline` · Account: `account-circle-outline` · Support: `lifebuoy` · Danger/Logout: `logout`
- Theme toggle: `brightness-7` (to-light) / `brightness-4` (to-dark)

Icons in containers use a tinted background (see §10 Icon Container Color Map). Outline variants for navigation/inactive; filled for active/selected.

---

## 10. Mobile UI Component Patterns (MANDATORY — implement exactly)

These are precise, implementable specs. They are also exported programmatically as `mobilePatterns` in `src/theme/theme.ts`.

### 10.1 Card Depth System
- **Minimum elevation for any content card = Level 1 (`card`).** Never render a content card, list item, or KPI tile flat.
- **Settings groups / list containers = Level 2 (`raised`).**
- **FAB / pressed card / popover = Level 3 (`floating`).** **Bottom sheets / dialogs = Level 4 (`modal`).**
- Shadow definitions per level (light mode): see §6 table — each defines `shadowColor`, `shadowOffset {width,height}`, `shadowOpacity`, `shadowRadius`, Android `elevation`. Dark mode uses the same offsets with opacity +0.06 and `shadowColor #000000`.

### 10.2 Icon Container Color Map
Every icon that sits in a leading container uses a **distinct tinted background by category** — NEVER one flat color for all icons. Container: 40×40, radius 12, icon 22, icon color = solid category color, bg = category color @ 15% alpha.

| Category | Icon color | Container bg |
|----------|-----------|--------------|
| navigation | `#0E7C86` (primary) | primary @15% |
| account | `#7C5CFC` (violet) | violet @15% |
| notifications | `#F59E0B` (amber) | amber @15% |
| support | `#1F9D57` (secondary) | secondary @15% |
| danger | `#DC2F3C` (error) | error @15% |
| workOrder | `#2563EB` (info) | info @15% |
| asset | `#0891B2` (cyan) | cyan @15% |
| request | `#7C5CFC` (violet) | violet @15% |
| inventory | `#15803D` | @15% |

### 10.3 Metadata Display Style
Inline metadata (duration, item count, dates, status) renders as **pill badges**, NOT plain icon+text:
- borderRadius 999, paddingV 4, paddingH 10, `labelMedium` (13/600).
- Background = category/status color @ 12–15% alpha; text = solid category/status color.
- Optional leading icon 14 inside the pill, 4 gap.
- Example: due date pill (overdue → `statusColors.overdue` tint), checklist "8/12" count pill (info tint), duration "2 hrs" pill (violet tint).

### 10.4 Accent Color Usage Rules (min 3 locations each)
- **Secondary (green `#1F9D57`):** (1) Completed/Approved status chips, (2) Success toasts/empty-success states, (3) dashboard "Completed/Closed" KPI stat highlight, (4) progress-bar completed segments.
- **Amber `#F59E0B`:** (1) Pending status chips & due-soon date pills, (2) "Pending Approval / Technician Requests" KPI highlight, (3) notifications icon container, (4) warning banners.
- **Violet `#7C5CFC`:** (1) "Assigned" status chip + assigned-technician emphasis, (2) account/profile & request icon containers, (3) category chips (Asset System/Type) on detail screens, (4) chart series.
- **Coral `#FF6B5C`:** (1) Overdue date pills/labels, (2) destructive-adjacent highlights, (3) chart "overdue/rejected" series.

### 10.5 Pressable Interaction Feedback
Beyond plain opacity. On press-in, animate:
- `scale` → **0.97** (spring, ~120ms), `opacity` → **0.92**, background tint overlay = pressed color @ **8%** alpha.
- Release springs back to 1.0 / 1.0. Implement via `Pressable` + Reanimated/Animated; cards and list rows share this `pressFeedback` spec.

### 10.6 Image Overlay Style
Image cards (asset photos, drawing thumbnails, execution photos) use a bottom gradient for text legibility:
- **LinearGradient** colors `['rgba(6,22,27,0)', 'rgba(6,22,27,0.72)']`, vertical direction `start {x:0,y:0}` → `end {x:0,y:1}`, covering bottom 55% of the image. Caption text white on the gradient.
- Glassmorphism alternative (status overlay chip on photo): bg `rgba(17,24,28,0.55)`, `blur 12`, border `rgba(255,255,255,0.18)` 1px, radius 12.

### 10.7 Section Header Decoration
Section headers get a visual treatment, never bare text:
- **Accent leading bar:** 4×18 rounded bar (radius 2) in the section's category/accent color, 10 gap before the title.
- Title `titleMedium` (17/600). Optional trailing "See all" link in primary.
- Alternative: 20 leading icon in primary + 8 gap.

### 10.8 Entry Animations
- Card mount: **fade-in (opacity 0→1) + slide-up (translateY 16→0)**, duration 320ms, easing ease-out.
- **Stagger delay 60ms** between consecutive list items (cap stagger at item index 8 to keep long lists snappy).
- Skeleton loaders use a shimmer sweep (1200ms loop) before content swaps in.

### 10.9 Settings Item Style
- Row height ≥ 56, 16 horizontal padding, leading **icon container** per §10.2 category, title `bodyLarge`, optional subtitle `bodyMedium` in `onSurfaceVariant`.
- **Right accessory:** chevron `chevron-right` 22 in `onSurfaceVariant` (danger rows use error color, no chevron). Toggle rows use a Paper `Switch` in primary.
- Press highlight uses §10.5 `pressFeedback`. Grouped in a Level-2 (`raised`) container with hairline `outline` dividers between rows.

### 10.10 Login / Auth Visual Accents
- **Role-based color coding for demo accounts** (login screen quick-select cards):
  - **Building Manager** → primary teal `#0E7C86` (icon `account-tie`, primary @15% container).
  - **MSP Supervisor** → violet `#7C5CFC` (icon `account-supervisor`, violet @15%).
  - **MSP Technician** → amber `#F59E0B` (icon `account-hard-hat`, amber @15%).
- Each demo card: Level-1 card, role icon container left, role title + masked email, role-colored left accent bar (§10.7).
- **Form section separation:** EZAxis logo block (centered, top), then a Level-1 form card containing fields; primary full-width Login button (height 52); "Forgot Password?" link in primary; demo-account section under a decorated section header "Quick sign-in (demo)".
- Background: light `background` with a subtle primary-tint radial at top; dark mode mirrors with `primaryDark` glow.
