export type View = 'login' | 'dashboard' | 'directory' | 'schedule' | 'tracker';

export interface Personnel {
  id: string;
  name: string;
  role: string;
  site: string;
  crew: string;
  rotationStart: string;
  rotationEnd: string;
  status: 'on-duty' | 'off-duty';
  avatar: string;
  ticketStatus?: 'Requested' | 'Received' | 'Not Received' | 'Need Action';
}

export interface Activity {
  id: string;
  type: 'arrival' | 'visa' | 'delay' | 'rotation';
  message: string;
  time: string;
  source: string;
  detail?: string;
  status?: 'critical' | 'normal' | 'warning';
}
