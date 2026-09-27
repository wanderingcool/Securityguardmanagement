import { BarChart2, Download, TrendingUp, CheckCircle, Clock, Package } from 'lucide-react';

const attendanceData = [
  { day: 'Mon', present: 6, absent: 1 },
  { day: 'Tue', present: 7, absent: 0 },
  { day: 'Wed', present: 5, absent: 2 },
  { day: 'Thu', present: 7, absent: 0 },
  { day: 'Fri', present: 6, absent: 1 },
  { day: 'Sat', present: 4, absent: 3 },
  { day: 'Sun', present: 5, absent: 2 },
];

const patrolData = [
  { site: 'Westlands Corporate Park', total: 24, completed: 22, missed: 2, rate: 91.7 },
  { site: 'Kilimani Plaza', total: 16, completed: 16, missed: 0, rate: 100 },
  { site: 'Upperhill Towers', total: 18, completed: 14, missed: 4, rate: 77.8 },
  { site: 'Karen Business Park', total: 0, completed: 0, missed: 0, rate: 0 },
];

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const maxPresent = Math.max(...attendanceData.map((d) => d.present));

  const exportAttendance = () => {
    downloadCsv('weekly-attendance.csv', [
      ['Day', 'Present', 'Absent'],
      ...attendanceData.map((d) => [d.day, String(d.present), String(d.absent)]),
    ]);
  };

  const exportPatrol = () => {
    downloadCsv('patrol-compliance.csv', [
      ['Site', 'Total', 'Completed', 'Missed', 'Rate %'],
      ...patrolData.map((r) => [r.site, String(r.total), String(r.completed), String(r.missed), String(r.rate)]),
    ]);
  };

  const exportAll = () => {
    exportAttendance();
    window.setTimeout(exportPatrol, 200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-2xl font-bold">Reports</h2>
          <p className="text-slate-500 text-sm mt-0.5">Attendance, patrol compliance, and operational summaries</p>
        </div>
        <button onClick={exportAll} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors">
          <Download size={16} />
          Export All
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 size={18} className="text-blue-600" />
            <h3 className="text-slate-800 font-semibold">Weekly Attendance — Last 7 Days</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded" />Present</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-300 rounded" />Absent</span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-40">
          {attendanceData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-0.5 w-full">
                <div
                  className="flex-1 bg-blue-500 rounded-t-md transition-all"
                  style={{ height: `${(d.present / (maxPresent + 1)) * 120}px` }}
                />
                <div
                  className="flex-1 bg-red-300 rounded-t-md transition-all"
                  style={{ height: `${(d.absent / (maxPresent + 1)) * 120}px` }}
                />
              </div>
              <p className="text-slate-500 text-xs font-medium">{d.day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            <h3 className="text-slate-800 font-semibold">Patrol Compliance — This Week</h3>
          </div>
          <button onClick={exportPatrol} className="flex items-center gap-1.5 text-blue-600 text-sm hover:underline">
            <Download size={14} />
            Export
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {patrolData.map((row) => (
            <div key={row.site} className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-700 font-medium text-sm">{row.site}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{row.completed}/{row.total} patrols</span>
                  <span className={`font-bold ${row.rate >= 90 ? 'text-green-600' : row.rate >= 75 ? 'text-amber-600' : 'text-red-500'}`}>
                    {row.rate}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${row.rate >= 90 ? 'bg-green-500' : row.rate >= 75 ? 'bg-amber-500' : 'bg-red-400'}`}
                  style={{ width: `${row.rate}%` }}
                />
              </div>
              {row.missed > 0 && (
                <p className="text-red-500 text-xs mt-1">{row.missed} missed patrol checkpoint{row.missed > 1 ? 's' : ''}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Average Attendance Rate', value: '85.7%', change: '+2.1%', icon: <TrendingUp size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg Check-In Time', value: '18:04', change: '4 min early', icon: <Clock size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Equipment Issues', value: '2', change: 'Replacement due', icon: <Package size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-600 font-medium text-sm mt-0.5">{stat.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
