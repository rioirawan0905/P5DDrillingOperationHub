import { 
  ShieldCheck, 
  ArrowRight, 
  BadgeCheck, 
  Lock, 
  Eye,
  EyeOff,
  Info,
  Globe,
  HelpCircle,
  Construction
} from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-slate-950">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 scale-105">
        <div className="absolute inset-0 bg-slate-950/40 z-10 backdrop-blur-[2px]"></div>
        <img 
          alt="Refinery Infrastructure" 
          className="w-full h-full object-cover opacity-60" 
          src="https://images.unsplash.com/photo-1544216717-3bbf52512659?w=1600&fit=crop"
        />
      </div>

      <main className="relative z-20 w-full max-w-[460px] bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-700">
        <div className="pt-14 px-12 pb-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Construction className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">P5D</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mt-1.5 ml-0.5">Platform Sync</p>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Corporate Access</h2>
          <p className="text-xs text-slate-400 text-center font-medium px-4 leading-relaxed">Enter your credentials to access the global drilling manifests and rotation protocols.</p>
        </div>

        <form className="px-12 pb-10 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1" htmlFor="employee-id">Work Email / Identifier</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BadgeCheck className="text-slate-300 w-5 h-5" />
              </div>
              <input 
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm outline-none transition-all font-medium text-slate-700" 
                id="employee-id" 
                placeholder="DRILL-7742" 
                type="text" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest" htmlFor="password">Secure Credentials</label>
              <a className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors" href="#">Reset Key</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-slate-300 w-5 h-5" />
              </div>
              <input 
                className="block w-full pl-12 pr-12 py-3.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm outline-none transition-all font-medium text-slate-700" 
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? 'text' : 'password'} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            className="w-full bg-indigo-600 text-white text-[11px] font-bold py-4 rounded-xl uppercase tracking-[0.2em] hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20" 
            type="submit"
          >
            Authenticate
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Identity</span>
            </div>
          </div>

          <button className="w-full border border-slate-200 bg-white text-slate-700 text-[11px] font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm" type="button">
            <Globe className="w-5 h-5 text-indigo-500" />
            Continue with Azure SSO
          </button>
        </form>

        <div className="bg-slate-50 border-t border-slate-100 py-6 px-12 text-center">
          <p className="text-[11px] font-bold text-slate-400">
            Unauthorised access is monitored. 
            <a className="text-indigo-600 font-bold hover:underline ml-1.5" href="#">Report Incident</a>
          </p>
        </div>
      </main>

      <footer className="fixed bottom-8 w-full flex justify-center gap-8 z-20 text-white/50 text-[10px] font-bold uppercase tracking-widest px-6 text-center">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-2">
          <a className="hover:text-white transition-colors flex items-center gap-2" href="#">
            <HelpCircle className="w-3.5 h-3.5" /> Support
          </a>
          <a className="hover:text-white transition-colors flex items-center gap-2" href="#">
            <ShieldCheck className="w-3.5 h-3.5" /> Compliance
          </a>
          <a className="hover:text-white transition-colors flex items-center gap-2" href="#">
            <Globe className="w-3.5 h-3.5" /> Regions
          </a>
        </div>
      </footer>
    </div>
  );
}
