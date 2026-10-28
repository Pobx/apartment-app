import React from 'react';
import { Building, Plus, CheckCircle2, Clock } from 'lucide-react';

export default function Rooms() {
  const rooms = [
    { id: 1, name: '101', floor: 1, category: 'Standard Room', price: 3500, renter: 'คุณสมชาย ใจดี', status: 'occupied' },
    { id: 2, name: '102', floor: 1, category: 'Standard Room', price: 3500, renter: 'คุณอรอนงค์ มีสุข', status: 'occupied' },
    { id: 3, name: '103', floor: 1, category: 'Standard Room', price: 3500, renter: 'คุณธนกร สุขเจริญ', status: 'occupied' },
    { id: 4, name: '104', floor: 1, category: 'Standard Room', price: 3500, renter: null, status: 'vacant' },
    { id: 5, name: '105', floor: 1, category: 'Standard Room', price: 3500, renter: 'คุณพิมพ์ใจ รุ่งเรือง', status: 'occupied' },
    { id: 6, name: '106', floor: 1, category: 'Standard Room', price: 3500, renter: 'คุณวรวิทย์ มั่นคง', status: 'occupied' },
    { id: 7, name: '201', floor: 2, category: 'Deluxe Room', price: 4200, renter: 'คุณรพีพร ชัยวัฒน์', status: 'occupied' },
    { id: 8, name: '202', floor: 2, category: 'Deluxe Room', price: 4200, renter: 'คุณศิริพร บุญตา', status: 'occupied' },
    { id: 9, name: '203', floor: 2, category: 'Deluxe Room', price: 4200, renter: null, status: 'vacant' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">ผังห้องพักและอาคาร</h2>
          <p className="text-xs text-slate-500 mt-0.5">แกรนด์ วิลล์ อาคาร A (2 ชั้น 9 ห้องตัวอย่าง)</p>
        </div>
        <button className="px-4 py-2 rounded-2xl text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" /> เพิ่มห้องพักใหม่
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const isOccupied = room.status === 'occupied';
          return (
            <div
              key={room.id}
              className={`p-5 rounded-3xl border card-shadow transition-all ${
                isOccupied ? 'bg-white border-slate-100 hover:border-blue-300' : 'bg-slate-50/70 border-dashed border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900 font-mono">{room.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                    isOccupied ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isOccupied ? 'มีผู้เช่า' : 'ห้องว่าง'}
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {room.category} • ชั้น {room.floor}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">ค่าเช่าเดือนละ</span>
                <span className="font-bold text-slate-900">฿{room.price.toLocaleString()}</span>
              </div>
              {isOccupied && (
                <div className="mt-1 text-[11px] text-slate-500">
                  ผู้เช่า: <strong className="text-slate-800">{room.renter}</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
