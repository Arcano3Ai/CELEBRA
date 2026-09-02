import React from 'react';
import { EventProvider, useEvent } from './context/EventContext';
import { NavigationHeader } from './components/common/NavigationHeader';
import { LandingPage } from './components/landing/LandingPage';
import { HostDashboard } from './components/dashboard/HostDashboard';
import { EventWizard } from './components/wizard/EventWizard';
import { VisualEditor } from './components/editor/VisualEditor';
import { DigitalInvitation } from './components/invitation/DigitalInvitation';
import { StaffCheckIn } from './components/checkin/StaffCheckIn';
import { GuestManager } from './components/guests/GuestManager';
import { StaffPricingView } from './components/staff/StaffPricingView';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import { AudioPlayer } from './components/common/AudioPlayer';

const AppContent: React.FC = () => {
  const { activeView } = useEvent();

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans">
      <NavigationHeader />

      {/* Control Bonito & Música Ambiental Global desde el inicio */}
      <AudioPlayer src="/assets/musica/Todo En Su Lugar.wav" autoPlay={true} />

      <main className="flex-1">
        {activeView === 'LANDING' && <LandingPage />}
        {activeView === 'DASHBOARD' && <HostDashboard />}
        {activeView === 'WIZARD' && <EventWizard />}
        {activeView === 'EDITOR' && <VisualEditor />}
        {activeView === 'INVITATION' && <DigitalInvitation />}
        {activeView === 'CHECKIN' && <StaffCheckIn />}
        {activeView === 'GUESTS' && <GuestManager />}
        {activeView === 'STAFF' && <StaffPricingView />}
        {activeView === 'ADMIN' && <SuperAdminDashboard />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}
