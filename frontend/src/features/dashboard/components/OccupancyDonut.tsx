import React from 'react';

interface OccupancyDonutProps {
  total?: number;
  occupied?: number;
  vacant?: number;
}

export function OccupancyDonut({
  total = 48,
  occupied = 45,
  vacant = 3,
}: OccupancyDonutProps) {
  const occupancyRate = ((occupied / total) * 100).toFixed(1);
  const vacantRate = (100 - parseFloat(occupancyRate)).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          สัดส่วนการเข้าพัก
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          จำแนกตามห้องพักที่มีผู้เช่าและห้องว่าง
        </p>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="3.8"
          />
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
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {occupancyRate}%
          </span>
          <span className="text-xs text-slate-500 font-medium">
            เข้าพัก {occupied}/{total} ห้อง
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        <div className="p-2.5 rounded-2xl bg-blue-50/60 border border-blue-100/60 text-center">
          <div className="text-[11px] text-blue-600 font-semibold">ห้องที่มีผู้เช่า</div>
          <div className="text-lg font-bold text-blue-900 mt-0.5">{occupied} ห้อง</div>
        </div>
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <div className="text-[11px] text-slate-500 font-semibold">ห้องว่างพร้อมเช่า</div>
          <div className="text-lg font-bold text-slate-700 mt-0.5">{vacant} ห้อง</div>
        </div>
      </div>
    </div>
  );
}
