import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Dashboard from './pages/Dashboard';
import UtilitiesUsage from './pages/UtilitiesUsage';
import Rooms from './pages/Rooms';
import Renters from './pages/Renters';
import Settings from './pages/Settings';
import MeterRecordModal from './pages/MeterRecordModal';
import BillPreviewModal from './pages/BillPreviewModal';
import WalkthroughModal from './pages/WalkthroughModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [recordingRoom, setRecordingRoom] = useState(null);

  const handleRecordMeter = (room) => {
    setRecordingRoom(room);
  };

  const handleSaveMeter = (data) => {
    alert(`บันทึกมิเตอร์ห้อง ${data.roomId} สำเร็จ! ยอดรวม ฿${data.total.toLocaleString()}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-blue-100 font-sans">
      <Navbar
        currentApartment="แกรนด์ วิลล์ อาคาร A"
        onOpenBillModal={() => setIsBillOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              onRecordMeter={handleRecordMeter}
              onOpenBill={() => setIsBillOpen(true)}
              onStartWalkthrough={() => setIsWalkthroughOpen(true)}
            />
          )}
          {currentTab === 'utilities' && (
            <UtilitiesUsage
              onRecordMeter={handleRecordMeter}
              onOpenBill={() => setIsBillOpen(true)}
            />
          )}
          {currentTab === 'rooms' && <Rooms />}
          {currentTab === 'renters' && <Renters />}
          {currentTab === 'settings' && <Settings />}
        </main>
      </div>

      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Modals */}
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
      />
    </div>
  );
}
