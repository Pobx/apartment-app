import React from 'react';
import { Phone, Mail, FileText, Plus } from 'lucide-react';
import { RenterDTO } from '../types';
import { Button } from '@/shared';

export function RentersView() {
  const renters: RenterDTO[] = [
    {
      id: 1,
      name: 'คุณสมชาย ใจดี',
      room: '101',
      mobile: '081-234-5678',
      email: 'somchai@gmail.com',
      idCard: '1-1002-00345-67-1',
      partner: 'คุณกัญญา ใจดี (ภรรยา)',
    },
    {
      id: 2,
      name: 'คุณอรอนงค์ มีสุข',
      room: '102',
      mobile: '089-876-5432',
      email: 'on-anong@gmail.com',
      idCard: '3-1005-00123-45-8',
      partner: '-',
    },
    {
      id: 3,
      name: 'คุณธนกร สุขเจริญ',
      room: '103',
      mobile: '086-555-1212',
      email: 'thanakorn@gmail.com',
      idCard: '1-1020-00876-54-3',
      partner: 'คุณพัชรี สุขเจริญ (พี่สาว)',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ทะเบียนผู้เช่า
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            จัดการข้อมูลผู้เช่า สัญญา และผู้ติดต่อฉุกเฉิน
          </p>
        </div>
        <Button variant="primary" size="sm" className="self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> เพิ่มผู้เช่าใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renters.map((renter) => (
          <div
            key={renter.id}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-base">
                {renter.name}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold font-mono">
                ห้อง {renter.room}
              </span>
            </div>
            <div className="text-xs text-slate-500 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{renter.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{renter.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>บัตร ปชช: {renter.idCard}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              ผู้ร่วมเช่า/ติดต่อ:{' '}
              <strong className="text-slate-800">{renter.partner}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
