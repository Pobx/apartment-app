import React, { useState } from 'react';
import { Search, Plus, Printer, CheckCircle2 } from 'lucide-react';

export default function UtilitiesUsage({ onRecordMeter, onOpenBill }) {
  const [searchTerm, setSearchTerm] = useState('');

  const roomsData = [
    { id: 1, name: '101', renter: 'คุณสมชาย ใจดี', elec_prev: 1240, elec_curr: 1320, elec_diff: 80, water_prev: 450, water_curr: 458, water_diff: 8, total: 4520, status: 'billed' },
    { id: 2, name: '102', renter: 'คุณอรอนงค์ มีสุข', elec_prev: 2110, elec_curr: 2195, elec_diff: 85, water_prev: 620, water_curr: 632, water_diff: 12, total: 4665, status: 'billed' },
    { id: 3, name: '103', renter: 'คุณธนกร สุขเจริญ', elec_prev: 3450, elec_curr: null, elec_diff: null, water_prev: 890, water_curr: null, water_diff: null, total: null, status: 'pending' },
    { id: 5, name: '105', renter: 'คุณพิมพ์ใจ รุ่งเรือง', elec_prev: 1980, elec_curr: 2060, elec_diff: 80, water_prev: 510, water_curr: 518, water_diff: 8, total: 4300, status: 'billed' },
    { id: 6, name: '106', renter: 'คุณวรวิทย์ มั่นคง', elec_prev: 2890, elec_curr: 2975, elec_diff: 85, water_prev: 730, water_curr: 741, water_diff: 11, total: 4420, status: 'billed' },
  ];

  const filtered = roomsData.filter(r => r.name.includes(searchTerm) || r.renter.includes(searchTerm));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">บันทึกมิเตอร์ค่าน้ำ-ค่าไฟ</h2>
          <p className="text-xs text-slate-500 mt-0.5">ประจำงวด วันที่ 25 กันยายน - 25 ตุลาคม 2569</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBill}
            className="px-4 py-2 rounded-2xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" /> พิมพ์บิลทั้งหมด
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-800">รายการห้องพัก (ชั้น 1)</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{filtered.length} ห้อง</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาเลขห้อง หรือชื่อผู้เช่า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">ห้อง</th>
                <th className="py-3.5 px-4">ผู้เช่า</th>
                <th className="py-3.5 px-4">มิเตอร์ไฟ (ก่อน → ปัจจุบัน)</th>
                <th className="py-3.5 px-4">มิเตอร์น้ำ (ก่อน → ปัจจุบัน)</th>
                <th className="py-3.5 px-4">ค่าห้อง + น้ำไฟ</th>
                <th className="py-3.5 px-4">สถานะบิล</th>
                <th className="py-3.5 px-5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filtered.map((room) => {
                const isPending = room.status === 'pending';
                return (
                  <tr key={room.id} className={isPending ? 'bg-amber-50/30 hover:bg-amber-50/60 transition-colors' : 'hover:bg-slate-50/60 transition-colors'}>
                    <td className="py-3.5 px-5 font-bold text-slate-900 text-sm">{room.name}</td>
                    <td className="py-3.5 px-4 text-slate-700">{room.renter}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {isPending ? (
                        <span className="text-amber-700 font-medium">{room.elec_prev} → <em>ยังไม่จด</em></span>
                      ) : (
                        <span>{room.elec_prev} → <strong className="text-blue-600">{room.elec_curr}</strong> (+{room.elec_diff} u)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {isPending ? (
                        <span className="text-amber-700 font-medium">{room.water_prev} → <em>ยังไม่จด</em></span>
                      ) : (
                        <span>{room.water_prev} → <strong className="text-sky-600">{room.water_curr}</strong> (+{room.water_diff} u)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {isPending ? <span className="text-slate-400 font-normal">รอคำนวณ</span> : `฿${room.total.toLocaleString()}`}
                    </td>
                    <td className="py-3.5 px-4">
                      {isPending ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800">
                          รอจดมิเตอร์
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          ออกบิลแล้ว
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      {isPending ? (
                        <button
                          onClick={() => onRecordMeter(room)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
                        >
                          จดเลขมิเตอร์
                        </button>
                      ) : (
                        <button
                          onClick={onOpenBill}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                        >
                          ดูใบเสร็จ
                        </button>
                      )}
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
