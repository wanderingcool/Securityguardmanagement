import { useState } from 'react';
import { MapPin, Clock, CheckCircle, LogOut, Shield, Wifi, WifiOff, Camera } from 'lucide-react';
import { currentGuard } from '../../data/mockData';

const GPS_COORDS = { lat: -1.2641, lng: 36.8022 };

export default function AttendanceTab() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const now = () => new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });

  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => {
      if (!isCheckedIn) {
        setCheckInTime(now());
        setCheckOutTime(null);
        setIsCheckedIn(true);
      } else {
        setCheckOutTime(now());
        setIsCheckedIn(false);
      }
      setLoading(false);
      setMessage(isCheckedIn ? 'Check-out recorded successfully.' : 'Check-in recorded successfully.');
      window.setTimeout(() => setMessage(null), 3000);
    }, 1200);
  };

  const capturePhoto = () => {
    setPhotoCaptured(true);
    setMessage('Verification photo captured for this shift.');
    window.setTimeout(() => setMessage(null), 3000);
  };

  const today = new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
      {message && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 text-green-700 text-sm font-medium" role="status">
          {message}
        </div>
      )}
      <div className="bg-blue-700 rounded-2xl p-4 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Good evening,</p>
            <p className="font-bold text-lg leading-tight">{currentGuard.name}</p>
            <p className="text-blue-200 text-xs">Badge: {currentGuard.badge}</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-blue-100 text-xs mb-0.5">Current Shift</p>
          <p className="font-semibold text-sm">{currentGuard.shift}</p>
          <p className="text-blue-200 text-xs mt-1">{currentGuard.site}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <p className="text-slate-400 text-xs mb-1">Today</p>
        <p className="text-slate-700 font-medium text-sm">{today}</p>
        <div className="flex items-center gap-2 mt-2">
          <Wifi size={14} className="text-green-500" />
          <span className="text-xs text-green-600 font-medium">Online — GPS Active</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">Location Status</p>
        <div className="flex items-start gap-3">
          <div className="bg-green-50 rounded-xl p-2">
            <MapPin size={20} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-slate-700 font-semibold text-sm">GPS Coordinates</p>
            <p className="text-slate-500 text-xs mt-0.5">
              {GPS_COORDS.lat.toFixed(4)}°S, {GPS_COORDS.lng.toFixed(4)}°E
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              <CheckCircle size={12} />
              Within Site Radius (200m)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-4">Attendance</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={13} className="text-slate-400" />
              <p className="text-slate-400 text-xs">Check-In</p>
            </div>
            <p className={`font-bold text-lg ${checkInTime ? 'text-green-600' : 'text-slate-300'}`}>
              {checkInTime ?? '--:--'}
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={13} className="text-slate-400" />
              <p className="text-slate-400 text-xs">Check-Out</p>
            </div>
            <p className={`font-bold text-lg ${checkOutTime ? 'text-red-500' : 'text-slate-300'}`}>
              {checkOutTime ?? '--:--'}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading}
          className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg transition-all active:scale-95 shadow-lg ${
            loading
              ? 'bg-slate-400 cursor-not-allowed'
              : isCheckedIn
              ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
              : 'bg-green-500 hover:bg-green-600 shadow-green-200'
          }`}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : isCheckedIn ? (
            <>
              <LogOut size={22} />
              Tap to Check Out
            </>
          ) : (
            <>
              <CheckCircle size={22} />
              Tap to Check In
            </>
          )}
        </button>

        {isCheckedIn && (
          <div className="mt-3 flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-green-600 text-sm font-medium">On Duty — Shift Active</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <Camera size={16} className="text-slate-400" />
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Selfie Verification</p>
        </div>
        <button
          onClick={capturePhoto}
          className={`w-full py-3 border-2 border-dashed rounded-xl text-sm transition-colors ${photoCaptured ? 'border-green-300 bg-green-50 text-green-700' : 'border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500'}`}
        >
          {photoCaptured ? 'Verification Photo Captured' : 'Tap to Capture Verification Photo'}
        </button>
        <p className="text-slate-400 text-xs mt-2 text-center">Optional — Recommended for each check-in</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <WifiOff size={14} className="text-amber-600" />
          <p className="text-amber-700 text-xs font-semibold">Offline Mode</p>
        </div>
        <p className="text-amber-600 text-xs">If you lose connection, attendance will be saved locally and synced when you're back online.</p>
      </div>
    </div>
  );
}
