import { useState } from 'react';
import { AlertTriangle, MapPin, Activity, Clock, CheckCircle, RefreshCw, CheckCheck } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';
import { Alert } from '../../types';

const typeConfig: Record<Alert['type'], { label: string; icon: React.ReactNode; color: string }> = {
  'missed-patrol': { label: 'Missed Patrol', icon: <Clock size={14} />, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  'geofence-breach': { label: 'Geofence Breach', icon: <MapPin size={14} />, color: 'text-red-700 bg-red-50 border-red-200' },
  'inactivity': { label: 'Inactivity Detected', icon: <Activity size={14} />, color: 'text-orange-700 bg-orange-50 border-orange-200' },
  'sos': { label: 'SOS Alert', icon: <AlertTriangle size={14} />, color: 'text-red-700 bg-red-50 border-red-200' },
  'late-checkin': { label: 'Late / No Check-In', icon: <Clock size={14} />, color: 'text-red-700 bg-red-50 border-red-200' },
};

const severityDot: Record<Alert['severity'], string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-blue-400',
};

type Filter = 'all' | 'unresolved' | 'resolved';

export default function AlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<Filter>('all');
  const [refreshing, setRefreshing] = useState(false);

  const resolve = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
  };

  const resolveAll = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, resolved: true })));
  };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filtered = alerts.filter((a) => {
    if (filter === 'unresolved') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  const unresolved = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-2xl font-bold">Alerts Feed</h2>
          <p className="text-slate-500 text-sm mt-0.5">Real-time exceptions, breaches, and system alerts</p>
        </div>
        <div className="flex items-center gap-2">
          {unresolved > 0 && (
            <button
              onClick={resolveAll}
              className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-xl text-sm hover:bg-green-700 transition-colors"
            >
              <CheckCheck size={14} />
              Resolve All
            </button>
          )}
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', value: alerts.length, color: 'text-slate-700' },
          { label: 'Unresolved', value: unresolved, color: 'text-red-600' },
          { label: 'Resolved', value: alerts.filter((a) => a.resolved).length, color: 'text-green-600' },
          { label: 'High Severity', value: alerts.filter((a) => a.severity === 'high').length, color: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            <h3 className="text-slate-800 font-semibold">Alert Stream</h3>
            {unresolved > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{unresolved}</span>
            )}
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {(['all', 'unresolved', 'resolved'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {filtered.map((alert) => {
            const cfg = typeConfig[alert.type];
            return (
              <div
                key={alert.id}
                className={`px-6 py-4 flex items-start gap-4 ${alert.resolved ? 'opacity-60' : ''} hover:bg-slate-50 transition-colors`}
              >
                <div className="flex flex-col items-center gap-1 mt-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.resolved ? 'bg-slate-300' : severityDot[alert.severity]}`} />
                  {!alert.resolved && alert.severity === 'high' && (
                    <div className={`w-2 h-2 rounded-full ${severityDot[alert.severity]} animate-ping absolute`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                      alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    {alert.resolved && (
                      <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle size={11} /> Resolved
                      </span>
                    )}
                  </div>

                  <p className="text-slate-700 text-sm font-semibold">{alert.guardName} — {alert.site}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{alert.message}</p>

                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock size={12} className="text-slate-400" />
                    <p className="text-slate-400 text-xs">Today at {alert.timestamp}</p>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400 text-xs">ID: {alert.guardId}</span>
                  </div>
                </div>

                {!alert.resolved && (
                  <button
                    onClick={() => resolve(alert.id)}
                    className="flex-shrink-0 flex items-center gap-1.5 bg-slate-100 hover:bg-green-100 hover:text-green-700 text-slate-600 text-xs font-medium px-3 py-2 rounded-xl transition-colors"
                  >
                    <CheckCircle size={13} />
                    Resolve
                  </button>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <CheckCircle size={32} className="text-green-300 mb-2" />
              <p className="text-slate-400 text-sm">No alerts in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
