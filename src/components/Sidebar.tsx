import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  PlaneTakeoff, 
  Settings, 
  HelpCircle,
  Construction
} from 'lucide-react';
import type { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'directory', label: 'Staff Directory', icon: Users },
    { id: 'schedule', label: 'Rotation Schedule', icon: CalendarDays },
    { id: 'tracker', label: 'Travel Coordinator', icon: PlaneTakeoff },
  ] as const;

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-outline-variant flex flex-col z-40">
      <div className="p-6 flex flex-col gap-1">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="bg-primary rounded-xl p-2 shadow-sm">
            <Construction className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-on-surface tracking-tight">P5D Drilling</h1>
            <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-black">Operations Hub</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                "flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-200 text-sm font-semibold",
                currentView === item.id 
                  ? "bg-secondary-container text-primary shadow-sm" 
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              <item.icon className={cn("w-5 h-5", currentView === item.id ? "text-primary" : "text-on-surface-variant")} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100 flex flex-col gap-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-3 text-on-surface-variant py-2.5 px-4 hover:bg-slate-50 transition-all rounded-xl text-sm font-semibold w-full text-left"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
