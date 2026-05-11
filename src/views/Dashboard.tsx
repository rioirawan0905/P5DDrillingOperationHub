import { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  ChevronRight, 
  Activity as AnalyticsIcon, 
  Plane, 
  Ticket, 
  AlertTriangle,
  PlaneTakeoff,
  CheckCircle2,
  AlertCircle,
  Globe,
  Users,
  RefreshCw,
  Zap
} from 'lucide-react';
import { MOCK_ACTIVITIES } from '../mockData';
import { cn } from '../lib/utils';
import { 
  getWorkforceStats, 
  getTravelStats, 
  getTicketingStats, 
  getFatigueData, 
  getMovementData 
} from '../lib/analytics';


export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  // Memoized analytics for better performance and consistency
  const workforce = useMemo(() => getWorkforceStats(), []);
  const travel = useMemo(() => getTravelStats(), []);
  const ticketStats = useMemo(() => getTicketingStats(), []);
  const fatigue = useMemo(() => getFatigueData(), []);
  const movements = useMemo(() => getMovementData(), []);

  const metrics = [
    { label: 'Deployed Workforce', value: workforce.total.toLocaleString(), trend: `${workforce.onDutyPercentage}%`, sub: 'Active on duty', icon: Users, status: 'primary' },
    { label: 'Current Rotations', value: workforce.onDuty.toString(), trend: 'LIVE', sub: 'field assignments', icon: RefreshCw, status: 'secondary' },
    { label: 'Travel Pipeline', value: travel.inTransit.toString(), trend: `${travel.totalActive} TOTAL`, sub: 'movements monitored', icon: Plane, status: 'secondary' },
    { label: 'Safety Check', value: fatigue.filter(f => f.alert).length.toString(), trend: 'CRITICAL', sub: 'fatigue threshold', icon: Zap, status: fatigue.some(f => f.alert) ? 'error' : 'success' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Drilling Operations Dashboard</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">Real-time integrated workforce logistics and personnel operations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm active:scale-95"
          >
            <AnalyticsIcon className="w-4 h-4 text-indigo-500" />
            Safety Report
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all shadow-md active:scale-95"
          >
            <PlaneTakeoff className="w-4 h-4" />
            Book Group Travel
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Operational Alert</h3>
                <p className="text-sm text-slate-500">Safety thresholds are being monitored.</p>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm text-slate-700 font-semibold italic">"Connected with Staff Directory: {workforce.onDuty} on-site personnel currently monitored for fatigue."</p>
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="text-xs font-medium text-slate-500">Last scanned: 2 mins ago</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   Active Link
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-tight hover:bg-slate-800 transition-colors"
            >
              Close Intelligence Report
            </button>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 flex flex-col gap-1 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{metric.label}</span>
              <metric.icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className={cn("text-3xl font-bold text-slate-800")}>{metric.value}</div>
            <div className="mt-2 flex items-center gap-1.5">
               <span className={cn(
                 "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                 metric.status === 'error' ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
               )}>
                 {metric.trend}
               </span>
               <span className="text-[11px] text-slate-400 font-medium">{metric.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Travel Pipeline */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Travel Pipeline</h3>
            <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider">Connected to Travel Tracker</span>
          </div>
          
          <div className="flex-1 flex items-center justify-between gap-6 py-4">
            {[
              { label: 'Pre-departure', value: travel.preDeparture, progress: 100, color: 'bg-indigo-600' },
              { label: 'In-transit', value: travel.inTransit, progress: 45, color: 'bg-indigo-600' },
              { label: 'On-site', value: travel.onSite, progress: 85, color: 'bg-indigo-600' },
              { label: 'Returning', value: travel.returning, progress: 30, color: 'bg-amber-500' },
            ].map((stage, i) => (
              <div key={stage.label} className="flex-1 flex flex-col items-center gap-4 relative">
                <div className="w-full h-2.5 bg-slate-100 rounded-full relative overflow-hidden">
                  <div className={cn("h-full transition-all duration-1000", stage.color)} style={{ width: `${stage.progress}%` }}></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">{stage.value}</div>
                  <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider font-sans">{stage.label}</div>
                </div>
                {i < 3 && (
                  <div className="absolute -right-3 top-0 h-2.5 flex items-center">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Flight Ticket Status */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">Ticketing Status</h3>
          <div className="flex items-center gap-10">
            <div className="relative w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketStats}
                    innerRadius={48}
                    outerRadius={64}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {ticketStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">{workforce.total}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {ticketStats.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[11px] font-semibold text-slate-500">{item.name}</span>
                  </div>
                  <span className={cn("text-xs font-bold", item.name === 'Need Action' ? 'text-rose-600' : 'text-slate-700')}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Fatigue Monitoring */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Operational Fatigue Analysis</h3>
                <p className="text-sm text-slate-500">Working hours derived from staff on-duty cycles (Threshold: 56h)</p>
              </div>
            </div>
            
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fatigue} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                  />
                  <YAxis hide domain={[0, 70]} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 p-2 rounded shadow-xl">
                            <p className="text-xs font-bold text-slate-800">{payload[0].value} Hours Average</p>
                            <p className="text-[10px] text-slate-500 font-medium">at {payload[0].payload.label}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={44}>
                    {fatigue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.alert ? '#f43f5e' : '#4f46e5'} opacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {/* Safety Limit Line */}
              <div className="absolute top-[20%] left-0 right-0 border-t border-rose-500/30 border-dashed pointer-events-none flex justify-end">
                <span className="bg-rose-50 text-rose-600 text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest rounded-full transform -translate-y-1/2 border border-rose-100">Threshold 56H</span>
              </div>
            </div>
          </div>

          {/* Live Personnel Movements */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Recent Personnel Activity</h3>
              <button className="text-xs text-indigo-600 font-bold hover:underline">View All Personnel</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Ticket</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Location Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {movements.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs border border-slate-200">{row.initials}</div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 line-height-tight">{row.name}</span>
                            <span className="text-xs text-slate-500 font-medium">{row.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn("flex items-center gap-2", row.error ? "text-rose-600" : "text-emerald-600")}>
                          {row.error ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          <span className="text-xs font-bold font-mono tracking-tighter">{row.ticket}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 mt-4">
                        <span>{row.from}</span>
                        <ChevronRight className="w-3 h-3 opacity-30" />
                        <span>{row.to}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={cn("h-full transition-all duration-500", row.risk > 70 ? "bg-rose-500" : "bg-emerald-500")} style={{ width: `${row.risk}%` }}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border",
                          row.status === 'In Transit' ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Global Presence */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden relative group shadow-sm min-h-[220px]">
             <div className="absolute inset-0 z-0">
               <img 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1544216717-3bbf52512659?w=600&fit=crop"
                alt="Global Map"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
             </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-indigo-400" />
                Regional Distribution
              </h4>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex-1 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Dubai B</div>
                  <div className="text-2xl font-bold text-white">{workforce.onDuty}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex-1 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Off-Site</div>
                  <div className="text-2xl font-bold text-white">{workforce.offDuty}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Health Feed */}
          <div className="bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm flex-1 max-h-[635px]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Operational Log</h3>
              <button className="text-xs text-indigo-600 font-bold hover:underline">View Full Log</button>
            </div>
            <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
              {MOCK_ACTIVITIES.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {i < MOCK_ACTIVITIES.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-[1px] bg-slate-100"></div>
                  )}
                  <div className={cn(
                    "relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm",
                    activity.status === 'critical' ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                  )}>
                    {activity.type === 'delay' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : activity.type === 'arrival' ? (
                      <Plane className="w-4 h-4 rotate-90" />
                    ) : activity.type === 'visa' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AnalyticsIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 pb-4">
                    <div className="text-sm text-slate-800 leading-snug">
                      {activity.message.split(' ').map((word, idx) => 
                        word.startsWith('#') || word === 'Flight' ? <span key={idx} className="font-bold text-indigo-600">{word} </span> : word + ' '
                      )}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <span>{activity.time}</span>
                      <span className="opacity-30">•</span>
                      <span>{activity.source}</span>
                    </div>
                    {activity.detail && (
                      <div className={cn(
                        "mt-2 p-3 rounded-xl text-xs font-medium leading-relaxed border shadow-sm",
                        activity.status === 'critical' ? "bg-rose-50 border-rose-100 text-rose-700" : "bg-slate-50 border-slate-100 text-slate-600"
                      )}>
                        {activity.detail}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-900 rounded-b-2xl text-white mt-auto">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">System Status</p>
              <p className="text-sm mb-4 leading-relaxed opacity-90 font-medium">All analytics are currently synchronized with the Global Personnel Database.</p>
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all shadow-lg active:scale-95">Refresh Data Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
