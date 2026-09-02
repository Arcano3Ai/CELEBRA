import React from 'react';
import { useEvent, AppView } from '../../context/EventContext';
import { BrandLogo } from './BrandLogo';
import { 
  Home, 
  LayoutDashboard, 
  PlusCircle, 
  Palette, 
  Send, 
  QrCode, 
  Users, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const NavigationHeader: React.FC = () => {
  const { activeView, setActiveView } = useEvent();

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'LANDING', label: 'Inicio', icon: Home },
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'WIZARD', label: 'Crear Evento', icon: PlusCircle },
    { id: 'EDITOR', label: 'Editor Canva', icon: Palette, badge: 'PRO' },
    { id: 'INVITATION', label: 'Invitación Web', icon: Send },
    { id: 'GUESTS', label: 'Invitados & WhatsApp', icon: Users },
    { id: 'CHECKIN', label: 'Check-in QR', icon: QrCode, badge: 'STAFF' },
    { id: 'STAFF', label: 'Staff & Precios', icon: Users, badge: '$399-$1,999' },
    { id: 'ADMIN', label: 'Super Admin', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2952] bg-[#060913]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <BrandLogo 
          size="md" 
          onClick={() => setActiveView('LANDING')} 
          className="hover:opacity-95 transition-opacity"
        />

        {/* View Switcher Pills */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1.5 rounded-full bg-[#0B1126] border border-[#1E2952]">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00F0FF] via-[#D946EF] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-black/25 text-white' : 'bg-[#D946EF]/20 text-[#D946EF]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile / Responsive Dropdown Selector */}
        <div className="flex xl:hidden items-center">
          <select
            value={activeView}
            onChange={(e) => setActiveView(e.target.value as AppView)}
            aria-label="Seleccionar vista"
            className="bg-[#0B1126] border border-[#00F0FF]/40 text-xs font-semibold text-[#00F0FF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
          >
            {navItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.label} {item.badge ? `(${item.badge})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Quick CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('WIZARD')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Crear Invitación</span>
          </button>
        </div>
      </div>
    </header>
  );
};
