import { MOCK_PERSONNEL } from '../mockData';
import { Personnel } from '../types';

export const getWorkforceStats = () => {
  const total = MOCK_PERSONNEL.length;
  const onDuty = MOCK_PERSONNEL.filter(p => p.status === 'on-duty').length;
  const offDuty = total - onDuty;
  
  return {
    total,
    onDuty,
    offDuty,
    onDutyPercentage: Math.round((onDuty / total) * 100)
  };
};

export const getTravelStats = () => {
  // Derive travel from personnel rotation dates
  // In a real app, this would be a separate collection, but for "connectivity" 
  // we derive it from the same source of truth.
  
  const now = new Date();
  
  const pipeline = MOCK_PERSONNEL.map(p => {
    const start = new Date(p.rotationStart);
    const end = new Date(p.rotationEnd);
    
    // Simple logic: if start is within next 7 days, it's inbound
    // If end is within next 7 days, it's outbound
    const inboundWindow = new Date();
    inboundWindow.setDate(now.getDate() + 7);
    
    const outboundWindow = new Date();
    outboundWindow.setDate(now.getDate() + 7);
    
    let type: 'inbound' | 'outbound' | 'none' = 'none';
    if (start >= now && start <= inboundWindow) type = 'inbound';
    else if (end >= now && end <= outboundWindow) type = 'outbound';
    
    return { ...p, travelType: type };
  });

  const inbound = pipeline.filter(p => p.travelType === 'inbound').length;
  const outbound = pipeline.filter(p => p.travelType === 'outbound').length;
  const onSite = MOCK_PERSONNEL.filter(p => p.status === 'on-duty').length;
  
  return {
    preDeparture: inbound + 5, // sample offset for demo
    inTransit: 2, // sample
    onSite,
    returning: outbound,
    totalActive: onSite + inbound + outbound
  };
};

export const resolveTicketStatus = (p: Personnel): 'Requested' | 'Received' | 'Not Received' | 'Need Action' => {
  if (p.ticketStatus === 'Received') return 'Received';
  
  const now = new Date('2026-05-11');
  const start = new Date(p.rotationStart);
  const diffDays = (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  // Need Action if rotation starts within 14 days and ticket not received
  if (diffDays < 14) return 'Need Action';
  return p.ticketStatus || 'Not Received';
};

export const getTicketingStats = () => {
  const stats = {
    requested: 0,
    received: 0,
    notReceived: 0,
    needAction: 0
  };
  
  MOCK_PERSONNEL.forEach((p) => {
    const status = resolveTicketStatus(p);
    if (status === 'Requested') stats.requested += 1;
    else if (status === 'Received') stats.received += 1;
    else if (status === 'Not Received') stats.notReceived += 1;
    else if (status === 'Need Action') stats.needAction += 1;
  });
  
  return [
    { name: 'Requested', value: stats.requested, color: '#6366f1' },
    { name: 'Received', value: stats.received, color: '#10b981' },
    { name: 'Not Received', value: stats.notReceived, color: '#94a3b8' },
    { name: 'Need Action', value: stats.needAction, color: '#f43f5e' },
  ];
};

export const getFatigueData = () => {
  // Working hours analytics derived from current personnel status
  // We calculate hours based on how long they've been on duty
  
  const sites = [...new Set(MOCK_PERSONNEL.map(p => p.site))];
  const now = new Date('2026-05-11'); // Current system date from metadata
  
  return sites.map(site => {
    const personnelAtSite = MOCK_PERSONNEL.filter(p => p.site === site && p.status === 'on-duty');
    
    // Calculate average hours based on time since rotation start
    let totalComputedHours = 0;
    personnelAtSite.forEach(p => {
      const start = new Date(p.rotationStart);
      const daysDiff = Math.max(0, (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      // Assume 12 hours shift per day on site
      totalComputedHours += Math.min(56 + (daysDiff * 2), 72); // Cap it but show variation
    });

    const avgHours = personnelAtSite.length > 0 ? totalComputedHours / personnelAtSite.length : 0;
    
    return {
      name: site.split(' ')[0], // Short name
      hours: Math.round(avgHours),
      label: site,
      alert: avgHours > 56
    };
  });
};

export const getMovementData = () => {
  return MOCK_PERSONNEL.map(p => {
    const isError = p.id.includes('8821'); // Simulate some errors
    return {
      name: p.name,
      role: p.role,
      initials: p.name.split(' ').map(n => n[0]).join(''),
      ticket: isError ? 'Needs Action' : `#TK-${p.id.split('-')[1]}`,
      from: p.site === 'Dubai Site B' ? 'DXB' : 'SIN',
      to: p.site === 'Dubai Site B' ? 'SIN' : 'DXB',
      risk: (p.name.length * 7) % 100, // Deterministic "risk"
      status: p.status === 'on-duty' ? 'On Site' : 'In Transit',
      error: isError
    };
  }).slice(0, 5);
};
