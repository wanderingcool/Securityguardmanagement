import { Users, UserX, AlertTriangle, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { mockGuards, mockAlerts } from '../../data/mockData';
import LiveMap from './LiveMap';

const checkedIn = mockGuards.filter((g) => g.status === 'checked-in').length;
const absent = mockGuards.filter((g) => g.status === 'absent').length;
const inactive = mockGuards.filter((g) => g.status === 'inactive').length;
const total = mockGuards.length;
const unresolvedAlerts = mockAlerts.filter((a) => !a.resolved).length;

const cards = [
  { label: 'Active Guards', value: checkedIn, sub: `of ${total} scheduled`, icon: <CheckCircle size={22} />, color: 'bg-green-50 text-green-700', border: 'border-green-200', iconBg: 'bg-green-100' },
  { label: 'Absent Today', value: absent, sub: 'Not checked in', icon: <UserX size={22} />, color: 'bg-red-50 text-red-700', border: 'border-red-200', iconBg: 'bg-red-100' },
  { label: 'Inactive / Alerts', value: inactive, sub: `${unresolvedAlerts} unresolved alerts`, icon: <AlertTriangle size={22} />, color: 'bg-amber-50 text-amber-700', border: 'border-amber-200', iconBg: 'bg-amber-100' },
  { label: 'Total Personnel', value: total, sub: 'Across all sites', icon: <Users size={22} />, color: 'bg-blue-50 text-blue-700', border: 'border-blue-200', iconBg: 'bg-blue-100' },
];

export default function Dashboard() {
  const now = new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-2xl font-bold">Live Dashboard</h2>
          <p className="text-slate-500 text-sm mt-0.5">Real-time operational overview across all sites</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-slate-600 text-sm font-medium">Live · {now}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className={`bg-white rounded-2xl p-5 border ${card.border} shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg} ${card.color}`}>
                {card.icon}
              </div>
              <TrendingUp size={14} className="text-slate-300 mt-1" />
            </div>
            <p className={`text-3xl font-bold ${card.color.split(' ')[1]}`}>{card.value}</p>
            <p className="text-slate-700 font-semibold text-sm mt-0.5">{card.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      <LiveMap />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-slate-800 font-semibold">Guard Status Overview</h3>
          <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide">Guard</th>
                <th className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide">Badge</th>
                <th className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide">Site</th>
                <th className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide">Last Seen</th>
                <th className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide">Shift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockGuards.map((guard) => (
                <tr key={guard.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-xs font-bold">
                        {guard.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{guard.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-500 text-sm font-mono">{guard.badge}</td>
                  <td className="px-6 py-3 text-slate-600 text-sm">{guard.site}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={guard.status} />
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <Clock size={12} />
                      {guard.lastSeen}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-500 text-sm">{guard.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'checked-in': 'bg-green-100 text-green-700',
    'absent': 'bg-red-100 text-red-700',
    'inactive': 'bg-amber-100 text-amber-700',
    'off-duty': 'bg-slate-100 text-slate-600',
  };
  const labels: Record<string, string> = {
    'checked-in': 'Checked In',
    'absent': 'Absent',
    'inactive': 'Inactive',
    'off-duty': 'Off Duty',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'checked-in' ? 'bg-green-500' : status === 'absent' ? 'bg-red-500' : status === 'inactive' ? 'bg-amber-500' : 'bg-slate-400'}`} />
      {labels[status]}
    </span>
  );
}
