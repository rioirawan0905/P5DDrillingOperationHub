import { MOCK_PERSONNEL } from '../mockData';
import { Search, Plane, Calendar, Clock, AlertCircle, Filter, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useMemo } from 'react';
import { resolveTicketStatus } from '../lib/analytics';

export default function TravelTracker() {
  const [searchTerm, setSearchTerm] = useState('');

  // Logic to process travel data from personnel
  const travelData = useMemo(() => {
    return MOCK_PERSONNEL.map((p) => {
      const status = resolveTicketStatus(p);
      return {
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        role: p.role,
        date: p.rotationStart,
        type: 'Inbound' as const,
        status,
        site: p.site
      };
    }).filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const needActionCount = useMemo(() => 
    MOCK_PERSONNEL.filter(p => resolveTicketStatus(p) === 'Need Action').length
  , []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Requested': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Not Received': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'Need Action': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-emerald-500';
      case 'Requested': return 'bg-indigo-500';
      case 'Not Received': return 'bg-slate-400';
      case 'Need Action': return 'bg-rose-500 animate-pulse';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Travel Coordination</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">Monitoring inbound/outbound travel windows and ticketing status for all active personnel.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4" />
            Calendar View
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all shadow-md">
            <Plane className="w-4 h-4" />
            Book Tickets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center gap-8">
          <div className="flex-1 min-w-[300px]">
             <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Quick Search</label>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 transition-all font-medium" 
                  placeholder="Filter by name, date, or route..." 
                  type="text" 
                />
             </div>
          </div>
          <div className="flex gap-4">
            <button className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-slate-500 shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col justify-center shadow-xl">
           <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Attention Required</p>
           <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-white tracking-tight">{needActionCount}</p>
              <div className="flex items-center gap-1 text-rose-400 text-[10px] font-bold mb-1">
                 <AlertCircle className="w-3 h-3" />
                 Need Action
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Personnel</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Travel Date</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Window Type</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Ticket Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {travelData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img alt={item.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" src={item.avatar} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 line-height-tight">{item.name}</span>
                        <span className="text-xs text-slate-400 font-medium tracking-tight">ID: {item.id.split('-')[0]}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-slate-300" />
                       <span className="text-sm font-bold text-slate-700 font-mono tracking-tighter">{item.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider border",
                      item.type === 'Inbound' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-orange-50 text-orange-700 border-orange-100"
                    )}>
                      {item.type === 'Inbound' ? 'Arriving' : 'Departing'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <span>{item.site}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      getStatusStyle(item.status)
                    )}>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        getStatusDotColor(item.status)
                      )}></div>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
