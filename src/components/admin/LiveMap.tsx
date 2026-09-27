import { MapPin, Navigation, Wifi } from 'lucide-react';
import { mockGuards, mockSites } from '../../data/mockData';

const statusColor: Record<string, string> = {
  'checked-in': 'bg-green-500',
  'absent': 'bg-red-500',
  'inactive': 'bg-amber-500',
  'off-duty': 'bg-slate-400',
};

const pinColor: Record<string, string> = {
  'checked-in': 'text-green-600',
  'absent': 'text-red-500',
  'inactive': 'text-amber-500',
  'off-duty': 'text-slate-400',
};

export default function LiveMap() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Navigation size={18} className="text-blue-600" />
          <h3 className="text-slate-800 font-semibold">Live Guard Locations</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" />Checked In</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" />Inactive</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" />Absent</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <Wifi size={12} />
            Live
          </div>
        </div>
      </div>

      <div className="relative h-72 bg-slate-50 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(100,116,139,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(16,185,129,0.05) 0%, transparent 50%)',
        }} />

        {mockSites.map((site) => (
          <div
            key={site.id}
            className="absolute"
            style={{ left: `${(site.id === 'S001' ? 30 : site.id === 'S002' ? 55 : site.id === 'S003' ? 70 : 20)}%`, top: `${(site.id === 'S001' ? 35 : site.id === 'S002' ? 55 : site.id === 'S003' ? 65 : 80)}%` }}
          >
            <div
              className="absolute rounded-full border-2 border-blue-400/30 bg-blue-100/20"
              style={{ width: `${site.geofenceRadius / 4}px`, height: `${site.geofenceRadius / 4}px`, transform: 'translate(-50%, -50%)' }}
            />
            <div className="absolute w-2 h-2 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-3 -top-1 bg-blue-700 text-white text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
              {site.name}
            </div>
          </div>
        ))}

        {mockGuards.filter((g) => g.status !== 'absent').map((guard) => (
          <div
            key={guard.id}
            className="absolute group cursor-pointer"
            style={{ left: `${guard.lat}%`, top: `${guard.lng}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className={`w-7 h-7 rounded-full ${statusColor[guard.status]} border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-125`}>
              <MapPin size={13} className={pinColor[guard.status]} />
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
              {guard.name} — {guard.badge}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
            </div>
            {guard.status === 'inactive' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-white animate-ping" />
            )}
          </div>
        ))}

        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-lg px-3 py-2 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs">Nairobi, Kenya</p>
          <p className="text-slate-700 text-xs font-semibold">4 Active Sites</p>
        </div>

        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-3 py-2 border border-slate-200 shadow-sm text-xs text-slate-500">
          Live tracking · 30s interval
        </div>
      </div>
    </div>
  );
}
