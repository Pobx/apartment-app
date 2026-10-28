import React, { useState } from 'react';
import UtilityTrendsChart from '../components/charts/UtilityTrendsChart';
import OccupancyDonut from '../components/charts/OccupancyDonut';
import { Zap, Droplets, Plus, Printer, Play, Copy, Check, CheckCircle2, Clock, Home, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ onRecordMeter, onOpenBill, onStartWalkthrough }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const rooms = [
    { id: 1, name: '101', floor: 1, renter: 'คุณสมชาย ใจดี', elec_diff: 80, water_diff: 8, total: 4520, status: 'billed', room_price: 3500 },
    { id: 2, name: '102', floor: 1, renter: 'คุณอรอนงค์ มีสุข', elec_diff: 85, water_diff: 12, total: 4665, status: 'billed', room_price: 3500 },
    { id: 3, name: '103', floor: 1, renter: 'คุณธนกร สุขเจริญ', elec_diff: null, water_diff: null, total: null, status: 'pending', room_price: 3500 },
    { id: 4, name: '104', floor: 1, renter: null, elec_diff: null, water_diff: null, total: null, status: 'vacant', room_price: 3500 },
    { id: 5, name: '105', floor: 1, renter: 'คุณพิมพ์ใจ รุ่งเรือง', elec_diff: 80, water_diff: 8, total: 4300, status: 'billed', room_price: 3500 },
    { id: 6, name: '106', floor: 1, renter: 'คุณวรวิทย์ มั่นคง', elec_diff: 85, water_diff: 11, total: 4420, status: 'billed', room_price: 3500 },
    { id: 12, name: '205', floor: 2, renter: 'คุณกิตติศักดิ์ ภักดี', elec_diff: null, water_diff: null, total: null, status: 'pending', room_price: 3500 },
    { id: 18, name: '302', floor: 3, renter: 'คุณกนกวรรณ จันทร์เพ็ญ', elec_diff: null, water_diff: null, total: null, status: 'pending', room_price: 4200 },
  ];

  const filteredRooms = rooms.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const pendingCount = rooms.filter(r => r.status === 'pending').length;

  const handleCopySlip = (room) => {
    const text = `หอพักแกรนด์ วิลล์ - ใบแจ้งหนี้ห้อง ${room.name}\nผู้เช่า: ${room.renter || 'ห้องว่าง'}\nค่าเช่าห้อง: ฿${room.room_price.toLocaleString()}\nยอดรวมสุทธิ: ฿${room.total ? room.total.toLocaleString() : '0'} บาท`;
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">ภาพรวมหอพัก</h2>
        </div>
        
        {/* Quick Action Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenBill}
            className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 card-shadow hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>พิมพ์ใบแจ้งหนี้ทั้งหมด</span>
          </button>
        </div>
      </div>

      {/* 2. Walkthrough Mode Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>บันทึกมิเตอร์ด่วน</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            โหมดเดินจดมิเตอร์น้ำ-ไฟประจำเดือน
          </h3>
          <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed">
            ค้างบันทึกอีก <strong className="text-white font-bold">{pendingCount} ห้อง</strong> ในอาคารนี้ • แตะเพื่อเริ่มเดินจดต่อเนื่องทีละห้องพร้อมคำนวณเงินสดใสอัตโนมัติ
          </p>
        </div>

        <button
          onClick={onStartWalkthrough}
          className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2.5 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>เริ่มเดินจดมิเตอร์ (1-Click)</span>
        </button>
      </div>

      {/* 3. Four Core Metric Cards (Fixed p-5 padding & refined typography) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 card-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ยอดเรียกเก็บน้ำ-ไฟงวดนี้</span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
              ต.ค. 69
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              ฿42,580
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
              <span className="font-medium text-emerald-600">ชำระแล้ว ฿36,930</span>
              <span>•</span>
              <span className="text-amber-600 font-medium">ค้าง ฿5,650</span>
            </div>
          </div>
        </div>

        {/* Card 2: Occupancy */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 card-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">อัตราการเข้าพัก</span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              93.8%
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              45 <span className="text-sm font-normal text-slate-400">/ 48 ห้อง</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>สัญญาเช่าปกติ 45 ห้อง (ว่าง 3 ห้อง)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Energy */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 card-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">การใช้พลังงานรวม</span>
            <span className="text-xs text-slate-400 font-medium">เฉลี่ยต่อห้อง</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">
              3,420 <span className="text-sm font-normal text-slate-400">kWh</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
              <span>ไฟฟ้า 76.0 หน่วย</span>
              <span>•</span>
              <span>น้ำประปา 10.8 หน่วย</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Tasks */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 card-shadow flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">สถานะการจดมิเตอร์</span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
              รอจด
            </span>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600 tracking-tight">
              {pendingCount} <span className="text-sm font-normal text-slate-400">ห้อง</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>ห้อง 103, 205, 302 ยังไม่ได้บันทึก</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Room Management Matrix with Refined Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/70 card-shadow p-5 md:p-6 space-y-5">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">รายการห้องพักและสถานะบิล</h3>
            <p className="text-xs text-slate-500 mt-0.5">คลิกที่ห้องเพื่อบันทึกมิเตอร์ ออกบิล หรือคัดลอกสรุปส่ง LINE</p>
          </div>

          {/* 1-Tap Filter Bar */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 overflow-x-auto text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              ทั้งหมด ({rooms.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filterStatus === 'pending'
                  ? 'bg-white text-amber-800 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>รอจดมิเตอร์ ({pendingCount})</span>
            </button>
            <button
              onClick={() => setFilterStatus('billed')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filterStatus === 'billed'
                  ? 'bg-white text-emerald-800 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>ออกบิลแล้ว (4)</span>
            </button>
            <button
              onClick={() => setFilterStatus('vacant')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filterStatus === 'vacant'
                  ? 'bg-white text-slate-800 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span>ห้องว่าง (1)</span>
            </button>
          </div>
        </div>

        {/* Refined Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRooms.map((room) => {
            const isPending = room.status === 'pending';
            const isVacant = room.status === 'vacant';
            const isCopied = copiedId === room.id;

            return (
              <div
                key={room.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3.5 ${
                  isPending
                    ? 'bg-amber-50/40 border-amber-300/80 hover:bg-amber-50/70 shadow-xs'
                    : isVacant
                    ? 'bg-slate-50/50 border-dashed border-slate-300'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Room Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-900 font-mono tracking-tight">{room.name}</span>
                    <span className="text-xs text-slate-400 font-normal">ชั้น {room.floor}</span>
                  </div>

                  {isPending && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200/60">
                      <Clock className="w-3 h-3" /> รอจดมิเตอร์
                    </span>
                  )}
                  {isVacant && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-200/70 text-slate-600">
                      ห้องว่าง
                    </span>
                  )}
                  {room.status === 'billed' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ออกบิลแล้ว
                    </span>
                  )}
                </div>

                {/* Tenant Info */}
                <div className="text-xs text-slate-600 space-y-0.5">
                  <span className="text-slate-400 block text-[11px]">ผู้เช่าห้องพัก</span>
                  <div className="font-semibold text-slate-800 truncate text-sm">
                    {room.renter || <span className="text-slate-400 font-normal">ไม่มีผู้เช่า</span>}
                  </div>
                </div>

                {/* Utility Metrics Breakdown Pills */}
                {!isVacant && (
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/60 space-y-1.5 text-xs">
                    {isPending ? (
                      <div className="text-slate-500 py-1 flex items-center justify-between">
                        <span>สถานะค่าน้ำ-ไฟ:</span>
                        <span className="text-amber-700 font-medium">รอจดเลขงวดนี้</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          <Zap className="w-3 h-3 text-blue-600" /> ไฟ {room.elec_diff} หน่วย
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                          <Droplets className="w-3 h-3 text-sky-600" /> น้ำ {room.water_diff} หน่วย
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500 font-normal">ยอดรวมทั้งสิ้น:</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {room.total ? `฿${room.total.toLocaleString()}` : `฿${room.room_price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-1">
                  {isPending ? (
                    <button
                      onClick={() => onRecordMeter(room)}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>จดเลขมิเตอร์ห้องนี้</span>
                    </button>
                  ) : isVacant ? (
                    <button className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors">
                      + ทำสัญญาเช่าใหม่
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onOpenBill}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors text-center"
                      >
                        ดูใบเสร็จ
                      </button>
                      <button
                        onClick={() => handleCopySlip(room)}
                        className="px-2.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors flex items-center gap-1 shadow-2xs"
                        title="คัดลอกสรุปยอดส่ง LINE"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 text-[11px]">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-[11px]">LINE</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UtilityTrendsChart />
        </div>
        <div>
          <OccupancyDonut total={48} occupied={45} vacant={3} />
        </div>
      </div>

    </div>
  );
}
