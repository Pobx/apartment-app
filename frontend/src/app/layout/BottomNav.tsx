import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  Building,
  Users,
  Settings,
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export function BottomNav({ currentTab, setCurrentTab }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'ภาพรวม', icon: LayoutDashboard },
    { id: 'utilities', label: 'จดมิเตอร์', icon: Calculator, badge: '3' },
    { id: 'rooms', label: 'ห้องพัก', icon: Building },
    { id: 'renters', label: 'ผู้เช่า', icon: Users },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 z-40 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-slate-400 font-normal hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
