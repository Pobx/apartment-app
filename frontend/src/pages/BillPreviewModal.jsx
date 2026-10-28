import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';

export default function BillPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 card-shadow space-y-6 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md shadow-blue-500/20 mb-2">
            A
          </div>
          <h3 className="text-xl font-bold text-slate-900">หอพัก แกรนด์ วิลล์ (Grand Ville)</h3>
          <p className="text-xs text-slate-500">ใบแจ้งหนี้ค่าน้ำ-ค่าไฟและค่าเช่าห้องพัก ประจำเดือน ตุลาคม 2569</p>
        </div>

        {/* Room Info */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="text-slate-400 block">ห้องพัก / ผู้เช่า:</span>
            <strong className="text-slate-900 text-sm">ห้อง 101 (คุณสมชาย ใจดี)</strong>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">วันที่ออกบิล:</span>
            <strong className="text-slate-900 text-sm">27 ตุลาคม 2569</strong>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-100 text-slate-500 font-medium">
            <span>รายการ</span>
            <span>หน่วยที่ใช้</span>
            <span>จำนวนเงิน</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-800">
            <span>ค่าเช่าห้องพัก (ห้อง Standard ชั้น 1)</span>
            <span className="text-slate-400">1 เดือน</span>
            <span className="font-bold">฿3,500.00</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-800">
            <span>ค่าไฟฟ้า (1,240 → 1,320)</span>
            <span className="text-slate-600">80 หน่วย</span>
            <span className="font-bold">฿640.00</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-800">
            <span>ค่าน้ำประปา (450 → 458)</span>
            <span className="text-slate-600">8 หน่วย</span>
            <span className="font-bold">฿380.00</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">ยอดรวมชำระสุทธิ (Total Amount)</span>
            <div className="text-3xl font-bold text-blue-600">฿4,520.00</div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> ออกบิลแล้ว
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> พิมพ์ใบเสร็จ (Print)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
}
