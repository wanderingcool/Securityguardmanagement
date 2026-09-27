import { Guard, Site, PatrolLog, InventoryItem, LeaveRequest, Alert } from '../types';

export const currentGuard = {
  id: 'G001',
  name: 'James Mwangi',
  badge: 'SG-0042',
  site: 'Westlands Corporate Park',
  siteId: 'S001',
  shift: 'Night Shift — 18:00 to 06:00',
  phone: '+254 712 345 678',
};

export const mockGuards: Guard[] = [
  { id: 'G001', name: 'James Mwangi', badge: 'SG-0042', site: 'Westlands Corporate Park', siteId: 'S001', status: 'checked-in', lat: 30, lng: 45, lastSeen: '2 min ago', shift: 'Night', phone: '+254 712 345 678' },
  { id: 'G002', name: 'Amina Hassan', badge: 'SG-0031', site: 'Kilimani Plaza', siteId: 'S002', status: 'checked-in', lat: 55, lng: 60, lastSeen: '5 min ago', shift: 'Night', phone: '+254 722 111 222' },
  { id: 'G003', name: 'Peter Odhiambo', badge: 'SG-0018', site: 'Westlands Corporate Park', siteId: 'S001', status: 'inactive', lat: 20, lng: 70, lastSeen: '34 min ago', shift: 'Night', phone: '+254 733 444 555' },
  { id: 'G004', name: 'Grace Njoroge', badge: 'SG-0055', site: 'Upperhill Towers', siteId: 'S003', status: 'absent', lat: 70, lng: 30, lastSeen: 'Not checked in', shift: 'Night', phone: '+254 700 666 777' },
  { id: 'G005', name: 'Daniel Kipkemoi', badge: 'SG-0067', site: 'Kilimani Plaza', siteId: 'S002', status: 'checked-in', lat: 60, lng: 55, lastSeen: '1 min ago', shift: 'Night', phone: '+254 711 888 999' },
  { id: 'G006', name: 'Ruth Achieng', badge: 'SG-0079', site: 'Upperhill Towers', siteId: 'S003', status: 'checked-in', lat: 80, lng: 40, lastSeen: '8 min ago', shift: 'Day', phone: '+254 720 123 456' },
  { id: 'G007', name: 'Samuel Otieno', badge: 'SG-0083', site: 'Westlands Corporate Park', siteId: 'S001', status: 'absent', lat: 40, lng: 80, lastSeen: 'Not checked in', shift: 'Day', phone: '+254 731 789 012' },
];

export const mockSites: Site[] = [
  { id: 'S001', name: 'Westlands Corporate Park', address: 'Westlands Ave, Nairobi', geofenceRadius: 200, lat: -1.2641, lng: 36.8022, assignedGuards: 3, activeGuards: 2 },
  { id: 'S002', name: 'Kilimani Plaza', address: 'Kilimani Road, Nairobi', geofenceRadius: 150, lat: -1.2881, lng: 36.7882, assignedGuards: 2, activeGuards: 2 },
  { id: 'S003', name: 'Upperhill Towers', address: 'Hospital Road, Upperhill', geofenceRadius: 300, lat: -1.2984, lng: 36.8155, assignedGuards: 2, activeGuards: 1 },
  { id: 'S004', name: 'Karen Business Park', address: 'Karen Road, Nairobi', geofenceRadius: 250, lat: -1.3192, lng: 36.7112, assignedGuards: 0, activeGuards: 0 },
];

export const mockPatrolLogs: PatrolLog[] = [
  { id: 'P001', checkpoint: 'Main Gate — CP-01', timestamp: '18:15', status: 'ok' },
  { id: 'P002', checkpoint: 'Parking Lot B — CP-03', timestamp: '18:47', status: 'ok' },
  { id: 'P003', checkpoint: 'Server Room Corridor — CP-07', timestamp: '19:20', status: 'ok' },
];

export const mockInventory: InventoryItem[] = [
  { id: 'I001', name: 'Uniform Shirt (x2)', category: 'Uniform', issueDate: '2024-01-15', replacementDue: '2025-01-15', condition: 'good' },
  { id: 'I002', name: 'Uniform Trouser (x2)', category: 'Uniform', issueDate: '2024-01-15', replacementDue: '2025-01-15', condition: 'good' },
  { id: 'I003', name: 'Safety Boots', category: 'Shoes', issueDate: '2024-01-15', replacementDue: '2024-10-15', condition: 'fair' },
  { id: 'I004', name: 'Torch / Flashlight', category: 'Equipment', issueDate: '2024-03-01', replacementDue: '2025-03-01', condition: 'good' },
  { id: 'I005', name: 'Duty Belt', category: 'Accessories', issueDate: '2024-01-15', replacementDue: '2025-06-15', condition: 'good' },
  { id: 'I006', name: 'Cap / Beret', category: 'Accessories', issueDate: '2024-01-15', replacementDue: '2025-01-15', condition: 'fair' },
  { id: 'I007', name: 'Baton / Stick', category: 'Equipment', issueDate: '2024-02-10', replacementDue: '2026-02-10', condition: 'good' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: 'L001', type: 'Annual Leave', startDate: '2025-05-01', endDate: '2025-05-05', reason: 'Family visit', status: 'approved', submittedAt: '2025-04-01' },
  { id: 'L002', type: 'Sick Leave', startDate: '2025-03-12', endDate: '2025-03-13', reason: 'Flu', status: 'approved', submittedAt: '2025-03-12' },
  { id: 'L003', type: 'Emergency Leave', startDate: '2025-04-20', endDate: '2025-04-21', reason: 'Family emergency', status: 'pending', submittedAt: '2025-04-19' },
];

export const mockAlerts: Alert[] = [
  { id: 'A001', type: 'inactivity', guardName: 'Peter Odhiambo', guardId: 'G003', site: 'Westlands Corporate Park', message: 'Guard has been static for 34 minutes. Inactivity threshold exceeded.', timestamp: '21:14', severity: 'high', resolved: false },
  { id: 'A002', type: 'missed-patrol', guardName: 'Samuel Otieno', guardId: 'G007', site: 'Westlands Corporate Park', message: 'Checkpoint CP-05 (Rooftop Access) was not scanned during scheduled patrol window 20:00–20:30.', timestamp: '20:35', severity: 'medium', resolved: false },
  { id: 'A003', type: 'geofence-breach', guardName: 'Amina Hassan', guardId: 'G002', site: 'Kilimani Plaza', message: 'Guard exited geofence boundary at 19:58. Auto check-out triggered.', timestamp: '19:58', severity: 'high', resolved: true },
  { id: 'A004', type: 'late-checkin', guardName: 'Grace Njoroge', guardId: 'G004', site: 'Upperhill Towers', message: 'Guard has not checked in. Shift started at 18:00. Currently 3 hours overdue.', timestamp: '21:00', severity: 'high', resolved: false },
  { id: 'A005', type: 'missed-patrol', guardName: 'James Mwangi', guardId: 'G001', site: 'Westlands Corporate Park', message: 'Checkpoint CP-02 (Car Park Entrance) missed. Patrol route incomplete.', timestamp: '20:00', severity: 'medium', resolved: true },
  { id: 'A006', type: 'inactivity', guardName: 'Daniel Kipkemoi', guardId: 'G005', site: 'Kilimani Plaza', message: 'Motion sensor alert: minimal movement detected for 18 minutes.', timestamp: '20:52', severity: 'low', resolved: true },
];
