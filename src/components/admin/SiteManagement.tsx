import { useState } from 'react';
import { MapPin, Users, Circle, Plus, CreditCard as Edit2, Trash2, CheckCircle, XCircle, X } from 'lucide-react';
import { mockSites, mockGuards } from '../../data/mockData';
import { Site } from '../../types';

export default function SiteManagement() {
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [selected, setSelected] = useState<Site | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<Site | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', address: '', geofenceRadius: '200' });

  const guardsForSite = (siteId: string) => mockGuards.filter((g) => g.siteId === siteId);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  };

  const addSite = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite: Site = {
      id: `S${String(sites.length + 1).padStart(3, '0')}`,
      name: form.name,
      address: form.address,
      geofenceRadius: Number(form.geofenceRadius) || 200,
      lat: -1.29 + (Math.random() - 0.5) * 0.1,
      lng: 36.79 + (Math.random() - 0.5) * 0.1,
      assignedGuards: 0,
      activeGuards: 0,
    };
    setSites((prev) => [...prev, newSite]);
    setForm({ name: '', address: '', geofenceRadius: '200' });
    setShowAdd(false);
    flash(`Site “${newSite.name}” added.`);
  };

  const removeSite = (id: string) => {
    const site = sites.find((s) => s.id === id);
    setSites((prev) => prev.filter((s) => s.id !== id));
    setConfirmRemove(null);
    if (selected?.id === id) setSelected(null);
    flash(`Site “${site?.name}” removed.`);
  };

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg" role="status">
          {toast}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-2xl font-bold">Site Management</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage sites, geofences, and guard assignments</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors"
        >
          <Plus size={16} />
          Add New Site
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addSite} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold">New Site Details</h3>
            <button type="button" onClick={() => setShowAdd(false)} className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
              <X size={14} className="text-slate-500" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="col-span-2">
              <label className="text-slate-500 text-xs mb-1 block">Site Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Riverside Drive Estate" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-slate-500 text-xs mb-1 block">Geofence (m)</label>
              <input required type="number" min="50" value={form.geofenceRadius} onChange={(e) => setForm({ ...form, geofenceRadius: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-slate-500 text-xs mb-1 block">Address</label>
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, area, city" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors">
            Save Site
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Sites', value: sites.length, color: 'text-blue-700' },
          { label: 'Active Guards', value: mockGuards.filter((g) => g.status === 'checked-in').length, color: 'text-green-700' },
          { label: 'Total Assigned', value: mockGuards.length, color: 'text-slate-700' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-slate-800 font-semibold">Sites Overview</h3>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{sites.length}</span>
          </div>
          <div className="divide-y divide-slate-50">
            {sites.map((site) => {
              const guards = guardsForSite(site.id);
              const active = guards.filter((g) => g.status === 'checked-in').length;
              return (
                <button
                  key={site.id}
                  onClick={() => setSelected(site === selected ? null : site)}
                  className={`w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors ${selected?.id === site.id ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mt-0.5">
                        <MapPin size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-700 font-semibold text-sm">{site.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{site.address}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Circle size={10} className="text-blue-400" />
                            {site.geofenceRadius}m radius
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Users size={10} />
                            {site.assignedGuards} assigned
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-bold text-sm">{active}</p>
                      <p className="text-slate-400 text-xs">active</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {selected ? (
            <>
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-slate-800 font-semibold">{selected.name}</h3>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <Edit2 size={13} className="text-slate-600" />
                  </button>
                  <button onClick={() => setConfirmRemove(selected)} className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors">
                    <Trash2 size={13} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                {confirmRemove && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
                    <p className="text-red-700 text-sm font-medium">Remove “{confirmRemove.name}”? This cannot be undone.</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setConfirmRemove(null)} className="text-slate-500 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
                      <button onClick={() => removeSite(confirmRemove.id)} className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors">Remove</button>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-slate-400 text-xs mb-1">Geofence Radius</p>
                    <p className="text-slate-700 font-bold">{selected.geofenceRadius}m</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-slate-400 text-xs mb-1">Coordinates</p>
                    <p className="text-slate-700 font-bold text-xs">{selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2">Assigned Guards</p>
                <div className="flex flex-col gap-2">
                  {guardsForSite(selected.id).length > 0 ? (
                    guardsForSite(selected.id).map((g) => (
                      <div key={g.id} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                        <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-xs font-bold">
                          {g.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-700 text-sm font-medium">{g.name}</p>
                          <p className="text-slate-400 text-xs">{g.badge} · {g.shift} Shift</p>
                        </div>
                        {g.status === 'checked-in' ? (
                          <CheckCircle size={15} className="text-green-500" />
                        ) : (
                          <XCircle size={15} className="text-slate-300" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm text-center py-4">No guards assigned</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                <MapPin size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-500 text-sm">Select a site to view details and guard assignments</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-slate-800 font-semibold">All Sites — Detailed View</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Site Name', 'Address', 'Geofence Radius', 'Assigned Guards', 'Active Now', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sites.map((site) => {
                const guards = guardsForSite(site.id);
                const active = guards.filter((g) => g.status === 'checked-in').length;
                return (
                  <tr key={site.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 text-slate-700 font-medium text-sm">{site.name}</td>
                    <td className="px-6 py-3 text-slate-500 text-sm">{site.address}</td>
                    <td className="px-6 py-3">
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{site.geofenceRadius}m</span>
                    </td>
                    <td className="px-6 py-3 text-slate-600 text-sm">{site.assignedGuards}</td>
                    <td className="px-6 py-3">
                      <span className={`text-sm font-bold ${active > 0 ? 'text-green-600' : 'text-slate-400'}`}>{active}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${active > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {active > 0 ? 'Operational' : 'No Coverage'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(site)} className="text-blue-600 hover:underline text-xs font-medium">Edit</button>
                        <button onClick={() => removeSite(site.id)} className="text-red-500 hover:underline text-xs font-medium">Remove</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
