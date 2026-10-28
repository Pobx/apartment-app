import React from 'react';

export default function OccupancyDonut({ total = 48, occupied = 45, vacant = 3 }) {
  const occupancyRate = ((occupied / total) * 100).toFixed(1);
  const vacantRate = (100 - occupancyRate).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/70 card-shadow flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">สัดส่วนการเข้าพัก</h3>
        <p className="text-xs text-slate-500 mt-0.5">จำแนกตามห้องพักที่มีผู้เช่าและห้องว่าง</p>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.8" />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3.8"
            strokeDasharray={`${occupancyRate}, 100`}
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="3.8"
            strokeDasharray={`${vacantRate}, 100`}
            strokeDashoffset={`-${occupancyRate}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">{occupancyRate}%</span>
          <span className="text-xs text-slate-500 font-medium">เข้าพัก {occupied}/{total} ห้อง</span>
        </div>
      </div>

      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> สัญญาเช่าปกติ
          </span>
          <span className="font-bold text-slate-900">{occupied} ห้อง</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> ห้องว่างพร้อมเข้าอยู่
          </span>
          <span className="font-bold text-slate-900">{vacant} ห้อง</span>
        </div>
      </div>
    </div>
  );
}
