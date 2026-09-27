import { LayoutDashboard, Map, Bell, Users, BarChart2, Settings, Shield, ChevronRight } from 'lucide-react';
import { AdminSection } from '../../types';

interface Props {
  active: AdminSection;
  onSelect: (s: AdminSection) => void;
  onSwitchToGuard: () => void;
}

const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Live Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'sites', label: 'Site Management', icon: <Map size={18} /> },
  { id: 'alerts', label: 'Alerts Feed', icon: <Bell size={18} /> },
  { id: 'users', label: 'User Management', icon: <Users size={18} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart2 size={18} /> },
];

export default function Sidebar({ active, onSelect, onSwitchToGuard }: Props) {
  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col flex-shrink-0">
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">GuardForce</p>
            <p className="text-slate-400 text-xs">Admin Console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="text-slate-500 text-xs uppercase tracking-widest font-medium px-3 mb-2">Navigation</p>
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
                {item.id === 'alerts' && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <button
          onClick={onSwitchToGuard}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-colors"
        >
          <ChevronRight size={16} className="rotate-180" />
          Guard Mobile View
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-colors mt-0.5">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}
