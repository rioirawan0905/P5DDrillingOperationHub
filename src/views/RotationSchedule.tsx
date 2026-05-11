import { 
  Plus, 
  Sparkles, 
  MapPin, 
  PlaneTakeoff, 
  PlaneLanding, 
  AlertCircle,
  Clock,
  Construction
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function RotationSchedule() {
  const days = Array.from({ length: 14 }, (_, i) => ({
    label: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i % 7],
    num: (i + 1).toString().padStart(2, '0'),
    isWeekend: (i + 1) % 7 === 6 || (i + 1) % 7 === 0
  }));

  const crews = [
    { name: 'Shift Alpha', status: 'On Duty', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Maintenance Crew', status: 'On Duty', color: 'bg-rose-100 text-rose-800', hasAlert: true },
    { name: 'Shift Bravo (Standby)', status: 'Off Duty', color: 'bg-slate-100 text-slate-500' },
    { name: 'Geology Team', status: 'Off Duty', color: 'bg-slate-100 text-slate-500' },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 overflow-hidden">
      <div className="p-8 flex flex-wrap items-center justify-between gap-6 bg-white border border-slate-200 rounded-t-2xl shadow-sm">
        <div className="flex items-center gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">September 2024</h2>
            <div className="flex items-center gap-2 text-slate-400 mt-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs uppercase tracking-widest leading-none">Dubai DXB Platform</span>
            </div>
          </div>
          <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100">
            <button className="bg-indigo-600 text-white px-5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all">Monthly</button>
            <button className="px-5 py-1.5 text-xs text-slate-500 font-bold hover:text-slate-800 transition-all">Gantt</button>
            <button className="px-5 py-1.5 text-xs text-slate-500 font-bold hover:text-slate-800 transition-all">Team</button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="bg-slate-100 border-none rounded-full px-5 py-2.5 text-xs font-bold text-slate-700 appearance-none min-w-[140px] focus:ring-1 focus:ring-indigo-500">
            <option>Dubai Hub</option>
            <option>Houston Site</option>
            <option>Perth Base</option>
          </select>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-md">
            <Plus className="w-4 h-4" />
            New Shift
          </button>
          <button className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Optimise
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden border-x border-slate-200 bg-white">
        <div className="w-80 bg-white border-r border-slate-100 overflow-y-auto shrink-0 custom-scrollbar">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-20">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Operational Units</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {crews.map((crew) => (
              <div key={crew.name} className={cn(
                "p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group border-l-4 border-transparent",
                crew.hasAlert && "bg-rose-50/30 border-rose-500"
              )}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight">{crew.name}</span>
                  <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm border", crew.color)}>
                    {crew.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                         <img src={`https://i.pravatar.cc/100?img=${i + (crew.name === 'Shift Alpha' ? 10 : 20)}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm">+5</div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium ml-2">8 assigned</span>
                </div>
                {crew.hasAlert && (
                  <div className="mt-4 text-[10px] text-rose-600 flex items-center gap-1.5 font-bold animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" /> Deployment Gap: Oct 12-18
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
          <div className="flex border-b border-slate-100 sticky top-0 z-30 bg-white">
            <div className="flex-1 grid grid-cols-14 min-w-[1400px]">
              {days.map((day) => (
                <div key={day.num} className={cn(
                  "border-r border-slate-50 text-center py-4 flex flex-col gap-0.5",
                  day.isWeekend && "bg-slate-50/50"
                )}>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest">{day.label}</p>
                  <p className="font-bold text-lg text-slate-800">{day.num}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-x-auto relative custom-scrollbar">
            <div className="h-full min-w-[1400px]">
              <div className="absolute inset-0 grid grid-cols-14 pointer-events-none">
                {days.map((day) => (
                  <div key={day.num} className={cn(
                    "border-r border-slate-50 h-full",
                    day.isWeekend && "bg-slate-50/10"
                  )}></div>
                ))}
              </div>

              <div className="divide-y divide-slate-50 relative z-10">
                <div className="h-28 relative py-8">
                  <div className="absolute h-12 bg-indigo-600 border-y border-indigo-700 flex items-center px-5 text-white text-[10px] font-bold shadow-lg rounded-r-lg" style={{ left: '0', width: '28.5%' }}>
                    ON-SITE: DXB PLATFORM A <Construction className="ml-3 w-4 h-4 opacity-50" />
                  </div>
                  <div className="absolute h-12 bg-indigo-100 border-y border-indigo-200 flex items-center px-5 text-indigo-700 font-bold text-[10px]" style={{ left: '28.5%', width: '14.2%' }}>
                    IN TRANSIT
                  </div>
                  <div className="absolute h-12 bg-slate-50 border-y border-slate-100 flex items-center px-5 text-slate-400 font-bold text-[10px]" style={{ left: '42.7%', width: '50%' }}>
                    OFF-DUTY ROTATION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-b-2xl flex items-center justify-between shadow-sm">
        <div className="flex gap-10 items-center">
          {[
            { label: 'On Duty Deployment', color: 'bg-indigo-600' },
            { label: 'Off Duty Rotation', color: 'bg-slate-100' },
            { label: 'Personnel Vulnerability', color: 'bg-rose-50 border-2 border-rose-500 border-dashed' },
          ].map(legend => (
            <div key={legend.label} className="flex items-center gap-3">
              <div className={cn("w-4 h-4 rounded shadow-sm", legend.color)}></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{legend.label}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          Next Schedule Refresh: <span className="text-slate-800">14:00 GMT</span>
        </div>
      </div>
    </div>
  );
}
