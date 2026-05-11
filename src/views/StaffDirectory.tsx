import { useState } from 'react';
import type { FormEvent } from 'react';
import { MOCK_PERSONNEL } from '../mockData';
import { Search, Filter, Download, UserPlus, MoreVertical, CheckCircle2, Plane, Clock, Users, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StaffDirectory() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', site: 'Singapore Site A' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Adding Personnel:', formData);
    alert('Personnel Added Successfully (Check Console)');
    setShowAddForm(false);
    setFormData({ name: '', role: '', site: 'Singapore Site A' });
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Staff Directory</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">Manage workforce assignments and monitor rotation availability across global sites.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-500 transition-all shadow-md active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            Add Personnel
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 relative"
          >
            <button 
              type="button"
              onClick={() => setShowAddForm(false)}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Registration</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">Register new field personnel into the system.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                  placeholder="e.g. Johnathan Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Job Designation</label>
                <input 
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                  placeholder="e.g. Senior Driller"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Site Placement</label>
                <select 
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-semibold text-slate-700"
                  value={formData.site}
                  onChange={(e) => setFormData({...formData, site: e.target.value})}
                >
                  <option>Singapore Site A</option>
                  <option>Dubai Site B</option>
                  <option>Rotterdam Base</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm tracking-tight hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Confirm Registration
            </button>
          </form>
        </div>
      )}

      {/* Filter Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center gap-8 shadow-sm">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Search Staff</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 transition-all font-medium" 
                placeholder="Search by name or employee ID..." 
                type="text" 
              />
            </div>
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Deployment Site</label>
            <select className="w-full bg-slate-100 border-none rounded-full px-4 py-2.5 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-indigo-500 appearance-none">
              <option>All Sites</option>
              <option>Singapore Site A</option>
              <option>Rotterdam Base</option>
              <option>Dubai Site B</option>
            </select>
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Crew Team</label>
            <select className="w-full bg-slate-100 border-none rounded-full px-4 py-2.5 text-xs font-bold text-slate-700 focus:ring-1 focus:ring-indigo-500 appearance-none">
              <option>All Crews</option>
              <option>Shift Alpha</option>
              <option>Maintenance Crew</option>
              <option>Support Team</option>
            </select>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 flex items-center justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute right-[-10%] top-[-10%] opacity-10 group-hover:rotate-12 transition-transform duration-700">
             <Users className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Available Personnel</p>
            <p class="text-3xl font-bold text-white tracking-tight">1,284</p>
          </div>
          <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center relative z-10 border border-white/20">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Personnel Name</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Deployment Site</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Assigned Crew</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Rotation End</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PERSONNEL.map((person) => (
                <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img alt={person.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" src={person.avatar} />
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-indigo-600 transition-colors">{person.name}</p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-1">ID: {person.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">{person.site}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[10px] shadow-sm border border-indigo-100">
                      {person.crew}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-500 font-mono tracking-tighter">{person.rotationEnd}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      person.status === 'on-duty' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
                    )}>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        person.status === 'on-duty' ? "bg-emerald-500" : "bg-slate-300"
                      )}></div>
                      {person.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-indigo-600 p-2 rounded-xl transition-colors hover:bg-indigo-50">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-5 bg-slate-50 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400">Total Personnel: 482 Registered</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-white transition-colors text-slate-400 border border-transparent hover:border-slate-200 disabled:opacity-30" disabled>
               <Icons.ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-600 text-white shadow-lg">1</span>
            <button className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all">2</button>
            <button className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all">3</button>
            <button className="p-2 rounded-xl hover:bg-white transition-colors text-slate-400 border border-transparent hover:border-slate-200">
               <Icons.ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Icons = {
  ChevronLeft: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
