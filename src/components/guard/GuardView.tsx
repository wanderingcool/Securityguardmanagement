import { useState } from 'react';
import { ClipboardCheck, Route, User, Bell, ChevronRight } from 'lucide-react';
import { GuardTab } from '../../types';
import AttendanceTab from './AttendanceTab';
import PatrolTab from './PatrolTab';
import SelfServiceTab from './SelfServiceTab';

const tabs: { id: GuardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck size={22} /> },
  { id: 'patrol', label: 'Patrol', icon: <Route size={22} /> },
  { id: 'selfservice', label: 'Self-Service', icon: <User size={22} /> },
];

interface Props {
  onSwitchToAdmin: () => void;
}

export default function GuardView({ onSwitchToAdmin }: Props) {
  const [activeTab, setActiveTab] = useState<GuardTab>('attendance');

  const tabLabels: Record<GuardTab, string> = {
    attendance: 'Attendance',
    patrol: 'Patrol & Checkpoints',
    selfservice: 'Self-Service',
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-100 min-h-screen flex flex-col relative">
        <div className="bg-blue-800 px-4 pt-10 pb-4 flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs uppercase tracking-widest font-medium">GuardForce</p>
            <h1 className="text-white font-bold text-xl">{tabLabels[activeTab]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
              <Bell size={18} className="text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
            </button>
            <button
              onClick={onSwitchToAdmin}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              Admin
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'patrol' && <PatrolTab />}
          {activeTab === 'selfservice' && <SelfServiceTab />}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 z-10">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-700'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.icon}
                <span className="text-xs font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 w-12 h-0.5 bg-blue-700 rounded-t-full" style={{ marginBottom: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
