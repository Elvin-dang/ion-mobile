# I-ON CMMS — WBS Analysis (Mobile-Focused)

**Document type:** Work Breakdown Structure Analysis
**System:** I-ON / EZAxis — Facility & Asset Maintenance Management System (CMMS)
**Prepared by:** Senior Business Analyst
**Date:** 2026-06-17
**Primary scope of this analysis:** The three mobile applications (Modules 4, 6, 7). Web platforms are summarized for context only.

---

## 1. Executive Overview

I-ON is a Computerized Maintenance Management System (CMMS) for facility/asset maintenance. It spans **seven platform sections** delivered across web and mobile clients. The mobile build covers **three native (Android & iOS) applications**, each tailored to one role in the maintenance lifecycle:

| Mobile App | Module | Primary Role | Core Purpose |
|------------|--------|--------------|--------------|
| Building Manager App | 4 | Building Manager (BM) | Approve/decline requests, sign off & close completed work orders, monitor assets (read-only) |
| MSP Supervisor App | 6 | MSP Supervisor | Create ad-hoc WOs in the field, assign technicians, review technician requests & completions, request spare parts |
| MSP Technician App | 7 | MSP Technician | Execute work orders (checklists, photos, parts, sign-off), create ad-hoc requests, scan QR codes, offline reference |

The end-to-end maintenance workflow flows through all three apps and the web portals: **Tenant/Supervisor/Technician creates a request → BM approves → Supervisor assigns Technician → Technician executes & signs off → Supervisor reviews & signs off → BM final sign-off & close.**

### Work Order Status Model (shared across all apps)
- **Preparation:** Draft
- **New:** Technician Request / Tenant Request / Service Request Accepted / Pending
- **Pending:** Unassigned (approved, ready to assign)
- **In Progress:** Assigned / Started
- **Review:** Completed (Supervisor signs off)
- **Approval:** Verified (BM signs off to close)
- **Finalized:** Closed / Cancelled
- **Rejection:** Ad-hoc Declined / Approval Rejected / Completion Rejected / Verification Rejected

---

## 2. System-Wide Task & Deliverable Overview

### 2.1 Platform sections (7 total)

| # | Platform Section | Module(s) | In Mobile Scope? | Feature Count (approx) |
|---|------------------|-----------|------------------|------------------------|
| 1 | Web — Admin CMS (Super Admin) | 1 | No (summary only) | 75 |
| 2 | Web — Tenant Public Portal | 2 | No (summary only) | 1 |
| 3 | Web — Building Manager Portal | 3 | No (summary only) | 59 |
| 4 | **Mobile — Building Manager App** | **4** | **Yes** | **20** |
| 5 | Web — MSP Supervisor Portal | 5 | No (summary only) | 27 |
| 6 | **Mobile — MSP Supervisor App** | **6** | **Yes** | **16** |
| 7 | **Mobile — MSP Technician App** | **7** | **Yes** | **23** |

**Total mobile features documented in detail below: 59.**

### 2.2 Brief summary of out-of-scope (Web) deliverables

These are summarized only; the per-feature detail in Section 4 is reserved for mobile.

- **Module 1 — Web Admin CMS (Super Admin):** The system's configuration backbone. Includes Authentication, Building/Floor/Area management, Asset taxonomy (Systems/Sub-systems/Types), full Asset CRUD + drawings + tags, Spare Part/Inventory (IMS) management, User & User Group management, and global settings. This is where all master data and scope definitions (buildings + asset systems per User Group) originate. **Mobile apps consume this data read-only or via status transitions only.**
- **Module 2 — Web Tenant Public Portal:** Single public-facing entry point for tenants to submit service requests (the origin of "Tenant Request" status). No mobile equivalent.
- **Module 3 — Web Building Manager Portal:** Full-featured BM workspace — dashboards with charts (Gantt/Trend), full Asset/Spare Part management, complete Request and Work Order management with Create/Edit/Deactivate, and Maintenance Plan approval. The **mobile BM app is a deliberately reduced subset**: status-transition actions + read-only monitoring only.
- **Module 5 — Web MSP Supervisor Portal:** Full Supervisor workspace including Maintenance Plan creation/management (web-only), full WO/request management, and team management. The **mobile Supervisor app** carries field-operation actions (create ad-hoc WO, assign, review) but not plan management.

> **Scope boundary rule (confirmed across mobile specs):** Create / Edit / Deactivate of master records, complex charts (Gantt, Trend), drawing tag editing, and Maintenance Plan management are **web-only**. Mobile is limited to **status-transition actions + read-only views**, with two confirmed field exceptions: Supervisor & Technician can **Create Ad-hoc Work Orders** on mobile.

---

## 3. Task Breakdown by Phase / Module (Mobile)

### 3.1 Module 4 — Building Manager App (20 features)
- **4.1 Authentication & Dashboard (6):** Login, Logout, Forgot Password, Multi-Language Switch, Dashboard, Account Settings
- **4.2 Asset Management — Read-only (4):** View Asset List, View Asset Detail, View Asset Tags on Drawing, View Spare Part List
- **4.3 Request Management (5):** View Request Detail, Approve Request, Decline/Reject Request, Accept Tenant Request, Assign Request to MSP Supervisor
- **4.4 Work Order Management (4):** View WO List, View WO Detail, Approve Completed WO (Sign Off & Close), Reject Completed WO
- **4.5 Push Notification (1):** Receive Push Notification

### 3.2 Module 6 — MSP Supervisor App (16 features)
- **6.1 Authentication & Dashboard (5):** Login, Logout, Forgot Password, Multi-Language Switch, Dashboard
- **6.2 Work Order & Request Management (7):** Create Ad-hoc WO, View Request & WO List, View WO Detail, Review & Approve/Decline Technician Ad-hoc Request, Assign WO to Technician, Spare Parts Request, WO Completion Review & Sign-off
- **6.3 Asset & Inventory — Read-only (3):** View Asset List, View Asset Detail, View Spare Part List
- **6.4 Push Notification (1):** Receive Push Notification

### 3.3 Module 7 — MSP Technician App (23 features)
- **7.1 Authentication & Dashboard (6):** Login, Logout, Forgot Password, Multi-Language Switch, Dashboard, Offline Mode
- **7.2 Work Order Execution (11):** Create Ad-hoc WO, View Ad-hoc Request List, View Assigned WO List, View WO Detail, Start WO Execution, Complete Work Checklist Items, Upload Execution Photos, Record Part Replacement, Create Spare Parts Request, Technician Sign-off, Resubmit WO
- **7.3 Asset — Read-only (5):** View Asset List, View Asset Detail, Scan Asset QR Code, View Asset Tags on Drawing, View Spare Part List
- **7.4 Push Notification (1):** Receive Push Notification

### 3.4 Recommended delivery phasing
1. **Phase A — Foundation (shared):** Auth flows (Login/Logout/Forgot Password), Multi-Language, secure storage (Keychain/Keystore), API/session layer, FCM push registration, design system & navigation shell. Reused across all 3 apps.
2. **Phase B — Technician execution core (Module 7):** The most complex app and the source of all execution data. WO list/detail, Start, Checklist, Photo upload, Part Replacement, Sign-off, Offline Mode, QR scan.
3. **Phase C — Supervisor orchestration (Module 6):** Create ad-hoc, Assign, Review/Approve/Decline, Completion Review & Sign-off, Spare Parts Request.
4. **Phase D — Building Manager approvals (Module 4):** Request approvals, WO Sign Off & Close, read-only monitoring.
5. **Phase E — Cross-cutting:** Push notifications wiring per app, dashboards, read-only asset/inventory views, hardening, offline edge cases.

---

## 4. Structured Per-Feature Specification (ALL 59 Mobile Features)

> Conventions: "Req." = Required. Validation/error text is quoted verbatim from the source. Where a field is a display-only element, Type = Display. Recurring shared flows (Auth) are documented per app where the spec differs (scope, error wording).

---

## Module 4 (Building Manager App) > Login (ID: 4.1.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| EZAxis logo | Display | — | — | Image (centered top) |
| Email | text (email keyboard) | Yes | Valid email format; max 100 chars; whitespace trimmed | TextField |
| Password | password (masked) | Yes | Min 8 chars | TextField + show/hide toggle |
| Forgot Password? | link | — | — | Hyperlink → 4.1.3 |
| Login | button | — | — | Primary Button (full-width) |
| Loading indicator | Display | — | — | Spinner |

### User Flow
1. App opens. System checks for stored session token on device.
   - If valid token found: navigates directly to Dashboard (4.1.5); flow ends.
   - Else (no/expired token): renders Login screen.
2. BM enters email and password → taps [Login]. Keyboard dismisses; spinner shown.
3. System validates fields:
   - If Email empty: inline error "Email is required." → does NOT authenticate.
   - If Password empty: inline error "Password is required." → does NOT authenticate.
   - If Email format invalid: inline error "Please enter a valid email address."
4. System checks failed-attempt counter:
   - If ≥ 5 consecutive failures within 15 min: error toast "Too many failed attempts. Please try again in 15 minutes."
5. System queries backend:
   - If email not found or role ≠ Building Manager: error toast "Invalid email or password." → increments counter.
   - If Account Status = Inactive: error "Your account is not active. Please contact the administrator."
   - If Account Status = Pending: error "Your account is not yet activated. Please check your email for the invitation link."
   - If password mismatch: error toast "Invalid email or password." → increments counter.
   - Else (all valid): session token stored securely (Keychain/Keystore); counter reset to 0; last-login timestamp updated; navigates to Dashboard (4.1.5) scoped to BM's assigned buildings.
- Edge: Network unavailable → "No internet connection. Please check your network and try again."
- Edge: Offline with valid cached session → opens last cached state; else "You are offline. Please connect to log in."
- Edge: BM has no assigned buildings → login succeeds; Dashboard shows "No buildings assigned to your account. Please contact the administrator."

---

## Module 4 (Building Manager App) > Logout (ID: 4.1.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Sign out | menu item | — | — | Menu item (Profile/More) |
| Confirm message | Display | — | — | Alert text: "Are you sure you want to sign out?" |
| Sign out | button | — | — | Button (destructive) |
| Cancel | button | — | — | Button (default) |

### User Flow
1. BM taps Profile/More icon in bottom navigation.
2. Profile/Settings opens. BM taps [Sign out].
3. Native OS alert: Title "Sign Out"; Message "Are you sure you want to sign out?"; Buttons [Sign out] (destructive) | [Cancel].
   - If [Sign out]: session token invalidated server-side; token removed from secure storage; cached data cleared; navigates to Login (4.1.1).
   - If [Cancel]: alert dismisses; BM remains authenticated.
- Edge: Network unavailable → local token removed and navigate to Login; server invalidation queued/retried.
- Edge: Session expires in background → next API call returns 401 → clears token → Login with "Your session has expired. Please log in again."

---

## Module 4 (Building Manager App) > Forgot Password (ID: 4.1.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Email (Screen 1) | text (email keyboard) | Yes | Valid email format | TextField |
| Continue | button | — | — | Primary Button (full-width) |
| Back to Login | link | — | — | Hyperlink → 4.1.1 |
| OTP Code (Screen 2) | text (numeric keyboard) | Yes | Exactly 6 digits; 10-min validity (assumed) | TextField (large) |
| Resend Code | link | — | Active after 60s; countdown timer | Hyperlink |
| New Password | password (masked) | Yes | Min 8 chars | TextField + show/hide |
| Confirm New Password | password (masked) | Yes | Must match New Password | TextField + show/hide |
| Reset Password | button | — | — | Primary Button (full-width) |

### User Flow
**Screen 1 — Enter Email**
1. BM taps [Forgot Password?] on Login → Screen 1 loads.
2. BM enters email → taps [Continue]:
   - If empty: error "Email is required."
   - If format invalid: error "Please enter a valid email address."
   - If email not found: error "No account found with this email address."
   - If account Inactive: error "Your account is not active. Please contact the administrator."
   - If network unavailable: error "No internet connection. Please check your network and try again."
   - Else (valid): OTP sent via AWS SES/SendGrid → navigates to Screen 2.
3. [Back to Login] → Login (4.1.1); no OTP sent.

**Screen 2 — Enter OTP & New Password**
4. Screen shows masked email OTP was sent to.
5. BM enters OTP / New Password / Confirm → taps [Reset Password]:
   - If OTP empty: error "Please enter the verification code."
   - If OTP wrong format: error "Verification code must be 6 digits."
   - If OTP incorrect: error "Invalid verification code. Please try again." (after 5 wrong attempts → OTP invalidated → restart from Screen 1.)
   - If OTP expired (>10 min): error "This code has expired. Please request a new one." → returns to Screen 1.
   - If password < 8: error "Password must be at least 8 characters."
   - If confirm mismatch: error "Passwords do not match."
   - If network unavailable: error "No internet connection."
   - Else (valid): password updated; all active sessions invalidated; navigates to Login; toast "Password reset successfully. Please log in with your new password."
6. [Resend Code] (active after 60s): new OTP sent; previous invalidated; countdown resets.
- Edge: Email delivery fails → "Failed to send verification code. Please try again later."

---

## Module 4 (Building Manager App) > Multi-Language Switch (ID: 4.1.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Language | select | — | Options: English (EN) / Tiếng Việt (VI) | Selection list / toggle |

### User Flow
1. BM navigates to Profile → Settings → Language.
2. Current language highlighted in a selection list.
3. BM taps alternate language (EN or VI):
   - App immediately re-renders all UI text without restart.
   - Data content (asset names, descriptions) NOT translated.
   - System saves preference to BM's account via API.
   - If save succeeds: preference persists across sessions and devices (web reflects too).
   - If save fails (network): UI shows new language for current session only → toast "Failed to save language preference. The change will apply to this session only." → reverts on next login.
- Edge: Switch while a form is open → field values preserved; labels/placeholders update.
- Edge: Switch while offline → local change; server sync fails; reverts next login.

---

## Module 4 (Building Manager App) > Dashboard (ID: 4.1.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Building selector | select | — | BM's assigned buildings only; hidden if only 1 | Dropdown/Picker |
| KPI cards | Display (tappable) | — | Total Requests / Pending Approval / In Progress WOs / Completed WOs / Closed WOs | Card (large tap target) |
| Recent Activity list | Display | — | Latest 5–10 events | List |
| Bottom navigation | nav | — | Home / Requests / Work Orders / Assets / More | Tab bar |

### User Flow
1. App opens to Dashboard with defaults: Building = first assigned building; Date Range = last 30 days.
2. System fetches and renders:
   - KPI cards (tappable): Total Requests / Pending Approval / In Progress WOs / Completed WOs / Closed WOs. Each shows count (bold) + label.
   - Recent Activity: latest 5–10 events; each with icon / description / timestamp / status badge; "See all" → full filtered list.
   - Note: no complex charts on mobile (Gantt/Trend are web-only).
3. BM taps Building selector → only assigned buildings shown → KPI cards re-fetch scoped to selected building.
4. BM taps a KPI card:
   - If "Pending Approval": navigates to Request List filtered to Pending.
   - If "In Progress WOs": navigates to WO List filtered to Assigned + Started (4.4.1).
   - If "Closed WOs": navigates to WO List filtered to Closed (4.4.1).
5. BM taps a Recent Activity item → relevant Request or WO Detail.
6. Pull-to-refresh → re-fetches all data.
7. Empty states: "No recent activity." / "No buildings assigned. Please contact the administrator."
- Edge: Only 1 building → selector hidden (fixed). API timeout per section → "Failed to load. Tap to retry." Offline → cached data with banner "Showing cached data. Pull to refresh when online."

---

## Module 4 (Building Manager App) > Account Settings (ID: 4.1.6)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Avatar | image upload | No | JPG/PNG only; max 2 MB | Circular display, tap to change (camera/gallery) |
| Full Name | text | Yes | Pre-filled; max 100 chars | TextField |
| Phone Number | text (phone keyboard) | No | Pre-filled | TextField |
| Save (Personal Info) | button | — | — | Primary Button (full-width) |
| Current Password | password (masked) | Yes | — | TextField + show/hide |
| New Password | password (masked) | Yes | Min 8 chars | TextField + show/hide |
| Confirm New Password | password (masked) | Yes | Must match New Password | TextField + show/hide |
| Save (Change Password) | button | — | — | Primary Button (full-width) |

### User Flow
**Update Profile**
1. BM navigates to Profile → Account Settings.
2. Modifies Full Name, Phone, or Avatar (tap avatar → "Take Photo" / "Choose from Library").
3. Taps [Save]:
   - If Full Name empty: error "Full name is required."
   - If Full Name > 100 chars: error "Full name must not exceed 100 characters."
   - If avatar invalid type: error "Only JPG and PNG files are accepted." If too large: error "File size must not exceed 2 MB."
   - If network unavailable: error "No internet connection. Please try again."
   - Else (valid): profile updated; avatar updates in header immediately; toast "Profile updated successfully."
4. [Cancel] → back, no change.

**Change Password**
5. BM navigates to Change Password section.
6. Enters Current / New / Confirm (masked, show/hide).
7. Taps [Save]:
   - If Current Password empty: error "Current password is required."
   - If Current Password incorrect: error "Current password is incorrect."
   - If New Password < 8: error "Password must be at least 8 characters."
   - If confirm mismatch: error "Passwords do not match."
   - If network unavailable: error "No internet connection. Please try again."
   - Else (valid): password updated; all other sessions invalidated; current session stays active; toast "Password changed successfully."
- Edge: Camera/gallery permission denied → "Camera permission is required to take a photo. Please enable it in your device settings." Network error → "Failed to update. Please try again." (no partial save).

---

## Module 4 (Building Manager App) > View Asset List — Read-only (ID: 4.2.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by name or code" | TextField |
| Filter: Building | select | No | BM's assigned buildings only | Dropdown |
| Filter: Asset System | select | No | All Systems | Dropdown |
| Filter: Status | select | No | All / Active / Inactive | Dropdown |
| Asset list item | Display | — | Asset Code / Name / System / Location / Status badge | List row → 4.2.2 |

### User Flow
1. BM navigates to Assets in bottom navigation.
2. System loads asset list scoped to BM's assigned buildings (defaults All Systems / All Status).
3. List items: Asset Code / Name / System / Location (Floor/Area) / Status badge.
4. BM taps search bar → types name/code → list filters in real time.
5. BM taps filter icon → panel (Building / Asset System / Status); [Apply] updates; [Reset] clears.
6. BM taps an asset → Asset Detail (4.2.2).
7. Pull-to-refresh → refreshes; scroll to bottom → loads next page (pagination).
8. Empty state: "No assets found." No create/edit/deactivate (read-only).
- Edge: Network unavailable → cached list with banner "Showing cached data." No cache → "Failed to load assets. Please check your connection and try again."

---

## Module 4 (Building Manager App) > View Asset Detail — Read-only (ID: 4.2.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Asset Name | Display | — | Large bold title | Header |
| QR Code | Display | — | Tap to zoom | Image |
| Status badge | Display | — | Active / Inactive | Badge |
| Classification | Display | — | Asset System / Sub-system / Type | Section |
| Location | Display | — | Building / Floor / Area-Unit | Section |
| Asset Details | Display | — | Code / Model / Serial / Brand / Purchase Date / Status | Section |
| Maintenance History | Display | — | WO ID / Plan Name / Round / Completed Date / Technician / Status | List → WO Detail |
| Pending WOs | Display | — | WO ID / Type / Status | List → WO Detail |

### User Flow
1. BM taps asset from list → Asset Detail loads.
2. Renders header (Name/Code/Status), QR code (tap to zoom full-screen), Classification, Location, Asset Details sections.
3. Maintenance History list: WO ID / Plan Name / Round / Completed Date / Technician / Status; tap WO ID → WO Detail (4.4.2); empty "No maintenance history."
4. Pending WOs list: WO ID / Type / Status / Assigned Date; tap → WO Detail (4.4.2); empty "No pending work orders."
5. No Edit/Deactivate buttons (read-only).
6. BM taps QR → full-screen zoom; tap to dismiss.
- Edge: 50+ WOs → history paginated with "Load more." Load fail → "Failed to load asset details. Please go back and try again." Offline → cached detail with banner.

---

## Module 4 (Building Manager App) > View Asset Tags on Drawing — Read-only (ID: 4.2.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Building selector | select | — | BM's assigned buildings only | Picker |
| PDF viewer | Display | — | pdfjs-dist; pan + zoom (touch) | PDF Viewer |
| Tag pins | Display | — | Read-only at saved coordinates | Map pins |
| Tag popup | Display | — | Asset Name / Code / Type / System / Status / Last Maintenance | Bottom sheet/overlay |
| View Asset Detail | button | — | — | Button → 4.2.2 |

### User Flow
1. BM navigates to Assets → Drawing.
2. BM selects Building from picker (assigned buildings only).
3. System loads drawing:
   - If no drawing: "No drawing uploaded for this building. Upload via the web portal."
   - Else: PDF renders in viewer.
4. BM interacts: pinch zoom, drag pan; tag pins at saved coordinates.
5. BM taps a tag pin → popup: Asset Name / Code / Type / System / Status / Last Maintenance Date; [View Asset Detail] → 4.2.2; [X]/drag down to dismiss.
6. No [Edit Tags] (read-only).
- Edge: Large PDF (50MB) loads progressively. Dense pins → zoom to tap. Load fail → "Failed to load drawing. Please try again." Inactive asset pin → popup shows Inactive badge; detail still works.

---

## Module 4 (Building Manager App) > View Spare Part List — Read-only (ID: 4.2.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by name or code" | TextField |
| Filter: Status | select | No | All / Active / Inactive | Dropdown |
| Spare part list item | Display | — | Code / Name / Asset System / Available Stock / Total Stock / Status | List row → detail |

### User Flow
1. BM navigates to Inventories in bottom navigation.
2. System loads spare parts scoped to BM's assigned buildings.
3. List items: Code / Name / Asset System / Available Stock (highlighted) / Total Stock / Status badge.
4. BM searches by name/code → real-time filter.
5. BM taps filter → Status (All / Active / Inactive).
6. BM taps a spare part → read-only detail: stock counters Total/Available/On-Hold (large), stock history log (last 10, Load more); no edit.
7. Pull-to-refresh → refreshes stock levels.
8. Empty state: "No spare parts found." No create/edit/deactivate.
- Edge: Available = 0 → highlighted red. Network unavailable → cached list with banner.

---

## Module 4 (Building Manager App) > View Request Detail (ID: 4.3.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Request ID / Type badge / Status badge | Display | — | — | Header |
| Location & Asset | Display | — | Building / Floor / Area-Unit / System / Type / Asset | Section |
| Issue description | Display | — | Expandable ([Show more] if long) | Section |
| Attachments | Display | — | Photos/files; tap photo → full-screen swipe; tap PDF → open | Media gallery |
| History log | Display | — | Event entries with timestamps; [Show all history] | Section |
| [Accept] / [Decline] | button | — | Shown if status = Tenant Request | Buttons (full-width) |
| [Approve] / [Reject] | button | — | Shown if status = Pending (Ad-hoc WO) | Buttons (full-width) |
| [Assign to Supervisor] | button | — | Shown if status = Service Request Accepted | Button (full-width) |

### User Flow
1. BM taps request from notification or Request section → Request Detail loads.
2. System renders all sections per request type and current status.
3. BM taps photo attachment → full-screen viewer with swipe.
4. BM taps [Show all history] → full timeline expands inline.
5. For Tenant Requests (status = Tenant Request): [Accept] / [Decline] shown.
   - If [Accept]: → Accept flow (4.3.5). If [Decline]: → Decline flow (4.3.4).
6. For Ad-hoc WO (status = Pending): [Approve] / [Reject] shown.
   - If [Approve]: → Approve flow (4.3.3). If [Reject]: → Reject flow (4.3.4).
7. For Service Request Accepted: [Assign to Supervisor] shown → Assign flow (4.3.6); label "Forwarded to Supervisor for review. You can assign a specific Supervisor."
8. For terminal/other statuses (Cancelled, Approval Rejected, Ad-hoc Declined): no action buttons; read-only.
- Edge: Status changed on web concurrently → on action tap "This request has already been processed. Please refresh." Large description truncated at 3 lines with [Show more]. No attachments → section hidden. Offline → cached detail; action buttons disabled.

---

## Module 4 (Building Manager App) > Approve Request (ID: 4.3.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Approve | button | — | At bottom of Request Detail (status = Pending) | Primary Button |
| Confirm message | Display | — | "Approve this work order? It will be available for the MSP Supervisor to assign." | Alert |
| Approve / Cancel | button | — | — | Confirm / Default buttons |

### User Flow
1. BM views Request Detail (4.3.2) for a Pending Ad-hoc WO request.
2. BM reviews details and attachments.
3. BM taps [Approve].
4. Native alert: "Approve this work order? It will be available for the MSP Supervisor to assign." [Approve] | [Cancel].
5. BM taps [Approve]:
   - If network unavailable: error toast "No internet connection. Please try again."
   - If status already changed: error toast "This request has already been processed. Please refresh."
   - Else (valid): status → Pending - Unassigned; MSP Supervisor notified (FCM + email): "Work Order [ID] has been approved and is ready for assignment."; history updated; toast "Work order approved."; buttons disappear; badge updates to "Pending - Unassigned."
6. BM taps [Cancel] → alert dismisses, no change.
- Edge: Already approved on web → stale status error. Timeout (max 15s spinner) → "Request timed out. Please try again."

---

## Module 4 (Building Manager App) > Decline / Reject Request (ID: 4.3.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Decline] / [Reject] | button | — | Decline for Tenant; Reject for Ad-hoc WO | Secondary Button |
| Reason | textarea | Yes | Max 500 chars; "Reason is required." if empty | TextArea (char counter) |
| Confirm | button | — | Destructive style | Button |
| Cancel | button | — | — | Button |

### User Flow
1. BM views Request Detail (4.3.2).
2. BM taps [Decline] (Tenant Requests) or [Reject] (Ad-hoc WOs).
3. Bottom sheet slides up; title "Decline Request" or "Reject Work Order"; Reason textarea (required), keyboard auto-opens; char counter (max 500); [Confirm] (destructive, red) | [Cancel].
4. BM enters reason → taps [Confirm]:
   - If reason empty: inline error "Reason is required." → does NOT proceed.
   - If network unavailable: error toast "No internet connection."
   - If status already changed: error toast "This request has already been processed. Please refresh."
   - If Tenant Request: status → Cancelled (terminal); email to Tenant "Your service request [ID] has been declined. Reason: [reason]."; toast "Request declined."
   - If Ad-hoc WO: status → Approval Rejected; Supervisor notified (FCM + email) "Work Order [ID] has been rejected. Reason: [reason]."; toast "Work order rejected."
   - Buttons disappear; badge updates.
5. BM taps [Cancel] / drags sheet down → dismisses, no change.
- Edge: Keyboard covers sheet → sheet scrolls up. Timeout → status not changed.

---

## Module 4 (Building Manager App) > Accept Tenant Request (ID: 4.3.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Accept | button | — | At bottom of Tenant Request Detail | Primary Button |
| Confirm message | Display | — | "Accept this service request? It will be forwarded to the MSP Supervisor for review." | Alert |
| Accept / Cancel | button | — | — | Confirm / Default buttons |

### User Flow
1. BM views Request Detail (4.3.2) for a Tenant Request.
2. BM reviews issue description and attachments.
3. BM taps [Accept].
4. Native alert: "Accept this service request? It will be forwarded to the MSP Supervisor for review." [Accept] | [Cancel].
5. BM taps [Accept]:
   - If network unavailable: error toast "No internet connection."
   - If status already changed: error toast "This request has already been processed. Please refresh."
   - Else (valid): status → Service Request Accepted; Supervisor(s) notified (FCM + email) "A new tenant service request requires your review. Request ID: [ID]."; Tenant email "Your service request [ID] has been accepted and is under review."; history updated; toast "Service request accepted."; [Assign to Supervisor] appears.
6. BM taps [Cancel] → no change.
- Edge: No active Supervisors → acceptance still succeeds. Tenant email fails → acceptance recorded; email retried server-side.

---

## Module 4 (Building Manager App) > Assign Request to MSP Supervisor (ID: 4.3.6)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Assign to Supervisor] | button | — | Shown when status = Service Request Accepted | Primary Button |
| Search | text | No | — | TextField (top of list) |
| Supervisor list item | select (radio) | Yes (to assign) | One must be selected to enable Assign | Single-select list (Name/User Group/Buildings) |
| Assign | button | — | Enabled only when a supervisor is selected | Primary Button |
| Cancel | button | — | — | Default Button |

### User Flow
1. BM views Request Detail; [Assign to Supervisor] shown.
2. BM taps [Assign to Supervisor].
3. Bottom sheet slides up: search bar; each item Supervisor name / User Group / building pills; single selection.
4. BM searches/scrolls → taps to select.
5. BM taps [Assign]:
   - If no Supervisor selected: [Assign] disabled (cannot tap).
   - If network unavailable: error toast "No internet connection."
   - Else (valid): Supervisor assigned as reviewer; Supervisor notified (FCM + email) "A tenant service request has been assigned to you. Request ID: [ID]."; history updated; toast "Request assigned to [Supervisor Name]."; sheet closes; detail refreshes.
6. BM taps [Cancel] / drags down → dismisses, no change.
- Edge: No active Supervisors → "No active MSP Supervisors available for your buildings." → [Assign] disabled. List load fail → "Failed to load supervisors. Please try again."

---

## Module 4 (Building Manager App) > View Work Order List (ID: 4.4.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by ID or asset name" | TextField |
| Filter: Building | select | No | BM's assigned buildings only | Dropdown |
| Filter: Status | select | No | All / Pending / Pending-Unassigned / Assigned / Started / Completed / Verified / Closed / Cancelled | Dropdown |
| Filter: WO Type | select | No | All / Maintenance Scheduling / Ad-hoc Work / Service Request | Dropdown |
| Filter: Date Range | date range | No | — | Date range picker |
| WO list item | Display | — | WO ID / Type badge / Asset Code / Location / Due Date (overdue red) / Status | List row → 4.4.2 |

### User Flow
1. BM navigates to Work Orders in bottom navigation.
2. System loads WOs for BM's buildings (sorted created-date desc; default all statuses, last 30 days).
3. List items: WO ID / Type badge / Asset Code / Location / Due Date (red if overdue) / Status badge.
4. BM searches by WO ID or Asset Code.
5. BM taps filter icon → Building / Status / WO Type / Date Range; [Apply] / [Reset].
6. BM taps a WO → WO Detail (4.4.2).
7. Pull-to-refresh → refreshes; infinite scroll → next page.
8. Overdue indicator: red Due Date + overdue label.
9. Empty state: "No work orders found for the selected filters."
- Edge: Arriving from Dashboard KPI → list pre-filtered. Offline → cached list with banner. Fresh load fail → error with retry.

---

## Module 4 (Building Manager App) > View Work Order Detail (ID: 4.4.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Header | Display | — | Asset Code · Work Type / WO ID / Type badge / Created date | Header |
| 5-stage progress bar | Display | — | New → Pending → In Progress → Review → Approval | Stepper |
| Overview | Display | — | Start/End Time (overdue) / Time Required / Location / Asset Code/Type/Sub-system/System | Section |
| Tab: Details | Display | — | Description / Photos (tap full-size) / Remark | Tab (read-only) |
| Tab: Execution | Display | — | Technician cards / Work Checklist (N/total) / Part Replacement | Tab (read-only) |
| History log | Display | — | Recent 5 entries; [Show all] | Section |
| [Sign Off & Close] | button | — | Visible only when status = Verified | Primary Button (full-width) |
| [Reject] | button | — | Visible only when status = Verified | Secondary Button (full-width) |

### User Flow
1. BM taps WO from list or notification → WO Detail loads.
2. Renders header, 5-stage progress bar (active stage highlighted with label), Overview (scrollable).
3. Swipeable tabs:
   - Details (read-only): Description / Photos (tap → full-screen swipe) / Remark.
   - Execution: Main Technician card (Name / Phone tap-to-call / Level); Sub Technician cards; Work Checklist (N/total, each expandable: Description filled / Photos); Part Replacement (Source / Name / Code / Quantity); Maintenance Plan ref (if Maintenance WO); Tenant contact (if Service Request); History log (last 5, [Show all]).
4. Action buttons fixed at bottom, outside scroll:
   - If status = Verified: [Sign Off & Close] (primary) + [Reject] (secondary, stacked).
   - Else: no action buttons.
5. BM taps phone number in Technician card → native phone call.
- Edge: Concurrent status change → on action tap "Work order status has changed. Please refresh." Slow tab → spinner. Load fail → "Failed to load work order details. Please go back and try again."

---

## Module 4 (Building Manager App) > Approve Completed Work Order — Sign Off & Close (ID: 4.4.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Sign Off & Close] | button | — | At bottom of WO Detail (status = Verified) | Primary Button (full-width) |
| Confirm message | Display | — | "Sign off and close Work Order [WO ID]? This action cannot be undone." | Alert |
| Sign Off & Close / Cancel | button | — | Destructive/Confirm vs Default | Buttons |

### User Flow
1. BM opens WO Detail (4.4.2) for a Verified WO.
2. BM carefully reviews: checklist completion & items; photos per item (tap full-screen); part replacement; sign-off records (Technician + Building Technician + Tenant if applicable).
3. BM taps [Sign Off & Close] at bottom.
4. Native alert: Title "Sign Off & Close"; Message "Sign off and close Work Order [WO ID]? This action cannot be undone."; [Sign Off & Close] (destructive) | [Cancel].
5. BM taps [Sign Off & Close]:
   - If network unavailable: error toast "No internet connection. Please try again."
   - If status changed concurrently: error toast "Work order status has changed. Please refresh."
   - Else (valid): BM sign-off recorded (timestamp + name); WO status → Closed (TERMINAL); no further actions; Supervisor push "Work Order [ID] has been closed by Building Manager."; Technician push "Work Order [ID] has been closed."; if Service Request → Tenant email "Your service request [ID] has been completed and closed."; history updated; buttons removed; toast "Work order closed successfully."
6. BM taps [Cancel] → WO remains Verified.
- Edge: Concurrent sign-off from web → first wins; second gets stale status. Timeout → status not changed; can retry.

---

## Module 4 (Building Manager App) > Reject Completed Work Order (ID: 4.4.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Reject] | button | — | At bottom of WO Detail (status = Verified) | Secondary Button (full-width) |
| Rejection Reason | textarea | Yes | Max 500 chars; "Rejection reason is required." if empty | TextArea (char counter, red at 480) |
| Reject / Cancel | button | — | Destructive vs Default | Buttons |

### User Flow
1. BM opens WO Detail (4.4.2) for a Verified WO.
2. BM identifies an issue with the work/documentation.
3. BM taps [Reject] at bottom.
4. Bottom sheet slides up: Title "Reject Work Order"; Message "Provide a reason for rejection. The MSP Supervisor will be notified."; Rejection Reason textarea (required), keyboard auto-opens; char counter (max 500); [Reject] (destructive, red) | [Cancel].
5. BM enters reason → taps [Reject]:
   - If reason empty: inline error "Rejection reason is required." → does NOT proceed.
   - If network unavailable: error toast "No internet connection."
   - If status changed concurrently: error toast "Work order status has changed. Please refresh."
   - Else (valid): status → Verification Rejected; Supervisor push + email "Work Order [ID] rejected by Building Manager. Reason: [reason]. Please review and resubmit."; Technician NOT directly notified; history "Rejected by [BM Name]. Reason: [reason] at [timestamp]."; toast "Work order returned to Supervisor."; buttons removed; badge updates.
6. BM taps [Cancel] / drags down → dismisses, no change.
- Edge: Concurrent rejection prevented by stale-status detection. Char counter turns red at 480.

---

## Module 4 (Building Manager App) > Receive Push Notification (ID: 4.5.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Push notification | Display | — | Title / Body / deep-link action | OS notification (FCM) |
| In-app badge | Display | — | Unread count | Bell icon badge |
| Notification list item | Display | — | icon / title / description / timestamp / read indicator | List row → relevant screen |

### User Flow (system-triggered process)
1. System event occurs that triggers a BM notification.
2. Backend sends payload to Firebase Cloud Messaging (FCM).
3. FCM routes to all registered BM devices.
   - If device online: delivered immediately.
   - If offline: FCM queues; delivers when online (may expire after 28 days).
4. Trigger events & content:
   - New Tenant Request: Title "New Service Request"; opens Request Detail.
   - New Ad-hoc WO pending approval: Title "Work Order Awaiting Approval"; opens Request Detail.
   - WO Verified (ready for sign-off): Title "Work Order Ready for Sign-off"; opens WO Detail.
   - Spare part request awaiting approval: Title "Spare Part Request"; opens WO Detail (spare parts tab).
   - Low-stock alert: Title "Low Stock Alert"; opens Spare Part Detail.
   - Maintenance Plan submitted: Title "Maintenance Plan Pending Approval"; opens Plan Detail.
5. In-app handling: foreground → in-app banner (auto-dismiss 4s); background → system tray + badge increment; closed → OS notification + cold start.
6. BM taps notification → app opens/foregrounds → navigates to relevant detail → marked read → badge decrements.
7. Permissions: first install requests permission; if denied → in-app prompt to enable in device settings.
- Edge: FCM token expires/reinstall → refreshed on next app open. Already-processed item → shows current status. Offline batch delivered on reconnect. Logout → token unregistered.

---

## Module 6 (MSP Supervisor App) > Login (ID: 6.1.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| EZAxis logo | Display | — | — | Image |
| Email | text (email keyboard) | Yes | Valid email; max 100 chars; trimmed | TextField |
| Password | password (masked) | Yes | Min 8 chars | TextField + show/hide |
| Forgot Password? | link | — | — | Hyperlink → 6.1.3 |
| Login | button | — | — | Primary Button (full-width) |

### User Flow
1. App opens. System checks stored session token.
   - If valid: navigates to Dashboard (6.1.5) scoped to User Group; flow ends.
   - Else: renders Login.
2. Supervisor enters email/password → taps [Login]; spinner shown.
3. Field validation:
   - If Email empty: inline "Email is required." If Password empty: "Password is required." If format invalid: "Please enter a valid email address."
4. If ≥ 5 failures within 15 min: error toast "Too many failed attempts. Please try again in 15 minutes."
5. Backend query:
   - If email not found or role ≠ MSP Supervisor: error toast "Invalid email or password." → increments counter.
   - If Account Inactive: "Your account is not active. Please contact the administrator."
   - If account has no User Group: "Your account has no scope assigned. Please contact the administrator."
   - If Account Status = Pending: "Your account is not yet activated. Please check your email for the invitation link."
   - If password mismatch: "Invalid email or password." → increments counter.
   - Else (valid): token stored (Keychain/Keystore); counter reset; last-login updated; navigates to Dashboard (6.1.5) scoped to User Group.
- Edge: Network unavailable → "No internet connection. Please check your network and try again." Token expired server-side → "Your session has expired. Please log in again." User Group deactivated after login → session continues but scoped data empty.

---

## Module 6 (MSP Supervisor App) > Logout (ID: 6.1.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Sign out | menu item | — | — | Menu item |
| Confirm message | Display | — | "Are you sure you want to sign out?" | Alert |
| Sign out / Cancel | button | — | Destructive vs Default | Buttons |

### User Flow
1. Supervisor taps Profile/More in bottom navigation.
2. Profile/Settings opens. Supervisor taps [Sign out].
3. Native alert: Title "Sign Out"; "Are you sure you want to sign out?"; [Sign out] (destructive) | [Cancel].
   - If [Sign out]: session invalidated server-side; token removed; cached data cleared; FCM push token unregistered; navigates to Login (6.1.1).
   - If [Cancel]: alert dismisses; remains authenticated.
- Edge: Network unavailable → local token removed, navigate to Login; server invalidation retried. Session expires in background → 401 → clears token → Login "Your session has expired."

---

## Module 6 (MSP Supervisor App) > Forgot Password (ID: 6.1.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Email (Screen 1) | text (email keyboard) | Yes | Valid email | TextField |
| Continue | button | — | — | Primary Button |
| OTP Code (Screen 2) | text (numeric) | Yes | 6 digits; 10-min validity (assumed) | TextField |
| Resend Code | link | — | Active after 60s; countdown | Hyperlink |
| New Password | password (masked) | Yes | Min 8 chars | TextField + show/hide |
| Confirm New Password | password (masked) | Yes | Must match | TextField + show/hide |
| Reset Password | button | — | — | Primary Button |

### User Flow
**Screen 1:** 1. Supervisor taps [Forgot Password?] → Screen 1. 2. Enters email → [Continue]:
   - If empty: "Email is required." If format invalid: "Please enter a valid email address." If not found: "No account found with this email address." If Inactive: "Your account is not active. Please contact the administrator." If network unavailable: "No internet connection." Else (valid): OTP sent → Screen 2.
3. [Back to Login] → Login (6.1.1).
**Screen 2:** 4. Enters OTP / New Password / Confirm → [Reset Password]:
   - If OTP empty: "Please enter the verification code." If wrong format: "Verification code must be 6 digits." If incorrect: "Invalid verification code." (5 wrong → invalidated → restart Screen 1). If expired: "This code has expired. Please request a new one." → Screen 1. If password < 8: "Password must be at least 8 characters." If mismatch: "Passwords do not match." If network unavailable: "No internet connection." Else (valid): password updated; all sessions invalidated; → Login; toast "Password reset successfully. Please log in with your new password."
6. [Resend Code] (after 60s): new OTP; previous invalidated.
- Edge: Email delivery fails → "Failed to send verification code. Please try again later."

---

## Module 6 (MSP Supervisor App) > Multi-Language Switch (ID: 6.1.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Language | select | — | Options: English (EN) / Tiếng Việt (VI) | Selection list / toggle |

### User Flow
1. Supervisor navigates Profile → Settings → Language.
2. Selection list shows EN / VI; current highlighted.
3. Supervisor taps alternate language:
   - App re-renders UI text without restart; data content NOT translated; preference saved via API.
   - If save succeeds: persists across sessions/devices. If save fails: "Failed to save language preference. The change will apply to this session only."
4. Taps same language → no action.
- Edge: Offline → local change; reverts next login. Switch while form open → values preserved.

---

## Module 6 (MSP Supervisor App) > Dashboard (ID: 6.1.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Building selector | select | — | User Group buildings only | Picker |
| KPI cards | Display (tappable) | — | Pending Assignment / In Progress / Pending Review / Technician Requests / Closed this period | Cards |
| Team Activity | Display | — | Active Technicians + current WO status | Section |
| Recent Activity list | Display | — | Latest 5–10 events | List |
| Bottom navigation | nav | — | Home / Work Orders / Assets / More | Tab bar |

### User Flow
1. App opens to Dashboard; loads first building in User Group scope, last 30 days.
2. Renders KPI cards (Pending Assignment = Pending-Unassigned; In Progress = Assigned+Started; Pending Review = Completed awaiting sign-off; Technician Requests = ad-hoc awaiting review; Closed this period); Team Activity; Recent Activity (last 5–10).
3. Supervisor taps Building selector (User Group buildings) → KPI re-fetch scoped.
4. Supervisor taps a KPI card:
   - If "Pending Assignment": WO List filtered Pending-Unassigned (6.2.2).
   - If "Pending Review": WO List filtered Completed (6.2.2).
   - If "Technician Requests": WO List filtered Technician Request (6.2.2).
5. Supervisor taps Recent Activity item → relevant WO/Request Detail (6.2.3).
6. Pull-to-refresh → refreshes all.
- Edge: No Technicians → Team Activity "No Technicians in your group." No User Group → "No scope assigned. Please contact the administrator." Section fail → "Failed to load. Tap to retry." Offline → cached with banner.

---

## Module 6 (MSP Supervisor App) > Create Ad-hoc Work Order (ID: 6.2.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Asset System | select | Yes | Supervisor's group systems only | Dropdown |
| Asset Sub-system | select | No | Cascades from System | Dropdown |
| Asset Type | select | No | Cascades from Sub-system | Dropdown |
| Asset | select / QR | No | Searchable or [Scan QR] auto-fill; must be in scope | Dropdown + Scan icon |
| Building | select | Yes | Supervisor's group buildings only (or QR auto-fill) | Dropdown |
| Floor | select | No | Cascades from Building | Dropdown |
| Area/Unit | select | No | Cascades from Floor | Dropdown |
| Description | textarea | Yes | Max 1000 chars | TextArea |
| Duration of Work | text | No | e.g. "2 hours" | TextField |
| Priority | select | No | Low / Medium / High / Urgent | Dropdown |
| Attachments | file | No | JPG/PNG/PDF; max 5 MB each; max 5 files | File input (camera/gallery) |
| Cancel / Submit | button | — | — | Secondary / Primary (full-width) |

### User Flow
1. Supervisor taps [+ New WO] / [Create Ad-hoc WO].
2. Create screen loads.
3. Supervisor fills fields. For Asset via [Scan QR]: camera opens → scans QR → Asset/Building/Floor/Area auto-filled; if asset out of scope → error toast "This asset is outside your scope."
4. Supervisor taps [Submit]:
   - If Asset System not selected: "Asset System is required."
   - If Building not selected: "Building is required."
   - If Description empty: "Description is required."
   - If Description > 1000: "Description must not exceed 1000 characters."
   - If attachment invalid type: "Only JPG, PNG, and PDF files are accepted."
   - If attachment > 5MB: "Each file must not exceed 5 MB."
   - If network unavailable: "No internet connection. Please try again."
   - Else (valid): WO created status Pending; BM notified (FCM + email) "A new ad-hoc work order from Supervisor [Name] requires your approval."; toast "Work order submitted for Building Manager approval."; back to WO list.
5. Supervisor taps [Cancel] → back without saving.
- Edge: Camera permission denied → "Camera permission required. Enable in device settings." QR fail → "Unable to scan QR code. Please select the asset manually." Network error → "Failed to create work order. Please try again." (no partial record).

---

## Module 6 (MSP Supervisor App) > View Request & Work Order List (ID: 6.2.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | By WO ID or asset code | TextField |
| Filter: Building | select | No | User Group buildings only | Dropdown |
| Filter: Status | select | No | Per WO status model | Dropdown |
| Filter: WO Type | select | No | — | Dropdown |
| Filter: Assigned Technician | select | No | — | Dropdown |
| Filter: Date Range | date range | No | — | Date range picker |
| WO list item | Display | — | WO ID / Type badge / Status badge / Building / Asset Code / Due Date (overdue red) / Technician | List row → 6.2.3 |

### User Flow
1. Supervisor navigates to Work Orders in bottom navigation.
2. System loads WOs/requests within scope (default all statuses, last 30 days).
3. List items: WO ID / Type / Status / Building / Asset Code / Due Date (red if overdue) / Assigned Technician.
4. Supervisor searches by WO ID or asset code.
5. Supervisor taps filter → Building / Status / WO Type / Assigned Technician / Date Range; [Apply] / [Reset].
6. Supervisor taps a WO/request → WO Detail (6.2.3).
7. Pull-to-refresh → refreshes; infinite scroll → next page.
8. Overdue items: red Due Date + overdue badge.
9. Empty state: "No work orders found for the selected filters."
- Edge: From Dashboard KPI → pre-filtered. Offline → cached with banner. Filters persist within session.

---

## Module 6 (MSP Supervisor App) > View Work Order Detail (ID: 6.2.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Header / 5-stage progress bar | Display | — | — | Header + Stepper |
| Swipeable tabs | Display | — | Details / Execution (read-only) | Tabs |
| Verification Rejected banner | Display | — | Shown when status = Verification Rejected | Red banner |
| [Assign to Technician] | button | — | Status = Pending-Unassigned | Primary (full-width) |
| [Approve & Forward to BM] / [Decline] | button | — | Status = Technician Request | Primary / Secondary (stacked) |
| [Sign Off & Forward to BM] / [Reject] | button | — | Status = Completed | Primary / Secondary (stacked) |
| [Review & Resubmit to BM] | button | — | Status = Verification Rejected | Primary (full-width) |

### User Flow
1. Supervisor taps WO from list → WO Detail loads; swipes between tabs.
2. Taps photos → full-screen; taps phone → native call.
3. If status = Pending-Unassigned: taps [Assign to Technician] → Assign flow (6.2.5).
4. If status = Technician Request:
   - If [Approve & Forward to BM]: native alert → Approve flow (6.2.4).
   - If [Decline]: bottom sheet with required reason → Decline flow (6.2.4).
5. If status = Completed:
   - Reviews checklist/photos/parts/sign-offs.
   - If [Sign Off & Forward to BM]: → Sign Off flow (6.2.7). If [Reject]: bottom sheet with required reason → Reject flow (6.2.7).
6. If status = Verification Rejected: red banner shows BM reason; Supervisor cannot edit execution content, only add optional note; taps [Review & Resubmit to BM] → Resubmit flow (6.2.7).
7. All other statuses: read-only.
- Edge: Concurrent status change → stale status toast. Load fail → "Failed to load. Please go back and try again." Offline → cached; buttons disabled.

---

## Module 6 (MSP Supervisor App) > Review & Approve/Decline Technician Ad-hoc Request (ID: 6.2.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Approve & Forward to BM] | button | — | Status = Technician Request | Primary (full-width) |
| [Decline] | button | — | Status = Technician Request | Secondary (full-width, stacked) |
| Approve confirm message | Display | — | "Forward this request to Building Manager for approval?" | Alert |
| Decline Reason | textarea | Yes | Max 500 chars; "Decline reason is required." | TextArea (char counter) |
| Decline / Cancel | button | — | Destructive vs Default | Buttons |

### User Flow
1. Supervisor opens WO Detail (6.2.3) for a Technician Request.
2. Reviews details, description, attachments (tap photos full-screen).
**Approve:** 3. Taps [Approve & Forward to BM]. 4. Native alert "Forward this request to Building Manager for approval?" [Approve] | [Cancel]. 5. Taps [Approve]:
   - If network unavailable: "No internet connection." If status already changed: "This request has already been processed. Please refresh." Else (valid): status → Pending; BM notified (FCM + email) "A new ad-hoc work order request requires your approval."; history updated; toast "Request forwarded to Building Manager."; buttons disappear.
6. [Cancel] → no change.
**Decline:** 7. Taps [Decline]. 8. Bottom sheet: Title "Decline Request"; Decline Reason (required), keyboard auto-opens; char counter (500); [Decline] (red) | [Cancel]. 9. Enters reason → [Decline]:
   - If reason empty: inline "Decline reason is required." If network unavailable: "No internet connection." Else (valid): status → Ad-hoc Declined; Technician notified (FCM + email) "Your ad-hoc request has been declined. Reason: [reason]. Please edit and resubmit if needed."; toast "Request declined."; sheet closes.
10. [Cancel] / drag down → dismisses.
- Edge: Keyboard covers sheet → scrolls up. Timeout after 15s → no status change.

---

## Module 6 (MSP Supervisor App) > Assign Work Order to Technician (ID: 6.2.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | — | TextField (top of list) |
| Main Technician | select (single) | Yes | Active Technicians in User Group; one must be selected | Single-select list (Avatar/Name/Level/active WO count) |
| Sub Technicians | multi-select | No | Adds removable chips | [+ Add Sub Technician] → multi-select picker |
| Due Date | date | No | Format dd/mm/yyyy; manually set | DatePicker |
| Notes | textarea | No | Max 500 chars | TextArea |
| Cancel / Assign | button | — | Assign enabled only when Main Technician selected | Default / Primary |

### User Flow
1. Supervisor taps [Assign to Technician] on WO Detail (status = Pending-Unassigned).
2. Assignment bottom sheet slides up.
3. Supervisor searches/scrolls (workload indicator = active WO count per Technician).
4. Supervisor taps a Technician to select as Main (checkmark).
5. Optionally [+ Add Sub Technician] → multi-select picker.
6. Optionally sets Due Date (manual; no auto-calc).
7. Optionally adds Notes.
8. Supervisor taps [Assign]:
   - If no Main Technician: [Assign] disabled.
   - If network unavailable: "No internet connection."
   - If status changed concurrently: "This work order has already been updated. Please refresh."
   - If selected Technician became inactive: "Selected Technician is no longer active. Please choose another."
   - Else (valid): WO status → Assigned; Main Technician push "You have been assigned Work Order [ID]. Please review and start when ready."; Sub Technician(s) push "You have been added to Work Order [ID] as a Sub Technician."; history updated; toast "Work order assigned to [Technician Name]."; sheet closes; detail refreshes.
9. [Cancel] / drag down → dismisses.
10. Adding Sub Technicians later (Assigned/Started): same sheet (excludes already-assigned); added immediately with push.
- Edge: No active Technicians → "No active Technicians available in your group." List fail → "Failed to load technicians. Please try again." Timeout after 15s → remains Pending-Unassigned.

---

## Module 6 (MSP Supervisor App) > Spare Parts Request (ID: 6.2.6)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Spare Part (repeatable) | select | Yes | Searchable; Supervisor's scope, Active only; shows Name/Code/Available Stock | Dropdown |
| Quantity | number (numeric) | Yes | Min 1 | NumberField |
| [+ Add another part] | button | — | Adds another entry | Secondary Button |
| Notes | textarea | No | Max 500 chars | TextArea |
| Cancel / Submit Request | button | — | — | Default / Primary |

### User Flow
1. Supervisor opens WO Detail (6.2.3).
2. In Execution tab, taps [Request Spare Parts].
3. Bottom sheet "Request Spare Parts"; part entry repeatable: Spare Part (searchable, scope, Active; shows Name/Code/Available/On-Hold); Quantity (numeric, min 1); Notes optional.
4. Supervisor taps [Submit Request]:
   - If any Spare Part not selected: "Please select a spare part."
   - If any Quantity < 1 or empty: "Please enter a valid quantity."
   - If requested qty > available (not blocked): warning "Requested quantity exceeds available stock. This will be flagged as Unavailable." (Supervisor confirms or adjusts.)
   - If duplicate entries: warning "Duplicate part detected. Please combine into one entry."
   - If network unavailable: "No internet connection."
   - Else (valid): per part — if stock sufficient → On-Hold set; else flagged Unavailable; BM notified (FCM + email) "Spare part request for Work Order [ID] requires your approval."; history updated; toast "Spare parts request submitted for Building Manager approval."; sheet closes.
5. [Cancel] / drag down → no request created.
- Edge: Dropdown empty → "No spare parts available for your scope." Timeout → no request created.

---

## Module 6 (MSP Supervisor App) > Work Order Completion Review & Sign-off (ID: 6.2.7)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Sign Off & Forward to BM] | button | — | Status = Completed | Primary (full-width) |
| [Reject] | button | — | Status = Completed | Secondary (full-width) |
| [Review & Resubmit to BM] | button | — | Status = Verification Rejected | Primary (full-width) |
| Execution Summary | Display | — | Checklist (N/total, expandable) / Part Replacement / Sign-off records / Plan ref / History | Section (read-only) |
| Verification Rejected banner | Display | — | "Rejected by [BM Name] on [date]. Reason: [reason]" | Red banner |
| Sign Off confirm message | Display | — | "Sign off and forward to Building Manager for final review?" | Alert |
| Rejection Reason | textarea | Yes | Max 500 chars; "Rejection reason is required." | TextArea |
| Resubmit confirm message | Display | — | "Resubmit this work order to Building Manager?" | Alert |

### User Flow
**When status = Completed:**
1. Supervisor opens WO Detail (6.2.3); Execution tab shows checklist & sign-off records.
2. Reviews: checklist items (each expandable: Description filled + Photos uploaded); Part Replacement; sign-off records (Technician / Building Technician / Tenant if applicable, with timestamps).
3. Supervisor taps [Sign Off & Forward to BM]:
   - Native alert "Sign off and forward to Building Manager? Verify all checklist items, photos, and signatures are complete." [Sign Off] | [Cancel].
   - On [Sign Off]: if network unavailable "No internet connection."; if status changed "Work order status has changed. Please refresh."; else (valid) Supervisor sign-off recorded (timestamp); status → Verified; BM push + email "Work Order [ID] has been reviewed and is ready for your final sign-off."; history updated; toast "Work order forwarded to Building Manager."; buttons removed.
4. Supervisor taps [Reject]:
   - Bottom sheet "Reject Work Order"; Rejection Reason (required), keyboard auto-opens; char counter (500); [Reject] | [Cancel].
   - Enters reason → [Reject]: if empty inline "Rejection reason is required."; if network unavailable "No internet connection."; else (valid) status → Completion Rejected; Technician push + email "Work Order [ID] rejected. Reason: [reason]. Please correct and resubmit."; history updated; toast "Work order returned to Technician."; buttons removed.
**When status = Verification Rejected:**
5. Red banner: "Rejected by [BM Name] on [date]. Reason: [reason]."
6. Supervisor reviews BM feedback.
7. Supervisor CANNOT edit execution content; can add optional note. Taps [Review & Resubmit to BM]:
   - Native alert "Confirm that you have addressed the rejection reason and the work order is ready for resubmission." [Resubmit] | [Cancel].
   - On confirm: status → Verified (re-enters Approval); BM push + email "Work Order [ID] has been resubmitted for your review."; toast "Work order resubmitted to Building Manager."
- Edge: Keyboard covers reject sheet → scrolls up. Timeout → remains Completed. BM rejects again → returns to Verification Rejected; can resubmit again (each cycle adds history).

---

## Module 6 (MSP Supervisor App) > View Asset List — Read-only (ID: 6.3.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by name or code" | TextField |
| [Scan QR] | button | — | Top-right | Icon Button |
| Filter: Building | select | No | User Group buildings only | Dropdown |
| Filter: Asset System | select | No | User Group systems only | Dropdown |
| Filter: Status | select | No | All / Active / Inactive | Dropdown |
| Asset list item | Display | — | Asset Code / Name / System / Location / Status | List row → 6.3.2 |

### User Flow
1. Supervisor navigates to Assets.
2. System loads assets matching User Group scope (Building AND System must both match).
3. Supervisor searches/filters → list updates.
4. Supervisor taps [Scan QR] → camera opens:
   - If asset in scope: → Asset Detail (6.3.2).
   - If out of scope: error toast "This asset is outside your scope."
   - If QR unreadable: "Unable to scan. Please search manually."
5. Supervisor taps asset → Asset Detail (6.3.2).
6. Pull-to-refresh → reload. Empty state: "No assets found within your scope." Read-only.
- Edge: Offline → cached with banner. Camera permission denied → manual search only. List fail → "Failed to load assets. Please try again."

---

## Module 6 (MSP Supervisor App) > View Asset Detail — Read-only (ID: 6.3.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Asset Name / Status badge | Display | — | Large bold title | Header |
| Classification | Display | — | System / Sub-system / Type | Section |
| Location | Display | — | Building / Floor / Area-Unit | Section |
| Asset Details | Display | — | Code / Model / Serial / Brand / Purchase Date / Status | Section |
| Maintenance History | Display | — | WO ID / Plan Name / Round / Completed Date / Technician / Status | List → WO Detail |
| Pending WOs | Display | — | WO ID / Type / Status | List → WO Detail |

### User Flow
1. Supervisor taps asset from list (or from QR scan) → Asset Detail loads.
2. Renders header (Name/Code/Status), Classification, Location, Asset Details sections.
3. Maintenance History: WO ID / Plan Name / Round / Completed Date / Technician / Status; shows Closed WOs within Supervisor's scope only; tap WO ID → WO Detail (6.2.3); empty "No maintenance history."
4. Pending WOs: WO ID / Type / Status / Assigned Date; tap → WO Detail (6.2.3); empty "No pending work orders."
5. No Edit/Deactivate (read-only).
- Edge: WOs outside scope not shown. 50+ WOs → pagination "Load more." Load fail → "Failed to load asset details. Please go back and try again."

---

## Module 6 (MSP Supervisor App) > View Spare Part List — Read-only (ID: 6.3.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by name or code" | TextField |
| Filter: Status | select | No | All / Active / Inactive | Dropdown |
| Spare part list item | Display | — | Code / Name / Asset System / Available Stock (highlighted) / Total Stock / Status | List row → detail |

### User Flow
1. Supervisor navigates to Inventories.
2. System loads spare parts matching User Group scope (Asset Systems AND Buildings must both match).
3. Supervisor searches by name/code → real-time filter.
4. Supervisor taps Status filter → All / Active / Inactive.
5. Supervisor taps a spare part → read-only detail: Available (large, green) / On-Hold / Total counters; stock history log (last 10, Load more); no edit.
6. Pull-to-refresh → refreshes stock levels (important before submitting spare part request 6.2.6).
7. Empty state: "No spare parts found within your scope."
- Edge: Available = 0 → red; label "Out of stock." Offline → cached with banner. Detail fail → "Failed to load spare part details. Please try again."

---

## Module 6 (MSP Supervisor App) > Receive Push Notification (ID: 6.4.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Push notification | Display | — | Title / Body / deep-link action | OS notification (FCM) |
| In-app bell badge | Display | — | Unread count | Bell icon badge |

### User Flow (system-triggered)
1. System event triggers a Supervisor notification.
2. Backend sends payload to FCM.
3. FCM routes to all registered devices.
   - Online → immediate. Offline → queued (expire after 28 days).
4. Trigger events:
   - New Technician Ad-hoc Request: "New Technician Request" → WO Detail (6.2.3).
   - WO Ready to Assign (Pending-Unassigned): "Work Order Ready for Assignment" → WO Detail.
   - Verification Rejected by BM: "Work Order Returned by Building Manager" → WO Detail (Verification Rejected banner).
   - Spare Part Request Approved by BM: "Spare Part Request Approved" → WO Detail.
   - Spare Part Request Rejected by BM: "Spare Part Request Rejected" → WO Detail.
   - Spare Part Unavailable: "Spare Part Unavailable" → WO Detail.
   - Stock Available (after restock): "Spare Part Now Available" → WO Detail.
   - Maintenance Plan Approved by BM: "Maintenance Plan Approved" → navigates user to log in to web portal.
   - Maintenance Plan Rejected by BM: "Maintenance Plan Rejected" → web portal.
5. In-app handling: foreground → banner (auto-dismiss 4s); background → tray + badge increment; closed → OS notification + cold start.
6. Bell icon shows unread badge; tap → navigates + marks read.
7. Permissions: first install requests; denied → in-app prompt to enable in Settings; logout → token unregistered; reinstall → token regenerated on next login.
- Edge: Already-processed WO → shows current status. Offline batch delivered on reconnect. Token expires/changes → refreshed on next app open.

---

## Module 7 (MSP Technician App) > Login (ID: 7.1.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| EZAxis logo | Display | — | — | Image |
| Email | text (email keyboard) | Yes | Valid email; max 100 chars | TextField |
| Password | password (masked) | Yes | Min 8 chars | TextField + show/hide |
| Forgot Password? | link | — | — | Hyperlink → 7.1.3 |
| Login | button | — | — | Primary Button (full-width) |

### User Flow
1. App opens. System checks stored session token.
   - If valid: → Dashboard (7.1.5) showing only this Technician's WOs; flow ends. Else: renders Login.
2. Technician enters email/password → [Login]; spinner shown.
3. Field validation:
   - If Email empty: "Email is required." If Password empty: "Password is required." If format invalid: "Please enter a valid email address."
4. If ≥ 5 failures within 15 min: "Too many failed attempts. Please try again in 15 minutes."
5. Backend query:
   - If email not found or role ≠ MSP Technician: "Invalid email or password." → increments counter.
   - If Account Inactive: "Your account is not active. Please contact your Supervisor."
   - If no User Group: "Your account has no scope assigned. Please contact your Supervisor."
   - If Account Status = Pending: "Your account is not yet activated. Please check your email for the invitation link."
   - If password mismatch: "Invalid email or password." → increments counter.
   - Else (valid): token stored (Keychain/Keystore); counter reset; last-login updated; → Dashboard (7.1.5).
- Edge: Network unavailable → "No internet connection. Please check your network and try again." Token expired server-side → "Your session has expired. Please log in again." Note: error wording uses "contact your Supervisor" (not "administrator").

---

## Module 7 (MSP Technician App) > Logout (ID: 7.1.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Sign out | menu item | — | — | Menu item |
| Confirm message | Display | — | "Are you sure you want to sign out?" | Alert |
| Sign out / Cancel | button | — | Destructive vs Default | Buttons |

### User Flow
1. Technician taps Profile/More in bottom navigation.
2. Profile/Settings opens. Taps [Sign out].
3. Native alert: Title "Sign Out"; "Are you sure you want to sign out?"; [Sign out] (destructive) | [Cancel].
   - If [Sign out]: session invalidated server-side; token removed; cached data cleared; FCM token unregistered; → Login (7.1.1).
   - If [Cancel]: remains authenticated.
- Edge: Network unavailable → local token+cache removed, navigate to Login; server invalidation retried. Session expires in background → 401 → clears token → Login "Your session has expired." Force-close+reopen → token re-checked.

---

## Module 7 (MSP Technician App) > Forgot Password (ID: 7.1.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Email (Screen 1) | text (email keyboard) | Yes | Valid email | TextField |
| Continue | button | — | — | Primary Button |
| OTP Code (Screen 2) | text (numeric) | Yes | 6 digits; 10-min validity (assumed) | TextField |
| Resend Code | link | — | Active after 60s; countdown | Hyperlink |
| New Password | password (masked) | Yes | Min 8 chars | TextField + show/hide |
| Confirm New Password | password (masked) | Yes | Must match | TextField + show/hide |
| Reset Password | button | — | — | Primary Button |

### User Flow
**Screen 1:** 1. Technician taps [Forgot Password?] → Screen 1. 2. Enters email → [Continue]:
   - If empty: "Email is required." If format invalid: "Please enter a valid email address." If not found: "No account found with this email address." If Inactive: "Your account is not active. Please contact your Supervisor." If network unavailable: "No internet connection." Else (valid): OTP sent → Screen 2.
3. [Back to Login] → Login (7.1.1).
**Screen 2:** 4. Enters OTP / New Password / Confirm → [Reset Password]:
   - If OTP empty: "Please enter the verification code." If wrong format: "Verification code must be 6 digits." If incorrect: "Invalid verification code." (5 wrong → invalidated → restart). If expired: "This code has expired. Please request a new one." → Screen 1. If password < 8: "Password must be at least 8 characters." If mismatch: "Passwords do not match." If network unavailable: "No internet connection." Else (valid): password updated; sessions invalidated; → Login; toast "Password reset successfully. Please log in with your new password."
6. [Resend Code] (after 60s): new OTP; previous invalidated.
- Edge: Email delivery fails → "Failed to send verification code. Please try again later."

---

## Module 7 (MSP Technician App) > Multi-Language Switch (ID: 7.1.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Language | select | — | Options: English (EN) / Tiếng Việt (VI) | Selection list / toggle |

### User Flow
1. Technician navigates Profile → Settings → Language.
2. Selection list EN / VI; current highlighted.
3. Technician taps alternate language:
   - UI re-renders without restart; data content NOT translated; preference saved via API.
   - If save succeeds: persists across sessions/devices. If save fails: "Failed to save language preference. The change will apply to this session only."
4. Taps same language → no action.
- Edge: Offline → local change; reverts next login. Switch while completing checklist → values preserved.

---

## Module 7 (MSP Technician App) > Dashboard (ID: 7.1.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| KPI cards | Display (tappable) | — | Assigned / In Progress / Pending Review / Completion Rejected (red) | Cards |
| My Work Orders | Display | — | Latest 5 WOs with status badges | List |
| Upcoming Work Orders | Display | — | Due in next 7 days; overdue first (red) | List |
| Bottom navigation | nav | — | Home / Work Orders / Assets / More | Tab bar |

### User Flow
1. App opens to Dashboard; loads this Technician's own WO summary (always scoped to self; no building filter).
2. Renders KPI cards (Assigned; In Progress/Started; Pending Review = submitted awaiting Supervisor; Completion Rejected = returned, urgent in red); My Work Orders (recent 5, tappable); Upcoming Work Orders (next 7 days, overdue first in red).
3. Technician taps a KPI card → Assigned WO List (7.2.3) filtered to that status.
4. Technician taps a WO → WO Detail (7.2.4).
5. Pull-to-refresh → refreshes all.
6. Completion Rejected card shown prominently in red with badge → WO List filtered Completion Rejected (address first).
- Edge: No assigned WOs → "No work orders assigned. Check back later." Section fail → "Failed to load. Tap to retry." Offline → cached with banner.

---

## Module 7 (MSP Technician App) > Offline Mode (ID: 7.1.6)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Offline banner | Display | — | Amber/yellow; "You are offline. Some features are unavailable." | Banner |
| Last synced label | Display | — | "Last synced: [time]." | Label |
| Action buttons | button | — | Disabled while offline | Buttons |

### User Flow
1. App detects loss of connectivity → persistent amber offline banner on all screens: "You are offline. Some features are unavailable."
2. Available offline (read-only): cached WO list, cached WO details (checklist, asset info, location), cached asset list/details, cached spare part list. Cache TTL: assumed 24 hours (pending confirmation).
3. NOT available offline (all writes/fetches): Start WO, submit checklist updates, upload photos, submit sign-off, create ad-hoc requests, request spare parts, logout (server invalidation).
4. Technician attempts a disabled action (e.g., [Start Work Order]):
   - Error toast "You are offline. Please reconnect to perform this action." → action does NOT proceed.
5. App detects reconnection:
   - Banner disappears (or green "Back online" 3s); cached data auto-refreshes; queued actions synced; buttons re-enabled.
6. App closed offline & reopened still offline: cached data shown; banner shown; "Last synced: [time]."
- Edge: Mid-checklist drop → typed data preserved in memory/local draft until reconnect (persistence pending confirmation). Cache TTL expired (>24h) → "Cached data has expired. Please reconnect to reload your work orders." Logout while offline → local token+cache cleared, → Login; server invalidation on reconnect. Photo queued offline → uploaded on reconnect (if offline queue implemented; else retake after reconnect).

---

## Module 7 (MSP Technician App) > Create Ad-hoc Work Order (Technician-initiated) (ID: 7.2.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Asset System | select | Yes | Technician's scope | Dropdown |
| Asset Sub-system | select | No | Cascades | Dropdown |
| Asset Type | select | No | Cascades | Dropdown |
| Asset | select / QR | No | Searchable or [Scan QR] auto-fill; must be in scope | Dropdown + Scan icon |
| Building | select | Yes | Technician's buildings (or QR auto-fill) | Dropdown |
| Floor | select | No | Cascades from Building | Dropdown |
| Area/Unit | select | No | Cascades | Dropdown |
| Description | textarea | Yes | Max 1000 chars | TextArea |
| Duration of Work | text | No | — | TextField |
| Priority | select | No | Low / Medium / High / Urgent | Dropdown |
| Attachments | file | No | JPG/PNG/PDF; max 5 MB each; max 5 files | File input (camera/gallery) |
| Cancel / Submit | button | — | — | Secondary / Primary |

### User Flow
1. Technician taps [+ New Request] / [Create Ad-hoc WO].
2. Create Ad-hoc Request screen loads.
3. Technician fills fields. For Asset via [Scan QR]: camera → scans QR → if in scope Asset/Building/Floor/Area auto-filled; if out of scope → "This asset is outside your scope."
4. Technician taps [Submit]:
   - If Asset System not selected: "Asset System is required."
   - If Building not selected: "Building is required."
   - If Description empty: "Description is required."
   - If Description > 1000: "Description must not exceed 1000 characters."
   - If attachment invalid type: "Only JPG, PNG, and PDF files are accepted."
   - If attachment > 5MB: "Each file must not exceed 5 MB."
   - If network unavailable: "No internet connection. Please try again."
   - Else (valid): request created status Technician Request; Supervisor notified (FCM + email) "Technician [Name] has submitted an ad-hoc work order request. Please review."; toast "Request submitted to your Supervisor for review."; back to Ad-hoc Request List (7.2.2).
5. [Cancel] → back without saving.
- Edge: Camera permission denied → manual entry only. QR fail → "Unable to scan. Please enter details manually." Network error → "Failed to submit request. Please try again." (no partial record).

---

## Module 7 (MSP Technician App) > View Ad-hoc Request List (ID: 7.2.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Status filter | select | No | Technician Request / Ad-hoc Declined / Pending / Approval Rejected / Assigned / Cancelled | Dropdown |
| Request list item | Display | — | Request ID / Building / Asset / Status badge / Created date | List row → detail |
| [Edit & Resubmit] | button | — | Shown when status = Ad-hoc Declined | Button |

### User Flow
1. Technician navigates to Requests tab/section.
2. System loads all ad-hoc requests submitted by this Technician: Request ID / Building / Asset / Status / Created date; statuses Technician Request / Ad-hoc Declined / Pending / Approval Rejected / Assigned / Cancelled; sorted created-date desc.
3. Technician applies Status filter to narrow list.
4. Technician taps a request:
   - If status = Technician Request / Pending / Approval Rejected / Cancelled: read-only detail with history log.
   - If status = Ad-hoc Declined: detail shows Supervisor rejection reason prominently; [Edit & Resubmit] visible.
     - Technician taps [Edit & Resubmit] → Edit form pre-filled with previous data → modifies → [Resubmit]:
       - Same validation as Create (7.2.1); if network unavailable → error toast; else (valid): status → Technician Request; Supervisor notified "Technician [Name] has resubmitted an ad-hoc request."; toast "Request resubmitted to Supervisor."
5. Pull-to-refresh → refreshes. Empty state: "No ad-hoc requests submitted yet."
- Edge: Resubmit a request already approved (status changed) → "This request has already been processed. Please refresh." Offline → cached with banner.

---

## Module 7 (MSP Technician App) > View Assigned Work Order List (ID: 7.2.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | By WO ID or asset code | TextField |
| Status filter | select | No | All / Assigned / Started / Completed / Completion Rejected / Closed / Cancelled | Dropdown |
| WO list item | Display | — | WO ID / Type badge / Asset Code / Building / Location / Due Date (overdue red) / Status | List row → 7.2.4 |

### User Flow
1. Technician navigates to Work Orders tab.
2. System loads all WOs where this Technician is Main OR Sub: WO ID / Type / Asset Code / Building / Location / Due Date / Status; sorted Completion Rejected first, then overdue by due date, then upcoming by due date.
   - Overdue WOs: red Due Date + overdue badge. Completion Rejected WOs: red border/highlight.
3. Technician taps Status filter → All / Assigned / Started / Completed / Completion Rejected / Closed / Cancelled.
4. Technician searches by WO ID or asset code.
5. Technician taps a WO → WO Detail & Execution (7.2.4).
6. Pull-to-refresh → refreshes; infinite scroll → next page.
7. Empty state: "No work orders assigned to you."
- Edge: Technician is Sub → WO shows "Sub Technician" label. Offline → cached with banner. Due Date today (not yet overdue) → amber.

---

## Module 7 (MSP Technician App) > View Work Order Detail (ID: 7.2.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Header | Display | — | Asset Code · Work Type / WO ID / date / Type badge | Header |
| Print Report | button | — | — | Secondary Button |
| 5-stage progress bar | Display | — | New → Pending → In Progress → Review → Approval | Stepper |
| Tab: Details | Display | — | Description / Photos / Remark (read-only) | Tab |
| Tab: Execution | interactive | — | Technician cards / Work Checklist (N/total) / Part Replacement / Plan ref / Tenant / History | Tab |
| Completion Rejected section | Display | — | Rejected by / Time / Reason (when status = Completion Rejected) | Red banner |
| [Start Work Order] | button | — | Status = Assigned | Primary (full-width) |
| [Submit & Sign Off] | button | — | Status = Started; disabled until all required items complete | Primary (full-width) |
| [Review & Resubmit] | button | — | Status = Completion Rejected | Primary (full-width) |

### User Flow
1. Technician taps WO from list → WO Detail loads.
2. Renders header, 5-stage progress bar (active stage highlighted), Overview (scrollable: Start/End Time + overdue badge / Time Required / Building / Floor / Area / Asset Code/Type/System).
3. Swipeable tabs:
   - Details (read-only): Description / Photos (tap full-screen) / Remark.
   - Execution (primary working tab): Work Checklist (progress N/total; each item expandable: name / Description input Req/Opt/Off / Photos upload Req/Opt/Off); Part Replacement table (Source / Name / Code / Quantity; [+ Add Part]); Maintenance Plan ref (Maintenance WOs); Tenant contact (Service Request WOs); History log (last 5, [Show all]).
4. If status = Completion Rejected: red banner "Rejected by Supervisor [Name] on [date]. Reason: [reason]."
5. Action buttons fixed at bottom:
   - If Assigned: [Start Work Order]. If Started: [Submit & Sign Off] (disabled until all Required items complete). If Completion Rejected: [Review & Resubmit]. If Completed: no buttons (read-only).
6. [Submit & Sign Off] disabled state: grayed with "Complete all required checklist items to submit."; tapping shows tooltip "N required checklist items are incomplete."
- Edge: Sub Technician → can view but [Start]/[Submit & Sign Off] only for Main Technician (pending confirmation). Load fail → "Failed to load work order details. Please go back and try again." Offline → cached; buttons disabled.

---

## Module 7 (MSP Technician App) > Start Work Order Execution (ID: 7.2.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Start Work Order] | button | — | Status = Assigned; Main Technician | Primary Button |
| Confirm message | Display | — | "Start Work Order [ID]? This will mark the work as in progress." | Alert |
| Start / Cancel | button | — | — | Buttons |

### User Flow
1. Technician opens WO Detail (7.2.4) for an Assigned WO.
2. [Start Work Order] shown at bottom (full-width, primary).
3. Technician taps [Start Work Order].
4. Native alert: "Start Work Order [ID]? This will mark the work as in progress." [Start] | [Cancel].
5. Technician taps [Start]:
   - If network unavailable: "No internet connection. Please try again."
   - If WO status changed concurrently: "Work order status has changed. Please refresh."
   - Else (valid): WO status → Started; Start Time recorded automatically; Supervisor notified (FCM push) "Technician [Name] has started Work Order [ID]."; history "Started by [Technician Name] at [timestamp]."; [Start Work Order] replaced by [Submit & Sign Off] (disabled until checklist complete); Execution tab becomes fully interactive; toast "Work order started."
6. Technician taps [Cancel] → no change; WO remains Assigned.
- Edge: Accidental Start → no undo. Timeout after 15s → status NOT changed; can retry.

---

## Module 7 (MSP Technician App) > Complete Work Checklist Items (ID: 7.2.6)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Checklist counter | Display | — | N/total items completed | Progress indicator |
| Item name | Display | — | Read-only (from Asset Type definition) | Card header |
| Description | text input | Req/Opt/Off per item setting | If Required: must be filled before submission | TextArea |
| Photos | multi-upload | Req/Opt/Off per item setting | If Required: ≥ 1 photo; max 5 MB each | Image upload (camera/gallery) |
| Done / completion tick | toggle | — | Marks item complete when required fields filled | Button/Checkbox |

### User Flow (embedded in WO Detail Execution tab; WO must be Started; Main Technician)
1. Technician navigates to WO Detail (7.2.4) → swipes to Execution tab.
2. Checklist shows progress (e.g. "2 of 5 items done") and item list.
3. Technician taps a checklist item card → expands showing: item name (read-only); Description field (if Required/Optional; Required shows red asterisk; Off → not shown); Photos section (thumbnail grid, [+ Add Photo]; Required shows asterisk + needs ≥1; Off → not shown); [Done]/checkmark.
4. Technician fills Description (if applicable) and uploads Photos (if applicable).
5. Technician taps [Done] on an item:
   - If Description = Required AND empty: item marked INCOMPLETE; warning "Description required."
   - If Photos = Required AND none uploaded: item marked INCOMPLETE; "At least 1 photo required."
   - Else (all required filled): item marked COMPLETE (checkmark + green); progress counter updates ("3 of 5 items done").
6. Technician taps a completed item → can re-open to edit Description or add/remove Photos while WO is Started.
7. Real-time save: Description text and photo uploads auto-saved to local draft on every change.
- Edge: Connection drops mid-fill → typed data preserved in local draft, synced on reconnect. Photo upload fails → "Photo upload failed. Please retry." (others unaffected). Photo too large → "Photo is too large. Maximum size is 5 MB per photo." Optional item with no input → can mark Done if both settings Optional/Off. Device storage full → "Not enough storage space to save photo. Please free up space and try again."

---

## Module 7 (MSP Technician App) > Upload Execution Photos (ID: 7.2.7)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Photos | multi-upload | Req/Opt per item | Max 5 MB per photo; JPG/PNG | Camera/gallery picker, thumbnail grid |
| Delete (per photo) | button | — | Confirm before removing | X on thumbnail |

### User Flow (embedded in each checklist item; WO Started; Main Technician)
1. Technician expands a checklist item card.
2. In Photos section, taps [+ Add Photo].
3. Bottom sheet: [Take Photo] (camera) / [Choose from Library] (gallery) / [Cancel].
**Camera path:** 4a. Taps [Take Photo]:
   - If camera permission not granted: OS dialog; if denied → "Camera permission required. Please enable in device Settings => App => Camera."
   - Camera opens → frame evidence → capture → preview. [Use Photo] → added to grid (thumbnail). [Retake] → camera reopens.
**Gallery path:** 4b. Taps [Choose from Library]:
   - If library permission not granted (iOS): OS dialog; if denied → "Photo library permission required. Please enable in Settings."
   - Library opens → select photo → added to grid.
**After photo added:** 5. Uploaded to server in background:
   - In progress → spinner on thumbnail. Succeeds → spinner replaced by checkmark/disappears. Fails → error indicator + [Retry].
6. Technician taps [X] on a thumbnail → confirm "Remove this photo?" [Remove] | [Keep]; confirmed → removed from item and server.
7. Max photos per item: not defined in spec (flagged; recommend 10 per item).
- Edge: > 5MB → "Photo is too large. Maximum 5 MB per photo." Taken offline → stored locally, uploaded on reconnect. Camera malfunction → "Unable to access camera. Please try again."

---

## Module 7 (MSP Technician App) > Record Part Replacement (ID: 7.2.8)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Source toggle | select | Yes | [IMS Stock] | [Purchase Separately] | Toggle |
| Spare Part (IMS Stock) | select | Yes (IMS path) | Searchable; scope, Active; Name/Code/Available Stock | Dropdown |
| Part Name (Purchase Separately) | text | Yes (Purchase path) | Max 100 chars | TextField |
| Quantity | number (numeric) | Yes | Min 1 | NumberField |
| Part Replacement table | Display | — | Source / Name / Code / Quantity / Delete | Table |
| [+ Add Part] | button | — | Opens source selection | Button |

### User Flow (embedded in Execution tab; WO Started; Main Technician)
1. Technician scrolls to Part Replacement section.
2. Current entries shown (Source / Part Name / Code / Quantity).
3. Technician taps [+ Add Part].
4. Bottom sheet "Add Part Replacement"; Source toggle [IMS Stock] | [Purchase Separately].
**IMS Stock path:** 5a. Selects [IMS Stock]: Spare Part searchable dropdown (scope, Active; Name/Code/Available Stock); Quantity numeric min 1; taps [Add]:
   - If Spare Part not selected: "Please select a spare part."
   - If Quantity < 1: "Please enter a valid quantity."
   - If Quantity > Available stock (not blocked): warning "Requested quantity exceeds available stock. Continue?" → confirm → proceeds.
   - Else (valid): entry added (Source = IMS Stock / Name / Code). Note: Stock-Out & On-Hold handled by BM approval (7.2.9); this is recording only.
**Purchase Separately path:** 5b. Selects [Purchase Separately]: Part Name text (required, max 100); Quantity numeric min 1; taps [Add]:
   - If Part Name empty: "Part name is required." If Quantity < 1: "Please enter a valid quantity." Else (valid): entry added (Source = Purchase Separately / Name; no Code).
6. Technician taps Delete on an entry → confirm "Remove this part entry?"; confirmed → removed; for IMS Stock with existing On-Hold → On-Hold released automatically.
7. Technician can add multiple entries (mixed sources).
- Edge: Spare Part list fail → "Failed to load spare parts. Please try again." Remove IMS entry after BM approved (stock-out done) → conflict flagged (BA review). Network unavailable → entry saved locally, synced on reconnect.

---

## Module 7 (MSP Technician App) > Create Spare Parts Request (ID: 7.2.9)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Spare Part (repeatable) | select | Yes | Searchable; scope, Active; Name/Code/Available Stock | Dropdown |
| Quantity | number (numeric) | Yes | Min 1 | NumberField |
| Notes | textarea | No | — | TextArea |
| [+ Add another part] | button | — | — | Button |
| Submit Request | button | — | Available when status = Started | Primary Button |

### User Flow (WO Started; Main Technician; distinct from Part Replacement 7.2.8)
1. Technician opens WO Detail → Execution tab → taps [Request Spare Parts].
2. Bottom sheet "Request Spare Parts"; multiple entries via [+ Add another part]; per entry Spare Part (searchable, scope, Active; Name/Code/Available Stock) + Quantity (numeric min 1); Notes optional.
3. Technician taps [Submit Request]:
   - If Spare Part not selected: "Please select a spare part."
   - If Quantity < 1: "Please enter a valid quantity."
   - If duplicate entries: warning "Duplicate part detected. Please combine into one entry."
   - If requested qty > available (not blocked): warning "Requested quantity exceeds available stock. This request will be flagged as Unavailable." → confirm.
   - If network unavailable: "No internet connection."
   - Else (valid): per part — sufficient → On-Hold set immediately; insufficient → flagged Unavailable; BM notified (FCM + email) "Spare part request for Work Order [ID] from Technician [Name] requires your approval."; Supervisor notified (FCM push) "Technician [Name] submitted a spare part request for Work Order [ID]."; history updated; toast "Spare parts request submitted for Building Manager approval."; sheet closes.
4. [Cancel] / drag down → no request created.
- Edge: BM declines → On-Hold released; Technician notified; may use Purchase Separately instead. Dropdown empty → "No spare parts available for your scope." Timeout → no request created.

---

## Module 7 (MSP Technician App) > Technician Sign-off (ID: 7.2.10)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Submit & Sign Off] | button | — | Disabled until all required checklist items complete | Primary Button |
| Step 1 — Technician self sign-off | auto | Yes | Auto-records name + timestamp | System step |
| Step 2 — Building Technician sign-off | confirm | Yes | Method TBC (button confirmation assumed) | [Confirm Sign-off] |
| Step 3 — Tenant sign-off | confirm | Conditional | Only if plan "Tenant sign-off required = Yes" | [Confirm Sign-off] |

### User Flow (triggered by [Submit & Sign Off]; WO Started; Main Technician; all required items complete)
1. Technician ensures all checklist items done ("5 of 5 items done").
2. [Submit & Sign Off] becomes enabled.
3. Technician taps [Submit & Sign Off].
4. System validates ALL required fields (final validation):
   - If any Required Description empty on any item: checklist scrolls to first incomplete item; red highlight; error toast "Please complete all required checklist items before submitting."; button remains disabled.
   - If any Required Photos section with 0 photos: same behavior.
   - Else (all complete): proceeds to Sign-off sequence.
5. Sign-off sequence (3 steps in order):
   - STEP 1 — MSP Technician A (this Technician), ALWAYS REQUIRED: screen "Your Sign-off" / "Sign off as MSP Technician A to confirm work completion."; method = button confirmation (assumed, no signature/OTP in MVP); records name + timestamp → Step 2.
   - STEP 2 — Building Technician, ALWAYS REQUIRED: "Building Technician Sign-off" / "Have the Building Technician sign off to witness completion."; another MSP Technician confirms; records name/ID + timestamp; if not available → Supervisor may override (pending) → Step 3.
   - STEP 3 — Tenant, CONDITIONAL: if plan "Tenant sign-off required = Yes" → "Tenant Sign-off" / "Have the Tenant confirm work completion."; records name/ID + timestamp. If "No" or Ad-hoc → Step 3 skipped automatically.
6. After all required sign-offs:
   - WO status → Completed; Supervisor notified (FCM + email) "Technician [Name] has completed Work Order [ID] and submitted for your review."; history "Completed and signed off by [Technician Name] at [timestamp]. Sign-offs: [list]."; toast "Work order submitted for Supervisor review."; buttons removed.
- Edge: Building Technician not on-site → pending confirmation. Sign-off fails (network) → "Failed to record sign-off. Please try again." (completed steps preserved). No undo per confirmed step (pending). Method ASSUMED = button confirmation for all 3 parties.

---

## Module 7 (MSP Technician App) > Resubmit Work Order (after Completion Rejected) (ID: 7.2.11)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Rejection details | Display | — | Rejected by / Rejected time / Rejection Reason (read-only) | Section/banner |
| [Review & Resubmit] | button | — | Status = Completion Rejected; no confirmation popup | Primary Button |
| Checklist / Photos / Part Replacement | interactive | — | Editable for correction (7.2.6 / 7.2.7 / 7.2.8) | Execution sections |

### User Flow (WO = Completion Rejected; Main Technician)
1. Technician opens WO Detail (7.2.4). Red banner: "Rejected by Supervisor [Name] on [date]. Reason: [reason]."
2. Technician reads the rejection reason carefully.
3. Technician reviews execution content and makes corrections:
   - If checklist items need correction: swipe to Execution tab → tap items → update Description / replace-add Photos.
   - If part replacement needs correction: remove incorrect entries / add new.
   - Note: whether checklist progress is PRESERVED or RESET after rejection is PENDING (assumption: preserved).
4. Technician taps [Review & Resubmit] (Primary, full-width).
5. System runs the same final validation as Submit & Sign Off (7.2.10 step 4):
   - If any Required Description empty: error toast "Please complete all required checklist items." → scrolls to first incomplete.
   - If any Required Photos missing: same error.
   - Else (valid): proceeds to sign-off sequence.
6. Sign-off sequence restarts from Step 1 (same 3-step process): all previous sign-offs cleared; fresh sign-off required (work modified; all parties must re-confirm).
7. After all sign-offs:
   - WO status → Completed (re-submitted); Supervisor notified "Technician [Name] has resubmitted Work Order [ID] after rejection."; history "Resubmitted by [Technician Name] at [timestamp]. (After rejection.)"; toast "Work order resubmitted for Supervisor review."
- Edge: Resubmit without changes → not blocked (validation only checks completion; Supervisor may reject again). Checklist reset (if confirmed) → re-complete all items. Network error → "Failed to resubmit. Please try again." → remains Completion Rejected.

---

## Module 7 (MSP Technician App) > View Asset List — Read-only (ID: 7.3.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by name or code" | TextField |
| [Scan QR] | button | — | Top-right; shortcut to 7.3.3 | Icon Button |
| Filter: Building | select | No | Technician's group buildings only | Dropdown |
| Filter: Asset System | select | No | Technician's group systems only | Dropdown |
| Filter: Status | select | No | All / Active / Inactive | Dropdown |
| Asset list item | Display | — | Asset Code / Name / System / Location / Status | List row → 7.3.2 |

### User Flow
1. Technician navigates to Assets in bottom navigation.
2. System loads assets matching User Group scope (Building AND Asset System must both match).
3. List items: Asset Code / Name / System / Location (Floor/Area) / Status badge.
4. [Scan QR] icon visible (top-right) → shortcut to QR scan (7.3.3).
5. Technician searches by name/code.
6. Technician taps filter → Building / Asset System / Status; [Apply] / [Reset].
7. Technician taps asset → Asset Detail (7.3.2).
8. Pull-to-refresh → refreshes; infinite scroll → next page.
9. No create/edit/deactivate (read-only). Empty state: "No assets found within your scope."
- Edge: Offline → cached with banner. Camera permission denied for QR → manual search only.

---

## Module 7 (MSP Technician App) > View Asset Detail — Read-only (ID: 7.3.2)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Asset Name / Code / Status badge | Display | — | Large bold title + subtitle | Header |
| QR Code | Display | — | Tap to zoom | Image |
| Classification | Display | — | System / Sub-system / Type | Section |
| Location | Display | — | Building / Floor / Area-Unit | Section |
| Asset Details | Display | — | Model / Serial / Brand / Purchase Date / Status | Section |
| Maintenance History | Display | — | WO ID / Plan Name / Round / Completed Date / Technician / Status | List → 7.2.4 |
| Pending WOs | Display | — | WO ID / Type / Assigned Date / Status | List → 7.2.4 |

### User Flow
1. Technician taps asset from list OR navigates from QR scan → Asset Detail loads.
2. Renders header (Name/Code/Status), QR code (tap zoom full-screen), Classification, Location, Asset Details.
3. Maintenance History: WO ID / Plan Name / Round / Completed Date / Technician / Status; shows Closed WOs within scope only; tap WO ID → WO Detail (7.2.4); empty "No maintenance history."
4. Pending WOs: WO ID / Type / Status / Assigned Date; tap → WO Detail (7.2.4); empty "No pending work orders."
5. No Edit/Deactivate (read-only).
- Edge: Scan QR for asset with active WO → routed to WO Detail (7.3.3 routing). WOs outside scope not shown. Load fail → "Failed to load asset details. Please go back and try again."

---

## Module 7 (MSP Technician App) > Scan Asset QR Code (ID: 7.3.3)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| [Scan QR] | button | — | From Asset List header, WO Detail, or Create WO | Icon Button |
| Camera overlay | Display | — | Scan frame; flash toggle; [Cancel] | Camera view |

### User Flow (camera permission must be granted)
1. Technician taps [Scan QR] icon.
2. Camera opens with scan frame overlay; flash toggle for low light; [Cancel] to exit.
3. Technician points camera at asset QR code:
   - If QR decoded AND asset found AND in scope AND active WO exists (Assigned/Started, assigned to this Technician): → WO Detail (7.2.4); toast "Work order found for [Asset Name]."
   - If found AND in scope AND no active WO: → Asset Detail (7.3.2); toast "No active work order for this asset."
   - If found BUT outside scope: does NOT navigate; error toast "This asset is outside your scope."
   - If asset not found: error toast "Asset not found. Please check the QR code and try again."
   - If QR detected but cannot decode: error toast "Unable to read this QR code. Please try again or search manually."
4. If camera fails to detect within 30s: hint "Having trouble? Make sure the QR code is well-lit and centered in the frame."
5. Technician taps [Cancel] → camera closes, returns to previous screen.
- Edge: Low light → flash icon (torch). Multiple QRs → reads largest/clearest. Angled/curved surface → adjust angle. Camera permission not granted → "Camera permission required. Please enable in device Settings => App => Camera." → Settings or manual search fallback.

---

## Module 7 (MSP Technician App) > View Asset Tags on Drawing — Read-only (ID: 7.3.4)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Building selector | select | — | User Group buildings only | Picker |
| PDF viewer | Display | — | pdfjs-dist WebView; pan + zoom (touch) | PDF Viewer |
| Tag pins | Display | — | Read-only | Map pins |
| Tag popup | Display | — | Asset Name / Code / Type / System / Status / Last Maintenance | Bottom sheet/overlay |
| [View Asset Detail] | button | — | — | Button → 7.3.2 |

### User Flow
1. Technician navigates to Assets → Drawing.
2. Selects Building from picker (User Group buildings only).
3. System loads drawing:
   - If no drawing: "No drawing uploaded for this building."
   - Else: PDF renders in viewer.
4. Technician: pinch zoom; drag pan; tag pins at saved coordinates.
5. Technician taps a tag pin → popup: Asset Name / Code / Type / System / Status / Last Maintenance Date; [View Asset Detail] → 7.3.2; [Close]/drag down to dismiss.
6. No [Edit Tags] (read-only).
- Edge: Only User Group buildings selectable. Dense pins → zoom to tap. Large PDF loads progressively. Pin for asset with active WO → popup shows status badge; [View Asset Detail] → Asset Detail → tap WO ID in Pending WOs → WO Detail.

---

## Module 7 (MSP Technician App) > View Spare Part List — Read-only (ID: 7.3.5)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Search bar | text | No | Placeholder "Search by name or code" | TextField |
| Filter: Status | select | No | All / Active / Inactive | Dropdown |
| Spare part list item | Display | — | Code / Name / Asset System / Available Stock / Total Stock / Status | List row → detail |

### User Flow
1. Technician navigates to Inventories.
2. System loads spare parts matching User Group scope.
3. List items: Code / Name / Asset System / Available Stock (highlighted) / Total Stock / Status badge.
4. Technician searches by name/code → real-time filter.
5. Technician taps Status filter → All / Active / Inactive.
6. Technician taps a spare part → read-only detail: Available (large, green) / On-Hold / Total counters; all sections (General Info / Stock Info / Supporting Info) in mobile layout; stock history log (last 10, [Load more]); no edit.
7. Pull-to-refresh → refreshes stock levels.
8. Empty state: "No spare parts found within your scope."
- Edge: Available = 0 → red; label "Out of stock." Offline → cached with banner.

---

## Module 7 (MSP Technician App) > Receive Push Notification (ID: 7.4.1)

### Fields/Components
| Field Name | Type | Required | Validation | Component |
|------------|------|----------|------------|-----------|
| Push notification | Display | — | Title / Body / deep-link action | OS notification (FCM) |
| In-app bell badge | Display | — | Unread count | Bell icon badge |

### User Flow (system-triggered)
1. Backend sends payload to FCM for this Technician's account. Online → immediate; offline → queued up to 28 days.
2. Trigger events (11):
   - WO Assigned: "New Work Order Assigned" → WO Detail (7.2.4).
   - WO from Maintenance Plan: "New Maintenance Work Order" → WO Detail.
   - Added as Sub Technician: "Added to Work Order" → WO Detail.
   - Completion Rejected: "Work Order Rejected" → WO Detail (Completion Rejected banner).
   - Ad-hoc Request Declined: "Ad-hoc Request Declined" → Ad-hoc Request List (7.2.2).
   - Spare Part Request Approved by BM: "Spare Part Request Approved" → WO Detail.
   - Spare Part Request Rejected by BM: "Spare Part Request Rejected" → WO Detail.
   - Spare Part Unavailable: "Spare Part Unavailable" → WO Detail.
   - WO Due Today: "Work Order Due Today" → WO Detail.
   - WO Overdue: "Work Order Overdue" → WO Detail.
   - WO Closed (BM final sign-off): "Work Order Closed" → WO Detail.
3. In-app handling: foreground → banner (auto-dismiss 4s); background → tray + badge increment; closed → cold-start + navigate.
4. Permissions: first install requests; denied → no push + in-app prompt to enable in Settings; logout → token unregistered; reinstall → token regenerated on next login.
- Edge: Already-processed WO → shows current status. Multiple offline → batched on reconnect. Token changes → auto-refreshed on next app open.

---

## 5. Dependencies & Relationships

### 5.1 Cross-app workflow dependency chain
The core data flows strictly through role hand-offs; each app depends on the output state of the previous:

```
Tenant/Web (origin) ──► BM App (4.3 Accept/Approve) ──► Supervisor App (6.2 Assign)
        ▲                                                          │
        │                                                          ▼
  BM App (4.4 Sign Off & Close) ◄── Supervisor App (6.2.7 Sign-off) ◄── Technician App (7.2 Execute & Sign-off)
```

- **Technician Request → Pending → Pending-Unassigned → Assigned → Started → Completed → Verified → Closed** is the master status chain. Each transition is owned by exactly one app, so the apps must agree on the status model and enforce **optimistic-concurrency / stale-status detection** ("This request has already been processed. Please refresh.") — present in every action flow.
- **Ad-hoc WO** can originate in the Technician app (7.2.1 → Technician Request) or the Supervisor app (6.2.1 → Pending). Both converge at the BM approval queue.
- **Spare Parts:** Technician (7.2.9) or Supervisor (6.2.6) requests → BM approves (web/notification) → On-Hold/stock-out. Recording actual usage is separate (7.2.8). The IMS stock model is owned by Web Admin (Module 1).

### 5.2 Foundational (shared) dependencies — build once, reuse across all 3 apps
- Authentication & session layer (token storage in Keychain/Keystore, 401 handling, lockout counter).
- Multi-language (EN/VI) i18n framework with per-account persistence.
- FCM push registration / token lifecycle (register on login, unregister on logout, refresh on reinstall).
- Read-only Asset / Spare Part / Drawing viewers (same screens, different scope rules: BM = assigned buildings; Supervisor/Technician = User Group buildings AND systems; Technician dashboard = self only).
- 5-stage WO progress bar, WO Detail tab shell (Details / Execution), photo full-screen viewer, bottom-sheet/native-alert patterns.

### 5.3 External / platform dependencies
- **AWS SES / SendGrid** — OTP and notification emails.
- **Firebase Cloud Messaging (FCM)** — all push notifications.
- **pdfjs-dist (WebView)** — drawing/PDF rendering with tag pins.
- **Device camera & photo library** — QR scan, avatar, execution photos (permission handling required).
- **Web Admin CMS (Module 1)** — source of all master data and scope definitions consumed by mobile.

### 5.4 Scope-rule dependency matrix
| App | Scope basis | Source |
|-----|-------------|--------|
| BM (4) | Buildings assigned to BM account (no User Group) | Web account config |
| Supervisor (6) | User Group = buildings AND asset systems | Web User Group config |
| Technician (7) | User Group (buildings AND systems); dashboard/WO list = own WOs only | Web User Group config |

---

## 6. Resource Allocation Summary

> Indicative allocation for a mobile build team. The three apps share a large foundation, so a unified React Native / cross-platform codebase with role-based modules is recommended over three separate codebases.

| Workstream | Indicative effort weight | Suggested resources |
|------------|--------------------------|---------------------|
| Shared foundation (auth, i18n, navigation, FCM, API/session, design system, read-only viewers) | ~25% | 2 senior mobile engineers |
| Module 7 — Technician app (execution core: checklist, photos, parts, sign-off, offline, QR) | ~30% | 2 mobile engineers (most complex) |
| Module 6 — Supervisor app (create, assign, review, sign-off, spare parts) | ~20% | 1–2 mobile engineers |
| Module 4 — BM app (approvals, sign-off & close, monitoring) | ~12% | 1 mobile engineer |
| Push notifications wiring (per app) + dashboards | ~8% | shared across team |
| QA / test (incl. concurrency, offline, permissions, EN/VI) | ~ continuous | 1–2 QA engineers |
| BA / UX support (resolve flagged assumptions) | ~ continuous | 1 BA, 1 UX |

**Skill mix required:** React Native/Expo (or native iOS+Android), FCM integration, secure storage, camera/QR (ML Kit / vision), PDF rendering in WebView, offline caching/sync, i18n, and a backend liaison for the shared API contract & status-transition concurrency.

**Reuse leverage:** The 3 Auth & Dashboard sub-modules (4.1, 6.1, 7.1) and the read-only Asset/Spare Part/Drawing screens (4.2, 6.3, 7.3) are ~80% identical across apps — building them as shared, scope-parameterized components is the single largest efficiency opportunity.

---

## 7. Risk Areas & Recommendations

### 7.1 Open assumptions flagged in the source spec (must be confirmed with the client before build-complete)
| ID | Open item | Current assumption | Recommendation |
|----|-----------|--------------------|----------------|
| 7.2.10 | Sign-off **method** for 3 parties | Button confirmation (no signature/OTP) in MVP | Confirm with client; signature capture changes UI + storage scope materially |
| 7.2.10 | Building Technician **not available** on-site | Supervisor may override (unconfirmed) | Confirm override path; affects WO completion blocking |
| 4.1.3 / 6.1.3 / 7.1.3 | **OTP validity** window | 10 minutes | Confirm; trivial config but affects support load |
| 7.1.6 | Offline **cache TTL** & local-draft persistence | 24 hours; drafts preserved | Confirm; drives offline architecture complexity |
| 7.2.6 / 7.2.11 | Checklist **preserved vs reset** after Completion Rejected | Preserved | Confirm; affects resubmit UX and data model |
| 7.2.7 | Max **photos per checklist item** | Undefined (recommend 10) | Set a hard cap to protect storage/upload bandwidth |
| 7.2.4 | **Sub Technician** permissions (Start/Submit) | Main only | Confirm whether Sub can execute |

### 7.2 Technical & delivery risks
1. **Concurrency / stale-state across clients (HIGH).** Every status-transition action can be raced by the web portal or another device. The spec consistently requires stale-status detection — this must be enforced **server-side** (optimistic locking), not just in the UI. Recommend a single source-of-truth status API with version/etag checks.
2. **Offline mode complexity (HIGH, Technician app).** Read-only offline + write-blocking is well-defined, but local-draft persistence, photo upload queueing, and sync-on-reconnect are flagged as "pending/if implemented." Recommend deciding MVP scope explicitly — a half-implemented offline queue is a common defect source.
3. **Photo/upload pipeline (MEDIUM).** Many execution photos (camera + gallery), 5 MB cap, per-photo background upload with retry, offline capture. Recommend resilient chunked/resumable upload and clear per-photo state indicators (already specified).
4. **Permissions handling (MEDIUM).** Camera + photo library across iOS/Android with explicit denied-state messages; QR scan and avatar both depend on it. Recommend a centralized permission service with the exact error strings from the spec.
5. **Notification deep-linking & cold start (MEDIUM).** ~11 Technician + multiple Supervisor/BM trigger events must each deep-link to the correct detail screen from foreground/background/closed states. Recommend a single notification-routing layer mapping event type → route.
6. **Scope-rule correctness (MEDIUM).** Three different scoping models (BM buildings; Supervisor/Technician User Group buildings+systems; Technician self-only). A scoping bug silently leaks or hides data. Recommend server-enforced scoping plus automated tests per role.
7. **i18n coverage (LOW–MEDIUM).** EN/VI with immediate re-render and per-account persistence; data content intentionally untranslated. Recommend a string-coverage lint to avoid hardcoded labels, and confirm Vietnamese diacritics render correctly (source file showed encoding artifacts on "Tiếng Việt").

### 7.3 Recommendations summary
- Build a **single cross-platform codebase** with shared foundation modules; parameterize the read-only and auth screens by role/scope.
- Lock the **WO status model and concurrency contract** with the backend first — it is the backbone all three apps depend on.
- Resolve the **7 flagged assumptions** (Section 7.1) before finalizing the execution and offline modules.
- Treat **Module 7 execution + offline** as the critical path and schedule it earliest with the most senior resources.
- Establish **shared design-system + notification-routing + permission services** as cross-cutting deliverables in Phase A.

---

*End of WBS Analysis. Mobile features documented in full structured detail: 59 (Module 4: 20, Module 6: 16, Module 7: 23). Web platforms (Modules 1, 2, 3, 5) summarized for context only, per scope.*
