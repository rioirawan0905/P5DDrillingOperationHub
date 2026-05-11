import { Search, Bell, HelpCircle, Settings as SettingsIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center h-16 px-8 w-full sticky top-0 z-50 bg-white border-b border-outline-variant shrink-0">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-96 max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-xs focus:ring-1 focus:ring-primary transition-all font-medium"
            placeholder="Search projects, members, or schedules..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-50 transition-colors rounded-full relative">
            <Bell className="text-slate-500 w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 hover:bg-slate-50 transition-colors rounded-full text-slate-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">Alex Thompson</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Coordinator</div>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-200 bg-indigo-100 flex items-center justify-center overflow-hidden">
            <span className="text-primary font-bold text-xs">AT</span>
          </div>
        </div>
      </div>
    </header>
  );
}
