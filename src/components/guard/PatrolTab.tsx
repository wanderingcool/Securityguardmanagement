import { useState } from 'react';
import { QrCode, CheckCircle, Clock, Activity, AlertTriangle, Route, Zap, Download } from 'lucide-react';
import { PatrolLog } from '../../types';
import { mockPatrolLogs } from '../../data/mockData';

const CHECKPOINTS = [
  'Main Gate — CP-01', 'Lobby Entrance — CP-02', 'Car Park Entrance — CP-03',
  'Stairwell Block A — CP-04', 'Rooftop Access — CP-05', 'Server Room Corridor — CP-07',
  'Loading Bay — CP-08', 'Emergency Exit East — CP-09',
];

export default function PatrolTab() {
  const [logs, setLogs] = useState<PatrolLog[]>(mockPatrolLogs);
  const [scanning, setScanning] = useState(false);
  const [inactivityStatus, setInactivityStatus] = useState<'active' | 'warning'>('active');

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const remaining = CHECKPOINTS.filter((cp) => !logs.some((l) => l.checkpoint === cp));
      const pool = remaining.length > 0 ? remaining : CHECKPOINTS;
      const cp = pool[Math.floor(Math.random() * pool.length)];
      const now = new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
      const newLog: PatrolLog = {
        id: `P${Date.now()}`,
        checkpoint: cp,
        timestamp: now,
        status: 'ok',
      };
      setLogs((prev) => [newLog, ...prev]);
      setScanning(false);
    }, 1500);
  };

  const exportLog = () => {
    const rows = ['Checkpoint,Time,Status', ...logs.map((l) => `"${l.checkpoint}",${l.timestamp},${l.status}`)];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patrol-log.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetRoute = () => setLogs([]);

  const scannedCount = logs.length;
  const uniqueCheckpoints = new Set(logs.map((l) => l.checkpoint)).size;
  const progress = Math.min(100, Math.round((uniqueCheckpoints / CHECKPOINTS.length) * 100));

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">Sensor Status</p>
        <div className="flex gap-3">
          <div className={`flex-1 rounded-xl p-3 flex items-center gap-2 ${inactivityStatus === 'active' ? 'bg-green-50' : 'bg-amber-50'}`}>
            <Activity size={18} className={inactivityStatus === 'active' ? 'text-green-600' : 'text-amber-600'} />
            <div>
              <p className="text-xs text-slate-500">Inactivity Sensor</p>
              <p className={`text-sm font-bold ${inactivityStatus === 'active' ? 'text-green-700' : 'text-amber-700'}`}>
                {inactivityStatus === 'active' ? 'Active' : 'Warning'}
              </p>
            </div>
            {inactivityStatus === 'active' && (
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-3 flex items-center gap-2">
            <Zap size={18} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">Motion</p>
              <p className="text-sm font-bold text-blue-700">Detected</p>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-slate-50 rounded-xl p-3 flex items-center gap-2">
          <Route size={16} className="text-slate-400" />
          <p className="text-slate-600 text-xs">
            Patrol route: <span className="font-semibold">Night Round Alpha</span> — {CHECKPOINTS.length} checkpoints
          </p>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-400 text-xs">Route progress</p>
            <p className="text-slate-600 text-xs font-semibold">{uniqueCheckpoints}/{CHECKPOINTS.length} · {progress}%</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button
          onClick={() => setInactivityStatus((s) => (s === 'active' ? 'warning' : 'active'))}
          className="mt-3 w-full text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          Simulate sensor status change
        </button>
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className={`w-full py-6 rounded-2xl flex flex-col items-center justify-center gap-2 text-white font-bold transition-all active:scale-95 shadow-lg ${
          scanning
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-blue-700 hover:bg-blue-800 shadow-blue-200'
        }`}
      >
        {scanning ? (
          <>
            <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span className="text-base">Scanning QR Code...</span>
          </>
        ) : (
          <>
            <QrCode size={32} />
            <span className="text-lg">Scan QR Checkpoint</span>
            <span className="text-blue-200 text-xs font-normal">Point camera at checkpoint QR code</span>
          </>
        )}
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <p className="text-slate-700 font-semibold text-sm">Patrol Log</p>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{scannedCount} scans</span>
            <button onClick={exportLog} className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
              <Download size={12} />
              Export
            </button>
            <button onClick={resetRoute} className="text-xs text-slate-400 hover:text-red-500 transition-colors">
              Clear
            </button>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center">
            <QrCode size={32} className="text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No checkpoints scanned yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {logs.map((log, i) => (
              <div
                key={log.id}
                className={`flex items-center gap-3 px-4 py-3 transition-all ${i === 0 ? 'bg-green-50/50' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  log.status === 'ok' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  {log.status === 'ok' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <AlertTriangle size={16} className="text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm font-medium truncate">{log.checkpoint}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={11} className="text-slate-400" />
                    <p className="text-slate-400 text-xs">{log.timestamp}</p>
                  </div>
                </div>
                {i === 0 && (
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">New</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
