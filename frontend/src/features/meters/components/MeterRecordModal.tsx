import React, { useState } from 'react';
import { X, Zap, Droplets, CheckCircle2 } from 'lucide-react';
import { calculateRoomTotal } from '../domain/calculator';
import { Button, formatCurrency } from '@/shared';

interface RoomData {
  id?: number;
  roomId?: number;
  name?: string;
  room_name?: string;
  renter_name?: string;
  price?: number;
}

interface MeterRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomData | null;
  onSave?: (data: {
    roomId: number;
    elecCurrent: number;
    waterCurrent: number;
    elecDiff: number;
    waterDiff: number;
    total: number;
  }) => void;
}

export function MeterRecordModal({
  isOpen,
  onClose,
  room,
  onSave,
}: MeterRecordModalProps) {
  if (!isOpen || !room) return null;

  const roomName = room.name || room.room_name || '103';
  const renterName = room.renter_name || 'คุณธนกร สุขเจริญ';
  const roomPrice = room.price || 3500;
  const roomId = room.id || room.roomId || 103;

  const elecPrev = 3450;
  const waterPrev = 890;

  const [elecCurrent, setElecCurrent] = useState<number>(3542);
  const [waterCurrent, setWaterCurrent] = useState<number>(902);

  const calc = calculateRoomTotal(waterCurrent, waterPrev, elecCurrent, elecPrev);
  const grandTotal = roomPrice + calc.electricCharge + calc.waterCharge;

  const handleSave = () => {
    if (onSave) {
      onSave({
        roomId,
        elecCurrent,
        waterCurrent,
        elecDiff: calc.electricUnits,
        waterDiff: calc.waterUnits,
        total: grandTotal,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
              {roomName}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                จดมิเตอร์ห้อง {roomName}
              </h3>
              <p className="text-xs text-slate-400">ผู้เช่า: {renterName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Electricity Meter */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" /> มิเตอร์ไฟฟ้า (หน่วยละ ฿8)
              </span>
              <span>ครั้งก่อน: {elecPrev}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={elecCurrent}
                onChange={(e) => setElecCurrent(Number(e.target.value))}
                className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="text-right whitespace-nowrap min-w-[70px]">
                <div className="text-xs text-slate-400 font-medium">ใช้ไป</div>
                <div className="text-sm font-bold text-amber-600">
                  +{calc.electricUnits} หน่วย
                </div>
              </div>
            </div>
            <div className="text-right text-xs font-semibold text-slate-600">
              รวมค่าไฟ: {formatCurrency(calc.electricCharge)}
            </div>
          </div>

          {/* Water Meter */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-blue-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-500" /> มิเตอร์น้ำประปา (฿18/หน่วย, ขั้นต่ำ ฿100)
              </span>
              <span>ครั้งก่อน: {waterPrev}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={waterCurrent}
                onChange={(e) => setWaterCurrent(Number(e.target.value))}
                className="w-full bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-right whitespace-nowrap min-w-[70px]">
                <div className="text-xs text-slate-400 font-medium">ใช้ไป</div>
                <div className="text-sm font-bold text-blue-600">
                  +{calc.waterUnits} หน่วย
                </div>
              </div>
            </div>
            <div className="text-right text-xs font-semibold text-slate-600">
              รวมค่าน้ำ: {formatCurrency(calc.waterCharge)}
            </div>
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">
              ยอดรวมงวดนี้โดยประมาณ
            </div>
            <div className="text-xs text-slate-500">
              ค่าห้อง ({formatCurrency(roomPrice)}) + ค่าน้ำ ({formatCurrency(calc.waterCharge)}) + ค่าไฟ ({formatCurrency(calc.electricCharge)})
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900">
            {formatCurrency(grandTotal)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 py-3"
            onClick={onClose}
          >
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            className="flex-1 py-3"
            onClick={handleSave}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> บันทึกมิเตอร์
          </Button>
        </div>
      </div>
    </div>
  );
}
