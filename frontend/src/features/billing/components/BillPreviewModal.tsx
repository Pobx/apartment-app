import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { Button, formatCurrency } from '@/shared';

interface BillPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BillPreviewModal({ isOpen, onClose }: BillPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
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
          <h3 className="text-xl font-bold text-slate-900">
            หอพัก แกรนด์ วิลล์ (Grand Ville)
          </h3>
          <p className="text-xs text-slate-500">
            ใบแจ้งหนี้ค่าน้ำ-ค่าไฟและค่าเช่าห้องพัก ประจำเดือน ตุลาคม 2569
          </p>
        </div>

        {/* Room Info */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="text-slate-400 block">ห้องพัก / ผู้เช่า:</span>
            <strong className="text-slate-900 text-sm">
              ห้อง 101 (คุณสมชาย ใจดี)
            </strong>
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
            <span>ค่าไฟฟ้า (1240 → 1320 @ ฿8.00)</span>
            <span className="text-slate-400 font-mono">80 kWh</span>
            <span className="font-bold">฿640.00</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-800">
            <span>ค่าน้ำประปา (450 → 458 @ ฿18.00)</span>
            <span className="text-slate-400 font-mono">8 m³</span>
            <span className="font-bold">฿144.00</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-800">
            <span>ค่าส่วนกลางและอินเทอร์เน็ต</span>
            <span className="text-slate-400">คงที่</span>
            <span className="font-bold">฿236.00</span>
          </div>

          <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-center text-base font-bold text-slate-900">
            <span>ยอดรวมชำระสุทธิ</span>
            <span className="text-xl text-blue-600 font-mono">฿4,520.00</span>
          </div>
        </div>

        {/* Payment QR / Bank Info */}
        <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100/80 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-blue-900 block">
              ช่องทางการชำระเงิน
            </span>
            <span className="text-slate-600 block">
              โอนเงิน PromptPay: <strong>081-234-5678</strong>
            </span>
            <span className="text-slate-500 block text-[11px]">
              (กรุณาส่งสลิปโอนเงินทางไลน์แอดมิน)
            </span>
          </div>
          <div className="w-12 h-12 bg-white rounded-xl border border-blue-200 flex items-center justify-center font-bold text-[10px] text-blue-600 text-center">
            QR Pay
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" className="flex-1 py-3" onClick={onClose}>
            ปิดหน้าต่าง
          </Button>
          <Button
            variant="secondary"
            className="flex-1 py-3"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-1.5" /> พิมพ์ใบเสร็จ (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
}
