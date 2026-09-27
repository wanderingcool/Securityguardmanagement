import { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { AdminSection } from '../../types';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import SiteManagement from './SiteManagement';
import AlertsFeed from './AlertsFeed';
import UserManagement from './UserManagement';
import Reports from './Reports';

interface Props {
  onSwitchToGuard: () => void;
}

export default function AdminView({ onSwitchToGuard }: Props) {
  const [section, setSection] = useState<AdminSection>('dashboard');

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar active={section} onSelect={setSection} onSwitchToGuard={onSwitchToGuard} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guards, sites, alerts..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Bell size={17} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-xl transition-colors">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">AD</div>
              <div>
                <p className="text-slate-700 font-semibold text-sm leading-tight">Admin User</p>
                <p className="text-slate-400 text-xs">Super Admin</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {section === 'dashboard' && <Dashboard />}
          {section === 'sites' && <SiteManagement />}
          {section === 'alerts' && <AlertsFeed />}
          {section === 'users' && <UserManagement />}
          {section === 'reports' && <Reports />}
        </main>
      </div>
    </div>
  );
}
