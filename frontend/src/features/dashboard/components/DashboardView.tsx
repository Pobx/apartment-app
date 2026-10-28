import React, { useState } from 'react';
import {
  Zap,
  Droplets,
  Printer,
  Play,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  Home,
  ArrowUpRight,
} from 'lucide-react';
import { useDashboardStats } from '../api/useDashboard';
import { UtilityTrendsChart } from './UtilityTrendsChart';
import { OccupancyDonut } from './OccupancyDonut';
import { Card, Button, Badge, formatCurrency } from '@/shared';

interface DashboardRoomItem {
  id: number;
  name: string;
  floor: number;
  renter: string | null;
  elec_diff: number | null;
  water_diff: number | null;
  total: number | null;
  status: 'billed' | 'pending' | 'vacant';
  room_price: number;
}

interface DashboardViewProps {
  onRecordMeter?: (room: { id: number; name: string; renter_name?: string }) => void;
  onOpenBill?: () => void;
  onStartWalkthrough?: () => void;
}

export function DashboardView({
  onRecordMeter,
  onOpenBill,
  onStartWalkthrough,
}: DashboardViewProps) {
  const { data: stats } = useDashboardStats();
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'pending' | 'billed' | 'vacant'
  >('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const rooms: DashboardRoomItem[] = [
    {
      id: 1,
      name: '101',
      floor: 1,
      renter: 'คุณสมชาย ใจดี',
      elec_diff: 80,
      water_diff: 8,
      total: 4520,
      status: 'billed',
      room_price: 3500,
    },
    {
      id: 2,
      name: '102',
      floor: 1,
      renter: 'คุณอรอนงค์ มีสุข',
      elec_diff: 85,
      water_diff: 12,
      total: 4665,
      status: 'billed',
      room_price: 3500,
    },
    {
      id: 3,
      name: '103',
      floor: 1,
      renter: 'คุณธนกร สุขเจริญ',
      elec_diff: null,
      water_diff: null,
      total: null,
      status: 'pending',
      room_price: 3500,
    },
    {
      id: 4,
      name: '104',
      floor: 1,
      renter: null,
      elec_diff: null,
      water_diff: null,
      total: null,
      status: 'vacant',
      room_price: 3500,
    },
    {
      id: 5,
      name: '105',
      floor: 1,
      renter: 'คุณพิมพ์ใจ รุ่งเรือง',
      elec_diff: 80,
      water_diff: 8,
      total: 4300,
      status: 'billed',
      room_price: 3500,
    },
    {
      id: 6,
      name: '106',
      floor: 1,
      renter: 'คุณวรวิทย์ มั่นคง',
      elec_diff: 85,
      water_diff: 11,
      total: 4420,
      status: 'billed',
      room_price: 3500,
    },
    {
      id: 12,
      name: '205',
      floor: 2,
      renter: 'คุณกิตติศักดิ์ ภักดี',
      elec_diff: null,
      water_diff: null,
      total: null,
      status: 'pending',
      room_price: 3500,
    },
    {
      id: 18,
      name: '302',
      floor: 3,
      renter: 'คุณกนกวรรณ จันทร์เพ็ญ',
      elec_diff: null,
      water_diff: null,
      total: null,
      status: 'pending',
      room_price: 4200,
    },
  ];

  const filteredRooms = rooms.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const pendingCount = rooms.filter((r) => r.status === 'pending').length;

  const handleCopySlip = (room: DashboardRoomItem) => {
    const text = `หอพักแกรนด์ วิลล์ - ใบแจ้งหนี้ห้อง ${room.name}\nผู้เช่า: ${
      room.renter || 'ห้องว่าง'
    }\nค่าเช่าห้อง: ฿${room.room_price.toLocaleString()}\nยอดรวมสุทธิ: ฿${
      room.total ? room.total.toLocaleString() : '0'
    } บาท`;
    navigator.clipboard.writeText(text);
    setCopiedId(room.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Clean Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
            <span className="text-slate-800 font-semibold">แกรนด์ วิลล์ อาคาร A</span>
            <span>•</span>
            <span>รอบบิลประจำเดือน ตุลาคม 2569</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            ภาพรวมหอพัก
          </h2>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenBill}
            className="shadow-sm"
          >
            <Printer className="w-4 h-4 mr-1.5 text-slate-500" />
            <span>พิมพ์ใบแจ้งหนี้ทั้งหมด</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Rooms */}
        <Card className="hover:border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">ห้องพักทั้งหมด</span>
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {stats?.total_rooms || 48}
            </span>
            <span className="text-xs text-slate-400">ห้อง</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>อัตราเข้าพัก {stats?.occupancy_rate || 93.8}%</span>
          </div>
        </Card>

        {/* Card 2: Meter Status */}
        <Card className="hover:border-amber-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">สถานะจดมิเตอร์</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600">
              {pendingCount}
            </span>
            <span className="text-xs text-slate-400">ห้องรอจด</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            จดแล้ว {(stats?.total_rooms || 48) - pendingCount} ห้อง
          </div>
        </Card>

        {/* Card 3: Expected Revenue */}
        <Card className="hover:border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">ยอดเรียกเก็บงวดนี้</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-slate-900">
              {formatCurrency(stats?.financial?.current_month_expected || 42580)}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            รวมค่าน้ำ-ไฟ และค่าห้อง
          </div>
        </Card>

        {/* Card 4: Collected */}
        <Card className="hover:border-emerald-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">ชำระแล้ว</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-emerald-600">
              {formatCurrency(stats?.financial?.collected || 36930)}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            คงค้าง: {formatCurrency(stats?.financial?.pending || 5650)}
          </div>
        </Card>
      </div>

      {/* 3. 1-Click Walkthrough CTA Banner */}
      {pendingCount > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-5 md:p-6 text-white shadow-lg shadow-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold text-white">
              ⚡ Walkthrough Mode
            </div>
            <h3 className="text-lg md:text-xl font-bold">
              มีห้องพักรอจดมิเตอร์ {pendingCount} ห้องในรอบบิลนี้
            </h3>
            <p className="text-xs text-blue-100">
              ใช้โหมดเดินจดมิเตอร์ด่วน กรอกต่อเนื่องทีละห้องโดยไม่ต้องสลับหน้าจอ
            </p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-md font-bold text-xs"
            onClick={onStartWalkthrough}
          >
            <Play className="w-4 h-4 mr-1.5 fill-blue-600 text-blue-600" />
            เริ่มเดินจดมิเตอร์ ({pendingCount} ห้อง)
          </Button>
        </div>
      )}

      {/* 4. Interactive Data Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UtilityTrendsChart trends={stats?.utility_trends} />
        </div>
        <div>
          <OccupancyDonut
            total={stats?.total_rooms || 48}
            occupied={stats?.occupied_rooms || 45}
            vacant={stats?.vacant_rooms || 3}
          />
        </div>
      </div>

      {/* 5. Room Meter & Billing Table with Quick Filter */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              รายการห้องพักและสถานะบิล
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              แสดงรายการห้องพักล่าสุดและสถานะการออกบิล
            </p>
          </div>

          {/* 1-Tap Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ทั้งหมด ({rooms.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'pending'
                  ? 'bg-white text-amber-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              รอจด ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus('billed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'billed'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ออกบิลแล้ว
            </button>
            <button
              onClick={() => setFilterStatus('vacant')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === 'vacant'
                  ? 'bg-white text-slate-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ห้องว่าง
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">ห้อง</th>
                <th className="py-3.5 px-4">ผู้เช่า</th>
                <th className="py-3.5 px-4">ไฟฟ้าใช้ไป</th>
                <th className="py-3.5 px-4">น้ำประปาใช้ไป</th>
                <th className="py-3.5 px-4">ยอดรวมสุทธิ</th>
                <th className="py-3.5 px-4 text-center">สถานะบิล</th>
                <th className="py-3.5 px-5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 inline-flex items-center justify-center mr-2 text-xs font-semibold">
                      {room.name}
                    </span>
                    ชั้น {room.floor}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {room.renter || (
                      <span className="text-slate-400 italic">ห้องว่าง</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600">
                    {room.elec_diff !== null ? `+${room.elec_diff} kWh` : '-'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600">
                    {room.water_diff !== null ? `+${room.water_diff} m³` : '-'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {room.total ? formatCurrency(room.total) : '-'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {room.status === 'billed' && (
                      <Badge variant="emerald">
                        <CheckCircle2 className="w-3 h-3" /> ออกบิลแล้ว
                      </Badge>
                    )}
                    {room.status === 'pending' && (
                      <Badge variant="amber">
                        <Clock className="w-3 h-3" /> รอจดมิเตอร์
                      </Badge>
                    )}
                    {room.status === 'vacant' && (
                      <Badge variant="slate">ห้องว่าง</Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {room.status === 'pending' && (
                        <button
                          onClick={() =>
                            onRecordMeter?.({
                              id: room.id,
                              name: room.name,
                              renter_name: room.renter || undefined,
                            })
                          }
                          className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-xs"
                        >
                          จดมิเตอร์
                        </button>
                      )}
                      {room.status === 'billed' && (
                        <button
                          onClick={() => handleCopySlip(room)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="คัดลอกสรุปส่ง LINE"
                        >
                          {copiedId === room.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
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
