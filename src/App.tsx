import { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { ViewMode } from './types';
import GuardView from './components/guard/GuardView';
import AdminView from './components/admin/AdminView';

export default function App() {
  const [view, setView] = useState<ViewMode>('guard');

  return (
    <div className="relative">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-sm rounded-full p-1 flex items-center gap-1 shadow-xl border border-slate-700">
        <button
          onClick={() => setView('guard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            view === 'guard'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone size={15} />
          Guard View
        </button>
        <button
          onClick={() => setView('admin')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            view === 'admin'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor size={15} />
          Admin Panel
        </button>
      </div>

      {view === 'guard' && <GuardView onSwitchToAdmin={() => setView('admin')} />}
      {view === 'admin' && <AdminView onSwitchToGuard={() => setView('guard')} />}
    </div>
  );
}
