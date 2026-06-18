/**
 * mockData.ts — realistic CMMS domain data with consistent IDs across list/detail.
 * Buildings, assets, spare parts, requests, work orders, technicians, supervisors,
 * notifications, recent activity.
 */

export interface Building {
  id: string;
  name: string;
}

export const buildings: Building[] = [
  { id: 'b1', name: 'Marina Tower A' },
  { id: 'b2', name: 'Orchard Central' },
  { id: 'b3', name: 'Harbfront Plaza' },
];

export interface Technician {
  id: string;
  name: string;
  phone: string;
  level: string;
  avatar: string;
  activeWoCount: number;
}

export const technicians: Technician[] = [
  { id: 't1', name: 'James Wong', phone: '+65 9345 6789', level: 'Senior Technician', avatar: 'JW', activeWoCount: 3 },
  { id: 't2', name: 'Ahmad Rahman', phone: '+65 9456 7890', level: 'Technician', avatar: 'AR', activeWoCount: 1 },
  { id: 't3', name: 'Lim Wei Jie', phone: '+65 9567 8901', level: 'Junior Technician', avatar: 'LW', activeWoCount: 0 },
  { id: 't4', name: 'Priya Nair', phone: '+65 9678 9012', level: 'Senior Technician', avatar: 'PN', activeWoCount: 2 },
];

export interface Supervisor {
  id: string;
  name: string;
  userGroup: string;
  buildings: string[];
  avatar: string;
}

export const supervisors: Supervisor[] = [
  { id: 's1', name: 'Maria Santos', userGroup: 'MSP Operations', buildings: ['Marina Tower A', 'Orchard Central'], avatar: 'MS' },
  { id: 's2', name: 'Robert Tan', userGroup: 'MSP Operations', buildings: ['Harbront Plaza'], avatar: 'RT' },
  { id: 's3', name: 'Grace Lee', userGroup: 'MSP HVAC', buildings: ['Marina Tower A'], avatar: 'GL' },
];

export interface Asset {
  id: string;
  code: string;
  name: string;
  system: string;
  subSystem: string;
  type: string;
  building: string;
  floor: string;
  area: string;
  assetTag?: string;
  status: 'Active' | 'Inactive';
  model: string;
  serial: string;
  brand: string;
  purchaseDate: string;
  manufacturedDate: string;
  origin?: string;
  yearOfManufacture?: string;
  usageDate?: string;
  warrantyExpiryDate?: string;
  specification?: string;
  maintenanceFrequency?: string;
  lastMaintenance: string;
}

export const assets: Asset[] = [
  {
    id: 'a1', code: 'AHU-01-03', name: 'Air Handling Unit 3', system: 'HVAC', subSystem: 'Air Distribution',
    type: 'Air Handling Unit', building: 'Marina Tower A', floor: 'L3', area: 'Plant Room A',
    assetTag: 'HVAC-AHU-L03-03',
    status: 'Active', model: 'Carrier 39M', serial: 'CR-39M-88213', brand: 'Carrier',
    purchaseDate: '15/03/2021', manufacturedDate: '10/01/2021',
    origin: 'Singapore', yearOfManufacture: '2021', usageDate: '01/04/2021', warrantyExpiryDate: '01/04/2026',
    specification: 'Airflow: 12,000 CFM, Cooling Capacity: 25 TR, Motor: 15 kW, Supply Air Temp: 13°C',
    maintenanceFrequency: 'Quarterly',
    lastMaintenance: '2026-05-12',
  },
  {
    id: 'a2', code: 'CHL-B1-01', name: 'Chiller Unit 1', system: 'HVAC', subSystem: 'Chilled Water',
    type: 'Water-Cooled Chiller', building: 'Marina Tower A', floor: 'B1', area: 'Chiller Plant',
    assetTag: 'HVAC-CHL-B1-01',
    status: 'Active', model: 'York YK', serial: 'YK-2210-4471', brand: 'York',
    purchaseDate: '02/08/2020', manufacturedDate: '15/06/2020',
    origin: 'USA', yearOfManufacture: '2020', usageDate: '01/09/2020', warrantyExpiryDate: '01/09/2025',
    specification: 'Cooling Capacity: 200 TR, COP: 5.8, Refrigerant: R-134a',
    maintenanceFrequency: 'Semi-Annual',
    lastMaintenance: '2026-04-28',
  },
  {
    id: 'a3', code: 'FCP-05-12', name: 'Fire Control Panel', system: 'Fire Safety', subSystem: 'Detection',
    type: 'Control Panel', building: 'Orchard Central', floor: 'L5', area: 'Riser 2',
    assetTag: 'FIRE-FCP-L05-12',
    status: 'Active', model: 'Notifier NFS2', serial: 'NF-2-09921', brand: 'Notifier',
    purchaseDate: '20/11/2019', manufacturedDate: '01/09/2019',
    origin: 'USA', yearOfManufacture: '2019', usageDate: '01/12/2019', warrantyExpiryDate: '01/12/2024',
    specification: '198 SLC points, 6 NAC circuits, UL Listed, NFPA 72 compliant',
    maintenanceFrequency: 'Monthly',
    lastMaintenance: '2026-06-01',
  },
  {
    id: 'a4', code: 'LFT-A-02', name: 'Passenger Lift 2', system: 'Vertical Transport', subSystem: 'Elevators',
    type: 'Traction Lift', building: 'Orchard Central', floor: 'All', area: 'Core A',
    assetTag: 'VT-LFT-ALL-02',
    status: 'Active', model: 'KONE MonoSpace', serial: 'KN-MS-55120', brand: 'KONE',
    purchaseDate: '10/06/2018', manufacturedDate: '01/04/2018',
    origin: 'Finland', yearOfManufacture: '2018', usageDate: '01/07/2018', warrantyExpiryDate: '01/07/2023',
    specification: 'Capacity: 630 kg / 8 persons, Speed: 1.6 m/s, Floors: B1-26',
    maintenanceFrequency: 'Monthly',
    lastMaintenance: '2026-05-30',
  },
  {
    id: 'a5', code: 'GEN-B2-01', name: 'Standby Generator', system: 'Electrical', subSystem: 'Backup Power',
    type: 'Diesel Generator', building: 'Harbront Plaza', floor: 'B2', area: 'Genset Room',
    assetTag: 'ELEC-GEN-B2-01',
    status: 'Inactive', model: 'Cummins C1100', serial: 'CM-1100-33417', brand: 'Cummins',
    purchaseDate: '28/02/2017', manufacturedDate: '15/12/2016',
    origin: 'UK', yearOfManufacture: '2016', usageDate: '01/03/2017', warrantyExpiryDate: '01/03/2022',
    specification: 'Power Output: 1100 kVA, Fuel: Diesel, Voltage: 400V/3ph/50Hz',
    maintenanceFrequency: 'Quarterly',
    lastMaintenance: '2026-03-15',
  },
  {
    id: 'a6', code: 'PMP-B1-04', name: 'Domestic Water Pump 4', system: 'Plumbing', subSystem: 'Water Supply',
    type: 'Booster Pump', building: 'Marina Tower A', floor: 'B1', area: 'Pump Room',
    assetTag: 'PLMB-PMP-B1-04',
    status: 'Active', model: 'Grundfos CR', serial: 'GF-CR-71290', brand: 'Grundfos',
    purchaseDate: '12/01/2022', manufacturedDate: '01/11/2021',
    origin: 'Denmark', yearOfManufacture: '2021', usageDate: '01/02/2022', warrantyExpiryDate: '01/02/2027',
    specification: 'Flow: 12 m³/h, Head: 80m, Motor: 5.5 kW, Stages: 6',
    maintenanceFrequency: 'Monthly',
    lastMaintenance: '2026-06-08',
  },
];

export interface SparePart {
  id: string;
  code: string;
  name: string;
  system: string;
  subSystem?: string;
  assetType?: string;
  available: number;
  total: number;
  onHold: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
  location?: string;
  storeRoom?: string;
  department?: string;
  brand?: string;
  model?: string;
  serial?: string;
  origin?: string;
  purchaseDate?: string;
  yearOfManufacture?: string;
  usageDate?: string;
  warrantyExpiryDate?: string;
  specification?: string;
}

export const spareParts: SparePart[] = [
  {
    id: 'sp1', code: 'FLT-HEPA-20', name: 'HEPA Air Filter 20"', system: 'HVAC',
    subSystem: 'Air Distribution', assetType: 'Air Handling Unit',
    available: 12, total: 20, onHold: 3, status: 'Active',
    createdAt: '18/06/2026 09:30', location: 'Marina Tower A', storeRoom: 'SR-A-01',
    department: 'M&E', brand: 'Camfil', model: 'HR24', serial: 'CF-HR24-001',
    origin: 'Sweden', purchaseDate: '01/03/2026', yearOfManufacture: '2026',
    usageDate: '15/03/2026', warrantyExpiryDate: '15/03/2027',
    specification: 'Efficiency: H14, Airflow: 1200 m³/h, Dimensions: 20" x 20" x 12"',
  },
  {
    id: 'sp2', code: 'BLT-V-A42', name: 'V-Belt A42', system: 'HVAC',
    subSystem: 'Air Distribution', assetType: 'Air Handling Unit',
    available: 0, total: 8, onHold: 2, status: 'Active',
    createdAt: '10/05/2026 14:15', location: 'Marina Tower A', storeRoom: 'SR-A-01',
    department: 'M&E', brand: 'Gates', model: 'Hi-Power A42', serial: 'GT-A42-008',
    origin: 'USA', purchaseDate: '10/02/2026', yearOfManufacture: '2025',
    usageDate: '15/02/2026', warrantyExpiryDate: '15/02/2027',
    specification: 'Type: A-section, Length: 42", Material: Rubber-reinforced',
  },
  {
    id: 'sp3', code: 'CNT-3PH-40A', name: 'Contactor 3-Phase 40A', system: 'Electrical',
    subSystem: 'LV Distribution', assetType: 'Motor Control Centre',
    available: 6, total: 10, onHold: 1, status: 'Active',
    createdAt: '02/04/2026 11:00', location: 'Orchard Central', storeRoom: 'SR-B-03',
    department: 'Electrical', brand: 'Schneider Electric', model: 'LC1D40', serial: 'SE-40A-006',
    origin: 'France', purchaseDate: '05/01/2026', yearOfManufacture: '2025',
    usageDate: '12/01/2026', warrantyExpiryDate: '12/01/2027',
    specification: 'Rated current: 40A, Coil voltage: 24VDC, Poles: 3, IEC 60947-4-1',
  },
  {
    id: 'sp4', code: 'SNS-SMK-IO', name: 'Smoke Sensor I/O', system: 'Fire Safety',
    subSystem: 'Detection', assetType: 'Control Panel',
    available: 25, total: 40, onHold: 5, status: 'Active',
    createdAt: '15/01/2026 08:00', location: 'Orchard Central', storeRoom: 'SR-B-03',
    department: 'Fire Safety', brand: 'Notifier', model: 'FSI-751', serial: 'NF-FSI-025',
    origin: 'USA', purchaseDate: '08/12/2025', yearOfManufacture: '2025',
    usageDate: '01/01/2026', warrantyExpiryDate: '01/01/2028',
    specification: 'Type: Addressable optical, Sensitivity: 1-4%/m, SLC loop compatible',
  },
  {
    id: 'sp5', code: 'SEL-PMP-MEC', name: 'Pump Mechanical Seal', system: 'Plumbing',
    subSystem: 'Water Supply', assetType: 'Booster Pump',
    available: 4, total: 6, onHold: 0, status: 'Inactive',
    createdAt: '20/03/2026 10:30', location: 'Marina Tower A', storeRoom: 'SR-A-02',
    department: 'Plumbing', brand: 'Grundfos', model: 'M12x1.5', serial: 'GF-MEC-004',
    origin: 'Denmark', purchaseDate: '15/01/2026', yearOfManufacture: '2025',
    usageDate: '20/01/2026', warrantyExpiryDate: '20/01/2027',
    specification: 'Shaft diameter: 12mm, Material: Silicon carbide, Max pressure: 10 bar',
  },
];

export interface StockHistoryEntry {
  id: string;
  date: string;
  change: string;
  reason: string;
}

export const stockHistory: StockHistoryEntry[] = [
  { id: 'sh1', date: '2026-06-14', change: '-2', reason: 'Issued to WO-2026-0188' },
  { id: 'sh2', date: '2026-06-10', change: '+10', reason: 'Restock PO-4471' },
  { id: 'sh3', date: '2026-06-05', change: '-1', reason: 'Issued to WO-2026-0175' },
  { id: 'sh4', date: '2026-05-28', change: '-3', reason: 'Issued to WO-2026-0160' },
];

export type RequestType = 'Tenant Request' | 'Ad-hoc WO' | 'Service Request';
export type RequestStatus =
  | 'Tenant Request'
  | 'Pending'
  | 'Service Request Accepted'
  | 'Cancelled'
  | 'Approval Rejected'
  | 'Ad-hoc Declined';

export interface HistoryEntry {
  id: string;
  timestamp: string;
  text: string;
}

export interface MaintenanceRequest {
  id: string;
  type: RequestType;
  status: RequestStatus;
  createdDate: string;
  submittedBy: string;
  building: string;
  floor: string;
  area: string;
  assetSystem: string;
  assetType: string;
  asset: string;
  description: string;
  attachments: { id: string; name: string; kind: 'photo' | 'pdf' }[];
  history: HistoryEntry[];
}

export const requests: MaintenanceRequest[] = [
  {
    id: 'REQ-2026-0042', type: 'Tenant Request', status: 'Tenant Request', createdDate: '2026-06-16 09:24',
    submittedBy: 'Tenant — Unit 12-04', building: 'Marina Tower A', floor: 'L12', area: 'Unit 12-04',
    assetSystem: 'HVAC', assetType: 'Air Handling Unit', asset: 'AHU-01-03',
    description: 'Air conditioning in the meeting room is not cooling. Unit appears to be running but blowing warm air. This has been ongoing since yesterday afternoon and is affecting meetings.',
    attachments: [{ id: 'at1', name: 'aircon_panel.jpg', kind: 'photo' }, { id: 'at2', name: 'thermostat.jpg', kind: 'photo' }],
    history: [{ id: 'h1', timestamp: '2026-06-16 09:24', text: 'Request submitted by tenant' }],
  },
  {
    id: 'REQ-2026-0041', type: 'Ad-hoc WO', status: 'Pending', createdDate: '2026-06-15 14:10',
    submittedBy: 'James Wong (Technician)', building: 'Orchard Central', floor: 'L5', area: 'Riser 2',
    assetSystem: 'Fire Safety', assetType: 'Control Panel', asset: 'FCP-05-12',
    description: 'During routine inspection found fault indicator on zone 4 of the fire control panel. Recommend immediate ad-hoc work order to diagnose and rectify before next fire drill.',
    attachments: [{ id: 'at3', name: 'panel_fault.jpg', kind: 'photo' }, { id: 'at4', name: 'inspection_report.pdf', kind: 'pdf' }],
    history: [{ id: 'h2', timestamp: '2026-06-15 14:10', text: 'Ad-hoc request raised by technician' }],
  },
  {
    id: 'REQ-2026-0039', type: 'Service Request', status: 'Service Request Accepted', createdDate: '2026-06-14 11:30',
    submittedBy: 'Tenant — Unit 08-11', building: 'Marina Tower A', floor: 'L8', area: 'Unit 08-11',
    assetSystem: 'Plumbing', assetType: 'Booster Pump', asset: 'PMP-B1-04',
    description: 'Low water pressure reported on level 8. Likely related to domestic water pump. Tenant requests inspection.',
    attachments: [],
    history: [
      { id: 'h3', timestamp: '2026-06-14 11:30', text: 'Request submitted by tenant' },
      { id: 'h4', timestamp: '2026-06-14 12:05', text: 'Accepted by Building Manager — forwarded to Supervisor' },
    ],
  },
  {
    id: 'REQ-2026-0035', type: 'Ad-hoc WO', status: 'Approval Rejected', createdDate: '2026-06-12 08:45',
    submittedBy: 'Ahmad Rahman (Technician)', building: 'Harbront Plaza', floor: 'B2', area: 'Genset Room',
    assetSystem: 'Electrical', assetType: 'Diesel Generator', asset: 'GEN-B2-01',
    description: 'Request to replace generator battery bank.',
    attachments: [],
    history: [
      { id: 'h5', timestamp: '2026-06-12 08:45', text: 'Ad-hoc request raised by technician' },
      { id: 'h6', timestamp: '2026-06-12 10:20', text: 'Rejected by Building Manager: Battery replaced under warranty last month.' },
    ],
  },
];

export type WorkOrderType = 'Maintenance Scheduling' | 'Ad-hoc Work' | 'Service Request';
export type WorkOrderStatus =
  | 'Draft'
  | 'Pending'
  | 'Pending - Unassigned'
  | 'Assigned'
  | 'Started'
  | 'Completed'
  | 'Verified'
  | 'Closed'
  | 'Cancelled'
  | 'Verification Rejected'
  | 'Completion Rejected'
  | 'Ad-hoc Declined'
  | 'Overdue';

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  photoRequired: boolean;
  /** Description capture setting for this item (WBS 7.2.6). */
  descriptionRequired?: boolean;
  /** Technician-entered description (execution draft). */
  description?: string;
  remark?: string;
}

export interface PartReplacement {
  id: string;
  source: string;
  name: string;
  code: string;
  quantity: number;
}

export interface WorkOrder {
  id: string;
  type: WorkOrderType;
  status: WorkOrderStatus;
  createdDate: string;
  assetCode: string;
  assetId: string;
  assetType: string;
  subSystem: string;
  system: string;
  building: string;
  floor: string;
  area: string;
  dueDate: string;
  overdue: boolean;
  startTime?: string;
  endTime?: string;
  timeRequired: string;
  description: string;
  remark?: string;
  cause?: string;
  planName?: string;
  planId?: string;
  round?: string;
  mainTechnicianId: string;
  subTechnicianId?: string;
  tenantContact?: string;
  checklist: ChecklistItem[];
  parts: PartReplacement[];
  photos: { id: string; name: string }[];
  history: HistoryEntry[];
}

export const workOrders: WorkOrder[] = [
  {
    id: 'WO-2026-0188', type: 'Maintenance Scheduling', status: 'Verified', createdDate: '2026-06-10 08:00',
    assetCode: 'AHU-01-03', assetId: 'a1', assetType: 'Air Handling Unit', subSystem: 'Air Distribution', system: 'HVAC',
    building: 'Marina Tower A', floor: 'L3', area: 'Plant Room A', dueDate: '2026-06-15', overdue: false,
    startTime: '2026-06-14 09:00', endTime: '2026-06-14 11:30', timeRequired: '2.5 hrs',
    description: 'Quarterly preventive maintenance of AHU-01-03 including filter replacement, belt inspection, and coil cleaning.',
    remark: 'All readings within nominal range after service.', planName: 'HVAC Quarterly PM', planId: 'MP-2026-001', round: 'Q2 2026',
    mainTechnicianId: 't1', subTechnicianId: 't3', tenantContact: 'N/A — Common Area',
    checklist: [
      { id: 'c1', text: 'Replace primary air filter', done: true, photoRequired: true },
      { id: 'c2', text: 'Inspect and tension drive belt', done: true, photoRequired: false },
      { id: 'c3', text: 'Clean cooling coil', done: true, photoRequired: true },
      { id: 'c4', text: 'Check bearing temperature', done: true, photoRequired: false, remark: '42°C nominal' },
      { id: 'c5', text: 'Verify airflow at supply diffuser', done: true, photoRequired: false },
    ],
    parts: [{ id: 'p1', source: 'Inventory', name: 'HEPA Air Filter 20"', code: 'FLT-HEPA-20', quantity: 2 }],
    photos: [{ id: 'wp1', name: 'filter_new.jpg' }, { id: 'wp2', name: 'coil_clean.jpg' }],
    history: [
      { id: 'wh1', timestamp: '2026-06-10 08:00', text: 'Work order created from maintenance plan' },
      { id: 'wh2', timestamp: '2026-06-12 10:15', text: 'Assigned to James Wong' },
      { id: 'wh3', timestamp: '2026-06-14 09:00', text: 'Execution started' },
      { id: 'wh4', timestamp: '2026-06-14 11:30', text: 'Completed by technician, signed off' },
      { id: 'wh5', timestamp: '2026-06-14 15:40', text: 'Reviewed and verified by Supervisor' },
    ],
  },
  {
    id: 'WO-2026-0187', type: 'Ad-hoc Work', status: 'Started', createdDate: '2026-06-15 13:20',
    assetCode: 'FCP-05-12', assetId: 'a3', assetType: 'Control Panel', subSystem: 'Detection', system: 'Fire Safety',
    building: 'Orchard Central', floor: 'L5', area: 'Riser 2', dueDate: '2026-06-17', overdue: false,
    startTime: '2026-06-16 10:00', timeRequired: '3 hrs',
    description: 'Diagnose and rectify zone 4 fault on fire control panel FCP-05-12.',
    planName: undefined, mainTechnicianId: 't2', tenantContact: 'N/A — Common Area',
    checklist: [
      { id: 'c6', text: 'Isolate zone 4 circuit', done: true, photoRequired: false, descriptionRequired: true, description: 'Zone 4 isolated at panel.' },
      { id: 'c7', text: 'Test loop continuity', done: true, photoRequired: false },
      { id: 'c8', text: 'Replace faulty smoke sensor', done: false, photoRequired: true, descriptionRequired: true },
      { id: 'c9', text: 'Restore and test zone', done: false, photoRequired: true },
    ],
    parts: [],
    photos: [],
    history: [
      { id: 'wh6', timestamp: '2026-06-15 13:20', text: 'Ad-hoc WO approved and created' },
      { id: 'wh7', timestamp: '2026-06-15 16:00', text: 'Assigned to Ahmad Rahman' },
      { id: 'wh8', timestamp: '2026-06-16 10:00', text: 'Execution started' },
    ],
  },
  {
    id: 'WO-2026-0186', type: 'Maintenance Scheduling', status: 'Pending - Unassigned', createdDate: '2026-06-15 08:00',
    assetCode: 'CHL-B1-01', assetId: 'a2', assetType: 'Water-Cooled Chiller', subSystem: 'Chilled Water', system: 'HVAC',
    building: 'Marina Tower A', floor: 'B1', area: 'Chiller Plant', dueDate: '2026-06-20', overdue: false,
    timeRequired: '4 hrs',
    description: 'Semi-annual chiller maintenance — refrigerant check, condenser tube cleaning, controls verification.',
    planName: 'Chiller Semi-Annual PM', round: 'H1 2026', mainTechnicianId: 't1', tenantContact: 'N/A — Common Area',
    checklist: [
      { id: 'c10', text: 'Check refrigerant pressure', done: false, photoRequired: false },
      { id: 'c11', text: 'Clean condenser tubes', done: false, photoRequired: true },
      { id: 'c12', text: 'Verify control sequence', done: false, photoRequired: false },
    ],
    parts: [],
    photos: [],
    history: [{ id: 'wh9', timestamp: '2026-06-15 08:00', text: 'Work order created, awaiting assignment' }],
  },
  {
    id: 'WO-2026-0180', type: 'Service Request', status: 'Closed', createdDate: '2026-06-05 09:00',
    assetCode: 'LFT-A-02', assetId: 'a4', assetType: 'Traction Lift', subSystem: 'Elevators', system: 'Vertical Transport',
    building: 'Orchard Central', floor: 'All', area: 'Core A', dueDate: '2026-06-08', overdue: false,
    startTime: '2026-06-07 09:30', endTime: '2026-06-07 12:00', timeRequired: '2.5 hrs',
    description: 'Investigate intermittent door sensor fault reported by tenant.',
    remark: 'Door sensor recalibrated, fault cleared.', mainTechnicianId: 't4', tenantContact: 'Facilities — Unit 04-02',
    checklist: [
      { id: 'c13', text: 'Inspect door sensor assembly', done: true, photoRequired: false },
      { id: 'c14', text: 'Recalibrate light curtain', done: true, photoRequired: true },
      { id: 'c15', text: 'Run 20-cycle door test', done: true, photoRequired: false },
    ],
    parts: [],
    photos: [{ id: 'wp3', name: 'door_sensor.jpg' }],
    history: [
      { id: 'wh10', timestamp: '2026-06-05 09:00', text: 'Service request WO created' },
      { id: 'wh11', timestamp: '2026-06-07 12:00', text: 'Completed and signed off' },
      { id: 'wh12', timestamp: '2026-06-08 10:00', text: 'Signed off and closed by Building Manager' },
    ],
  },
  {
    id: 'WO-2026-0175', type: 'Maintenance Scheduling', status: 'Overdue', createdDate: '2026-06-01 08:00',
    assetCode: 'PMP-B1-04', assetId: 'a6', assetType: 'Booster Pump', subSystem: 'Water Supply', system: 'Plumbing',
    building: 'Marina Tower A', floor: 'B1', area: 'Pump Room', dueDate: '2026-06-12', overdue: true,
    timeRequired: '1.5 hrs',
    description: 'Monthly inspection of domestic water booster pump 4.',
    planName: 'Pump Monthly Inspection', round: 'Jun 2026', mainTechnicianId: 't3', tenantContact: 'N/A — Common Area',
    checklist: [
      { id: 'c16', text: 'Check seal for leaks', done: false, photoRequired: true },
      { id: 'c17', text: 'Verify pressure setpoint', done: false, photoRequired: false },
    ],
    parts: [],
    photos: [],
    history: [{ id: 'wh13', timestamp: '2026-06-01 08:00', text: 'Work order created from maintenance plan' }],
  } as WorkOrder,
  {
    id: 'WO-2026-0190', type: 'Ad-hoc Work', status: 'Completion Rejected', createdDate: '2026-06-13 10:00',
    assetCode: 'GEN-B2-01', assetId: 'a5', assetType: 'Diesel Generator', subSystem: 'Backup Power', system: 'Electrical',
    building: 'Harbront Plaza', floor: 'B2', area: 'Genset Room', dueDate: '2026-06-16', overdue: false,
    startTime: '2026-06-14 09:00', endTime: '2026-06-14 10:30', timeRequired: '1.5 hrs',
    description: 'Replace generator coolant and inspect hoses.',
    remark: 'Coolant replaced.', mainTechnicianId: 't2', tenantContact: 'N/A — Common Area',
    checklist: [
      { id: 'c18', text: 'Drain old coolant', done: true, photoRequired: false, descriptionRequired: true, description: 'Old coolant drained and disposed.' },
      { id: 'c19', text: 'Refill with approved coolant', done: true, photoRequired: true },
      { id: 'c20', text: 'Inspect hoses for cracks', done: true, photoRequired: true },
    ],
    parts: [],
    photos: [{ id: 'wp4', name: 'coolant.jpg' }],
    history: [
      { id: 'wh14', timestamp: '2026-06-13 10:00', text: 'Ad-hoc WO created' },
      { id: 'wh15', timestamp: '2026-06-14 10:30', text: 'Completed by technician' },
      { id: 'wh16', timestamp: '2026-06-14 14:00', text: 'Rejected by Supervisor: Hose photo unclear, please retake.' },
    ],
  },
];

export interface KPI {
  key: string;
  label: string;
  count: number;
  icon: string;
  category: 'workOrder' | 'request' | 'pending' | 'completed' | 'closed' | 'inProgress';
}

export const bmKpis: KPI[] = [
  { key: 'totalReq', label: 'Total Requests', count: 24, icon: 'file-document-outline', category: 'request' },
  { key: 'pending', label: 'Pending Approval', count: 5, icon: 'clock-alert-outline', category: 'pending' },
  { key: 'inProgress', label: 'In Progress WOs', count: 8, icon: 'progress-wrench', category: 'inProgress' },
  { key: 'completed', label: 'Completed WOs', count: 17, icon: 'clipboard-check-outline', category: 'completed' },
  { key: 'closed', label: 'Closed WOs', count: 132, icon: 'check-all', category: 'closed' },
];

export const supKpis: KPI[] = [
  { key: 'techReq', label: 'Pending Tech Requests', count: 2, icon: 'account-clock-outline', category: 'pending' },
  { key: 'unassigned', label: 'Awaiting Assignment', count: 3, icon: 'clipboard-alert-outline', category: 'pending' },
  { key: 'inProgress', label: 'In Execution', count: 6, icon: 'progress-wrench', category: 'inProgress' },
  { key: 'review', label: 'Awaiting Sign-off', count: 4, icon: 'clipboard-search-outline', category: 'request' },
  { key: 'activeWOs', label: 'Total Active WOs', count: 15, icon: 'clipboard-check-outline', category: 'completed' },
];

export const techKpis: KPI[] = [
  { key: 'todo', label: 'Todo', count: 4, icon: 'clipboard-text-outline', category: 'workOrder' },
  { key: 'inProgress', label: 'In Progress', count: 1, icon: 'progress-wrench', category: 'inProgress' },
  { key: 'completed', label: 'Completed', count: 3, icon: 'clipboard-check-outline', category: 'completed' },
];

export interface ActivityItem {
  id: string;
  icon: string;
  description: string;
  timestamp: string;
  status: string;
  linkType: 'request' | 'workorder';
  linkId: string;
}

export const recentActivity: ActivityItem[] = [
  { id: 'ac1', icon: 'file-document-outline', description: 'New tenant request for Marina Tower A', timestamp: '5 min ago', status: 'Tenant Request', linkType: 'request', linkId: 'REQ-2026-0042' },
  { id: 'ac2', icon: 'clipboard-check-outline', description: 'WO-2026-0188 verified by Supervisor', timestamp: '1 hr ago', status: 'Verified', linkType: 'workorder', linkId: 'WO-2026-0188' },
  { id: 'ac3', icon: 'clipboard-text-outline', description: 'Ad-hoc work order awaiting your approval', timestamp: '3 hrs ago', status: 'Pending', linkType: 'request', linkId: 'REQ-2026-0041' },
  { id: 'ac4', icon: 'check-all', description: 'WO-2026-0180 signed off and closed', timestamp: 'Yesterday', status: 'Closed', linkType: 'workorder', linkId: 'WO-2026-0180' },
  { id: 'ac5', icon: 'clipboard-alert-outline', description: 'WO-2026-0175 is now overdue', timestamp: 'Yesterday', status: 'Overdue', linkType: 'workorder', linkId: 'WO-2026-0175' },
];

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  linkType: 'request' | 'workorder' | 'sparepart';
  linkId: string;
}

export const notifications: NotificationItem[] = [
  { id: 'n1', icon: 'file-document-outline', title: 'New Service Request', body: 'A tenant has submitted a service request for Marina Tower A. Tap to review.', timestamp: '5 min ago', read: false, linkType: 'request', linkId: 'REQ-2026-0042' },
  { id: 'n2', icon: 'clipboard-text-outline', title: 'Work Order Awaiting Approval', body: 'An ad-hoc work order request for Orchard Central requires your approval.', timestamp: '3 hrs ago', read: false, linkType: 'request', linkId: 'REQ-2026-0041' },
  { id: 'n3', icon: 'clipboard-check-outline', title: 'Work Order Ready for Sign-off', body: 'Work Order WO-2026-0188 has been reviewed by the Supervisor and is ready for your final sign-off.', timestamp: '1 hr ago', read: true, linkType: 'workorder', linkId: 'WO-2026-0188' },
  { id: 'n4', icon: 'package-variant-closed', title: 'Low Stock Alert', body: 'Spare part V-Belt A42 stock is below minimum threshold. Current stock: 0.', timestamp: 'Yesterday', read: true, linkType: 'sparepart', linkId: 'sp2' },
];

export function getAsset(id: string) {
  return assets.find((a) => a.id === id);
}
export function getRequest(id: string) {
  return requests.find((r) => r.id === id);
}
export function getWorkOrder(id: string) {
  return workOrders.find((w) => w.id === id);
}
export function getSparePart(id: string) {
  return spareParts.find((s) => s.id === id);
}
export function getTechnician(id: string) {
  return technicians.find((t) => t.id === id);
}

/** Maintenance history for an asset (WOs touching it). */
export function maintenanceHistory(assetId: string) {
  return workOrders.filter((w) => w.assetId === assetId && (w.status === 'Closed' || w.status === 'Verified'));
}
export function pendingWorkOrders(assetId: string) {
  return workOrders.filter(
    (w) => w.assetId === assetId && !['Closed', 'Cancelled'].includes(w.status)
  );
}
