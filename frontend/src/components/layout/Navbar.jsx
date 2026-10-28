import React from 'react';
import { Building2, Bell, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar({ currentApartment, onOpenBillModal }) {
  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-blue-500/20">
            A
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm leading-tight">
              Apartment<span className="text-blue-600 font-light">OS</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {currentApartment || 'แกรนด์ วิลล์ อาคาร A'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenBillModal}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
        >
          พิมพ์ใบแจ้งหนี้
        </button>

        <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
            AD
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">ผู้จัดการระบบ</div>
            <div className="text-[10px] text-emerald-600 font-medium">Keycloak: admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
