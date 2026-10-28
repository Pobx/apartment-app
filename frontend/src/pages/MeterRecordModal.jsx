import React, { useState } from 'react';
import { X, Zap, Droplets, CheckCircle2 } from 'lucide-react';

export default function MeterRecordModal({ isOpen, onClose, room, onSave }) {
  if (!isOpen || !room) return null;

  const elecPrev = 3450;
  const waterPrev = 890;
  const roomPrice = room.price || 3500;

  const [elecCurrent, setElecCurrent] = useState(3542);
  const [waterCurrent, setWaterCurrent] = useState(902);

  const elecDiff = Math.max(0, elecCurrent - elecPrev);
  const waterDiff = Math.max(0, waterCurrent - waterPrev);

  const elecPrice = elecDiff * 8.00;
  // minimum 100 THB rate for water
  const waterPrice = Math.max(100, waterDiff * 18.00);
  const grandTotal = roomPrice + elecPrice + waterPrice;

  const handleSave = () => {
    if (onSave) {
      onSave({
        roomId: room.id,
        elecCurrent,
        waterCurrent,
        elecDiff,
        waterDiff,
        total: grandTotal
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 card-shadow border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
              {room.name || '103'}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">จดมิเตอร์ห้อง {room.name || '103'}</h3>
              <p className="text-xs text-slate-400">ผู้เช่า: {room.renter_name || 'คุณธนกร สุขเจริญ'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Electricity */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-blue-600">
                <Zap className="w-4 h-4" /> มิเตอร์ไฟฟ้า
              </span>
              <span className="text-slate-500">เลขงวดก่อน: <strong>{elecPrev}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={elecCurrent}
                onChange={(e) => setElecCurrent(parseFloat(e.target.value) || 0)}
                className="w-full text-base font-bold px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
              />
              <span className="text-xs text-slate-400 font-medium">kWh</span>
            </div>
            <div className="flex justify-between text-xs pt-1 text-slate-500">
              <span>ใช้ไป: <strong className="text-blue-600 font-bold">+{elecDiff}</strong> หน่วย</span>
              <span>รวม: <strong className="text-slate-900 font-bold">฿{elecPrice.toFixed(2)}</strong></span>
            </div>
          </div>

          {/* Water */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-sky-600">
                <Droplets className="w-4 h-4" /> มิเตอร์น้ำประปา
              </span>
              <span className="text-slate-500">เลขงวดก่อน: <strong>{waterPrev}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={waterCurrent}
                onChange={(e) => setWaterCurrent(parseFloat(e.target.value) || 0)}
                className="w-full text-base font-bold px-3.5 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
              />
              <span className="text-xs text-slate-400 font-medium">m³</span>
            </div>
            <div className="flex justify-between text-xs pt-1 text-slate-500">
              <span>ใช้ไป: <strong className="text-sky-600 font-bold">+{waterDiff}</strong> หน่วย</span>
              <span>รวม: <strong className="text-slate-900 font-bold">฿{waterPrice.toFixed(2)}</strong></span>
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">ยอดรวมทั้งสิ้น (ค่าห้อง ฿{roomPrice} + น้ำไฟ)</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">
              ฿{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors shadow-md flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> บันทึกทันที
          </button>
        </div>

      </div>
    </div>
  );
}
