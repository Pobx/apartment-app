import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { AuthUser } from '@/features/auth';

interface NavbarProps {
  currentApartment?: string;
  onOpenBillModal?: () => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
}

export function Navbar({
  currentApartment,
  onOpenBillModal,
  currentUser,
  onLogout,
}: NavbarProps) {
  const isStaff = currentUser?.isStaff && !currentUser?.isAdmin;

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

      <div className="flex items-center gap-2 sm:gap-3">
        {!isStaff && (
          <button
            onClick={onOpenBillModal}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
          >
            พิมพ์ใบแจ้งหนี้
          </button>
        )}

        <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        {/* User Info & Logout */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-100">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-semibold text-blue-700">
            {currentUser?.username
              ? currentUser.username.slice(0, 2).toUpperCase()
              : 'U'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {currentUser?.name || currentUser?.username || 'ผู้ใช้งาน'}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              {currentUser?.isAdmin
                ? 'Admin (ผู้จัดการ)'
                : 'Staff (เจ้าหน้าที่)'}
            </div>
          </div>

          <button
            onClick={onLogout}
            title="ออกจากระบบ"
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
