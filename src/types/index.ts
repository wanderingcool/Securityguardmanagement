export type ViewMode = 'guard' | 'admin';
export type GuardTab = 'attendance' | 'patrol' | 'selfservice';
export type AdminSection = 'dashboard' | 'sites' | 'alerts' | 'users' | 'reports';

export interface Guard {
  id: string;
  name: string;
  badge: string;
  site: string;
  siteId: string;
  status: 'checked-in' | 'absent' | 'inactive' | 'off-duty';
  lat: number;
  lng: number;
  lastSeen: string;
  shift: string;
  phone: string;
}

export interface Site {
  id: string;
  name: string;
  address: string;
  geofenceRadius: number;
  lat: number;
  lng: number;
  assignedGuards: number;
  activeGuards: number;
}

export interface PatrolLog {
  id: string;
  checkpoint: string;
  timestamp: string;
  status: 'ok' | 'missed' | 'late';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  issueDate: string;
  replacementDue: string;
  condition: 'good' | 'fair' | 'poor';
}

export interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface Alert {
  id: string;
  type: 'missed-patrol' | 'geofence-breach' | 'inactivity' | 'sos' | 'late-checkin';
  guardName: string;
  guardId: string;
  site: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
}
