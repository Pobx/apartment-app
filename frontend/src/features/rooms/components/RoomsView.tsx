import React from 'react';
import { Plus } from 'lucide-react';
import { RoomDTO } from '../types';
import { Card, Button, Badge, formatCurrency } from '@/shared';

export function RoomsView() {
  const rooms: RoomDTO[] = [
    {
      id: 1,
      name: '101',
      floor: 1,
      category: 'Standard Room',
      price: 3500,
      renter: 'คุณสมชาย ใจดี',
      status: 'occupied',
    },
    {
      id: 2,
      name: '102',
      floor: 1,
      category: 'Standard Room',
      price: 3500,
      renter: 'คุณอรอนงค์ มีสุข',
      status: 'occupied',
    },
    {
      id: 3,
      name: '103',
      floor: 1,
      category: 'Standard Room',
      price: 3500,
      renter: 'คุณธนกร สุขเจริญ',
      status: 'occupied',
    },
    {
      id: 4,
      name: '104',
      floor: 1,
      category: 'Standard Room',
      price: 3500,
      renter: null,
      status: 'vacant',
    },
    {
      id: 5,
      name: '105',
      floor: 1,
      category: 'Standard Room',
      price: 3500,
      renter: 'คุณพิมพ์ใจ รุ่งเรือง',
      status: 'occupied',
    },
    {
      id: 6,
      name: '106',
      floor: 1,
      category: 'Standard Room',
      price: 3500,
      renter: 'คุณวรวิทย์ มั่นคง',
      status: 'occupied',
    },
    {
      id: 7,
      name: '201',
      floor: 2,
      category: 'Deluxe Room',
      price: 4200,
      renter: 'คุณรพีพร ชัยวัฒน์',
      status: 'occupied',
    },
    {
      id: 8,
      name: '202',
      floor: 2,
      category: 'Deluxe Room',
      price: 4200,
      renter: 'คุณศิริพร บุญตา',
      status: 'occupied',
    },
    {
      id: 9,
      name: '203',
      floor: 2,
      category: 'Deluxe Room',
      price: 4200,
      renter: null,
      status: 'vacant',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ผังห้องพักและอาคาร
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            แกรนด์ วิลล์ อาคาร A (2 ชั้น 9 ห้องตัวอย่าง)
          </p>
        </div>
        <Button variant="primary" size="sm" className="self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> เพิ่มห้องพักใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const isOccupied = room.status === 'occupied';
          return (
            <div
              key={room.id}
              className={`p-5 rounded-3xl border transition-all ${
                isOccupied
                  ? 'bg-white border-slate-100 shadow-sm hover:border-blue-300'
                  : 'bg-slate-50/70 border-dashed border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900 font-mono">
                  {room.name}
                </span>
                {isOccupied ? (
                  <Badge variant="emerald">มีผู้เช่า</Badge>
                ) : (
                  <Badge variant="slate">ห้องว่าง</Badge>
                )}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {room.category} • ชั้น {room.floor}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">ค่าเช่าเดือนละ</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(room.price)}
                </span>
              </div>
              {isOccupied && (
                <div className="mt-1 text-[11px] text-slate-500">
                  ผู้เช่า:{' '}
                  <strong className="text-slate-800">{room.renter}</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
