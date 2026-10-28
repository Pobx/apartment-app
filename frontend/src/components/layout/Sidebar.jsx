import React from 'react';
import { LayoutDashboard, Calculator, Building, Users, Receipt, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ดสรุปผล', icon: LayoutDashboard },
    { id: 'utilities', label: 'บันทึกค่าน้ำ-ไฟ', icon: Calculator, badge: '5 รอจด' },
    { id: 'rooms', label: 'ผังห้องพักและอาคาร', icon: Building },
    { id: 'renters', label: 'ทะเบียนผู้เช่า', icon: Users },
    { id: 'settings', label: 'ตั้งค่าหน่วย & ราคา', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#FCFDFE] border-r border-slate-100 p-5 hidden md:flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="text-[11px] font-medium tracking-wide text-slate-400 px-3 mb-2 uppercase">
            เมนูหลัก
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all ${
                  isActive
                    ? 'font-medium bg-blue-50/80 text-blue-700 border border-blue-100/80'
                    : 'text-slate-600 hover:bg-slate-50 font-normal'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-600 border border-amber-200/60">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          ApartmentOS v2.0
        </div>
        <button
          onClick={() => alert('ออกจากระบบ Keycloak แล้ว')}
          className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
          title="ออกจากระบบ"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
