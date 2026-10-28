import React, { useState } from 'react';
import { useAuth, LoginForm } from '@/features/auth';
import { DashboardView } from '@/features/dashboard';
import {
  UtilitiesUsageView,
  MeterRecordModal,
  WalkthroughModal,
} from '@/features/meters';
import { RoomsView } from '@/features/rooms';
import { RentersView } from '@/features/renters';
import { BillPreviewModal } from '@/features/billing';
import { SettingsView } from '@/features/settings';
import { Navbar } from './layout/Navbar';
import { Sidebar } from './layout/Sidebar';
import { BottomNav } from './layout/BottomNav';

interface RecordingRoomState {
  id?: number;
  roomId?: number;
  name?: string;
  room_name?: string;
  renter_name?: string;
  price?: number;
}

export function App() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isBillOpen, setIsBillOpen] = useState<boolean>(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState<boolean>(false);
  const [recordingRoom, setRecordingRoom] = useState<RecordingRoomState | null>(null);

  // If user is not authenticated, render modern minimal login screen
  if (!isAuthenticated || !currentUser) {
    return <LoginForm />;
  }

  const handleRecordMeter = (room: RecordingRoomState) => {
    setRecordingRoom(room);
  };

  const handleSaveMeter = (data: { roomId: number; total: number }) => {
    alert(
      `บันทึกมิเตอร์ห้อง ${data.roomId} สำเร็จ! ยอดรวม ฿${data.total.toLocaleString()}`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-blue-100 font-sans">
      <Navbar
        currentApartment="แกรนด์ วิลล์ อาคาร A"
        onOpenBillModal={() => setIsBillOpen(true)}
        currentUser={currentUser}
        onLogout={logout}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onLogout={logout}
        />

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              onRecordMeter={handleRecordMeter}
              onOpenBill={() => setIsBillOpen(true)}
              onStartWalkthrough={() => setIsWalkthroughOpen(true)}
            />
          )}
          {currentTab === 'utilities' && (
            <UtilitiesUsageView
              onRecordMeter={handleRecordMeter}
              onOpenBill={() => setIsBillOpen(true)}
            />
          )}
          {currentTab === 'rooms' && <RoomsView />}
          {currentTab === 'renters' && <RentersView />}
          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Feature Modals */}
      <MeterRecordModal
        isOpen={!!recordingRoom}
        onClose={() => setRecordingRoom(null)}
        room={recordingRoom}
        onSave={handleSaveMeter}
      />

      <BillPreviewModal
        isOpen={isBillOpen}
        onClose={() => setIsBillOpen(false)}
      />

      <WalkthroughModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onComplete={() => {
          setIsWalkthroughOpen(false);
          alert('บันทึกมิเตอร์ครบทุกห้องแล้ว! ยอดรวมอัปเดตเรียบร้อย');
        }}
      />
    </div>
  );
}

export default App;
