import React from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti } from '../common/ConfettiTrigger';
import { 
  Users, 
  UserCheck, 
  Clock, 
  UserX, 
  QrCode, 
  Calendar, 
  Share2, 
  ExternalLink, 
  PlusCircle, 
  Sparkles, 
  TrendingUp, 
  Smartphone, 
  MapPin, 
  CheckCircle2,
  ChevronRight,
  BarChart2
} from 'lucide-react';

export const HostDashboard: React.FC = () => {
  const { event, guests, setActiveView } = useEvent();

  const confirmedGuests = guests.filter(g => g.status === 'CONFIRMADO');
  const pendingGuests = guests.filter(g => g.status === 'PENDIENTE');
  const declinedGuests = guests.filter(g => g.status === 'NO_ASISTIRA');
  const checkedInGuests = guests.filter(g => g.status === 'INGRESADO');

  // Calculate percentages
  const confirmationRate = Math.round((confirmedGuests.length / (guests.length || 1)) * 100);
  const checkedInRate = Math.round((checkedInGuests.length / (confirmedGuests.length || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl glass-panel-glow relative overflow-hidden">
        {/* Background glow lines */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#00F0FF]/15 via-[#D946EF]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
            <Sparkles className="w-4 h-4" />
            <span>CENTRO DE CONTROL CELEBRA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
            ¡Hola, Sofía &amp; Carlos! 👋
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            ¿Listos para celebrar? Tu evento avanza con un <span className="text-[#00F0FF] font-bold">{confirmationRate}%</span> de confirmación.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => setActiveView('WIZARD')}
            className="px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nuevo Evento</span>
          </button>
          
          <button
            onClick={() => {
              triggerCelebrationConfetti();
              setActiveView('INVITATION');
            }}
            className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-200 bg-slate-900 border border-slate-700 hover:border-[#00F0FF] transition-all flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-[#00F0FF]" />
            <span>Ver Invitación</span>
          </button>
        </div>
      </div>

      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
        
        {/* Card: Total Invitados */}
        <div className="p-5 rounded-2xl glass-panel border border-[#1E2952] relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Invitados</span>
            <Users className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{guests.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Registrados en lista</p>
        </div>

        {/* Card: Confirmados */}
        <div className="p-5 rounded-2xl glass-panel border border-[#00F0FF]/40 relative overflow-hidden bg-[#00F0FF]/5">
          <div className="flex items-center justify-between text-[#00F0FF] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmados</span>
            <UserCheck className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{confirmedGuests.length}</div>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">✓ {confirmationRate}% confirmación</p>
        </div>

        {/* Card: Pendientes */}
        <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 relative overflow-hidden bg-amber-500/5">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pendientes</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{pendingGuests.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Por confirmar</p>
        </div>

        {/* Card: No Asistirán */}
        <div className="p-5 rounded-2xl glass-panel border border-rose-500/30 relative overflow-hidden bg-rose-500/5">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">No Asistirán</span>
            <UserX className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{declinedGuests.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Lugar liberado</p>
        </div>

        {/* Card: En Salón / Check-in */}
        <div className="p-5 rounded-2xl glass-panel border border-[#D946EF]/50 relative overflow-hidden bg-[#D946EF]/5">
          <div className="flex items-center justify-between text-[#D946EF] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">En Salón</span>
            <QrCode className="w-4 h-4 text-[#D946EF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{checkedInGuests.length}</div>
          <p className="text-[11px] text-[#D946EF] font-semibold mt-1">Check-in puerta</p>
        </div>

        {/* Card: Total Estimado */}
        <div className="p-5 rounded-2xl glass-panel border border-[#F59E0B]/40 relative overflow-hidden bg-[#F59E0B]/5">
          <div className="flex items-center justify-between text-[#F59E0B] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Aforo Total</span>
            <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{event.totalExpected}</div>
          <p className="text-[11px] text-slate-400 mt-1">Con acompañantes</p>
        </div>

      </div>

      {/* Featured Event Card: "Próximo Gran Evento" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Event Showcase */}
        <div className="lg:col-span-8 p-8 rounded-3xl glass-panel border border-[#1E2952] space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#F59E0B] tracking-widest uppercase bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
                PRÓXIMO EVENTO ESTELAR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-3">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#00F0FF]" />
                  {event.date} • {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D946EF]" />
                  {event.venueName}
                </span>
              </div>
            </div>

            {/* Live Countdown Box */}
            <div className="p-4 rounded-2xl bg-[#060913] border border-[#00F0FF]/30 text-center shrink-0">
              <span className="block text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#D946EF]">
                Faltan 78
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Días para celebrar
              </span>
            </div>
          </div>

          {/* Action Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveView('EDITOR')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-[#00F0FF] text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Editar Diseño</h4>
              <p className="text-xs text-slate-400 mt-1">Colores, música y bloques</p>
            </button>

            <button
              onClick={() => setActiveView('GUESTS')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-[#D946EF] text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D946EF]/10 text-[#D946EF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Lista de Invitados</h4>
              <p className="text-xs text-slate-400 mt-1">Pases y WhatsApp</p>
            </button>

            <button
              onClick={() => setActiveView('CHECKIN')}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-[#F59E0B] text-left transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Escanear QR Staff</h4>
              <p className="text-xs text-slate-400 mt-1">Control de acceso en puerta</p>
            </button>
          </div>

          {/* Quick WhatsApp Share Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#22C55E]/15 to-[#10B981]/5 border border-[#22C55E]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E] text-slate-950 flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Difusión masiva por WhatsApp</h5>
                <p className="text-[11px] text-slate-300">Envía la invitación con el enlace y nombre único de cada invitado.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveView('GUESTS')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#22C55E] text-slate-950 hover:bg-[#16a34a] transition-colors"
            >
              Abrir Campaña
            </button>
          </div>

        </div>

        {/* Right Side: Real-Time Flow Feed */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-[#1E2952] flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#00F0FF]" />
                <span>Últimas Actividades</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                EN VIVO
              </span>
            </div>

            <div className="space-y-3">
              {guests.slice(0, 5).map((g) => (
                <div key={g.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white">{g.name}</p>
                    <span className="text-[10px] text-slate-400">{g.group} • +{g.companionsCount} pases</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    g.status === 'CONFIRMADO' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : g.status === 'INGRESADO'
                      ? 'bg-[#D946EF]/20 text-[#D946EF] border border-[#D946EF]/30'
                      : g.status === 'NO_ASISTIRA'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('GUESTS')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Ver todos los {guests.length} invitados</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
