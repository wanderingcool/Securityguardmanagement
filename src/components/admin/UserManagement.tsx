import { useState } from 'react';
import { Search, Plus, Trash2, Phone, Shield, Clock, X } from 'lucide-react';
import { mockGuards } from '../../data/mockData';
import { Guard } from '../../types';

const statusStyle: Record<Guard['status'], string> = {
  'checked-in': 'bg-green-100 text-green-700',
  'absent': 'bg-red-100 text-red-700',
  'inactive': 'bg-amber-100 text-amber-700',
  'off-duty': 'bg-slate-100 text-slate-600',
};

export default function UserManagement() {
  const [guards, setGuards] = useState<Guard[]>(mockGuards);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<Guard | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', badge: '', phone: '', site: 'Westlands Corporate Park', shift: 'Night' });

  const sites = Array.from(new Set(mockGuards.map((g) => g.site)));

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  };

  const addGuard = (e: React.FormEvent) => {
    e.preventDefault();
    const newGuard: Guard = {
      id: `G${String(guards.length + 1).padStart(3, '0')}`,
      name: form.name,
      badge: form.badge,
      site: form.site,
      siteId: `S00${sites.indexOf(form.site) + 1}`,
      status: 'off-duty',
      lat: 50,
      lng: 50,
      lastSeen: 'Just added',
      shift: form.shift,
      phone: form.phone,
    };
    setGuards((prev) => [...prev, newGuard]);
    setForm({ name: '', badge: '', phone: '', site: sites[0] ?? '', shift: 'Night' });
    setShowAdd(false);
    flash(`Guard “${newGuard.name}” added.`);
  };

  const removeGuard = (id: string) => {
    const g = guards.find((x) => x.id === id);
    setGuards((prev) => prev.filter((x) => x.id !== id));
    setConfirmRemove(null);
    flash(`Guard “${g?.name}” removed.`);
  };

  const filtered = guards.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.badge.toLowerCase().includes(search.toLowerCase()) ||
      g.site.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg" role="status">
          {toast}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-2xl font-bold">User Management</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage guards, officers, and role assignments</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors"
        >
          <Plus size={16} />
          Add Guard
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addGuard} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold">New Guard Details</h3>
            <button type="button" onClick={() => setShowAdd(false)} className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
              <X size={14} className="text-slate-500" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-slate-500 text-xs mb-1 block">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-slate-500 text-xs mb-1 block">Badge ID</label>
              <input required value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. SG-0099" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-slate-500 text-xs mb-1 block">Phone</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. +254 7xx xxx xxx" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-slate-500 text-xs mb-1 block">Assigned Site</label>
              <select value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {sites.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-slate-500 text-xs mb-1 block">Shift</label>
              <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Night</option>
                <option>Day</option>
              </select>
            </div>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors">
            Save Guard
          </button>
        </form>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, badge, or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="checked-in">Checked In</option>
          <option value="absent">Absent</option>
          <option value="inactive">Inactive</option>
          <option value="off-duty">Off Duty</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-slate-800 font-semibold">All Personnel</h3>
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">{filtered.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Guard', 'Badge ID', 'Contact', 'Assigned Site', 'Shift', 'Status', 'Last Seen', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((guard) => (
                <tr key={guard.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-slate-200 rounded-full flex items-center justify-center text-slate-700 text-sm font-bold flex-shrink-0">
                        {guard.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-slate-700 font-semibold text-sm">{guard.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Shield size={10} className="text-slate-400" />
                          <p className="text-slate-400 text-xs">Security Guard</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{guard.badge}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                      <Phone size={12} />
                      {guard.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 text-sm">{guard.site}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 text-sm">{guard.shift}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[guard.status]}`}>
                      {guard.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock size={11} />
                      {guard.lastSeen}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setConfirmRemove(guard)} className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors">
                        <Trash2 size={13} className="text-slate-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-400 text-sm">No guards match your search</p>
            </div>
          )}
        </div>
      </div>

      {confirmRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm" onClick={() => setConfirmRemove(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold">Remove guard?</p>
                <p className="text-slate-400 text-xs">This will remove {confirmRemove.name} ({confirmRemove.badge}) from the roster.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmRemove(null)} className="text-slate-500 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={() => removeGuard(confirmRemove.id)} className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
