import React, { useState } from 'react';
import { X, Zap, Droplets, ArrowRight, ArrowLeft, CheckCircle2, Trophy, Copy, Check } from 'lucide-react';

export default function WalkthroughModal({ isOpen, onClose, pendingRooms = [], onComplete }) {
  if (!isOpen) return null;

  // Mock list of rooms needing meter reading if none passed
  const roomsToRead = pendingRooms.length > 0 ? pendingRooms : [
    { id: 3, name: '103', floor: 1, renter: 'คุณธนกร สุขเจริญ', price: 3500, elec_prev: 3450, water_prev: 890 },
    { id: 12, name: '205', floor: 2, renter: 'คุณกิตติศักดิ์ ภักดี', price: 3500, elec_prev: 2890, water_prev: 740 },
    { id: 18, name: '302', floor: 3, renter: 'คุณกนกวรรณ จันทร์เพ็ญ', price: 4200, elec_prev: 1950, water_prev: 530 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [readings, setReadings] = useState({
    elecCurrent: 3542,
    waterCurrent: 902,
  });
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentRoom = roomsToRead[currentIndex];
  const progressPercent = Math.round(((currentIndex) / roomsToRead.length) * 100);

  // Live Calculations
  const elecPrev = currentRoom ? currentRoom.elec_prev : 3450;
  const waterPrev = currentRoom ? currentRoom.water_prev : 890;
  const roomPrice = currentRoom ? currentRoom.price : 3500;

  const elecDiff = Math.max(0, readings.elecCurrent - elecPrev);
  const waterDiff = Math.max(0, readings.waterCurrent - waterPrev);

  const elecPrice = elecDiff * 8.00;
  const waterPrice = Math.max(100, waterDiff * 18.00); // 100 THB minimum
  const grandTotal = roomPrice + elecPrice + waterPrice;

  const handleNext = () => {
    if (currentIndex + 1 < roomsToRead.length) {
      setCurrentIndex(currentIndex + 1);
      // Pre-fill next room's plausible estimate for fast typing
      const nextRoom = roomsToRead[currentIndex + 1];
      setReadings({
        elecCurrent: nextRoom.elec_prev + 85,
        waterCurrent: nextRoom.water_prev + 10,
      });
    } else {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const copyLineSlip = () => {
    const text = `หอพักแกรนด์ วิลล์ - บิลห้อง ${currentRoom.name} (${currentRoom.renter})\n- ค่าเช่าห้อง: ฿${roomPrice.toLocaleString()}\n- ค่าไฟฟ้า (${elecDiff} หน่วย): ฿${elecPrice.toFixed(2)}\n- ค่าน้ำประปา (${waterDiff} หน่วย): ฿${waterPrice.toFixed(2)}\nรวมยอดชำระ: ฿${grandTotal.toLocaleString()} บาท`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-5 md:p-7 card-shadow border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto custom-scrollbar">
        
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
              {!completed ? `ห้องที่ ${currentIndex + 1} จาก ${roomsToRead.length}` : 'เสร็จสิ้นการจดมิเตอร์!'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-2xl hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!completed ? (
          <>
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>ความคืบหน้า</span>
                <span className="font-mono text-blue-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
            </div>

            {/* Current Room Information Card */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/25">
                  {currentRoom.name}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">
                    ห้อง {currentRoom.name} <span className="text-xs text-slate-400 font-normal">ชั้น {currentRoom.floor}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    ผู้เช่า: <strong className="text-slate-700">{currentRoom.renter}</strong>
                  </div>
                </div>
              </div>
              <button
                onClick={copyLineSlip}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1 shadow-sm"
                title="คัดลอกสรุปส่ง LINE"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span className="hidden sm:inline">{copied ? 'คัดลอกแล้ว' : 'ส่ง LINE'}</span>
              </button>
            </div>

            {/* Numeric Keypad-Friendly Inputs */}
            <div className="space-y-3.5">
              {/* Electricity Input */}
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 focus-within:border-blue-500 transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-blue-600">
                    <Zap className="w-4 h-4" /> เลขมิเตอร์ไฟปัจจุบัน
                  </span>
                  <span className="text-slate-400 font-medium">ก่อนหน้า: <strong>{elecPrev}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={readings.elecCurrent}
                    onChange={(e) => setReadings({ ...readings, elecCurrent: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xl font-bold py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white"
                  />
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">kWh</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-0.5">
                  <span>ใช้ไป: <strong className="text-blue-600">+{elecDiff} หน่วย</strong></span>
                  <span>คิดเป็นเงิน: <strong className="text-slate-900">฿{elecPrice.toFixed(2)}</strong></span>
                </div>
              </div>

              {/* Water Input */}
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 focus-within:border-sky-500 transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-sky-600">
                    <Droplets className="w-4 h-4" /> เลขมิเตอร์น้ำปัจจุบัน
                  </span>
                  <span className="text-slate-400 font-medium">ก่อนหน้า: <strong>{waterPrev}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={readings.waterCurrent}
                    onChange={(e) => setReadings({ ...readings, waterCurrent: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xl font-bold py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white"
                  />
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap">m³</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-0.5">
                  <span>ใช้ไป: <strong className="text-sky-600">+{waterDiff} หน่วย</strong></span>
                  <span>คิดเป็นเงิน: <strong className="text-slate-900">฿{waterPrice.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>

            {/* Instant Grand Total Banner */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">ยอดรวมทั้งสิ้น (ค่าห้อง + น้ำไฟ)</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  ฿{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                คำนวณสด
              </span>
            </div>

            {/* Stepper Navigation Footer (Thumb Zone) */}
            <div className="flex items-center gap-3 pt-1">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentIndex + 1 === roomsToRead.length ? 'บันทึก & จบการเดินจด' : 'บันทึก & ไปห้องถัดไป'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          /* Completion State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">บันทึกมิเตอร์ครบทุกห้องแล้ว!</h4>
              <p className="text-xs text-slate-500 mt-1">
                จดมิเตอร์ครบทั้ง {roomsToRead.length} ห้อง ระบบทำการออกบิลและคำนวณยอดเงินรวมให้เรียบร้อยแล้ว
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 max-w-sm mx-auto">
              ยอดรวมบิลค่าน้ำ-ไฟงวดนี้: <strong className="text-slate-900 text-sm">฿42,580</strong> (พร้อมส่งและพิมพ์บิล)
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-all shadow-sm"
              >
                กลับสู่หน้าแดชบอร์ด
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
