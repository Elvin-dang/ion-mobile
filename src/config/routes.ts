/**
 * routes.ts — single source of truth for navigation across roles.
 * Segment paths only (expo-router). NEVER use group names like /(app) in paths.
 */

import type { Role } from '../contexts/AuthContext';
import type { IconName } from '../components/ui';

export interface TabDef {
  name: string; // route segment (file name under (tabs))
  title: string;
  icon: IconName;
  activeIcon: IconName;
}

/** Bottom-tab definitions per role. Tab files exist for all; layout filters by role. */
export const ROLE_TABS: Record<Role, TabDef[]> = {
  BM: [
    { name: 'dashboard', title: 'Home', icon: 'view-dashboard-outline', activeIcon: 'view-dashboard' },
    { name: 'requests', title: 'Requests', icon: 'file-document-outline', activeIcon: 'file-document' },
    { name: 'workorders', title: 'Work Orders', icon: 'clipboard-text-outline', activeIcon: 'clipboard-text' },
    { name: 'assets', title: 'Assets', icon: 'cube-outline', activeIcon: 'cube' },
    { name: 'more', title: 'More', icon: 'dots-horizontal', activeIcon: 'dots-horizontal' },
  ],
  SUP: [
    { name: 'dashboard', title: 'Home', icon: 'view-dashboard-outline', activeIcon: 'view-dashboard' },
    { name: 'workorders', title: 'WO & Requests', icon: 'clipboard-text-outline', activeIcon: 'clipboard-text' },
    { name: 'assets', title: 'Assets', icon: 'cube-outline', activeIcon: 'cube' },
    { name: 'more', title: 'More', icon: 'dots-horizontal', activeIcon: 'dots-horizontal' },
  ],
  TECH: [
    { name: 'dashboard', title: 'Home', icon: 'view-dashboard-outline', activeIcon: 'view-dashboard' },
    { name: 'workorders', title: 'Work Orders', icon: 'clipboard-text-outline', activeIcon: 'clipboard-text' },
    { name: 'assets', title: 'Assets', icon: 'cube-outline', activeIcon: 'cube' },
    { name: 'more', title: 'More', icon: 'dots-horizontal', activeIcon: 'dots-horizontal' },
  ],
};

/** Whether the "requests" tab is a standalone tab for the role (BM only). */
export function tabsForRole(role: Role): TabDef[] {
  return ROLE_TABS[role];
}

export const ROUTES = {
  login: '/login',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',
  requests: '/requests',
  workorders: '/workorders',
  assets: '/assets',
  more: '/more',
  accountSettings: '/account-settings',
  language: '/language',
  notifications: '/notifications',
  offline: '/offline',
  qrScan: '/qr-scan',
  assetDetail: (id: string) => `/asset/${id}`,
  assetDrawing: '/asset-drawing',
  sparePartList: '/spare-parts',
  sparePartDetail: (id: string) => `/spare-part/${id}`,
  requestDetail: (id: string) => `/request/${id}`,
  workOrderDetail: (id: string) => `/work-order/${id}`,
  createWorkOrder: '/create-work-order',
  assignWorkOrder: (id: string) => `/assign-work-order/${id}`,
  adhocRequests: '/adhoc-requests',
} as const;
