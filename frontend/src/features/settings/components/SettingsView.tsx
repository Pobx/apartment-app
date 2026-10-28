import React from 'react';
import { Zap, Droplets, Save } from 'lucide-react';
import { Button } from '@/shared';

export function SettingsView() {
  const handleSave = () => {
    alert('บันทึกการตั้งค่าเรียบร้อย');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          ตั้งค่าอัตราค่าบริการ & สิ่งอำนวยความสะดวก
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          กำหนดอัตราค่าน้ำประปา ค่าไฟฟ้า และเงื่อนไขขั้นต่ำ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Electricity Setting */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                อัตราค่าไฟฟ้า (Electricity)
              </h3>
              <p className="text-xs text-slate-400">
                คำนวณตามหน่วยกิโลวัตต์ชั่วโมง (kWh)
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1">
                ราคาขายต่อหน่วย (บาท)
              </label>
              <input
                type="number"
                defaultValue="8.00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">
                ราคาต้นทุนต่อหน่วย (บาท)
              </label>
              <input
                type="number"
                defaultValue="5.00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">
                หน่วยขั้นต่ำ / เหมาจ่ายขั้นต่ำ (บาท)
              </label>
              <input
                type="number"
                defaultValue="0.00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Water Setting */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                อัตราค่าน้ำประปา (Water Supply)
              </h3>
              <p className="text-xs text-slate-400">
                คำนวณตามหน่วยลูกบาศก์เมตร (m³)
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1">
                ราคาขายต่อหน่วย (บาท)
              </label>
              <input
                type="number"
                defaultValue="18.00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">
                ราคาต้นทุนต่อหน่วย (บาท)
              </label>
              <input
                type="number"
                defaultValue="12.00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">
                ราคาเหมาจ่ายขั้นต่ำ (ไม่เกิน 5 หน่วย = 100 บาท)
              </label>
              <input
                type="number"
                defaultValue="100.00"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="secondary" size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-1.5" /> บันทึกการเปลี่ยนแปลง
        </Button>
      </div>
    </div>
  );
}
