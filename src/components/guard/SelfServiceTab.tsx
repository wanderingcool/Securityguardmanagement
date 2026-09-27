import { useState } from 'react';
import { Package, Calendar, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, Send, AlertTriangle } from 'lucide-react';
import { mockInventory, mockLeaveRequests } from '../../data/mockData';
import { InventoryItem, LeaveRequest } from '../../types';

const conditionColor = { good: 'text-green-600 bg-green-50', fair: 'text-amber-600 bg-amber-50', poor: 'text-red-600 bg-red-50' };

const statusStyle = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
};

const statusIcon = {
  approved: <CheckCircle size={12} />,
  pending: <Clock size={12} />,
  rejected: <XCircle size={12} />,
};

export default function SelfServiceTab() {
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [form, setForm] = useState({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [reported, setReported] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: LeaveRequest = {
      id: `L${Date.now()}`,
      ...form,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setRequests((prev) => [newReq, ...prev]);
    setForm({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
    setShowLeaveForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const reportItem = (id: string) => {
    setInventory((prev) => prev.map((it) => it.id === id ? { ...it, condition: 'poor' } : it));
    const item = inventory.find((i) => i.id === id);
    setReported(`${item?.name ?? 'Item'} flagged for replacement.`);
    window.setTimeout(() => setReported(null), 3000);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <p className="text-green-700 text-sm font-medium">Leave request submitted successfully. Awaiting supervisor approval.</p>
        </div>
      )}
      {reported && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
          <p className="text-amber-700 text-sm font-medium">{reported}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
          <Package size={16} className="text-slate-400" />
          <p className="text-slate-700 font-semibold text-sm">Issued Equipment & Uniform</p>
        </div>
        <div className="divide-y divide-slate-50">
          {inventory.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={14} className="text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-700 text-sm font-medium truncate">{item.name}</p>
                <p className="text-slate-400 text-xs">{item.category} · Issued {item.issueDate}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${conditionColor[item.condition]}`}>
                {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
              </span>
              {item.condition !== 'poor' && (
                <button
                  onClick={() => reportItem(item.id)}
                  className="text-xs text-slate-400 hover:text-amber-600 transition-colors"
                >
                  Report
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <p className="text-slate-700 font-semibold text-sm">Leave Applications</p>
          </div>
          <button
            onClick={() => setShowLeaveForm(!showLeaveForm)}
            className="flex items-center gap-1 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {showLeaveForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            Apply
          </button>
        </div>

        {showLeaveForm && (
          <form onSubmit={handleSubmit} className="p-4 border-b border-slate-100 bg-slate-50">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-3">New Leave Application</p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-slate-500 text-xs mb-1 block">Leave Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                  <option>Maternity / Paternity Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">From Date</label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">To Date</label>
                  <input
                    type="date"
                    required
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-500 text-xs mb-1 block">Reason</label>
                <textarea
                  required
                  rows={3}
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Briefly describe your reason..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors"
              >
                <Send size={15} />
                Submit Application
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-50">
          {requests.map((req) => (
            <div key={req.id} className="px-4 py-3">
              <div className="flex items-start justify-between mb-1">
                <p className="text-slate-700 text-sm font-medium">{req.type}</p>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[req.status]}`}>
                  {statusIcon[req.status]}
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
              <p className="text-slate-500 text-xs">{req.startDate} — {req.endDate}</p>
              <p className="text-slate-400 text-xs mt-0.5 truncate">{req.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
