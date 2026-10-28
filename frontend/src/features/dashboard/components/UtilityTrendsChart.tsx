import React, { useState } from 'react';
import { UtilityTrendDTO } from '../types';

interface UtilityTrendsChartProps {
  trends?: UtilityTrendDTO[];
}

export function UtilityTrendsChart({ trends }: UtilityTrendsChartProps) {
  const [selectedMonth, setSelectedMonth] = useState('ต.ค.');

  const defaultTrends: UtilityTrendDTO[] =
    trends && trends.length > 0
      ? trends
      : [
          { month: 'พ.ค.', electricity_units: 3100, water_units: 430, total_cost: 32540 },
          { month: 'มิ.ย.', electricity_units: 3300, water_units: 460, total_cost: 34680 },
          { month: 'ก.ค.', electricity_units: 3600, water_units: 510, total_cost: 37980 },
          { month: 'ส.ค.', electricity_units: 3200, water_units: 440, total_cost: 33520 },
          { month: 'ก.ย.', electricity_units: 3450, water_units: 480, total_cost: 36240 },
          { month: 'ต.ค.', electricity_units: 3420, water_units: 490, total_cost: 42580 },
        ];

  const maxElec = 4000;
  const maxWater = 600;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            สถิติการใช้ไฟฟ้า & น้ำประปา 6 เดือนล่าสุด
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            คลิกที่แท่งกราฟเพื่อดูสถิติแยกตามเดือน
          </p>
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
        {defaultTrends.map((t) => {
          const isSelected = selectedMonth === t.month;
          const elecHeight = Math.min(100, (t.electricity_units / maxElec) * 100);
          const waterHeight = Math.min(100, (t.water_units / maxWater) * 100);

          return (
            <div
              key={t.month}
              onClick={() => setSelectedMonth(t.month)}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full pb-2">
                <div
                  style={{ height: `${elecHeight}%` }}
                  className={`w-3 sm:w-5 rounded-t-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-600 shadow-md shadow-blue-500/30'
                      : 'bg-blue-400 group-hover:bg-blue-500'
                  }`}
                />
                <div
                  style={{ height: `${waterHeight}%` }}
                  className={`w-3 sm:w-5 rounded-t-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-sky-400 shadow-md shadow-sky-400/30'
                      : 'bg-sky-200 group-hover:bg-sky-300'
                  }`}
                />
              </div>
              <span
                className={`text-xs font-semibold py-1 px-2 rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                {t.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Month Summary */}
      {(() => {
        const selected = defaultTrends.find((t) => t.month === selectedMonth);
        if (!selected) return null;
        return (
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-800">
              รายละเอียดเดือน {selected.month} 2569:
            </span>
            <div className="flex items-center gap-4">
              <span className="text-slate-600">
                ไฟฟ้า:{' '}
                <strong className="text-blue-600 font-bold">
                  {selected.electricity_units.toLocaleString()} หน่วย
                </strong>
              </span>
              <span className="text-slate-600">
                น้ำประปา:{' '}
                <strong className="text-sky-500 font-bold">
                  {selected.water_units.toLocaleString()} หน่วย
                </strong>
              </span>
              <span className="text-slate-900 font-bold">
                รวม:{' '}
                <strong className="text-emerald-600">
                  ฿{selected.total_cost.toLocaleString()}
                </strong>
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
