import React, { useState } from 'react';

export default function UtilityTrendsChart({ trends }) {
  const [selectedMonth, setSelectedMonth] = useState('ต.ค.');

  const defaultTrends = trends && trends.length > 0 ? trends : [
    { month: "พ.ค.", electricity_units: 3100, water_units: 430, total_cost: 32540 },
    { month: "มิ.ย.", electricity_units: 3300, water_units: 460, total_cost: 34680 },
    { month: "ก.ค.", electricity_units: 3600, water_units: 510, total_cost: 37980 },
    { month: "ส.ค.", electricity_units: 3200, water_units: 440, total_cost: 33520 },
    { month: "ก.ย.", electricity_units: 3450, water_units: 480, total_cost: 36240 },
    { month: "ต.ค.", electricity_units: 3420, water_units: 490, total_cost: 42580 },
  ];

  const maxElec = 4000;
  const maxWater = 600;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/70 card-shadow space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">สถิติการใช้ไฟฟ้า & น้ำประปา 6 เดือนล่าสุด</h3>
          <p className="text-xs text-slate-500 mt-0.5">คลิกที่แท่งกราฟเพื่อดูสถิติแยกตามเดือน</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 rounded-md bg-blue-500"></span> ไฟฟ้า (kWh)
          </span>
          <span className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 rounded-md bg-sky-300"></span> น้ำประปา (m³)
          </span>
        </div>
      </div>

      {/* Bars */}
      <div className="h-60 flex items-end justify-between gap-2 md:gap-4 pt-4 px-2 border-b border-slate-100">
        {defaultTrends.map((t, index) => {
          const isSelected = selectedMonth === t.month;
          const elecHeight = Math.min(100, (t.electricity_units / maxElec) * 100);
          const waterHeight = Math.min(100, (t.water_units / maxWater) * 100);

          return (
            <div
              key={index}
              onClick={() => setSelectedMonth(t.month)}
              className={`flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer transition-all rounded-2xl p-1 ${
                isSelected ? 'bg-blue-50/70 scale-105' : 'hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] text-slate-500 font-mono transition-opacity font-medium">
                {t.electricity_units} u
              </div>
              <div className="w-full flex justify-center items-end gap-1.5 h-44">
                <div
                  className={`w-3.5 md:w-5 rounded-t-lg transition-all ${
                    isSelected ? 'bg-blue-600 shadow-sm' : 'bg-blue-500/80 group-hover:bg-blue-600'
                  }`}
                  style={{ height: `${elecHeight}%` }}
                  title={`ไฟฟ้า: ${t.electricity_units} หน่วย`}
                />
                <div
                  className={`w-3.5 md:w-5 rounded-t-lg transition-all ${
                    isSelected ? 'bg-sky-400 shadow-sm' : 'bg-sky-300 group-hover:bg-sky-400'
                  }`}
                  style={{ height: `${waterHeight}%` }}
                  title={`น้ำประปา: ${t.water_units} หน่วย`}
                />
              </div>
              <span className={`text-xs font-medium ${isSelected ? 'text-blue-700 font-bold' : 'text-slate-500'}`}>
                {t.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>ข้อมูลประจำเดือน: <strong className="text-slate-800">{selectedMonth} 2569</strong></span>
        <span className="text-emerald-600 font-medium">ประหยัดพลังงานกว่าเกณฑ์เฉลี่ย 3.2%</span>
      </div>
    </div>
  );
}
