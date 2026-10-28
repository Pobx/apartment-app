import React, { useState } from 'react';
import {
  X,
  Zap,
  Droplets,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { calculateRoomTotal } from '../domain/calculator';
import { Button, formatCurrency } from '@/shared';

export interface WalkthroughRoom {
  id: number;
  name: string;
  floor: number;
  renter: string;
  price: number;
  elec_prev: number;
  water_prev: number;
}

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingRooms?: WalkthroughRoom[];
  onComplete?: () => void;
}

export function WalkthroughModal({
  isOpen,
  onClose,
  pendingRooms = [],
  onComplete,
}: WalkthroughModalProps) {
  if (!isOpen) return null;

  const roomsToRead: WalkthroughRoom[] =
    pendingRooms.length > 0
      ? pendingRooms
      : [
          {
            id: 3,
            name: '103',
            floor: 1,
            renter: 'คุณธนกร สุขเจริญ',
            price: 3500,
            elec_prev: 3450,
            water_prev: 890,
          },
          {
            id: 12,
            name: '205',
            floor: 2,
            renter: 'คุณกิตติศักดิ์ ภักดี',
            price: 3500,
            elec_prev: 2890,
            water_prev: 740,
          },
          {
            id: 18,
            name: '302',
            floor: 3,
            renter: 'คุณกนกวรรณ จันทร์เพ็ญ',
            price: 4200,
            elec_prev: 1950,
            water_prev: 530,
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [readings, setReadings] = useState<{
    elecCurrent: number;
    waterCurrent: number;
  }>({
    elecCurrent: 3542,
    waterCurrent: 902,
  });
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentRoom = roomsToRead[currentIndex];
  const progressPercent = Math.round(
    (currentIndex / roomsToRead.length) * 100
  );

  const elecPrev = currentRoom ? currentRoom.elec_prev : 3450;
  const waterPrev = currentRoom ? currentRoom.water_prev : 890;
  const roomPrice = currentRoom ? currentRoom.price : 3500;

  const calc = calculateRoomTotal(
    readings.waterCurrent,
    waterPrev,
    readings.elecCurrent,
    elecPrev
  );
  const grandTotal = roomPrice + calc.electricCharge + calc.waterCharge;

  const handleNext = () => {
    if (currentIndex + 1 < roomsToRead.length) {
      setCurrentIndex(currentIndex + 1);
      const nextRoom = roomsToRead[currentIndex + 1];
      setReadings({
        elecCurrent: nextRoom.elec_prev + 85,
        waterCurrent: nextRoom.water_prev + 10,
      });
    } else {
      setCompleted(true);
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const copyLineSlip = () => {
    const text = `หอพักแกรนด์ วิลล์ - บิลห้อง ${currentRoom.name} (${currentRoom.renter})\n- ค่าเช่าห้อง: ${formatCurrency(roomPrice)}\n- ค่าไฟฟ้า (${calc.electricUnits} หน่วย): ${formatCurrency(calc.electricCharge)}\n- ค่าน้ำประปา (${calc.waterUnits} หน่วย): ${formatCurrency(calc.waterCharge)}\nรวมยอดชำระ: ${formatCurrency(grandTotal)} บาท`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-5 md:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                ⚡ Walkthrough Mode
              </span>
              <span className="text-xs text-slate-400">เดินจดมิเตอร์ด่วน</span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mt-0.5">
              {!completed
                ? `ห้องที่ ${currentIndex + 1} จาก ${roomsToRead.length}`
                : 'เสร็จสิ้นการจดมิเตอร์!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-2xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!completed ? (
          <>
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>ความคืบหน้า</span>
                <span className="font-mono text-blue-600 font-bold">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Current Room Info Card */}
            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/40 p-4 rounded-2xl border border-blue-100/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium">
                  ชั้น {currentRoom.floor} • ห้อง
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentRoom.name}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  ผู้เช่า: <strong>{currentRoom.renter}</strong>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">ค่าเช่าห้อง</div>
                <div className="text-base font-bold text-slate-800">
                  {formatCurrency(roomPrice)}
                </div>
                <button
                  type="button"
                  onClick={copyLineSlip}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-white px-2.5 py-1 rounded-lg border border-blue-200/60 hover:bg-blue-50"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied ? 'คัดลอกแล้ว' : 'ส่ง LINE'}
                </button>
              </div>
            </div>

            {/* Input Controls */}
            <div className="space-y-3">
              {/* Electricity Field */}
              <div className="p-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/30 space-y-2">
                <div className="flex justify-between text-xs text-amber-900">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Zap className="w-4 h-4" /> เลขมิเตอร์ไฟปัจจุบัน
                  </span>
                  <span className="text-slate-400 font-medium">
                    ก่อนหน้า: <strong>{elecPrev}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={readings.elecCurrent}
                    onChange={(e) =>
                      setReadings({
                        ...readings,
                        elecCurrent: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full text-xl font-bold py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white"
                  />
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                    kWh
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-0.5">
                  <span>
                    ใช้ไป:{' '}
                    <strong className="text-amber-600">
                      +{calc.electricUnits} หน่วย
                    </strong>
                  </span>
                  <span>
                    คิดเป็นเงิน:{' '}
                    <strong className="text-slate-900">
                      {formatCurrency(calc.electricCharge)}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Water Field */}
              <div className="p-3.5 rounded-2xl border border-sky-200/80 bg-sky-50/30 space-y-2">
                <div className="flex justify-between text-xs text-sky-900">
                  <span className="flex items-center gap-1 font-bold text-sky-600">
                    <Droplets className="w-4 h-4" /> เลขมิเตอร์น้ำปัจจุบัน
                  </span>
                  <span className="text-slate-400 font-medium">
                    ก่อนหน้า: <strong>{waterPrev}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={readings.waterCurrent}
                    onChange={(e) =>
                      setReadings({
                        ...readings,
                        waterCurrent: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full text-xl font-bold py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white"
                  />
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                    m³
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-0.5">
                  <span>
                    ใช้ไป:{' '}
                    <strong className="text-sky-600">
                      +{calc.waterUnits} หน่วย
                    </strong>
                  </span>
                  <span>
                    คิดเป็นเงิน:{' '}
                    <strong className="text-slate-900">
                      {formatCurrency(calc.waterCharge)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Grand Total Banner */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">
                  ยอดรวมทั้งสิ้น (ค่าห้อง + น้ำไฟ)
                </span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  {formatCurrency(grandTotal, true)}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                คำนวณสด
              </span>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center gap-3 pt-1">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
                </button>
              )}
              <Button
                variant="primary"
                onClick={handleNext}
                className="flex-1 py-3"
              >
                <span>
                  {currentIndex + 1 === roomsToRead.length
                    ? 'บันทึก & จบการเดินจด'
                    : 'บันทึก & ไปห้องถัดไป'}
                </span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </>
        ) : (
          /* Completion State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">
                บันทึกมิเตอร์ครบทุกห้องแล้ว!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                จดมิเตอร์ครบทั้ง {roomsToRead.length}{' '}
                ห้อง ระบบทำการออกบิลและคำนวณยอดเงินรวมให้เรียบร้อยแล้ว
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 max-w-sm mx-auto">
              ยอดรวมบิลค่าน้ำ-ไฟงวดนี้:{' '}
              <strong className="text-slate-900 text-sm">฿42,580</strong>{' '}
              (พร้อมส่งและพิมพ์บิล)
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="secondary" onClick={onClose} className="px-6">
                กลับสู่หน้าแดชบอร์ด
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
