import React, { useState } from 'react';
import { Search, Printer, CheckCircle2, Zap, Droplets, Plus } from 'lucide-react';
import { Card, Button, Badge, formatCurrency } from '@/shared';

interface RoomUsageItem {
  id: number;
  name: string;
  renter: string;
  elec_prev: number;
  elec_curr: number | null;
  elec_diff: number | null;
  water_prev: number;
  water_curr: number | null;
  water_diff: number | null;
  total: number | null;
  status: 'billed' | 'pending';
}

interface UtilitiesUsageViewProps {
  onRecordMeter?: (room: { id: number; name: string; renter_name: string }) => void;
  onOpenBill?: () => void;
}

export function UtilitiesUsageView({
  onRecordMeter,
  onOpenBill,
}: UtilitiesUsageViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const roomsData: RoomUsageItem[] = [
    {
      id: 1,
      name: '101',
      renter: 'คุณสมชาย ใจดี',
      elec_prev: 1240,
      elec_curr: 1320,
      elec_diff: 80,
      water_prev: 450,
      water_curr: 458,
      water_diff: 8,
      total: 4520,
      status: 'billed',
    },
    {
      id: 2,
      name: '102',
      renter: 'คุณอรอนงค์ มีสุข',
      elec_prev: 2110,
      elec_curr: 2195,
      elec_diff: 85,
      water_prev: 620,
      water_curr: 632,
      water_diff: 12,
      total: 4665,
      status: 'billed',
    },
    {
      id: 3,
      name: '103',
      renter: 'คุณธนกร สุขเจริญ',
      elec_prev: 3450,
      elec_curr: null,
      elec_diff: null,
      water_prev: 890,
      water_curr: null,
      water_diff: null,
      total: null,
      status: 'pending',
    },
    {
      id: 5,
      name: '105',
      renter: 'คุณพิมพ์ใจ รุ่งเรือง',
      elec_prev: 1980,
      elec_curr: 2060,
      elec_diff: 80,
      water_prev: 510,
      water_curr: 518,
      water_diff: 8,
      total: 4300,
      status: 'billed',
    },
    {
      id: 6,
      name: '106',
      renter: 'คุณวรวิทย์ มั่นคง',
      elec_prev: 2890,
      elec_curr: 2975,
      elec_diff: 85,
      water_prev: 730,
      water_curr: 741,
      water_diff: 11,
      total: 4420,
      status: 'billed',
    },
  ];

  const filtered = roomsData.filter(
    (r) => r.name.includes(searchTerm) || r.renter.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            บันทึกมิเตอร์ค่าน้ำ-ค่าไฟ
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ประจำงวด วันที่ 25 กันยายน - 25 ตุลาคม 2569
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onOpenBill}>
            <Printer className="w-4 h-4 mr-1.5" /> พิมพ์บิลทั้งหมด
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-800">
              รายการห้องพัก (ชั้น 1)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              {filtered.length} ห้อง
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาเลขห้อง หรือชื่อผู้เช่า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-56 text-slate-800"
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
                <th className="py-3.5 px-4">ไฟ (ก่อนหน้า)</th>
                <th className="py-3.5 px-4">ไฟ (ปัจจุบัน)</th>
                <th className="py-3.5 px-4">ไฟใช้ไป</th>
                <th className="py-3.5 px-4">น้ำ (ก่อนหน้า)</th>
                <th className="py-3.5 px-4">น้ำ (ปัจจุบัน)</th>
                <th className="py-3.5 px-4">น้ำใช้ไป</th>
                <th className="py-3.5 px-4">ยอดรวม</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
                <th className="py-3.5 px-5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {room.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {room.renter}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {room.elec_prev}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {room.elec_curr ?? '-'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-600 font-bold">
                    {room.elec_diff ? `+${room.elec_diff}` : '-'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {room.water_prev}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {room.water_curr ?? '-'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 font-bold">
                    {room.water_diff ? `+${room.water_diff}` : '-'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {room.total ? formatCurrency(room.total) : '-'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {room.status === 'billed' ? (
                      <Badge variant="emerald">ออกบิลแล้ว</Badge>
                    ) : (
                      <Badge variant="amber">รอจดมิเตอร์</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() =>
                        onRecordMeter?.({
                          id: room.id,
                          name: room.name,
                          renter_name: room.renter,
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold text-xs transition-colors"
                    >
                      จดมิเตอร์
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
