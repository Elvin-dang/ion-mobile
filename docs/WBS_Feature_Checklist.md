# WBS Feature Checklist — Mobile Verification Contract

This document is the single source of truth for the I-ON (CMMS) **mobile** application implementation and verification. It covers ONLY the three React Native mobile apps. All field names, types, validations, error messages, and user-flow steps are extracted verbatim from the WBS source. Components are mapped to React Native Paper (MD3).

---

## Excluded Features (Not Mobile)

| ID | Feature | Reason |
|----|---------|--------|
| 1.x | Web Admin CMS (Authentication, User/Group Management, Master Data, Asset Management, Inventory, Maintenance Plans, Reports) | Web Admin CMS — desktop/browser admin console, not a mobile app |
| 2.x | Web Tenant Public Portal (Submit Service Request) | Public web portal for tenants in a browser — not a mobile app |
| 3.x | Web Building Manager Portal (Auth & Dashboard, Asset Management, Request Management, Work Order Management) | Web Building Manager Portal — desktop browser portal; the mobile BM equivalent is Module 4 |
| 5.x | Web MSP Supervisor Portal (Auth & Dashboard, Work Order & Request Management, Asset & Inventory, Maintenance Plan Management) | Web MSP Supervisor Portal — desktop browser portal; the mobile Supervisor equivalent is Module 6 |

Mobile-included modules only: **Module 4 (BM App)**, **Module 6 (MSP Supervisor App)**, **Module 7 (MSP Technician App)**.

---

## Summary Table

| ID | Module | Feature | Fields Count | Flow Steps | Verification Items | Status |
|----|--------|---------|-------------|------------|-------------------|--------|
| 4.1.1 | BM Auth | Login | 6 | 5 | 14 | DONE |
| 4.1.2 | BM Auth | Logout | 4 | 4 | 9 | DONE |
| 4.1.3 | BM Auth | Forgot Password | 11 | 6 | 18 | DONE |
| 4.1.4 | BM Auth | Multi-Language Switch | 4 | 4 | 9 | DONE |
| 4.1.5 | BM Auth | Dashboard | 4 | 7 | 13 | DONE |
| 4.1.6 | BM Auth | Account Settings | 10 | 7 | 18 | DONE |
| 4.2.1 | BM Asset | View Asset List | 7 | 9 | 12 | DONE |
| 4.2.2 | BM Asset | View Asset Detail | 9 | 6 | 11 | DONE |
| 4.2.3 | BM Asset | View Asset Tags on Drawing | 4 | 6 | 11 | DONE |
| 4.2.4 | BM Asset | View Spare Part List | 6 | 8 | 11 | DONE |
| 4.3.2 | BM Request | View Request Detail | 10 | 8 | 13 | DONE |
| 4.3.3 | BM Request | Approve Request | 3 | 6 | 11 | DONE |
| 4.3.4 | BM Request | Decline / Reject Request | 4 | 5 | 14 | DONE |
| 4.3.5 | BM Request | Accept Tenant Request | 3 | 6 | 10 | DONE |
| 4.3.6 | BM Request | Assign Request to MSP Supervisor | 5 | 6 | 12 | DONE |
| 4.4.1 | BM WO | View Work Order List | 7 | 10 | 12 | DONE |
| 4.4.2 | BM WO | View Work Order Detail | 12 | 5 | 12 | DONE |
| 4.4.3 | BM WO | Approve Completed WO (Sign Off & Close) | 3 | 6 | 12 | DONE |
| 4.4.4 | BM WO | Reject Completed Work Order | 4 | 6 | 13 | DONE |
| 4.5.1 | BM Notif | Receive Push Notification | 3 | 11 | 11 | DONE |
| 6.1.1 | SUP Auth | Login | 6 | 5 | 14 | DONE |
| 6.1.2 | SUP Auth | Logout | 4 | 4 | 9 | DONE |
| 6.1.3 | SUP Auth | Forgot Password | 11 | 6 | 18 | DONE |
| 6.1.4 | SUP Auth | Multi-Language Switch | 4 | 4 | 9 | DONE |
| 6.1.5 | SUP Auth | Dashboard | 4 | 6 | 12 | DONE |
| 6.2.1 | SUP WO/Req | Create Ad-hoc Work Order | 13 | 5 | 18 | DONE |
| 6.2.2 | SUP WO/Req | View Request & Work Order List | 6 | 10 | 12 | DONE |
| 6.2.3 | SUP WO/Req | View Work Order Detail | 9 | 7 | 13 | DONE |
| 6.2.4 | SUP WO/Req | Review & Approve/Decline Technician Ad-hoc Request | 5 | 10 | 14 | DONE |
| 6.2.5 | SUP WO/Req | Assign Work Order to Technician | 7 | 10 | 15 | DONE |
| 6.2.6 | SUP WO/Req | Spare Parts Request | 5 | 5 | 14 | DONE |
| 6.2.7 | SUP WO/Req | WO Completion Review & Sign-off | 9 | 7 | 16 | DONE |
| 6.3.1 | SUP Asset | View Asset List | 7 | 7 | 13 | DONE |
| 6.3.2 | SUP Asset | View Asset Detail | 9 | 5 | 11 | DONE |
| 6.3.4 | SUP Asset | View Spare Part List | 5 | 7 | 11 | DONE |
| 6.4.1 | SUP Notif | Receive Push Notification | 3 | 14 | 12 | DONE |
| 7.1.1 | TECH Auth | Login | 6 | 5 | 14 | DONE |
| 7.1.2 | TECH Auth | Logout | 4 | 4 | 9 | DONE |
| 7.1.3 | TECH Auth | Forgot Password | 11 | 6 | 18 | DONE |
| 7.1.4 | TECH Auth | Multi-Language Switch | 4 | 4 | 9 | DONE |
| 7.1.5 | TECH Auth | Dashboard | 3 | 6 | 12 | DONE |
| 7.1.6 | TECH Auth | Offline Mode | 4 | 6 | 11 | DONE |
| 7.2.1 | TECH WO Exec | Create Ad-hoc Work Order (Technician-initiated) | 11 | 5 | 17 | DONE |
| 7.2.2 | TECH WO Exec | View Ad-hoc Request List | 4 | 6 | 11 | DONE |
| 7.2.3 | TECH WO Exec | View Assigned Work Order List | 4 | 8 | 11 | DONE |
| 7.2.4 | TECH WO Exec | View Work Order Detail | 14 | 6 | 14 | DONE |
| 7.2.5 | TECH WO Exec | Start Work Order Execution | 3 | 6 | 11 | DONE |
| 7.2.6 | TECH WO Exec | Complete Work Checklist Items | 4 | 7 | 14 | DONE |
| 7.2.7 | TECH WO Exec | Upload Execution Photos | 6 | 7 | 14 | DONE |
| 7.2.8 | TECH WO Exec | Record Part Replacement | 6 | 7 | 14 | DONE |
| 7.2.9 | TECH WO Exec | Create Spare Parts Request | 5 | 4 | 14 | DONE |
| 7.2.10 | TECH WO Exec | Technician Sign-off | 6 | 6 | 14 | DONE |
| 7.2.11 | TECH WO Exec | Resubmit Work Order (after Completion Rejected) | 5 | 7 | 13 | DONE |
| 7.3.1 | TECH Asset | View Asset List | 7 | 11 | 12 | DONE |
| 7.3.2 | TECH Asset | View Asset Detail | 10 | 5 | 11 | DONE |
| 7.3.3 | TECH Asset | Scan Asset QR Code | 3 | 5 | 13 | DONE |
| 7.3.4 | TECH Asset | View Asset Tags on Drawing | 4 | 6 | 11 | DONE |
| 7.3.5 | TECH Asset | View Spare Part List | 5 | 8 | 11 | DONE |
| 7.4.1 | TECH Notif | Receive Push Notification | 3 | 2 | 12 | DONE |

Total Mobile Features: 59
Total Fields: 363
Total Flow Steps: 384
Total Verification Items: 740

---

# Module 4 — Mobile Building Manager App

## 4.1.1 BM Auth > Login
Status: DONE

### Fields/Components Verification
- [ ] EZAxis logo | type: image/display | required: no | validation: centered top | component: Image
- [ ] Email | type: text | required: yes | validation: keyboard type email, max 100 characters, format must be valid email, whitespace trimmed | component: TextInput (keyboardType="email-address")
- [ ] Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide password toggle | component: TextInput (secureTextEntry) with TextInput.Icon toggle
- [ ] Forgot Password? | type: hyperlink | required: no | validation: navigates to Forgot Password (4.1.3) | component: Button (mode="text")
- [ ] Login | type: button | required: yes | validation: primary, full-width, large tap target | component: Button (mode="contained")
- [ ] Loading indicator while authenticating | type: spinner | required: no | validation: shown on Login button while authenticating | component: ActivityIndicator / Button loading prop

### User Flow Verification
- [ ] Step 1: App opens. System checks for stored session token on device
  - [ ] Condition: Valid session token found -> navigates directly to Dashboard (4.1.5) => flow ends
  - [ ] Condition: No token or expired token -> renders Login screen
- [ ] Step 2: BM enters email and password => taps [Login]
  - [ ] Keyboard dismisses automatically when [Login] tapped
  - [ ] Loading spinner shown on [Login] button while authenticating
- [ ] Step 3: System validates fields
  - [ ] Condition: Email empty -> inline error below field; does NOT authenticate
  - [ ] Error message: "Email is required."
  - [ ] Condition: Password empty -> inline error; does NOT authenticate
  - [ ] Error message: "Password is required."
  - [ ] Condition: Email format invalid -> inline error; does NOT authenticate
  - [ ] Error message: "Please enter a valid email address."
- [ ] Step 4: System checks failed attempt counter
  - [ ] Condition: >= 5 consecutive failed attempts within last 15 min -> does NOT authenticate
  - [ ] Error message: "Too many failed attempts. Please try again in 15 minutes."
- [ ] Step 5: System queries backend
  - [ ] Condition: Email not found or role != Building Manager -> increments counter
  - [ ] Error message: "Invalid email or password."
  - [ ] Condition: Account Status = Inactive
  - [ ] Error message: "Your account is not active. Please contact the administrator."
  - [ ] Condition: Account Status = Pending (invitation not yet accepted)
  - [ ] Error message: "Your account is not yet activated. Please check your email for the invitation link."
  - [ ] Condition: Password mismatch -> increments counter
  - [ ] Error message: "Invalid email or password."
  - [ ] Condition: All valid -> session token stored securely (Keychain/Keystore), counter reset, last login updated
  - [ ] Navigation: Dashboard (4.1.5) scoped to BM's assigned buildings
  - [ ] Error message (edge - network): "No internet connection. Please check your network and try again."
  - [ ] Error message (edge - offline no cache): "You are offline. Please connect to log in."
  - [ ] Error message (edge - no buildings assigned): "No buildings assigned to your account. Please contact the administrator."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.1.2 BM Auth > Logout
Status: DONE

### Fields/Components Verification
- [ ] Sign out | type: menu item | required: no | validation: triggers logout confirmation; access via Bottom navigation => Profile/More => Sign out | component: List.Item
- [ ] Confirm Sign Out alert message | type: dialog text | required: no | validation: "Are you sure you want to sign out?" | component: Dialog
- [ ] Sign out (in alert) | type: button | required: yes | validation: destructive style | component: Button (textColor=error)
- [ ] Cancel (in alert) | type: button | required: no | validation: default style | component: Button (mode="text")

### User Flow Verification
- [ ] Step 1: BM taps Profile or More icon in bottom navigation
- [ ] Step 2: Profile/Settings screen opens. BM taps [Sign out] menu item
- [ ] Step 3: System shows native OS alert dialog
  - [ ] Title: "Sign Out"
  - [ ] Message: "Are you sure you want to sign out?"
  - [ ] Buttons: [Sign out] (destructive) | [Cancel]
- [ ] Step 4a: BM taps [Sign out] -> token invalidated server-side, removed from secure storage, cached data cleared
  - [ ] Navigation: Login screen (4.1.1)
- [ ] Step 4b: BM taps [Cancel] -> alert dismisses, remains authenticated
  - [ ] Error message (edge - session expired): "Your session has expired. Please log in again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.1.3 BM Auth > Forgot Password
Status: DONE

### Fields/Components Verification
Screen 1 - Enter Email:
- [ ] Page title | type: display | required: no | validation: "Forgot Password" | component: Appbar.Content / Text
- [ ] Instruction text | type: display | required: no | validation: "Enter your registered email address. We will send you a verification code." | component: Text
- [ ] Email | type: text | required: yes | validation: keyboard type email | component: TextInput (keyboardType="email-address")
- [ ] Continue | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")
- [ ] Back to Login | type: hyperlink | required: no | validation: navigates to Login (4.1.1) | component: Button (mode="text")

Screen 2 - Enter OTP & New Password:
- [ ] Page title | type: display | required: no | validation: "Reset Password" | component: Text
- [ ] Instruction text | type: display | required: no | validation: "Enter the verification code sent to [email]." | component: Text
- [ ] OTP Code | type: text | required: yes | validation: keyboard type numeric, 6 digits, large input | component: TextInput (keyboardType="numeric")
- [ ] Resend Code | type: hyperlink | required: no | validation: active after 60 seconds, shows countdown timer | component: Button (mode="text") + timer
- [ ] New Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Confirm New Password | type: text (masked) | required: yes | validation: must match, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Reset Password | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")

### User Flow Verification
- [ ] Step 1: BM taps [Forgot Password?] on Login screen => Screen 1 loads
- [ ] Step 2: BM enters email => taps [Continue]
  - [ ] Condition: Empty | Error message: "Email is required."
  - [ ] Condition: Format invalid | Error message: "Please enter a valid email address."
  - [ ] Condition: Email not found in BM accounts -> does NOT send OTP | Error message: "No account found with this email address."
  - [ ] Condition: Account Inactive -> does NOT send OTP | Error message: "Your account is not active. Please contact the administrator."
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please check your network and try again."
  - [ ] Condition: Valid -> OTP sent via AWS SES/SendGrid | Navigation: Screen 2
- [ ] Step 3: BM taps [Back to Login] | Navigation: Login (4.1.1), no OTP sent
- [ ] Step 4: Screen 2 shows masked email OTP was sent to
- [ ] Step 5: BM enters OTP / New Password / Confirm
  - [ ] Condition: OTP empty | Error message: "Please enter the verification code."
  - [ ] Condition: OTP wrong format | Error message: "Verification code must be 6 digits."
  - [ ] Condition: OTP incorrect (after 5 wrong attempts OTP invalidated, restart from Screen 1) | Error message: "Invalid verification code. Please try again."
  - [ ] Condition: OTP expired (> 10 min) -> returns to Screen 1 | Error message: "This code has expired. Please request a new one."
  - [ ] Condition: Password < 8 chars | Error message: "Password must be at least 8 characters."
  - [ ] Condition: Confirm mismatch | Error message: "Passwords do not match."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: All valid -> password updated, all active sessions invalidated | Navigation: Login (4.1.1) | Success toast: "Password reset successfully. Please log in with your new password."
- [ ] Step 6: [Resend Code] active after 60s with countdown -> new OTP sent, previous invalidated, countdown resets
  - [ ] Error message (edge - email delivery fails): "Failed to send verification code. Please try again later."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.1.4 BM Auth > Multi-Language Switch
Status: DONE

### Fields/Components Verification
- [ ] Language | type: selection list or toggle | required: no | validation: access via Profile/Settings => Language | component: List.Section / SegmentedButtons
- [ ] Options | type: selectable items | required: no | validation: English (EN) | Tiếng Việt (VI) | component: RadioButton.Item / List.Item
- [ ] Currently selected language highlighted | type: state | required: no | validation: highlighted | component: List.Item (selected styling)
- [ ] Tap to change | type: action | required: no | validation: applies immediately | component: TouchableRipple

### User Flow Verification
- [ ] Step 1: BM navigates to Profile => Settings => Language
- [ ] Step 2: Current language highlighted in a selection list
- [ ] Step 3: BM taps alternate language (EN or VI)
  - [ ] Condition: App immediately re-renders all UI text in selected language without restart
  - [ ] Condition: Data content (asset names, descriptions) is NOT translated
  - [ ] Condition: System saves preference to BM's account via API
  - [ ] Condition: Save succeeds -> preference persists across sessions and devices (web portal also reflects change)
  - [ ] Condition: Save fails (network issue) -> UI shows new language for current session only; reverts on next login
  - [ ] Error message: "Failed to save language preference. The change will apply to this session only."
- [ ] Step 4: Edge - switch while a form open -> field values preserved; labels/placeholders update

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.1.5 BM Auth > Dashboard
Status: DONE

### Fields/Components Verification
- [ ] Building selector | type: dropdown/picker | required: no | validation: BM's buildings only; hidden if only 1 building | component: Menu / Dropdown
- [ ] KPI cards | type: display cards | required: no | validation: Total Requests / Pending Approval / In Progress WOs / Completed WOs / Closed WOs; tappable, large tap targets, count bold | component: Card (touchable)
- [ ] Recent Activity list | type: list | required: no | validation: latest 5-10 updates; each item event type icon / description / timestamp / status badge; "See all" link | component: List.Item + Chip badge
- [ ] Bottom navigation | type: tab bar | required: no | validation: Home / Requests / Work Orders / Assets / More | component: BottomNavigation

### User Flow Verification
- [ ] Step 1: App opens to Dashboard; defaults Building = first assigned, Date Range = last 30 days
- [ ] Step 2: System fetches and renders KPI cards and Recent Activity list (no complex charts on mobile)
- [ ] Step 3: BM taps Building selector (only BM's assigned buildings) -> KPI cards re-fetch scoped to that building
- [ ] Step 4: BM taps a KPI card
  - [ ] Navigation: "Pending Approval" -> Request List filtered to Pending (4.3 view)
  - [ ] Navigation: "In Progress WOs" -> WO List filtered to Assigned + Started (4.4.1)
  - [ ] Navigation: "Closed WOs" -> WO List filtered to Closed (4.4.1)
- [ ] Step 5: BM taps a Recent Activity item -> relevant Request or WO Detail screen
- [ ] Step 6: BM pulls down to refresh -> re-fetches all data
- [ ] Step 7: Empty states
  - [ ] Error message: "No recent activity."
  - [ ] Error message: "No buildings assigned. Please contact the administrator."
  - [ ] Error message (edge - section fail): "Failed to load. Tap to retry."
  - [ ] Error message (edge - offline): "Showing cached data. Pull to refresh when online."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.1.6 BM Auth > Account Settings
Status: DONE

### Fields/Components Verification
Section: Personal Information
- [ ] Avatar | type: image upload | required: no | validation: circular display, tap to change (camera or gallery), JPG/PNG only, max 2MB | component: Avatar.Image + Menu
- [ ] Full Name | type: text | required: yes | validation: pre-filled, max 100 characters | component: TextInput
- [ ] Phone Number | type: text | required: no | validation: pre-filled, keyboard type phone | component: TextInput (keyboardType="phone-pad")
- [ ] Save (Personal Info) | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")

Section: Change Password
- [ ] Current Password | type: text (masked) | required: yes | validation: show/hide toggle | component: TextInput (secureTextEntry)
- [ ] New Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Confirm New Password | type: text (masked) | required: yes | validation: must match, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Save (Change Password) | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")

### User Flow Verification
- [ ] Step 1: BM navigates to Profile => Account Settings
- [ ] Step 2: Modifies Full Name, Phone, or Avatar; Avatar tap -> options "Take Photo" (camera) / "Choose from Library" (gallery)
- [ ] Step 3: Taps [Save] (profile)
  - [ ] Condition: Full Name empty | Error message: "Full name is required."
  - [ ] Condition: Full Name > 100 chars | Error message: "Full name must not exceed 100 characters."
  - [ ] Condition: Avatar invalid type | Error message: "Only JPG and PNG files are accepted."
  - [ ] Condition: Avatar too large | Error message: "File size must not exceed 2 MB."
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: Valid -> profile updated; avatar updates in Profile header | Success toast: "Profile updated successfully."
- [ ] Step 4: Taps [Cancel] -> navigates back, no change
- [ ] Step 5: BM navigates to Change Password section
- [ ] Step 6: Enters Current / New / Confirm passwords (masked, show/hide)
- [ ] Step 7: Taps [Save] (password)
  - [ ] Condition: Current Password empty | Error message: "Current password is required."
  - [ ] Condition: Current Password incorrect | Error message: "Current password is incorrect."
  - [ ] Condition: New Password < 8 chars | Error message: "Password must be at least 8 characters."
  - [ ] Condition: Confirm mismatch | Error message: "Passwords do not match."
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: Valid -> password updated; other sessions invalidated; current remains active | Success toast: "Password changed successfully."
  - [ ] Error message (edge - camera permission denied): "Camera permission is required to take a photo. Please enable it in your device settings."
  - [ ] Error message (edge - network update fail): "Failed to update. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.2.1 BM Asset > View Asset List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by name or code", top of screen, real-time filter | component: Searchbar
- [ ] Filter icon | type: button | required: no | validation: opens filter panel | component: IconButton
- [ ] Building (filter) | type: dropdown | required: no | validation: BM's assigned buildings only | component: Menu
- [ ] Asset System (filter) | type: dropdown | required: no | validation: All Systems | component: Menu
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Active / Inactive | component: Menu
- [ ] Asset list item | type: list row | required: no | validation: Asset Code / Asset Name / Asset System / Location (Floor/Area) / Status badge; tap => Asset Detail (4.2.2) | component: List.Item + Chip
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: pagination on scroll | component: FlatList (onRefresh, onEndReached)

### User Flow Verification
- [ ] Step 1: BM navigates to Assets in bottom navigation
- [ ] Step 2: System loads asset list scoped to BM's buildings (All Systems / All Status)
- [ ] Step 3: List items show Asset Code / Asset Name / Asset System / Location / Status badge
- [ ] Step 4: BM taps search bar -> types name or code -> list filters in real time
- [ ] Step 5: BM taps filter icon -> filter panel slides up (Building / Asset System / Status); [Apply] updates, [Reset] clears
- [ ] Step 6: BM taps an asset item | Navigation: Asset Detail (4.2.2)
- [ ] Step 7: BM pulls down -> refreshes list
- [ ] Step 8: BM scrolls to bottom -> loads next page
- [ ] Step 9: Empty state
  - [ ] Error message: "No assets found."
  - [ ] Error message (edge - offline): "Showing cached data."
  - [ ] Error message (edge - load fail, no cache): "Failed to load assets. Please check your connection and try again."
  - [ ] Condition: No [+ New Asset] / Edit / Deactivate actions shown (read-only)

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.2.2 BM Asset > View Asset Detail
Status: DONE

### Fields/Components Verification
- [ ] Back arrow | type: nav | required: no | validation: returns to list | component: Appbar.BackAction
- [ ] Asset Name | type: display | required: no | validation: large bold title | component: Text (titleLarge)
- [ ] QR Code | type: display | required: no | validation: tap to zoom full-screen | component: Image + Portal/Modal
- [ ] Status badge | type: display | required: no | validation: Active / Inactive | component: Chip
- [ ] Asset Classification section | type: display | required: no | validation: Asset System / Asset Sub-system / Asset Type (read-only) | component: List.Section
- [ ] Location section | type: display | required: no | validation: Building / Floor / Area/Unit (read-only) | component: List.Section
- [ ] Asset Details section | type: display | required: no | validation: Asset Code / Model / Serial Number / Brand / Purchase Date / Status (read-only) | component: List.Section
- [ ] Maintenance History list | type: list | required: no | validation: WO ID / Plan Name / Round / Completed Date / Technician / Status; tap WO ID => WO Detail; empty "No maintenance history." | component: List.Item
- [ ] Pending WOs list | type: list | required: no | validation: WO ID / Type / Status / Assigned Date; tap WO ID => WO Detail; empty "No pending work orders." | component: List.Item

### User Flow Verification
- [ ] Step 1: BM taps asset from list -> Asset Detail loads
- [ ] Step 2: System renders header, QR Code, Classification, Location, Asset Details sections
- [ ] Step 3: Maintenance History list -> tap WO ID navigates to WO Detail (4.4.2)
  - [ ] Error message (empty): "No maintenance history."
- [ ] Step 4: Pending WOs list -> tap WO ID navigates to WO Detail (4.4.2)
  - [ ] Error message (empty): "No pending work orders."
- [ ] Step 5: No Edit / Deactivate buttons shown (read-only)
- [ ] Step 6: BM taps QR Code -> full-screen zoom, tap to dismiss
  - [ ] Error message (edge - detail load fail): "Failed to load asset details. Please go back and try again."
  - [ ] Error message (edge - offline): "Showing cached data."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.2.3 BM Asset > View Asset Tags on Drawing (Read-only)
Status: DONE

### Fields/Components Verification
- [ ] Building selector | type: dropdown/picker | required: no | validation: BM's assigned buildings only | component: Menu
- [ ] PDF viewer | type: viewer | required: no | validation: pdfjs-dist, read-only tag pins, pan + zoom via touch | component: WebView / pdf viewer
- [ ] Tag pin | type: marker | required: no | validation: rendered at saved coordinates; tap opens popup | component: custom marker
- [ ] Tag popup | type: bottom sheet/overlay | required: no | validation: Asset Name / Code / Type / System / Status / Last Maintenance + [View Asset Detail] button | component: Portal + Surface (bottom sheet)

### User Flow Verification
- [ ] Step 1: BM navigates to Assets => Drawing
- [ ] Step 2: BM selects Building from picker (assigned buildings only)
- [ ] Step 3: System loads drawing
  - [ ] Condition: No drawing | Error message: "No drawing uploaded for this building. Upload via the web portal."
  - [ ] Condition: Drawing exists -> PDF renders
- [ ] Step 4: BM interacts (pinch to zoom, drag to pan, tag pins at saved coords)
- [ ] Step 5: BM taps a tag pin -> popup slides up (Asset Name / Code / Type / System / Status badge / Last Maintenance Date)
  - [ ] Navigation: [View Asset Detail] -> Asset Detail (4.2.2)
  - [ ] Condition: [X] or drag down dismisses popup
- [ ] Step 6: No [Edit Tags] button shown (read-only)
  - [ ] Error message (edge - drawing fail): "Failed to load drawing. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.2.4 BM Asset > View Spare Part List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by name or code", real-time filter | component: Searchbar
- [ ] Filter icon | type: button | required: no | validation: opens Status filter | component: IconButton
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Active / Inactive | component: Menu
- [ ] Spare Part list item | type: list row | required: no | validation: Code / Name / Asset System / Available Stock (highlighted, red if 0) / Total Stock / Status badge; tap => read-only detail | component: List.Item + Chip
- [ ] Stock counters (detail) | type: display | required: no | validation: Total / Available / On-Hold prominently displayed (large numbers) | component: Card / Text
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: refreshes stock, paginates | component: FlatList

### User Flow Verification
- [ ] Step 1: BM navigates to Inventories in bottom navigation
- [ ] Step 2: System loads spare parts scoped to BM's buildings
- [ ] Step 3: List items show Code / Name / Asset System / Available Stock / Total Stock / Status badge
- [ ] Step 4: BM searches by name or code -> real-time filter
- [ ] Step 5: BM taps filter -> Status filter (All / Active / Inactive)
- [ ] Step 6: BM taps a spare part -> read-only detail (stock counters Total/Available/On-Hold, stock history last 10, Load more)
- [ ] Step 7: BM pulls down -> refreshes stock levels
- [ ] Step 8: Empty state
  - [ ] Error message: "No spare parts found."
  - [ ] Condition: Available stock = 0 -> highlighted in red
  - [ ] Error message (edge - offline): "Showing cached data."
  - [ ] Condition: No [+ Create] / Edit / Deactivate actions (read-only)

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.3.2 BM Request > View Request Detail
Status: DONE

### Fields/Components Verification
- [ ] Back arrow | type: nav | required: no | validation: returns | component: Appbar.BackAction
- [ ] Request ID / Type badge / Status badge | type: display | required: no | validation: header info | component: Text + Chip
- [ ] Created date + Submitted by | type: display | required: no | validation: read-only | component: Text
- [ ] Location & Asset section | type: display | required: no | validation: Building / Floor / Area/Unit; Asset System / Asset Type / Asset | component: List.Section
- [ ] Issue description | type: display | required: no | validation: expandable if long, [Show more] toggle | component: Text + Button (text)
- [ ] Attachments | type: media | required: no | validation: photos/files; tap photo => full-screen swipe viewer; tap PDF => open; hidden if none | component: Image grid + Portal
- [ ] History log | type: list | required: no | validation: scrollable entries with timestamps; [Show all history] expands | component: List.Item
- [ ] Tenant Request actions | type: buttons | required: no | validation: [Accept] Primary full-width | [Decline] Secondary full-width (stacked) | component: Button
- [ ] Ad-hoc WO actions | type: buttons | required: no | validation: [Approve] Primary | [Reject] Secondary (stacked) | component: Button
- [ ] Service Request Accepted action | type: button | required: no | validation: [Assign to Supervisor] Primary full-width | component: Button

### User Flow Verification
- [ ] Step 1: BM taps request from notification or Request section -> Request Detail loads
- [ ] Step 2: System renders all sections based on request type and current status
- [ ] Step 3: BM taps photo attachment -> full-screen viewer with swipe between photos
- [ ] Step 4: BM taps [Show all history] -> full history timeline expands inline
- [ ] Step 5: For Tenant Requests (status = Tenant Request) -> [Accept] (Accept flow 4.3.5) / [Decline] (Decline flow 4.3.4)
- [ ] Step 6: For Ad-hoc WO (status = Pending) -> [Approve] (4.3.3) / [Reject] (4.3.4)
- [ ] Step 7: For Service Request Accepted -> [Assign to Supervisor] (4.3.6); label "Forwarded to Supervisor for review. You can assign a specific Supervisor."
- [ ] Step 8: For terminal/other statuses (Cancelled, Approval Rejected, Ad-hoc Declined) -> no action buttons, read-only with history
  - [ ] Error message (edge - stale status): "This request has already been processed. Please refresh."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.3.3 BM Request > Approve Request
Status: DONE

### Fields/Components Verification
- [ ] [Approve] | type: button | required: yes | validation: Primary, at bottom of Request Detail (status = Pending) | component: Button (mode="contained")
- [ ] Confirm Approve message | type: dialog text | required: no | validation: "Approve this work order? It will be available for the MSP Supervisor to assign." | component: Dialog
- [ ] Approve / Cancel (in alert) | type: buttons | required: yes | validation: Approve confirm style, Cancel default | component: Button

### User Flow Verification
- [ ] Step 1: BM views Request Detail (4.3.2) for a Pending Ad-hoc WO request
- [ ] Step 2: BM reviews all details and attachments
- [ ] Step 3: BM taps [Approve] at bottom
- [ ] Step 4: System shows native alert: "Approve this work order? It will be available for the MSP Supervisor to assign." [Approve] | [Cancel]
- [ ] Step 5: BM taps [Approve]
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: Status already changed | Error message: "This request has already been processed. Please refresh."
  - [ ] Condition: Valid -> Status => Pending - Unassigned; Supervisor notified | Success toast: "Work order approved."
- [ ] Step 6: BM taps [Cancel] -> alert dismisses, no change
  - [ ] Error message (edge - timeout): "Request timed out. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.3.4 BM Request > Decline / Reject Request
Status: DONE

### Fields/Components Verification
- [ ] [Decline] / [Reject] | type: button | required: yes | validation: Secondary, at bottom of Request Detail | component: Button (mode="outlined")
- [ ] Reason | type: textarea | required: yes | validation: placeholder "Enter reason...", max 500 characters, keyboard opens automatically, character counter | component: TextInput (multiline)
- [ ] Confirm | type: button | required: yes | validation: destructive style (red) | component: Button (buttonColor=error)
- [ ] Cancel | type: button | required: no | validation: default style | component: Button (mode="text")

### User Flow Verification
- [ ] Step 1: BM views Request Detail (4.3.2)
- [ ] Step 2: BM taps [Decline] (Tenant Requests) or [Reject] (Ad-hoc WOs)
- [ ] Step 3: Bottom sheet slides up (Title "Decline Request" or "Reject Work Order"; Reason textarea required; placeholder "Enter reason for declining / rejecting..."; char counter max 500; [Confirm] red | [Cancel])
- [ ] Step 4: BM enters reason => taps [Confirm]
  - [ ] Condition: Reason empty -> inline error; does NOT proceed | Error message: "Reason is required."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Status already changed | Error message: "This request has already been processed. Please refresh."
  - [ ] Condition: Tenant Request valid -> Status => Cancelled; tenant email sent | Success toast: "Request declined."
  - [ ] Condition: Ad-hoc WO valid -> Status => Approval Rejected; Supervisor notified | Success toast: "Work order rejected."
- [ ] Step 5: BM taps [Cancel] or drags bottom sheet down -> dismisses, no change

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.3.5 BM Request > Accept Tenant Request
Status: DONE

### Fields/Components Verification
- [ ] [Accept] | type: button | required: yes | validation: Primary, at bottom of Tenant Request Detail | component: Button (mode="contained")
- [ ] Confirm Accept message | type: dialog text | required: no | validation: "Accept this service request? It will be forwarded to the MSP Supervisor for review." | component: Dialog
- [ ] Accept / Cancel (in alert) | type: buttons | required: yes | validation: Accept confirm style, Cancel default | component: Button

### User Flow Verification
- [ ] Step 1: BM views Request Detail (4.3.2) for a Tenant Request
- [ ] Step 2: BM reviews issue description and attachments
- [ ] Step 3: BM taps [Accept] at bottom
- [ ] Step 4: Native alert: "Accept this service request? It will be forwarded to the MSP Supervisor for review." [Accept] | [Cancel]
- [ ] Step 5: BM taps [Accept]
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Status already changed | Error message: "This request has already been processed. Please refresh."
  - [ ] Condition: Valid -> Status => Service Request Accepted; Supervisor(s) + tenant notified | Success toast: "Service request accepted." | action buttons update: [Assign to Supervisor] appears
- [ ] Step 6: BM taps [Cancel] -> alert dismisses, no change

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.3.6 BM Request > Assign Request to MSP Supervisor
Status: DONE

### Fields/Components Verification
- [ ] [Assign to Supervisor] | type: button | required: yes | validation: Primary, full-width at bottom; shown when status = Service Request Accepted | component: Button (mode="contained")
- [ ] Search | type: text | required: no | validation: at top of supervisor list | component: Searchbar
- [ ] Supervisor list item | type: list row | required: no | validation: Supervisor Name / User Group / Buildings; tap to select (radio) | component: RadioButton.Item / List.Item
- [ ] Assign | type: button | required: yes | validation: Primary, enabled only when supervisor selected | component: Button (mode="contained", disabled)
- [ ] Cancel | type: button | required: no | validation: default | component: Button (mode="text")

### User Flow Verification
- [ ] Step 1: BM views Request Detail; [Assign to Supervisor] shown
- [ ] Step 2: BM taps [Assign to Supervisor]
- [ ] Step 3: Bottom sheet slides up (search bar; items Supervisor name / User Group / building coverage pills; single selection)
- [ ] Step 4: BM searches or scrolls to find Supervisor -> taps to select
- [ ] Step 5: BM taps [Assign]
  - [ ] Condition: No Supervisor selected -> [Assign] disabled (cannot tap)
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Valid -> Supervisor assigned as reviewer; Supervisor notified | Success toast: "Request assigned to [Supervisor Name]."
- [ ] Step 6: BM taps [Cancel] or drags sheet down -> dismisses, no change
  - [ ] Error message (edge - no supervisors): "No active MSP Supervisors available for your buildings."
  - [ ] Error message (edge - load fail): "Failed to load supervisors. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.4.1 BM WO > View Work Order List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by ID or asset name" | component: Searchbar
- [ ] Filter icon | type: button | required: no | validation: opens filter panel | component: IconButton
- [ ] Building (filter) | type: dropdown | required: no | validation: BM's assigned buildings only | component: Menu
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Pending / Pending-Unassigned / Assigned / Started / Completed / Verified / Closed / Cancelled | component: Menu
- [ ] WO Type (filter) | type: dropdown | required: no | validation: All / Maintenance Scheduling / Ad-hoc Work / Service Request | component: Menu
- [ ] Date Range (filter) | type: date range picker | required: no | validation: date range | component: DatePickerModal (range)
- [ ] WO list item | type: list row | required: no | validation: WO ID / Type badge / Asset Code / Location / Due Date (red if overdue) / Status badge; tap => WO Detail (4.4.2) | component: List.Item + Chip

### User Flow Verification
- [ ] Step 1: BM navigates to Work Orders in bottom navigation
- [ ] Step 2: System loads WOs for BM's buildings (sorted created date desc, default all statuses, last 30 days)
- [ ] Step 3: List items show WO ID / Type badge / Asset Code / Location / Due Date / Status badge
- [ ] Step 4: BM taps search bar -> searches by WO ID or Asset Code
- [ ] Step 5: BM taps filter icon -> filter panel (Building / Status / WO Type / Date Range); [Apply] / [Reset]
- [ ] Step 6: BM taps a WO | Navigation: WO Detail (4.4.2)
- [ ] Step 7: BM pulls down -> refreshes list
- [ ] Step 8: Infinite scroll -> loads next page
- [ ] Step 9: Overdue indicator -> red Due Date + overdue label
- [ ] Step 10: Empty state
  - [ ] Error message: "No work orders found for the selected filters."
  - [ ] Error message (edge - offline): "Showing cached data."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.4.2 BM WO > View Work Order Detail
Status: DONE

### Fields/Components Verification
- [ ] Back arrow | type: nav | required: no | validation: returns | component: Appbar.BackAction
- [ ] Title | type: display | required: no | validation: Asset Code + Work Type label | component: Text
- [ ] WO ID + Type badge + Created date | type: display | required: no | validation: header | component: Text + Chip
- [ ] 5-stage progress bar | type: display | required: no | validation: New => Pending => In Progress => Review => Approval; active stage highlighted | component: ProgressBar / custom Stepper
- [ ] Overview section | type: display | required: no | validation: Start Time / End Time (overdue) / Time Required / Location (Building/Floor/Area) / Asset Code / Asset Type / Sub-system / System | component: List.Section
- [ ] Tab: Details | type: tab | required: no | validation: Description / Photos (tap full-size) / Remark (read-only) | component: TabView + Image grid
- [ ] Tab: Execution | type: tab | required: no | validation: Main/Sub Technician cards / Work Checklist (N of total, expandable) / Part Replacement list (Source/Name/Code/Quantity) | component: TabView + Card + List.Accordion
- [ ] Main Technician card | type: display | required: no | validation: Name / Phone (tap to call) / Level | component: Card + Button (call)
- [ ] Plan / Tenant / History | type: display | required: no | validation: Maintenance Plan ref / Tenant contact / History log (last 5, expand all) | component: List.Section
- [ ] [Sign Off & Close] | type: button | required: no | validation: Primary, full-width, fixed bottom, only when status = Verified | component: Button (mode="contained")
- [ ] [Reject] | type: button | required: no | validation: Secondary, full-width, fixed bottom, only when status = Verified | component: Button (mode="outlined")
- [ ] Current stage context label | type: display | required: no | validation: below progress bar | component: Text

### User Flow Verification
- [ ] Step 1: BM taps WO from list or notification -> WO Detail loads
- [ ] Step 2: System renders header, 5-stage progress bar, Overview (scrollable)
- [ ] Step 3: Swipeable tabs - Details (read-only) and Execution (Main/Sub Tech cards, Work Checklist N/total expandable, Part Replacement, Plan ref, Tenant contact, History last 5)
- [ ] Step 4: Action buttons FIXED at bottom, visible ONLY when status = Verified ([Sign Off & Close] Primary / [Reject] Secondary stacked); all other statuses no buttons
- [ ] Step 5: BM taps phone number in Technician card -> native phone call initiated
  - [ ] Error message (edge - stale status): "Work order status has changed. Please refresh."
  - [ ] Error message (edge - load fail): "Failed to load work order details. Please go back and try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.4.3 BM WO > Approve Completed Work Order (Sign Off & Close)
Status: DONE

### Fields/Components Verification
- [ ] [Sign Off & Close] | type: button | required: yes | validation: Primary, full-width at bottom of WO Detail (status = Verified) | component: Button (mode="contained")
- [ ] Confirm Sign Off & Close message | type: dialog text | required: no | validation: "Sign off and close this work order? This action cannot be undone." | component: Dialog
- [ ] Sign Off & Close / Cancel (in alert) | type: buttons | required: yes | validation: confirm destructive style, Cancel default | component: Button

### User Flow Verification
- [ ] Step 1: BM opens WO Detail (4.4.2) for a Verified WO
- [ ] Step 2: BM carefully reviews checklist, photos per item, part replacement, sign-off records
- [ ] Step 3: BM taps [Sign Off & Close] fixed at bottom
- [ ] Step 4: Native alert (Title "Sign Off & Close"; Message "Sign off and close Work Order [WO ID]? This action cannot be undone."; [Sign Off & Close] destructive | [Cancel])
- [ ] Step 5: BM taps [Sign Off & Close]
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: Status changed concurrently | Error message: "Work order status has changed. Please refresh."
  - [ ] Condition: Valid -> sign-off recorded; WO status => Closed (terminal); all parties notified | Success toast: "Work order closed successfully."
- [ ] Step 6: BM taps [Cancel] -> alert dismisses; WO remains Verified

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.4.4 BM WO > Reject Completed Work Order
Status: DONE

### Fields/Components Verification
- [ ] [Reject] | type: button | required: yes | validation: Secondary, full-width at bottom of WO Detail (status = Verified) | component: Button (mode="outlined")
- [ ] Rejection Reason | type: textarea | required: yes | validation: placeholder "Enter rejection reason...", max 500 characters, keyboard opens automatically, character counter (red at 480) | component: TextInput (multiline)
- [ ] Reject | type: button | required: yes | validation: destructive style (red) | component: Button (buttonColor=error)
- [ ] Cancel | type: button | required: no | validation: default style | component: Button (mode="text")

### User Flow Verification
- [ ] Step 1: BM opens WO Detail (4.4.2) for a Verified WO
- [ ] Step 2: BM identifies an issue with the work or documentation
- [ ] Step 3: BM taps [Reject] fixed at bottom
- [ ] Step 4: Bottom sheet slides up (Title "Reject Work Order"; Message "Provide a reason for rejection. The MSP Supervisor will be notified."; Rejection Reason textarea required; placeholder "Describe why this work order is being rejected..."; char counter max 500; [Reject] red | [Cancel])
- [ ] Step 5: BM enters detailed reason => taps [Reject]
  - [ ] Condition: Reason empty -> inline error; does NOT proceed | Error message: "Rejection reason is required."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Status changed concurrently | Error message: "Work order status has changed. Please refresh."
  - [ ] Condition: Valid -> WO status => Verification Rejected; Supervisor notified; Technician NOT notified | Success toast: "Work order returned to Supervisor."
- [ ] Step 6: BM taps [Cancel] or drags bottom sheet down -> dismisses, no change

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 4.5.1 BM Notif > Receive Push Notification
Status: DONE

### Fields/Components Verification
- [ ] Push notification (device OS) | type: system notification | required: no | validation: FCM delivery + in-app badge | component: expo-notifications / FCM
- [ ] Notification list (bell icon) | type: list | required: no | validation: each entry icon / title / description / timestamp / read indicator; tap navigates | component: List.Item + Badge
- [ ] In-app banner (foreground) | type: banner | required: no | validation: top of screen, auto-dismiss after 4 seconds, tap to navigate | component: Banner / Snackbar

### User Flow Verification
- [ ] Step 1: System event occurs that triggers a notification for BM
- [ ] Step 2: Backend sends payload to Firebase Cloud Messaging (FCM)
- [ ] Step 3: FCM routes to all registered BM devices
- [ ] Step 4: Device online -> delivered immediately
- [ ] Step 5: Device offline -> FCM queues (expire after 28 days)
- [ ] Step 6: Trigger events and content
  - [ ] Condition: New Tenant Request -> Title "New Service Request" / Body "A tenant has submitted a service request for [Building Name]. Tap to review." / opens Request Detail
  - [ ] Condition: New Ad-hoc WO pending approval -> Title "Work Order Awaiting Approval" / Body "An ad-hoc work order request for [Building Name] requires your approval." / opens Request Detail
  - [ ] Condition: WO ready for sign-off (Verified) -> Title "Work Order Ready for Sign-off" / Body "Work Order [ID] has been reviewed by the Supervisor and is ready for your final sign-off." / opens WO Detail
  - [ ] Condition: Spare part request awaiting approval -> Title "Spare Part Request" / Body "A spare part request for Work Order [ID] requires your approval." / opens WO Detail (spare parts tab)
  - [ ] Condition: Low-stock alert -> Title "Low Stock Alert" / Body "Spare part [Name] stock is below minimum threshold. Current stock: [N]." / opens Spare Part Detail
  - [ ] Condition: Maintenance Plan submitted (Pending) -> Title "Maintenance Plan Pending Approval" / Body "A maintenance plan requires your approval for [Building Name]." / opens Plan Detail
- [ ] Step 7: App foreground -> in-app banner top, auto-dismiss 4s, tap to navigate
- [ ] Step 8: App background -> OS system tray, badge count increments
- [ ] Step 9: App closed -> OS notification, cold start on tap
- [ ] Step 10: BM taps notification -> app opens, navigates to detail, marked read, badge decrements
- [ ] Step 11: Notification permissions -> first install requests permission; denied -> not delivered, in-app prompt to enable in device settings

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

---

# Module 6 — Mobile MSP Supervisor App

## 6.1.1 SUP Auth > Login
Status: DONE

### Fields/Components Verification
- [ ] EZAxis logo | type: image/display | required: no | validation: centered top | component: Image
- [ ] Email | type: text | required: yes | validation: keyboard type email, max 100 characters, format valid email, whitespace trimmed | component: TextInput (keyboardType="email-address")
- [ ] Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Forgot Password? | type: hyperlink | required: no | validation: navigates to Forgot Password (6.1.3) | component: Button (mode="text")
- [ ] Login | type: button | required: yes | validation: primary, full-width, large tap target | component: Button (mode="contained")
- [ ] Loading indicator | type: spinner | required: no | validation: shown on Login button while authenticating | component: ActivityIndicator

### User Flow Verification
- [ ] Step 1: App opens. System checks for stored session token
  - [ ] Condition: Valid token -> Dashboard (6.1.5) scoped to User Group => flow ends
  - [ ] Condition: No token or expired -> renders Login screen
- [ ] Step 2: Supervisor enters email and password => taps [Login] (loading spinner shown)
- [ ] Step 3: System validates fields
  - [ ] Condition: Email empty | Error message: "Email is required."
  - [ ] Condition: Password empty | Error message: "Password is required."
  - [ ] Condition: Email format invalid | Error message: "Please enter a valid email address."
- [ ] Step 4: System checks failed attempt counter
  - [ ] Condition: >= 5 failed attempts within 15 min | Error message: "Too many failed attempts. Please try again in 15 minutes."
- [ ] Step 5: System queries backend
  - [ ] Condition: Email not found or role != MSP Supervisor -> increments counter | Error message: "Invalid email or password."
  - [ ] Condition: Account Inactive | Error message: "Your account is not active. Please contact the administrator."
  - [ ] Condition: Account has no User Group | Error message: "Your account has no scope assigned. Please contact the administrator."
  - [ ] Condition: Account Status = Pending | Error message: "Your account is not yet activated. Please check your email for the invitation link."
  - [ ] Condition: Password mismatch -> increments counter | Error message: "Invalid email or password."
  - [ ] Condition: All valid -> token stored, counter reset, last login updated | Navigation: Dashboard (6.1.5) scoped to User Group
  - [ ] Error message (edge - network): "No internet connection. Please check your network and try again."
  - [ ] Error message (edge - session expired): "Your session has expired. Please log in again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.1.2 SUP Auth > Logout
Status: DONE

### Fields/Components Verification
- [ ] Sign out | type: menu item | required: no | validation: access via Bottom navigation => Profile/More => Sign out | component: List.Item
- [ ] Confirm Sign Out message | type: dialog text | required: no | validation: "Are you sure you want to sign out?" | component: Dialog
- [ ] Sign out (in alert) | type: button | required: yes | validation: destructive | component: Button (textColor=error)
- [ ] Cancel (in alert) | type: button | required: no | validation: default | component: Button (mode="text")

### User Flow Verification
- [ ] Step 1: Supervisor taps Profile or More icon in bottom navigation
- [ ] Step 2: Profile/Settings opens. Supervisor taps [Sign out]
- [ ] Step 3: Native OS alert (Title "Sign Out"; Message "Are you sure you want to sign out?"; [Sign out] destructive | [Cancel])
- [ ] Step 4a: Supervisor taps [Sign out] -> token invalidated server-side, removed from device, cache cleared, FCM token unregistered
  - [ ] Navigation: Login screen (6.1.1)
  - [ ] Condition: 4b - Supervisor taps [Cancel] -> alert dismisses, remains authenticated
  - [ ] Error message (edge - session expired): "Your session has expired."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.1.3 SUP Auth > Forgot Password
Status: DONE

### Fields/Components Verification
Screen 1 - Enter Email:
- [ ] Page title | type: display | required: no | validation: "Forgot Password" | component: Text
- [ ] Instruction text | type: display | required: no | validation: "Enter your registered email address. We will send you a verification code." | component: Text
- [ ] Email | type: text | required: yes | validation: keyboard type email | component: TextInput (keyboardType="email-address")
- [ ] Continue | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")
- [ ] Back to Login | type: hyperlink | required: no | validation: navigates to Login (6.1.1) | component: Button (mode="text")

Screen 2 - Enter OTP & New Password:
- [ ] Page title | type: display | required: no | validation: "Reset Password" | component: Text
- [ ] Instruction text | type: display | required: no | validation: "Enter the verification code sent to [email]." | component: Text
- [ ] OTP Code | type: text | required: yes | validation: keyboard type numeric, 6 digits | component: TextInput (keyboardType="numeric")
- [ ] Resend Code | type: hyperlink | required: no | validation: active after 60 seconds, shows countdown | component: Button (mode="text") + timer
- [ ] New Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Confirm New Password | type: text (masked) | required: yes | validation: must match | component: TextInput (secureTextEntry)
- [ ] Reset Password | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")

### User Flow Verification
- [ ] Step 1: Supervisor taps [Forgot Password?] on Login => Screen 1
- [ ] Step 2: Enters email => taps [Continue]
  - [ ] Condition: Empty | Error message: "Email is required."
  - [ ] Condition: Format invalid | Error message: "Please enter a valid email address."
  - [ ] Condition: Not found in MSP Supervisor accounts | Error message: "No account found with this email address."
  - [ ] Condition: Account Inactive | Error message: "Your account is not active. Please contact the administrator."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Valid -> OTP sent via AWS SES/SendGrid | Navigation: Screen 2
- [ ] Step 3: Taps [Back to Login] | Navigation: Login (6.1.1)
- [ ] Step 4: Supervisor enters OTP / New Password / Confirm => taps [Reset Password]
  - [ ] Condition: OTP empty | Error message: "Please enter the verification code."
  - [ ] Condition: Wrong format | Error message: "Verification code must be 6 digits."
  - [ ] Condition: OTP incorrect (5 wrong -> invalidated, restart Screen 1) | Error message: "Invalid verification code."
  - [ ] Condition: OTP expired -> returns to Screen 1 | Error message: "This code has expired. Please request a new one."
  - [ ] Condition: Password < 8 chars | Error message: "Password must be at least 8 characters."
  - [ ] Condition: Confirm mismatch | Error message: "Passwords do not match."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: All valid -> password updated, all sessions invalidated | Navigation: Login (6.1.1) | Success toast: "Password reset successfully. Please log in with your new password."
- [ ] Step 5: [Resend Code] active after 60s -> new OTP sent, previous invalidated
- [ ] Step 6: Edge - email delivery fails | Error message: "Failed to send verification code. Please try again later."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.1.4 SUP Auth > Multi-Language Switch
Status: DONE

### Fields/Components Verification
- [ ] Language | type: selection list or toggle | required: no | validation: access via Profile/Settings => Language | component: SegmentedButtons / List.Section
- [ ] Options | type: selectable items | required: no | validation: English (EN) | Tiếng Việt (VI) | component: RadioButton.Item
- [ ] Currently selected language highlighted | type: state | required: no | validation: highlighted | component: List.Item (selected)
- [ ] Tap to switch | type: action | required: no | validation: applies immediately | component: TouchableRipple

### User Flow Verification
- [ ] Step 1: Supervisor navigates to Profile => Settings => Language
- [ ] Step 2: Selection list shows EN | VI; current highlighted
- [ ] Step 3: Supervisor taps alternate language
  - [ ] Condition: App immediately re-renders all UI text without restart
  - [ ] Condition: Data content (asset names, descriptions) NOT translated
  - [ ] Condition: Preference saved to account via API
  - [ ] Condition: Save succeeds -> persists across all sessions and devices (web portal reflects)
  - [ ] Condition: Save fails -> UI shows new language this session only | Error message: "Failed to save language preference. The change will apply to this session only."
- [ ] Step 4: Taps same language -> no action

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.1.5 SUP Auth > Dashboard
Status: DONE

### Fields/Components Verification
- [ ] Building selector | type: dropdown/picker | required: no | validation: Supervisor's User Group buildings only | component: Menu
- [ ] KPI cards | type: display cards | required: no | validation: Pending Assignment / In Progress / Pending Review / Technician Requests / Closed this period; large tap targets | component: Card (touchable)
- [ ] Recent Activity list | type: list | required: no | validation: latest 5-10 events (assignments, completions, rejections); Team Activity (active Technicians + WO status) | component: List.Item
- [ ] Bottom navigation | type: tab bar | required: no | validation: Home / Work Orders / Assets / More | component: BottomNavigation

### User Flow Verification
- [ ] Step 1: App opens to Dashboard; loads first building in User Group scope, last 30 days
- [ ] Step 2: System fetches and renders KPI cards, Team Activity, Recent Activity list
- [ ] Step 3: Supervisor taps Building selector (User Group buildings) -> KPI cards re-fetch
- [ ] Step 4: Supervisor taps a KPI card
  - [ ] Navigation: "Pending Assignment" -> WO List filtered to Pending - Unassigned (6.2.2)
  - [ ] Navigation: "Pending Review" -> WO List filtered to Completed (6.2.2)
  - [ ] Navigation: "Technician Requests" -> WO List filtered to Technician Request (6.2.2)
- [ ] Step 5: Supervisor taps a Recent Activity item -> relevant WO or Request Detail (6.2.3)
- [ ] Step 6: Supervisor pulls down -> refreshes all data
  - [ ] Error message (no Technicians): "No Technicians in your group."
  - [ ] Error message (no User Group): "No scope assigned. Please contact the administrator."
  - [ ] Error message (section fail): "Failed to load. Tap to retry."
  - [ ] Error message (offline): "Showing cached data. Pull to refresh when online."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.1 SUP WO/Req > Create Ad-hoc Work Order
Status: DONE

### Fields/Components Verification
- [ ] Page title | type: display | required: no | validation: "New Ad-hoc Work Order" | component: Appbar.Content
- [ ] Asset System | type: dropdown | required: yes | validation: Supervisor's group systems only | component: Menu
- [ ] Asset Sub-system | type: dropdown | required: no | validation: cascades from System | component: Menu
- [ ] Asset Type | type: dropdown | required: no | validation: cascades from Sub-system | component: Menu
- [ ] Asset | type: dropdown | required: no | validation: searchable, or [Scan QR] to auto-fill; out-of-scope -> "This asset is outside your scope." | component: Menu + IconButton (QR)
- [ ] Building | type: dropdown | required: yes | validation: Supervisor's group buildings only (or auto-filled from QR) | component: Menu
- [ ] Floor | type: dropdown | required: no | validation: cascades from Building | component: Menu
- [ ] Area/Unit | type: dropdown | required: no | validation: cascades from Floor | component: Menu
- [ ] Description | type: textarea | required: yes | validation: max 1000 characters, keyboard opens automatically | component: TextInput (multiline)
- [ ] Duration of Work | type: text | required: no | validation: e.g. "2 hours" | component: TextInput
- [ ] Priority | type: dropdown | required: no | validation: Low / Medium / High / Urgent | component: Menu
- [ ] Attachments | type: file input | required: no | validation: camera or gallery, JPG/PNG/PDF, max 5MB each, max 5 files | component: file picker
- [ ] Cancel / Submit | type: buttons | required: yes (Submit) | validation: Cancel Secondary full-width, Submit Primary full-width | component: Button

### User Flow Verification
- [ ] Step 1: Supervisor taps [+ New WO] / [Create Ad-hoc WO] in bottom navigation or WO list
- [ ] Step 2: Create Ad-hoc WO screen loads
- [ ] Step 3: Supervisor fills required fields; Asset [Scan QR] -> camera opens, scan auto-fills Asset/Building/Floor/Area; out-of-scope -> "This asset is outside your scope."
- [ ] Step 4: Supervisor taps [Submit]
  - [ ] Condition: Asset System not selected | Error message: "Asset System is required."
  - [ ] Condition: Building not selected | Error message: "Building is required."
  - [ ] Condition: Description empty | Error message: "Description is required."
  - [ ] Condition: Description > 1000 chars | Error message: "Description must not exceed 1000 characters."
  - [ ] Condition: Attachment invalid type | Error message: "Only JPG, PNG, and PDF files are accepted."
  - [ ] Condition: Attachment > 5MB | Error message: "Each file must not exceed 5 MB."
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: Valid -> WO created Status Pending; BM notified | Success toast: "Work order submitted for Building Manager approval." | Navigation: back to WO list
- [ ] Step 5: Supervisor taps [Cancel] -> navigates back without saving
  - [ ] Error message (edge - camera denied): "Camera permission required. Enable in device settings."
  - [ ] Error message (edge - QR scan fail): "Unable to scan QR code. Please select the asset manually."
  - [ ] Error message (edge - network): "Failed to create work order. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.2 SUP WO/Req > View Request & Work Order List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: searches by WO ID or asset code | component: Searchbar
- [ ] Filter: Building | type: dropdown | required: no | validation: User Group buildings only | component: Menu
- [ ] Filter: Status | type: dropdown | required: no | validation: per WO status groups | component: Menu
- [ ] Filter: WO Type | type: dropdown | required: no | validation: WO type | component: Menu
- [ ] Filter: Assigned Technician / Date Range | type: dropdown + date range | required: no | validation: assigned technician, date range | component: Menu + DatePickerModal
- [ ] WO list item | type: list row | required: no | validation: WO ID / Type badge / Status badge / Building / Asset Code / Due Date (red if overdue) / Assigned Technician name; tap => WO Detail (6.2.3) | component: List.Item + Chip

### User Flow Verification
- [ ] Step 1: Supervisor navigates to Work Orders in bottom navigation
- [ ] Step 2: System loads all WOs and requests within scope (default all statuses, last 30 days)
- [ ] Step 3: List items show WO ID / Type badge / Status badge / Building / Asset Code / Due Date / Assigned Technician name
- [ ] Step 4: Supervisor taps search bar -> searches by WO ID or asset code
- [ ] Step 5: Supervisor taps filter icon -> panel (Building / Status / WO Type / Assigned Technician / Date Range); [Apply] / [Reset]
- [ ] Step 6: Supervisor taps a WO/request item | Navigation: WO Detail (6.2.3)
- [ ] Step 7: Supervisor pulls down -> refreshes list
- [ ] Step 8: Infinite scroll -> loads next page
- [ ] Step 9: Overdue items -> red Due Date + overdue badge
- [ ] Step 10: Empty state
  - [ ] Error message: "No work orders found for the selected filters."
  - [ ] Error message (edge - offline): "Showing cached data."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.3 SUP WO/Req > View Work Order Detail
Status: DONE

### Fields/Components Verification
- [ ] Swipeable tabs (Details / Execution) | type: tabs | required: no | validation: mobile-optimized | component: TabView
- [ ] Photos | type: media | required: no | validation: pinch-zoom, full-screen viewer | component: Image + Portal
- [ ] Phone number | type: action | required: no | validation: tap => native call | component: Button (call)
- [ ] Verification Rejected banner | type: banner | required: no | validation: red banner at top when status = Verification Rejected | component: Banner (error)
- [ ] [Assign to Technician] | type: button | required: no | validation: Primary full-width, status Pending-Unassigned | component: Button (mode="contained")
- [ ] [Approve & Forward to BM] / [Decline] | type: buttons | required: no | validation: Primary / Secondary stacked, status Technician Request | component: Button
- [ ] [Sign Off & Forward to BM] / [Reject] | type: buttons | required: no | validation: Primary / Secondary stacked, status Completed | component: Button
- [ ] [Review & Resubmit to BM] | type: button | required: no | validation: Primary full-width, status Verification Rejected | component: Button (mode="contained")
- [ ] Action buttons fixed at bottom per status | type: layout | required: no | validation: other statuses no buttons (read-only) | component: View (fixed bottom)

### User Flow Verification
- [ ] Step 1: Supervisor taps WO from list -> WO Detail loads; swipes between tabs
- [ ] Step 2: Taps photos -> full-screen viewer; taps phone -> native call
- [ ] Step 3: When status = Pending - Unassigned -> [Assign to Technician] (Assign flow 6.2.5)
- [ ] Step 4: When status = Technician Request -> [Approve & Forward to BM] (native alert, 6.2.4) / [Decline] (bottom sheet required reason, 6.2.4)
- [ ] Step 5: When status = Completed -> review checklist/photos/parts/sign-off; [Sign Off & Forward to BM] (6.2.7) / [Reject] (bottom sheet required reason, 6.2.7)
- [ ] Step 6: When status = Verification Rejected -> red banner shows BM rejection reason; Supervisor cannot edit execution content (only optional note); [Review & Resubmit to BM] (6.2.7)
- [ ] Step 7: All other statuses read-only
  - [ ] Error message (edge - concurrent): stale status error toast
  - [ ] Error message (edge - load fail): "Failed to load. Please go back and try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.4 SUP WO/Req > Review & Approve/Decline Technician Ad-hoc Request
Status: DONE

### Fields/Components Verification
- [ ] [Approve & Forward to BM] | type: button | required: yes | validation: Primary full-width, status Technician Request | component: Button (mode="contained")
- [ ] [Decline] | type: button | required: yes | validation: Secondary full-width (stacked below) | component: Button (mode="outlined")
- [ ] Confirm Approve message | type: dialog text | required: no | validation: "Forward this request to Building Manager for approval?" | component: Dialog
- [ ] Decline Reason | type: textarea | required: yes | validation: max 500 characters, keyboard opens automatically, character counter | component: TextInput (multiline)
- [ ] Decline / Cancel (sheet) | type: buttons | required: yes | validation: Decline destructive (red), Cancel default | component: Button

### User Flow Verification
- [ ] Step 1: Supervisor opens WO Detail (6.2.3) for a Technician Request
- [ ] Step 2: Reviews all details, description, attachments (tap photos full-screen)
- [ ] Step 3: Supervisor taps [Approve & Forward to BM]
- [ ] Step 4: Native alert: "Forward this request to Building Manager for approval?" [Approve] | [Cancel]
- [ ] Step 5: Supervisor taps [Approve]
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Status already changed | Error message: "This request has already been processed. Please refresh."
  - [ ] Condition: Valid -> Status => Pending; BM notified | Success toast: "Request forwarded to Building Manager."
- [ ] Step 6: Taps [Cancel] -> alert dismisses, no change
- [ ] Step 7: Supervisor taps [Decline]
- [ ] Step 8: Bottom sheet slides up (Title "Decline Request"; Decline Reason textarea required; placeholder "Enter reason for declining..."; char counter max 500; [Decline] red | [Cancel])
- [ ] Step 9: Supervisor enters reason => taps [Decline]
  - [ ] Condition: Reason empty -> inline error | Error message: "Decline reason is required."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Valid -> Status => Ad-hoc Declined; Technician notified | Success toast: "Request declined."
- [ ] Step 10: Taps [Cancel] or drags bottom sheet down -> dismisses, no change

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.5 SUP WO/Req > Assign Work Order to Technician
Status: DONE

### Fields/Components Verification
- [ ] Search bar (Main Technician) | type: text | required: no | validation: at top of list | component: Searchbar
- [ ] Technician list (Main) | type: list | required: yes | validation: Active Technicians in User Group; each Avatar / Name / Level / active WO count (workload); tap to select (single, checkmark) | component: List.Item + Avatar
- [ ] [+ Add Sub Technician] | type: button | required: no | validation: Secondary, opens multi-select picker; selected shown as removable chips | component: Button + Chip
- [ ] Due Date | type: date picker | required: no | validation: format dd/mm/yyyy, manually set by Supervisor | component: DatePickerModal
- [ ] Notes | type: textarea | required: no | validation: max 500 characters | component: TextInput (multiline)
- [ ] Cancel | type: button | required: no | validation: default | component: Button (mode="text")
- [ ] Assign | type: button | required: yes | validation: Primary, enabled only when Main Technician selected | component: Button (disabled)

### User Flow Verification
- [ ] Step 1: Supervisor taps [Assign to Technician] on WO Detail (full-width bottom)
- [ ] Step 2: Assignment bottom sheet slides up
- [ ] Step 3: Supervisor searches or scrolls; workload indicator shows active WO count per Technician
- [ ] Step 4: Supervisor taps a Technician as Main Technician (checkmark)
- [ ] Step 5: Optionally taps [+ Add Sub Technician] -> multi-select picker
- [ ] Step 6: Optionally sets Due Date (manually set, no auto-calc)
- [ ] Step 7: Optionally adds Notes
- [ ] Step 8: Supervisor taps [Assign]
  - [ ] Condition: No Main Technician selected -> [Assign] disabled
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Status changed concurrently | Error message: "This work order has already been updated. Please refresh."
  - [ ] Condition: Selected Technician became inactive | Error message: "Selected Technician is no longer active. Please choose another."
  - [ ] Condition: Valid -> WO status => Assigned; Main + Sub Technicians notified | Success toast: "Work order assigned to [Technician Name]."
- [ ] Step 9: Supervisor taps [Cancel] or drags sheet down -> dismisses, no change
- [ ] Step 10: Adding Sub Technicians after initial assignment (Assigned/Started) -> [+ Add Sub Technician], same sheet excludes already-assigned; push notification to newly added
  - [ ] Error message (edge - no techs): "No active Technicians available in your group."
  - [ ] Error message (edge - load fail): "Failed to load technicians. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.6 SUP WO/Req > Spare Parts Request
Status: DONE

### Fields/Components Verification
- [ ] [Request Spare Parts] | type: button | required: no | validation: on WO Detail Execution tab | component: Button
- [ ] Spare Part | type: dropdown | required: yes | validation: searchable, Supervisor's scope (Active only); shows Part Name / Code / Available Stock / On-Hold | component: Menu (searchable)
- [ ] Quantity | type: number | required: yes | validation: keyboard type numeric, min 1 | component: TextInput (keyboardType="numeric")
- [ ] [+ Add another part] | type: button | required: no | validation: Secondary, adds another entry | component: Button
- [ ] Notes | type: textarea | required: no | validation: max 500 characters | component: TextInput (multiline)

### User Flow Verification
- [ ] Step 1: Supervisor opens WO Detail (6.2.3)
- [ ] Step 2: In Execution tab, Supervisor taps [Request Spare Parts]
- [ ] Step 3: Bottom sheet slides up "Request Spare Parts" (repeatable Part entry: Spare Part searchable dropdown + Quantity numeric min 1; Notes optional)
- [ ] Step 4: Supervisor taps [Submit Request]
  - [ ] Condition: Any Spare Part not selected | Error message: "Please select a spare part."
  - [ ] Condition: Any Quantity < 1 or empty | Error message: "Please enter a valid quantity."
  - [ ] Condition: Requested quantity > Available stock (warning, not blocked) | Error message: "Requested quantity exceeds available stock. This will be flagged as Unavailable."
  - [ ] Condition: Duplicate part entries (warning) | Error message: "Duplicate part detected. Please combine into one entry."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Valid -> sufficient stock On-Hold set / insufficient flagged Unavailable; BM notified | Success toast: "Spare parts request submitted for Building Manager approval."
- [ ] Step 5: Supervisor taps [Cancel] or drags sheet down -> dismisses, no request created
  - [ ] Error message (edge - empty dropdown): "No spare parts available for your scope."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.2.7 SUP WO/Req > Work Order Completion Review & Sign-off
Status: DONE

### Fields/Components Verification
- [ ] [Sign Off & Forward to BM] | type: button | required: no | validation: Primary full-width, status Completed | component: Button (mode="contained")
- [ ] [Reject] | type: button | required: no | validation: Secondary full-width, status Completed | component: Button (mode="outlined")
- [ ] [Review & Resubmit to BM] | type: button | required: no | validation: Primary full-width, status Verification Rejected | component: Button (mode="contained")
- [ ] Execution Summary (read-only) | type: display | required: no | validation: Checklist N of total (expandable items: Description filled / Photos), Part Replacement list, Sign-off records (Tech/Building Tech/Tenant + timestamps), Plan ref, History log | component: List.Accordion + Card
- [ ] Verification Rejected banner | type: banner | required: no | validation: "Rejected by [BM Name] on [date]. Reason: [rejection reason]" | component: Banner (error)
- [ ] Confirm Sign Off message | type: dialog text | required: no | validation: "Sign off and forward to Building Manager for final review?" | component: Dialog
- [ ] Rejection Reason | type: textarea | required: yes | validation: max 500 characters | component: TextInput (multiline)
- [ ] Reject / Cancel (sheet) | type: buttons | required: yes | validation: Reject destructive, Cancel default | component: Button
- [ ] Confirm Resubmit message | type: dialog text | required: no | validation: "Resubmit this work order to Building Manager?" | component: Dialog

### User Flow Verification
- [ ] Step 1: When status = Completed, Supervisor opens WO Detail (6.2.3); Execution tab shows full checklist and sign-off records
- [ ] Step 2: Supervisor reviews checklist items (expandable, Description + Photos), Part Replacement, Sign-off records (timestamps)
- [ ] Step 3: Supervisor taps [Sign Off & Forward to BM]
  - [ ] Native alert: "Sign off and forward to Building Manager? Verify all checklist items, photos, and signatures are complete." [Sign Off] | [Cancel]
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Status changed concurrently | Error message: "Work order status has changed. Please refresh."
  - [ ] Condition: Valid -> sign-off recorded; Status => Verified; BM notified | Success toast: "Work order forwarded to Building Manager."
- [ ] Step 4: Supervisor taps [Reject]
  - [ ] Bottom sheet (Title "Reject Work Order"; Rejection Reason required; placeholder "Describe what needs to be corrected..."; char counter max 500; [Reject] | [Cancel])
  - [ ] Condition: Reason empty -> inline error | Error message: "Rejection reason is required."
  - [ ] Condition: Valid -> Status => Completion Rejected; Technician notified | Success toast: "Work order returned to Technician."
- [ ] Step 5: When status = Verification Rejected -> red banner "Rejected by [BM Name] on [date]. Reason: [reason]."
- [ ] Step 6: Supervisor reviews BM feedback; CANNOT edit execution content (only optional note)
- [ ] Step 7: Supervisor taps [Review & Resubmit to BM]
  - [ ] Native alert: "Confirm that you have addressed the rejection reason and the work order is ready for resubmission." [Resubmit] | [Cancel]
  - [ ] Condition: Confirms -> Status => Verified (re-enters Approval); BM notified | Success toast: "Work order resubmitted to Building Manager."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.3.1 SUP Asset > View Asset List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by name or code" | component: Searchbar
- [ ] [Scan QR] | type: icon button | required: no | validation: top-right; in-scope -> Asset Detail; out-of-scope error | component: IconButton
- [ ] Building (filter) | type: dropdown | required: no | validation: User Group buildings only | component: Menu
- [ ] Asset System (filter) | type: dropdown | required: no | validation: User Group systems only | component: Menu
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Active / Inactive | component: Menu
- [ ] Asset list item | type: list row | required: no | validation: Asset Code / Name / Asset System / Location / Status badge; tap => Asset Detail (6.3.2) | component: List.Item + Chip
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: pagination | component: FlatList

### User Flow Verification
- [ ] Step 1: Supervisor navigates to Assets in bottom navigation
- [ ] Step 2: System loads assets matching User Group scope (Building AND System both match)
- [ ] Step 3: Supervisor searches or filters -> list updates
- [ ] Step 4: Supervisor taps [Scan QR] -> camera opens
  - [ ] Condition: Asset in scope | Navigation: Asset Detail (6.3.2)
  - [ ] Condition: Asset out of scope | Error message: "This asset is outside your scope."
  - [ ] Condition: QR unreadable | Error message: "Unable to scan. Please search manually."
- [ ] Step 5: Supervisor taps asset | Navigation: Asset Detail (6.3.2)
- [ ] Step 6: Pull-to-refresh -> reloads list
- [ ] Step 7: Empty state
  - [ ] Error message: "No assets found within your scope."
  - [ ] Error message (edge - load fail): "Failed to load assets. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.3.2 SUP Asset > View Asset Detail
Status: DONE

### Fields/Components Verification
- [ ] Back arrow | type: nav | required: no | validation: returns | component: Appbar.BackAction
- [ ] Asset Name | type: display | required: no | validation: large bold title | component: Text (titleLarge)
- [ ] Status badge | type: display | required: no | validation: Active / Inactive | component: Chip
- [ ] Asset Classification section | type: display | required: no | validation: Asset System / Sub-system / Asset Type (read-only) | component: List.Section
- [ ] Location section | type: display | required: no | validation: Building / Floor / Area/Unit (read-only) | component: List.Section
- [ ] Asset Details section | type: display | required: no | validation: Asset Code / Model / Serial Number / Brand / Purchase Date / Status (read-only) | component: List.Section
- [ ] Maintenance History list | type: list | required: no | validation: WO ID / Plan Name / Round / Completed Date / Technician / Status; scoped Closed WOs; tap WO ID => WO Detail; empty "No maintenance history." | component: List.Item
- [ ] Pending WOs list | type: list | required: no | validation: WO ID / Type / Status / Assigned Date; tap WO ID => WO Detail; empty "No pending work orders." | component: List.Item
- [ ] No action buttons | type: state | required: no | validation: fully read-only | component: n/a

### User Flow Verification
- [ ] Step 1: Supervisor taps asset from list (or from QR scan) -> Asset Detail loads
- [ ] Step 2: System renders header, Classification, Location, Asset Details sections
- [ ] Step 3: Maintenance History (scoped Closed WOs) -> tap WO ID navigates to WO Detail (6.2.3)
  - [ ] Error message (empty): "No maintenance history."
- [ ] Step 4: Pending WOs -> tap WO ID navigates to WO Detail (6.2.3)
  - [ ] Error message (empty): "No pending work orders."
- [ ] Step 5: No Edit / Deactivate buttons; all read-only
  - [ ] Error message (edge - load fail): "Failed to load asset details. Please go back and try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.3.4 SUP Asset > View Spare Part List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by name or code" | component: Searchbar
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Active / Inactive | component: Menu
- [ ] Spare Part list item | type: list row | required: no | validation: Code / Name / Asset System / Available Stock (highlighted) / Total Stock / Status badge; tap => read-only detail | component: List.Item + Chip
- [ ] Stock counters (detail) | type: display | required: no | validation: Available (large, green) / On-Hold / Total; stock history last 10, Load more | component: Card / Text
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: updates stock in real time | component: FlatList

### User Flow Verification
- [ ] Step 1: Supervisor navigates to Inventories in bottom navigation
- [ ] Step 2: System loads spare parts matching User Group scope (Asset Systems AND Buildings both match)
- [ ] Step 3: Supervisor searches by name or code -> real-time filter
- [ ] Step 4: Supervisor taps Status filter -> All / Active / Inactive
- [ ] Step 5: Supervisor taps a spare part -> read-only detail (Available prominent, On-Hold, Total, stock history last 10 + Load more)
- [ ] Step 6: Supervisor pulls down -> refreshes stock levels
- [ ] Step 7: Empty state
  - [ ] Error message: "No spare parts found within your scope."
  - [ ] Condition: Available = 0 -> highlighted red, label "Out of stock."
  - [ ] Error message (edge - detail fail): "Failed to load spare part details. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 6.4.1 SUP Notif > Receive Push Notification
Status: DONE

### Fields/Components Verification
- [ ] Push notification (device OS) | type: system notification | required: no | validation: FCM delivery; system-triggered, no dedicated UI | component: expo-notifications / FCM
- [ ] Notification structure | type: payload | required: no | validation: Title (short label) / Body (WO ID + Building) / Action (deep link) | component: notification payload
- [ ] In-app bell icon | type: icon + badge | required: no | validation: unread notification count badge | component: IconButton + Badge

### User Flow Verification
- [ ] Step 1: System event triggers notification for MSP Supervisor
- [ ] Step 2: Backend sends payload to FCM
- [ ] Step 3: FCM routes to all registered devices for this Supervisor account
- [ ] Step 4: Online device -> delivered immediately
- [ ] Step 5: Offline device -> FCM queues (expire after 28 days)
- [ ] Step 6: Trigger event - New Technician Ad-hoc Request -> Title "New Technician Request" / Body "Technician [Name] submitted an ad-hoc work order request. Tap to review." / opens WO Detail (6.2.3)
- [ ] Step 7: Trigger event - WO Ready to Assign -> Title "Work Order Ready for Assignment" / Body "Work Order [ID] for [Building Name] is approved and ready for Technician assignment." / opens WO Detail (6.2.3)
- [ ] Step 8: Trigger event - Verification Rejected by BM -> Title "Work Order Returned by Building Manager" / Body "Work Order [ID] rejected by [BM Name]. Please review and resubmit." / opens WO Detail (6.2.3)
- [ ] Step 9: Trigger event - Spare Part Request Approved -> Title "Spare Part Request Approved" / Body "Building Manager approved the spare part request for Work Order [ID]." / opens WO Detail (6.2.3)
- [ ] Step 10: Trigger event - Spare Part Request Rejected -> Title "Spare Part Request Rejected" / Body "Building Manager rejected the spare part request for Work Order [ID]." / opens WO Detail (6.2.3)
- [ ] Step 11: Trigger event - Spare Part Unavailable -> Title "Spare Part Unavailable" / Body "Spare part [Name] is unavailable for Work Order [ID]. BM has been notified." / opens WO Detail (6.2.3)
- [ ] Step 12: Trigger event - Stock Available -> Title "Spare Part Now Available" / Body "Spare part [Name] is now available for Work Order [ID]." / opens WO Detail (6.2.3)
- [ ] Step 13: Trigger event - Maintenance Plan Approved -> Title "Maintenance Plan Approved" / Body "Your maintenance plan [Name] has been approved. WOs will be generated on the next cycle." / navigates to log in to web portal; Maintenance Plan Rejected -> Title "Maintenance Plan Rejected" / Body "Your maintenance plan [Name] was rejected. Reason: [reason]. Please revise and resubmit." / navigates to web portal
- [ ] Step 14: In-app handling - foreground in-app banner auto-dismiss 4s; background OS tray badge increment; closed cold-start; tap navigates and marks read; first install OS permission request; denied -> in-app prompt to enable in Settings; logout unregisters FCM token

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

---

# Module 7 — Mobile MSP Technician App

## 7.1.1 TECH Auth > Login
Status: DONE

### Fields/Components Verification
- [ ] EZAxis logo | type: image/display | required: no | validation: centered top | component: Image
- [ ] Email | type: text | required: yes | validation: keyboard type email, max 100 characters, format valid email | component: TextInput (keyboardType="email-address")
- [ ] Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Forgot Password? | type: hyperlink | required: no | validation: navigates to Forgot Password (7.1.3) | component: Button (mode="text")
- [ ] Login | type: button | required: yes | validation: primary, full-width, large tap target | component: Button (mode="contained")
- [ ] Loading indicator | type: spinner | required: no | validation: shown while authenticating | component: ActivityIndicator

### User Flow Verification
- [ ] Step 1: App opens. System checks for stored session token
  - [ ] Condition: Valid token -> Dashboard (7.1.5) showing only this Technician's WOs => flow ends
  - [ ] Condition: No token or expired -> renders Login screen
- [ ] Step 2: Technician enters email and password => taps [Login] (loading spinner)
- [ ] Step 3: System validates fields
  - [ ] Condition: Email empty | Error message: "Email is required."
  - [ ] Condition: Password empty | Error message: "Password is required."
  - [ ] Condition: Email format invalid | Error message: "Please enter a valid email address."
- [ ] Step 4: System checks failed attempt counter
  - [ ] Condition: >= 5 failed attempts within 15 min | Error message: "Too many failed attempts. Please try again in 15 minutes."
- [ ] Step 5: System queries backend
  - [ ] Condition: Email not found or role != MSP Technician -> increments counter | Error message: "Invalid email or password."
  - [ ] Condition: Account Inactive | Error message: "Your account is not active. Please contact your Supervisor."
  - [ ] Condition: Account has no User Group | Error message: "Your account has no scope assigned. Please contact your Supervisor."
  - [ ] Condition: Account Status = Pending | Error message: "Your account is not yet activated. Please check your email for the invitation link."
  - [ ] Condition: Password mismatch -> increments counter | Error message: "Invalid email or password."
  - [ ] Condition: All valid -> token stored, counter reset, last login updated | Navigation: Dashboard (7.1.5)
  - [ ] Error message (edge - network): "No internet connection. Please check your network and try again."
  - [ ] Error message (edge - session expired): "Your session has expired. Please log in again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.1.2 TECH Auth > Logout
Status: DONE

### Fields/Components Verification
- [ ] Sign out | type: menu item | required: no | validation: access via Bottom navigation => Profile/More => Sign out | component: List.Item
- [ ] Confirm Sign Out message | type: dialog text | required: no | validation: "Are you sure you want to sign out?" | component: Dialog
- [ ] Sign out (in alert) | type: button | required: yes | validation: destructive | component: Button (textColor=error)
- [ ] Cancel (in alert) | type: button | required: no | validation: default | component: Button (mode="text")

### User Flow Verification
- [ ] Step 1: Technician taps Profile or More icon in bottom navigation
- [ ] Step 2: Profile/Settings opens. Technician taps [Sign out]
- [ ] Step 3: Native OS alert (Title "Sign Out"; Message "Are you sure you want to sign out?"; [Sign out] destructive | [Cancel])
- [ ] Step 4a: Technician taps [Sign out] -> token invalidated server-side, removed from device, cache cleared, FCM token unregistered
  - [ ] Navigation: Login screen (7.1.1)
  - [ ] Condition: 4b - Technician taps [Cancel] -> alert dismisses, remains authenticated
  - [ ] Error message (edge - session expired): "Your session has expired."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.1.3 TECH Auth > Forgot Password
Status: DONE

### Fields/Components Verification
Screen 1 - Enter Email:
- [ ] Page title | type: display | required: no | validation: "Forgot Password" | component: Text
- [ ] Instruction text | type: display | required: no | validation: "Enter your registered email address. We will send you a verification code." | component: Text
- [ ] Email | type: text | required: yes | validation: keyboard type email | component: TextInput (keyboardType="email-address")
- [ ] Continue | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")
- [ ] Back to Login | type: hyperlink | required: no | validation: navigates to Login (7.1.1) | component: Button (mode="text")

Screen 2 - Enter OTP & New Password:
- [ ] Page title | type: display | required: no | validation: "Reset Password" | component: Text
- [ ] Instruction text | type: display | required: no | validation: "Enter the verification code sent to [email]." | component: Text
- [ ] OTP Code | type: text | required: yes | validation: keyboard type numeric, 6 digits | component: TextInput (keyboardType="numeric")
- [ ] Resend Code | type: hyperlink | required: no | validation: active after 60 seconds, shows countdown timer | component: Button (mode="text") + timer
- [ ] New Password | type: text (masked) | required: yes | validation: min 8 characters, show/hide toggle | component: TextInput (secureTextEntry)
- [ ] Confirm New Password | type: text (masked) | required: yes | validation: must match | component: TextInput (secureTextEntry)
- [ ] Reset Password | type: button | required: yes | validation: primary, full-width | component: Button (mode="contained")

### User Flow Verification
- [ ] Step 1: Technician taps [Forgot Password?] on Login => Screen 1
- [ ] Step 2: Enters email => taps [Continue]
  - [ ] Condition: Empty | Error message: "Email is required."
  - [ ] Condition: Format invalid | Error message: "Please enter a valid email address."
  - [ ] Condition: Not found in MSP Technician accounts | Error message: "No account found with this email address."
  - [ ] Condition: Account Inactive | Error message: "Your account is not active. Please contact your Supervisor."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Valid -> OTP sent via AWS SES/SendGrid | Navigation: Screen 2
- [ ] Step 3: Taps [Back to Login] | Navigation: Login (7.1.1)
- [ ] Step 4: Technician enters OTP / New Password / Confirm => taps [Reset Password]
  - [ ] Condition: OTP empty | Error message: "Please enter the verification code."
  - [ ] Condition: Wrong format | Error message: "Verification code must be 6 digits."
  - [ ] Condition: OTP incorrect (5 wrong -> invalidated, restart Screen 1) | Error message: "Invalid verification code."
  - [ ] Condition: OTP expired -> returns to Screen 1 | Error message: "This code has expired. Please request a new one."
  - [ ] Condition: Password < 8 chars | Error message: "Password must be at least 8 characters."
  - [ ] Condition: Confirm mismatch | Error message: "Passwords do not match."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: All valid -> password updated, all sessions invalidated | Navigation: Login (7.1.1) | Success toast: "Password reset successfully. Please log in with your new password."
- [ ] Step 5: [Resend Code] active after 60s -> new OTP sent, previous invalidated
- [ ] Step 6: Edge - email delivery fails | Error message: "Failed to send verification code. Please try again later."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.1.4 TECH Auth > Multi-Language Switch
Status: DONE

### Fields/Components Verification
- [ ] Language | type: selection list or toggle | required: no | validation: access via Profile/Settings => Language | component: SegmentedButtons / List.Section
- [ ] Options | type: selectable items | required: no | validation: English (EN) | Tiếng Việt (VI) | component: RadioButton.Item
- [ ] Currently selected language highlighted | type: state | required: no | validation: highlighted | component: List.Item (selected)
- [ ] Tap to switch | type: action | required: no | validation: applies immediately | component: TouchableRipple

### User Flow Verification
- [ ] Step 1: Technician navigates to Profile => Settings => Language
- [ ] Step 2: Selection list English (EN) | Tiếng Việt (VI); current highlighted
- [ ] Step 3: Technician taps alternate language
  - [ ] Condition: App immediately re-renders all UI text without restart
  - [ ] Condition: Data content (asset names, descriptions) NOT translated
  - [ ] Condition: Preference saved to account via API
  - [ ] Condition: Save succeeds -> persists across sessions and devices
  - [ ] Condition: Save fails -> UI shows new language this session only | Error message: "Failed to save language preference. The change will apply to this session only."
- [ ] Step 4: Taps same language -> no action

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.1.5 TECH Auth > Dashboard
Status: DONE

### Fields/Components Verification
- [ ] KPI cards | type: display cards | required: no | validation: Assigned / In Progress (Started) / Pending Review / Completion Rejected (urgent, red); scoped to Technician's own WOs | component: Card (touchable)
- [ ] My Work Orders / Upcoming list | type: list | required: no | validation: most recent 5 WOs with status badges (tappable); Upcoming due next 7 days, overdue first in red | component: List.Item + Chip
- [ ] Bottom navigation | type: tab bar | required: no | validation: Home / Work Orders / Assets / More | component: BottomNavigation

### User Flow Verification
- [ ] Step 1: App opens to Dashboard; loads Technician's own WO summary (always scoped to self)
- [ ] Step 2: System fetches and renders KPI cards (Assigned / In Progress / Pending Review / Completion Rejected), My Work Orders (recent 5), Upcoming (due next 7 days, overdue first)
- [ ] Step 3: Technician taps a KPI card | Navigation: Assigned WO List (7.2.3) filtered to that status
- [ ] Step 4: Technician taps a WO in My Work Orders or Upcoming | Navigation: WO Detail (7.2.4)
- [ ] Step 5: Technician pulls down -> refreshes all data
- [ ] Step 6: Completion Rejected KPI card shown prominently in red with badge; tap -> WO List filtered to Completion Rejected
  - [ ] Error message (no WOs): "No work orders assigned. Check back later."
  - [ ] Error message (section fail): "Failed to load. Tap to retry."
  - [ ] Error message (offline): "Showing cached data. Pull to refresh when online."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.1.6 TECH Auth > Offline Mode
Status: DONE

### Fields/Components Verification
- [ ] Offline banner | type: banner | required: no | validation: shown at top when no internet; amber/yellow color; "You are offline. Some features are unavailable." | component: Banner
- [ ] WO List (read-only) | type: list | required: no | validation: last cached data | component: FlatList (read-only)
- [ ] Action buttons disabled while offline | type: state | required: no | validation: all action buttons disabled | component: Button (disabled)
- [ ] Last sync timestamp label | type: display | required: no | validation: "Last synced: [time]." | component: Text

### User Flow Verification
- [ ] Step 1: App detects loss of internet -> persistent offline banner "You are offline. Some features are unavailable." (amber/yellow)
- [ ] Step 2: Available offline: view last cached WO list / WO details / asset list+details / spare part list (read-only); Cache TTL assumed 24 hours
- [ ] Step 3: NOT available offline: Start WO / submit checklist updates / upload photos / submit sign-off / create ad-hoc requests / request spare parts / logout
- [ ] Step 4: Technician attempts disabled action (e.g. [Start Work Order])
  - [ ] Error message: "You are offline. Please reconnect to perform this action."
- [ ] Step 5: App detects reconnection -> banner disappears (or green "Back online" 3s); cached data auto-refreshes; pending actions synced; buttons re-enabled
- [ ] Step 6: App closed while offline and reopened -> cached data displayed, banner shown, "Last synced: [time]." label
  - [ ] Error message (edge - cache expired): "Cached data has expired. Please reconnect to reload your work orders."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.1 TECH WO Exec > Create Ad-hoc Work Order (Technician-initiated)
Status: DONE

### Fields/Components Verification
- [ ] Asset System | type: dropdown | required: yes | validation: Technician's scope | component: Menu
- [ ] Asset Sub-system | type: dropdown | required: no | validation: cascades | component: Menu
- [ ] Asset Type | type: dropdown | required: no | validation: cascades | component: Menu
- [ ] Asset | type: dropdown | required: no | validation: searchable or [Scan QR] to auto-fill; out-of-scope -> "This asset is outside your scope." | component: Menu + IconButton (QR)
- [ ] Building | type: dropdown | required: yes | validation: Technician's buildings (or auto-filled from QR) | component: Menu
- [ ] Floor | type: dropdown | required: no | validation: cascades from Building | component: Menu
- [ ] Area/Unit | type: dropdown | required: no | validation: cascades | component: Menu
- [ ] Description | type: textarea | required: yes | validation: max 1000 characters | component: TextInput (multiline)
- [ ] Duration of Work | type: text | required: no | validation: optional | component: TextInput
- [ ] Priority | type: dropdown | required: no | validation: Low / Medium / High / Urgent | component: Menu
- [ ] Attachments | type: file input | required: no | validation: JPG/PNG/PDF, max 5MB each, max 5 files, camera or gallery | component: file picker

### User Flow Verification
- [ ] Step 1: Technician taps [+ New Request] or [Create Ad-hoc WO] in bottom navigation or WO list
- [ ] Step 2: Create Ad-hoc Request screen loads
- [ ] Step 3: Technician fills required fields; Asset [Scan QR] -> camera, in-scope auto-fills Asset/Building/Floor/Area; out-of-scope -> "This asset is outside your scope."
- [ ] Step 4: Technician taps [Submit]
  - [ ] Condition: Asset System not selected | Error message: "Asset System is required."
  - [ ] Condition: Building not selected | Error message: "Building is required."
  - [ ] Condition: Description empty | Error message: "Description is required."
  - [ ] Condition: Description > 1000 chars | Error message: "Description must not exceed 1000 characters."
  - [ ] Condition: Attachment invalid type | Error message: "Only JPG, PNG, and PDF files are accepted."
  - [ ] Condition: Attachment > 5MB | Error message: "Each file must not exceed 5 MB."
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: Valid -> Status Technician Request; Supervisor notified | Success toast: "Request submitted to your Supervisor for review." | Navigation: Ad-hoc Request List (7.2.2)
- [ ] Step 5: Technician taps [Cancel] -> navigates back without saving
  - [ ] Error message (edge - QR scan fail): "Unable to scan. Please enter details manually."
  - [ ] Error message (edge - network): "Failed to submit request. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.2 TECH WO Exec > View Ad-hoc Request List
Status: DONE

### Fields/Components Verification
- [ ] Request list item | type: list row | required: no | validation: Request ID / Type badge / Building / Asset / Status badge / Created Date; statuses Technician Request / Ad-hoc Declined / Pending / Approval Rejected / Assigned / Cancelled; sorted created date desc | component: List.Item + Chip
- [ ] Status filter | type: dropdown | required: no | validation: narrow list by status | component: Menu
- [ ] [Edit & Resubmit] | type: button | required: no | validation: shown when status = Ad-hoc Declined | component: Button
- [ ] Pull-to-refresh | type: behavior | required: no | validation: refreshes list | component: FlatList (onRefresh)

### User Flow Verification
- [ ] Step 1: Technician navigates to Requests tab or section
- [ ] Step 2: System loads all ad-hoc requests submitted by this Technician (items Request ID / Building / Asset / Status badge / Created date; sorted desc)
- [ ] Step 3: Technician applies Status filter to narrow list
- [ ] Step 4: Technician taps a request item
  - [ ] Condition: Status = Technician Request / Pending / Approval Rejected / Cancelled -> read-only detail with history log
  - [ ] Condition: Status = Ad-hoc Declined -> detail shows rejection reason at top; [Edit & Resubmit] visible -> Edit form pre-filled; modify and [Resubmit] (same validation as 7.2.1)
  - [ ] Condition: Resubmit valid -> Status => Technician Request; Supervisor notified | Success toast: "Request resubmitted to Supervisor."
- [ ] Step 5: Technician pulls down -> refreshes list
- [ ] Step 6: Empty state
  - [ ] Error message: "No ad-hoc requests submitted yet."
  - [ ] Error message (edge - stale): "This request has already been processed. Please refresh."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.3 TECH WO Exec > View Assigned Work Order List
Status: DONE

### Fields/Components Verification
- [ ] Status filter | type: dropdown | required: no | validation: All / Assigned / Started / Completed / Completion Rejected / Closed / Cancelled | component: Menu
- [ ] Search bar | type: text | required: no | validation: searches by WO ID or asset code | component: Searchbar
- [ ] WO list item | type: list row | required: no | validation: WO ID / Type badge / Asset Code / Building / Location / Due Date (overdue indicator) / Status badge; sorted Completion Rejected first, then overdue, then upcoming; Sub Technician label | component: List.Item + Chip
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: pagination | component: FlatList

### User Flow Verification
- [ ] Step 1: Technician navigates to Work Orders tab in bottom navigation
- [ ] Step 2: System loads all WOs assigned (Main or Sub); sorted Completion Rejected first, overdue, then upcoming; overdue red; Completion Rejected red border/highlight
- [ ] Step 3: Technician taps Status filter -> All / Assigned / Started / Completed / Completion Rejected / Closed / Cancelled
- [ ] Step 4: Technician taps search bar -> searches by WO ID or asset code
- [ ] Step 5: Technician taps a WO | Navigation: WO Detail & Execution (7.2.4)
- [ ] Step 6: Technician pulls down -> refreshes
- [ ] Step 7: Infinite scroll -> loads next page
- [ ] Step 8: Empty state
  - [ ] Error message: "No work orders assigned to you."
  - [ ] Condition: Sub Technician on WO -> "Sub Technician" label
  - [ ] Condition: Due Date today (not overdue) -> amber warning color

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.4 TECH WO Exec > View Work Order Detail
Status: DONE

### Fields/Components Verification
- [ ] Header | type: display | required: no | validation: Asset Code - Work Type label / WO ID / date / Type badge | component: Text + Chip
- [ ] Print Report | type: button | required: no | validation: Secondary | component: Button (mode="outlined")
- [ ] 5-stage progress bar | type: display | required: no | validation: New => Pending => In Progress => Review => Approval; stage context label | component: ProgressBar / Stepper
- [ ] Tab: Details | type: tab | required: no | validation: Description / Photos / Remark (read-only) | component: TabView + Image grid
- [ ] Tab: Execution - Main/Sub Technician cards | type: display | required: no | validation: read-only | component: Card
- [ ] Work Checklist | type: list | required: no | validation: N/total expandable items | component: List.Accordion
- [ ] Part Replacement table | type: table | required: no | validation: Source / Name / Code / Quantity; [+ Add Part] | component: DataTable + Button
- [ ] Maintenance Plan ref | type: display | required: no | validation: Round / ID / Name / Frequency / View Details (Maintenance WOs) | component: List.Section
- [ ] Parent WO | type: display | required: no | validation: if applicable | component: List.Item
- [ ] Tenant | type: display | required: no | validation: Name / Phone / Email | component: List.Section
- [ ] History log | type: list | required: no | validation: last 5, [Show all] expands | component: List.Item
- [ ] Completion Rejected section | type: display | required: no | validation: Rejected by / Time / Reason (read-only) | component: Banner (error)
- [ ] [Start Work Order] / [Submit & Sign Off] / [Review & Resubmit] | type: buttons | required: no | validation: status-dependent, fixed bottom; Submit disabled until required items complete | component: Button (mode="contained")

### User Flow Verification
- [ ] Step 1: Technician taps WO from list -> WO Detail screen loads
- [ ] Step 2: System renders header, 5-stage progress bar, Overview (scrollable)
- [ ] Step 3: Swipeable tabs - Details (read-only) and Execution (Work Checklist N/total expandable with Description input + Photos per setting; Part Replacement table + [+ Add Part]; Plan ref; Tenant contact; History last 5)
- [ ] Step 4: Completion Rejected banner when status = Completion Rejected: "Rejected by Supervisor [Name] on [date]. Reason: [reason]."
- [ ] Step 5: Action buttons fixed at bottom: status Assigned -> [Start Work Order]; status Started -> [Submit & Sign Off] (disabled until required complete); status Completion Rejected -> [Review & Resubmit]; status Completed -> no buttons (read-only)
- [ ] Step 6: [Submit & Sign Off] disabled state -> grayed with label "Complete all required checklist items to submit."; tapping shows tooltip "N required checklist items are incomplete."
  - [ ] Error message (edge - load fail): "Failed to load work order details. Please go back and try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.5 TECH WO Exec > Start Work Order Execution
Status: DONE

### Fields/Components Verification
- [ ] [Start Work Order] | type: button | required: yes | validation: Primary, on WO Detail (status = Assigned) | component: Button (mode="contained")
- [ ] Confirm Start message | type: dialog text | required: no | validation: "Start this work order?" | component: Dialog
- [ ] Confirm / Cancel (alert) | type: buttons | required: yes | validation: Confirm + Cancel | component: Button

### User Flow Verification
- [ ] Step 1: Technician opens WO Detail (7.2.4) for an Assigned WO
- [ ] Step 2: [Start Work Order] button shown at bottom (full-width, Primary)
- [ ] Step 3: Technician taps [Start Work Order]
- [ ] Step 4: Native alert "Start Work Order [ID]? This will mark the work as in progress." [Start] | [Cancel]
- [ ] Step 5: Technician taps [Start]
  - [ ] Condition: Network unavailable | Error message: "No internet connection. Please try again."
  - [ ] Condition: WO status changed concurrently | Error message: "Work order status has changed. Please refresh."
  - [ ] Condition: Valid -> WO status => Started; Start Time recorded; Supervisor notified; [Start] replaced by [Submit & Sign Off]; Execution tab interactive | Success toast: "Work order started."
- [ ] Step 6: Technician taps [Cancel] -> alert dismisses, no change; WO remains Assigned
  - [ ] Error message (edge - timeout): timeout error after 15 seconds; WO status NOT changed

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.6 TECH WO Exec > Complete Work Checklist Items
Status: DONE

### Fields/Components Verification
- [ ] Checklist counter | type: display | required: no | validation: N/total items completed | component: ProgressBar / Text
- [ ] Item name + completion tick | type: display + toggle | required: no | validation: read-only name (inherited from Asset Type), tap to toggle done/undone | component: List.Accordion + Checkbox
- [ ] Description | type: text input | required: per item setting (Required/Optional/Off) | validation: placeholder "Enter description...", red asterisk if Required | component: TextInput (multiline)
- [ ] Photos | type: multi-upload | required: per item setting (Required/Optional/Off) | validation: thumbnail grid, [+ Add Photo] camera or gallery, red asterisk if Required (>=1 photo) | component: Image grid + Button

### User Flow Verification
- [ ] Step 1: Technician navigates to WO Detail (7.2.4) => swipes to Execution tab
- [ ] Step 2: Checklist section shows progress indicator and list of items
- [ ] Step 3: Technician taps a checklist item card -> expands (Item name read-only; Description field if Required/Optional; Photos section if Required/Optional; [Done]/checkmark)
- [ ] Step 4: Technician fills Description (if applicable) and uploads Photos (if applicable)
- [ ] Step 5: Technician taps [Done] on an item
  - [ ] Condition: Description = Required AND empty -> item INCOMPLETE | Error message: "Description required."
  - [ ] Condition: Photos = Required AND no photos -> item INCOMPLETE | Error message: "At least 1 photo required."
  - [ ] Condition: All required fields filled -> item COMPLETE (checkmark + green); progress counter updates
- [ ] Step 6: Technician taps a completed item -> can re-open to edit Description or add/remove Photos while WO Started
- [ ] Step 7: Real-time save -> all Description text and photo uploads auto-saved to local draft
  - [ ] Error message (edge - photo too large): "Photo is too large. Maximum size is 5 MB per photo."
  - [ ] Error message (edge - storage full): "Not enough storage space to save photo. Please free up space and try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.7 TECH WO Exec > Upload Execution Photos
Status: DONE

### Fields/Components Verification
- [ ] Photos (multi-upload) | type: media upload | required: per item setting | validation: camera or gallery, Required/Optional label per item, thumbnail grid, max 5MB per photo, accepted JPG/PNG | component: Image grid + Button
- [ ] [+ Add Photo] | type: button | required: no | validation: opens bottom sheet with options | component: Button
- [ ] [Take Photo] | type: action | required: no | validation: opens device camera | component: bottom sheet item
- [ ] [Choose from Library] | type: action | required: no | validation: opens photo gallery | component: bottom sheet item
- [ ] Delete per photo | type: action | required: no | validation: tap X on thumbnail, confirm "Remove this photo?" | component: IconButton + Dialog
- [ ] Upload status indicator | type: state | required: no | validation: spinner in progress, checkmark on success, [Retry] on fail | component: ActivityIndicator / Icon

### User Flow Verification
- [ ] Step 1: Technician expands a checklist item card
- [ ] Step 2: In Photos section, Technician taps [+ Add Photo]
- [ ] Step 3: Bottom sheet slides up ([Take Photo] camera / [Choose from Library] gallery / [Cancel])
- [ ] Step 4a: Technician taps [Take Photo]
  - [ ] Condition: Camera permission not granted -> OS dialog; denied | Error message: "Camera permission required. Please enable in device Settings => App => Camera."
  - [ ] Condition: Camera opens, frames, taps capture -> preview -> [Use Photo] adds thumbnail; [Retake] reopens camera
- [ ] Step 4b: Technician taps [Choose from Library]
  - [ ] Condition: Photo library permission not granted (iOS) -> OS dialog; denied | Error message: "Photo library permission required. Please enable in Settings."
  - [ ] Condition: Library opens, selects photo -> added to grid
- [ ] Step 5: Photo uploaded in background (spinner in progress; success -> checkmark; fail -> [Retry])
- [ ] Step 6: Technician taps [X] on thumbnail -> "Remove this photo?" [Remove] | [Keep]; confirmed -> removed from item and server
- [ ] Step 7: Maximum photos per item not defined in spec (flagged for BA review)
  - [ ] Error message (edge - photo > 5MB): "Photo is too large. Maximum 5 MB per photo."
  - [ ] Error message (edge - camera malfunction): "Unable to access camera. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.8 TECH WO Exec > Record Part Replacement
Status: DONE

### Fields/Components Verification
- [ ] [+ Add Part] | type: button | required: no | validation: opens source selection bottom sheet | component: Button
- [ ] Source toggle | type: toggle | required: yes | validation: [IMS Stock] | [Purchase Separately] | component: SegmentedButtons
- [ ] Spare Part (IMS Stock) | type: dropdown | required: yes (IMS path) | validation: searchable, User Group scope (Active only), shows Name / Code / Available Stock | component: Menu (searchable)
- [ ] Quantity | type: number | required: yes | validation: numeric keyboard, min 1 | component: TextInput (keyboardType="numeric")
- [ ] Part Name (Purchase Separately) | type: text | required: yes (purchase path) | validation: max 100 chars | component: TextInput
- [ ] Part Replacement table + Delete icon | type: table | required: no | validation: Source / Name / Code / Quantity / Delete; delete removes entry (releases On-Hold if reserved) | component: DataTable + IconButton

### User Flow Verification
- [ ] Step 1: Technician scrolls to Part Replacement section in Execution tab
- [ ] Step 2: Current entries shown in a list (Source / Part Name / Code / Quantity)
- [ ] Step 3: Technician taps [+ Add Part]
- [ ] Step 4: Bottom sheet slides up "Add Part Replacement" with Source toggle [IMS Stock] | [Purchase Separately]
- [ ] Step 5a: IMS Stock path -> Spare Part searchable dropdown + Quantity numeric min 1 -> taps [Add]
  - [ ] Condition: Spare Part not selected | Error message: "Please select a spare part."
  - [ ] Condition: Quantity < 1 | Error message: "Please enter a valid quantity."
  - [ ] Condition: Quantity > Available stock (warning, not blocked) | Error message: "Requested quantity exceeds available stock. Continue?"
  - [ ] Condition: Valid -> entry added (Source = IMS Stock / Name / Code)
- [ ] Step 5b: Purchase Separately path -> Part Name text (required, max 100) + Quantity numeric min 1 -> taps [Add]
  - [ ] Condition: Part Name empty | Error message: "Part name is required."
  - [ ] Condition: Quantity < 1 | Error message: "Please enter a valid quantity."
  - [ ] Condition: Valid -> entry added (Source = Purchase Separately / Name, no Code)
- [ ] Step 6: Technician taps Delete icon -> "Remove this part entry?"; confirmed -> entry removed; IMS On-Hold released if reserved
- [ ] Step 7: Technician can add multiple entries (mixed IMS Stock and Purchase Separately)
  - [ ] Error message (edge - load fail): "Failed to load spare parts. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.9 TECH WO Exec > Create Spare Parts Request
Status: DONE

### Fields/Components Verification
- [ ] [Request Spare Parts] | type: button | required: no | validation: available when status = Started | component: Button
- [ ] Spare Part | type: dropdown | required: yes | validation: searchable, Technician's scope, shows Part Name / Code / Available Stock | component: Menu (searchable)
- [ ] Quantity | type: number | required: yes | validation: min 1 | component: TextInput (keyboardType="numeric")
- [ ] Notes | type: textarea | required: no | validation: optional | component: TextInput (multiline)
- [ ] [+ Add another part] + Submit Request | type: buttons | required: yes (Submit) | validation: Submit Primary | component: Button

### User Flow Verification
- [ ] Step 1: Technician opens WO Detail => Execution tab => taps [Request Spare Parts]
- [ ] Step 2: Bottom sheet slides up "Request Spare Parts" (multiple entries via [+ Add another part]; per entry Spare Part searchable dropdown + Quantity numeric min 1; Notes optional)
- [ ] Step 3: Technician taps [Submit Request]
  - [ ] Condition: Spare Part not selected | Error message: "Please select a spare part."
  - [ ] Condition: Quantity < 1 | Error message: "Please enter a valid quantity."
  - [ ] Condition: Duplicate part entries | Error message: "Duplicate part detected. Please combine into one entry."
  - [ ] Condition: Requested qty > Available stock (warning, not blocked) | Error message: "Requested quantity exceeds available stock. This request will be flagged as Unavailable."
  - [ ] Condition: Network unavailable | Error message: "No internet connection."
  - [ ] Condition: Valid -> sufficient On-Hold set / insufficient flagged Unavailable; BM + Supervisor notified | Success toast: "Spare parts request submitted for Building Manager approval."
- [ ] Step 4: Taps [Cancel] or drags sheet down -> dismisses, no request created
  - [ ] Error message (edge - empty dropdown): "No spare parts available for your scope."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.10 TECH WO Exec > Technician Sign-off
Status: DONE

### Fields/Components Verification
- [ ] [Submit & Sign Off] | type: button | required: yes | validation: triggers sign-off; disabled until all Required items complete | component: Button (mode="contained", disabled)
- [ ] Step 1 - Technician self sign-off | type: auto-record | required: yes | validation: system auto-records this Technician's sign-off + timestamp; proceeds to Step 2 | component: confirmation screen
- [ ] Step 2 - Building Technician sign-off | type: confirm input | required: yes | validation: prompt "Present device to Building Technician"; method TBC (signature/confirm button); [Confirm Sign-off] | component: Button (mode="contained")
- [ ] Step 3 - Tenant sign-off | type: confirm input | required: conditional | validation: prompt "Present device to Tenant"; method TBC; [Confirm Sign-off]; skipped if not configured | component: Button (mode="contained")
- [ ] Title (Step 1) | type: display | required: no | validation: "Your Sign-off" | component: Text
- [ ] Status after sign-offs | type: state | required: no | validation: status => Completed; Supervisor notified | component: n/a

### User Flow Verification
- [ ] Step 1: Technician ensures all checklist items done ("5 of 5 items done.")
- [ ] Step 2: [Submit & Sign Off] becomes enabled
- [ ] Step 3: Technician taps [Submit & Sign Off]
- [ ] Step 4: System validates ALL required fields
  - [ ] Condition: Any Required Description empty -> scrolls to first incomplete item, red highlight | Error message: "Please complete all required checklist items before submitting."
  - [ ] Condition: Any Required Photos with 0 photos -> same behavior
  - [ ] Condition: All required complete -> proceeds to Sign-off sequence
- [ ] Step 5: Sign-off sequence (3 steps in order)
  - [ ] Condition: STEP 1 MSP Technician A (always required) -> "Your Sign-off" / "Sign off as MSP Technician A to confirm work completion." -> records name + timestamp
  - [ ] Condition: STEP 2 Building Technician (always required) -> "Building Technician Sign-off" / "Have the Building Technician sign off to witness completion." -> records name/ID + timestamp
  - [ ] Condition: STEP 3 Tenant (conditional) -> if configured "Tenant Sign-off" / "Have the Tenant confirm work completion." -> records name/ID + timestamp; if not configured/Ad-hoc -> skipped automatically
- [ ] Step 6: After all required sign-offs -> WO status => Completed; Supervisor notified | Success toast: "Work order submitted for Supervisor review."
  - [ ] Error message (edge - sign-off fail): "Failed to record sign-off. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.2.11 TECH WO Exec > Resubmit Work Order (after Completion Rejected)
Status: DONE

### Fields/Components Verification
- [ ] Rejection details section (read-only) | type: display | required: no | validation: Rejected by / Rejected time / Rejection Reason | component: Banner (error)
- [ ] [Review & Resubmit] | type: button | required: yes | validation: Primary; no confirmation popup (proceeds directly after validation) | component: Button (mode="contained")
- [ ] Checklist items (correctable) | type: list | required: no | validation: available for correction (7.2.6) | component: List.Accordion
- [ ] Photos (updatable) | type: media | required: no | validation: can be updated (7.2.7) | component: Image grid
- [ ] Part Replacement (updatable) | type: table | required: no | validation: can be updated (7.2.8) | component: DataTable

### User Flow Verification
- [ ] Step 1: Technician opens WO Detail (7.2.4); red banner "Rejected by Supervisor [Name] on [date]. Reason: [reason]."
- [ ] Step 2: Technician reads the rejection reason carefully
- [ ] Step 3: Technician reviews execution content and makes corrections (checklist items, Description/Photos, part replacement entries); checklist progress PRESERVED (assumption, flagged for BA review)
- [ ] Step 4: Technician taps [Review & Resubmit] at bottom (Primary, full-width)
- [ ] Step 5: System runs same final validation as Submit & Sign Off (7.2.10 step 4)
  - [ ] Condition: Any Required Description empty -> scrolls to first incomplete | Error message: "Please complete all required checklist items."
  - [ ] Condition: Any Required Photos missing -> same error
  - [ ] Condition: All valid -> proceeds to sign-off sequence
- [ ] Step 6: Sign-off sequence restarts from Step 1 (all previous sign-offs cleared; fresh sign-off required)
- [ ] Step 7: After all sign-offs -> WO status => Completed (resubmitted); Supervisor notified | Success toast: "Work order resubmitted for Supervisor review."
  - [ ] Error message (edge - network): "Failed to resubmit. Please try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.3.1 TECH Asset > View Asset List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by name or code" | component: Searchbar
- [ ] [Scan QR] | type: icon button | required: no | validation: top-right, shortcut to QR scanner (7.3.3) | component: IconButton
- [ ] Building (filter) | type: dropdown | required: no | validation: Technician's group buildings only | component: Menu
- [ ] Asset System (filter) | type: dropdown | required: no | validation: Technician's group systems only | component: Menu
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Active / Inactive | component: Menu
- [ ] Asset list item | type: list row | required: no | validation: Asset Code / Asset Name / Asset System / Location (Floor/Area) / Status badge; tap => Asset Detail (7.3.2) | component: List.Item + Chip
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: pagination | component: FlatList

### User Flow Verification
- [ ] Step 1: Technician navigates to Assets in bottom navigation
- [ ] Step 2: System loads assets matching User Group scope (Building AND Asset System both match)
- [ ] Step 3: List items show Asset Code / Asset Name / Asset System / Location / Status badge
- [ ] Step 4: [Scan QR] icon visible (top-right) -> shortcut to QR scan (7.3.3)
- [ ] Step 5: Technician taps search bar -> searches by name or code
- [ ] Step 6: Technician taps filter icon -> panel (Building / Asset System / Status); [Apply] / [Reset]
- [ ] Step 7: Technician taps asset item | Navigation: Asset Detail (7.3.2)
- [ ] Step 8: Technician pulls down -> refreshes list
- [ ] Step 9: Infinite scroll -> loads next page
- [ ] Step 10: No create/edit/deactivate actions (read-only)
- [ ] Step 11: Empty state
  - [ ] Error message: "No assets found within your scope."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.3.2 TECH Asset > View Asset Detail
Status: DONE

### Fields/Components Verification
- [ ] Back arrow | type: nav | required: no | validation: returns | component: Appbar.BackAction
- [ ] Asset Name | type: display | required: no | validation: large bold title | component: Text (titleLarge)
- [ ] Asset Code | type: display | required: no | validation: subtitle | component: Text
- [ ] Status badge | type: display | required: no | validation: Active / Inactive | component: Chip
- [ ] QR Code | type: display | required: no | validation: tap to zoom in | component: Image + Portal
- [ ] Asset Classification section | type: display | required: no | validation: Asset System / Asset Sub-system / Asset Type (read-only) | component: List.Section
- [ ] Location section | type: display | required: no | validation: Building / Floor / Area/Unit (read-only) | component: List.Section
- [ ] Asset Details section | type: display | required: no | validation: Model / Serial Number / Brand / Purchase Date / Status (read-only) | component: List.Section
- [ ] Maintenance History list | type: list | required: no | validation: WO ID / Plan Name / Round / Completed Date / Technician / Status; scoped Closed WOs; tap WO ID => WO Detail (7.2.4); empty "No maintenance history." | component: List.Item
- [ ] Pending WOs list | type: list | required: no | validation: WO ID / Type / Assigned Date / Status; tap WO ID => WO Detail (7.2.4); empty "No pending work orders." | component: List.Item

### User Flow Verification
- [ ] Step 1: Technician taps asset from list OR navigates from QR scan -> Asset Detail loads
- [ ] Step 2: System renders header (Name/Code/Status), QR Code (tap to zoom), Classification, Location, Asset Details sections
- [ ] Step 3: Maintenance History (scoped Closed WOs) -> tap WO ID navigates to WO Detail (7.2.4)
  - [ ] Error message (empty): "No maintenance history."
- [ ] Step 4: Pending WOs -> tap WO ID navigates to WO Detail (7.2.4)
  - [ ] Error message (empty): "No pending work orders."
- [ ] Step 5: No Edit / Deactivate actions; read-only
  - [ ] Error message (edge - load fail): "Failed to load asset details. Please go back and try again."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.3.3 TECH Asset > Scan Asset QR Code
Status: DONE

### Fields/Components Verification
- [ ] [Scan QR] | type: icon button | required: no | validation: opens device camera; accessible from Asset List, WO Detail, Create WO screen | component: IconButton
- [ ] Camera overlay with scan frame | type: viewer | required: no | validation: scan frame highlights target; flash toggle for low-light; [Cancel] to exit | component: Camera + overlay
- [ ] Flash toggle / Cancel | type: controls | required: no | validation: flash icon, cancel button | component: IconButton + Button

### User Flow Verification
- [ ] Step 1: Technician taps [Scan QR] icon (from Asset List header, WO Detail, or Create WO screen)
- [ ] Step 2: Camera opens with scan frame overlay (scan frame, flash toggle, [Cancel])
- [ ] Step 3: Technician points camera at asset QR code
  - [ ] Condition: Asset found, in scope, active WO exists (Assigned/Started to this Technician) -> WO Detail (7.2.4) | Toast: "Work order found for [Asset Name]."
  - [ ] Condition: Asset found, in scope, no active WO -> Asset Detail (7.3.2) | Toast: "No active work order for this asset."
  - [ ] Condition: Asset found but outside scope -> does NOT navigate | Error message: "This asset is outside your scope."
  - [ ] Condition: Asset not found | Error message: "Asset not found. Please check the QR code and try again."
  - [ ] Condition: QR detected but cannot be decoded | Error message: "Unable to read this QR code. Please try again or search manually."
- [ ] Step 4: Camera fails to detect QR within 30 seconds -> hint "Having trouble? Make sure the QR code is well-lit and centered in the frame."
- [ ] Step 5: Technician taps [Cancel] -> camera closes, returns to previous screen
  - [ ] Error message (edge - camera permission denied): "Camera permission required. Please enable in device Settings => App => Camera."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.3.4 TECH Asset > View Asset Tags on Drawing (Read-only)
Status: DONE

### Fields/Components Verification
- [ ] Building selector | type: dropdown/picker | required: no | validation: User Group buildings only | component: Menu
- [ ] PDF viewer | type: viewer | required: no | validation: pdfjs-dist WebView, read-only tag pins, pan + zoom via touch | component: WebView
- [ ] Tag pin | type: marker | required: no | validation: visible at saved coordinates; tap opens popup | component: custom marker
- [ ] Tag popup | type: bottom sheet/overlay | required: no | validation: Asset Name / Code / Type / System / Status / Last Maintenance + [View Asset Detail] | component: Portal + Surface

### User Flow Verification
- [ ] Step 1: Technician navigates to Assets => Drawing
- [ ] Step 2: Selects Building from picker (User Group buildings only)
- [ ] Step 3: System loads drawing
  - [ ] Condition: No drawing | Error message: "No drawing uploaded for this building."
  - [ ] Condition: Drawing exists -> PDF renders
- [ ] Step 4: Technician interactions (pinch to zoom, drag to pan, tag pins at saved coords)
- [ ] Step 5: Technician taps a tag pin -> popup (Asset Name / Code / Type / System / Status badge / Last Maintenance Date); [View Asset Detail] -> Asset Detail (7.3.2); [Close] or drag down to dismiss
- [ ] Step 6: No [Edit Tags] button (read-only)

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.3.5 TECH Asset > View Spare Part List
Status: DONE

### Fields/Components Verification
- [ ] Search bar | type: text | required: no | validation: placeholder "Search by name or code" | component: Searchbar
- [ ] Status (filter) | type: dropdown | required: no | validation: All / Active / Inactive | component: Menu
- [ ] Spare Part list item | type: list row | required: no | validation: Code / Name / Asset System / Available Stock (highlighted) / Total Stock / Status badge; tap => read-only detail | component: List.Item + Chip
- [ ] Stock counters (detail) | type: display | required: no | validation: Available (large, green) / On-Hold / Total; stock history last 10, Load more | component: Card / Text
- [ ] Pull-to-refresh / Load more | type: behavior | required: no | validation: updates stock levels | component: FlatList

### User Flow Verification
- [ ] Step 1: Technician navigates to Inventories in bottom navigation
- [ ] Step 2: System loads spare parts matching User Group scope
- [ ] Step 3: List items show Code / Name / Asset System / Available Stock (highlighted) / Total Stock / Status badge
- [ ] Step 4: Technician searches by name or code -> real-time filter
- [ ] Step 5: Technician taps Status filter -> All / Active / Inactive
- [ ] Step 6: Technician taps a spare part -> read-only detail (Available large green / On-Hold / Total; sections General Info / Stock Info / Supporting Info; stock history last 10 + Load more)
- [ ] Step 7: Technician pulls down -> refreshes stock levels
- [ ] Step 8: Empty state
  - [ ] Error message: "No spare parts found within your scope."
  - [ ] Condition: Available = 0 -> highlighted red, label "Out of stock."

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)

## 7.4.1 TECH Notif > Receive Push Notification
Status: DONE

### Fields/Components Verification
- [ ] Push notification (device OS) | type: system notification | required: no | validation: FCM delivery; system-triggered, no dedicated UI | component: expo-notifications / FCM
- [ ] Notification structure | type: payload | required: no | validation: Title (short label) / Body (WO ID / Part name) / Action (deep link) | component: notification payload
- [ ] In-app bell icon | type: icon + badge | required: no | validation: unread badge count; foreground in-app banner auto-dismiss 4s; background OS tray badge increment; closed cold-start | component: IconButton + Badge

### User Flow Verification
- [ ] Step 1: Backend sends payload to FCM for this Technician's account; online immediate, offline queued up to 28 days
- [ ] Step 2: Trigger events (11) with deep links
  - [ ] Condition: WO Assigned -> Title "New Work Order Assigned" / Body "Work Order [ID] for [Asset Name] at [Building] has been assigned to you." / opens WO Detail (7.2.4)
  - [ ] Condition: WO from Maintenance Plan -> Title "New Maintenance Work Order" / Body "Maintenance work order [ID] for [Asset Name] has been assigned to you." / opens WO Detail (7.2.4)
  - [ ] Condition: Added as Sub Technician -> Title "Added to Work Order" / Body "You have been added as Sub Technician on Work Order [ID]." / opens WO Detail (7.2.4)
  - [ ] Condition: Completion Rejected -> Title "Work Order Rejected" / Body "Work Order [ID] rejected by Supervisor. Please review and resubmit." / opens WO Detail (7.2.4) with banner
  - [ ] Condition: Ad-hoc Request Declined -> Title "Ad-hoc Request Declined" / Body "Your ad-hoc request was declined. Tap to view and resubmit." / opens Ad-hoc Request List (7.2.2)
  - [ ] Condition: Spare Part Request Approved -> Title "Spare Part Request Approved" / Body "BM approved spare part request for Work Order [ID]." / opens WO Detail (7.2.4)
  - [ ] Condition: Spare Part Request Rejected -> Title "Spare Part Request Rejected" / Body "BM rejected spare part request for Work Order [ID]." / opens WO Detail (7.2.4)
  - [ ] Condition: Spare Part Unavailable -> Title "Spare Part Unavailable" / Body "Requested spare part for Work Order [ID] is unavailable. BM notified." / opens WO Detail (7.2.4)
  - [ ] Condition: WO Due Today -> Title "Work Order Due Today" / Body "Work Order [ID] is due today. Please start as soon as possible." / opens WO Detail (7.2.4)
  - [ ] Condition: WO Overdue -> Title "Work Order Overdue" / Body "Work Order [ID] is overdue. Please complete and submit." / opens WO Detail (7.2.4)
  - [ ] Condition: WO Closed -> Title "Work Order Closed" / Body "Work Order [ID] has been officially closed." / opens WO Detail (7.2.4)
  - [ ] In-app handling: foreground banner auto-dismiss 4s; background OS tray badge increment; closed cold-start and navigate
  - [ ] Permissions: first install OS permission request; denied -> in-app prompt to enable in Settings; logout unregisters FCM token; reinstall regenerates token on next login

### Verification Criteria
- [ ] All fields rendered with correct types
- [ ] All required fields have required flag
- [ ] All validations implemented
- [ ] All error messages match CSV verbatim
- [ ] All navigation targets correct
- [ ] Screen is responsive (mobile/tablet/web)
