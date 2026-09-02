import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Star, 
  Phone, 
  Clock, 
  Zap, 
  Flame, 
  Layers, 
  Check, 
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { 
  STAFF_DIRECTORY, 
  STAFF_PRICING_PLANS, 
  STAFF_MEDIA_CONFIG, 
  StaffMember, 
  PricingPlan 
} from '../../data/staffPricingData';
import { triggerCelebrationConfetti } from '../common/ConfettiTrigger';
import { useEvent } from '../../context/EventContext';

export const StaffPricingView: React.FC = () => {
  const { event, setActiveView } = useEvent();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(STAFF_PRICING_PLANS[1]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [contractedSuccess, setContractedSuccess] = useState<string | null>(null);

  const filteredStaff = selectedRoleFilter === 'ALL'
    ? STAFF_DIRECTORY
    : STAFF_DIRECTORY.filter(s => s.role === selectedRoleFilter);

  const handleHirePlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    triggerCelebrationConfetti();
    setContractedSuccess(`¡Paquete ${plan.name} (${plan.price} ${plan.currency}) reservado con éxito para ${event.title}!`);
    setTimeout(() => {
      setContractedSuccess(null);
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HEADER HERO */}
      <div className="relative rounded-3xl p-8 sm:p-10 glass-panel-glow border border-[#00F0FF]/40 overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-[#D946EF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-bold uppercase tracking-wider">
              <FolderOpen className="w-4 h-4" />
              <span>CARPETA ASSETS &bull; STAFF &bull; PRECIOS $399, $799, $1,999</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              Personal de Staff &amp; Control de Acceso
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Personal capacitado en puerta con escaneo QR instantáneo, recepción de gala y coordinación general. 
              Elige tu paquete desde <strong className="text-[#00F0FF]">$399 MXN</strong> hasta servicio VIP de <strong className="text-[#F59E0B]">$1,999 MXN</strong>.
            </p>
          </div>

          {/* Quick Stats / Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
            <div className="flex-1 sm:flex-none p-4 rounded-2xl bg-black/40 border border-[#1E2952] text-center min-w-[120px]">
              <span className="block text-2xl font-black text-[#00F0FF]">100%</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Anti-Colados</span>
            </div>
            <div className="flex-1 sm:flex-none p-4 rounded-2xl bg-black/40 border border-[#1E2952] text-center min-w-[120px]">
              <span className="block text-2xl font-black text-[#D946EF]">&lt; 1 seg</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Escaneo QR</span>
            </div>
            <div className="flex-1 sm:flex-none p-4 rounded-2xl bg-black/40 border border-[#1E2952] text-center min-w-[120px]">
              <span className="block text-2xl font-black text-[#F59E0B]">4.9★</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Calificación Staff</span>
            </div>
          </div>
        </div>

        {contractedSuccess && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm font-bold flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{contractedSuccess}</span>
          </div>
        )}
      </div>

      {/* ============================================================
          PLANES DE PRECIOS: 399, 799, 1999
          ============================================================ */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D946EF]/20 text-[#D946EF] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>TARIFAS OFICIALES TRANSPARENTES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Planes de Staff para tu Evento
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Garantiza una entrada fluida y elegante con el respaldo presencial del personal de CELEBRA &amp; Divertifiesta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAFF_PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 border ${
                  plan.popular
                    ? 'border-[#D946EF] shadow-[0_0_35px_rgba(217,70,239,0.25)] bg-[#0B1126]'
                    : isSelected
                    ? 'border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.2)] bg-[#090E20]'
                    : 'border-[#1E2952] bg-[#070C1A] hover:border-slate-700'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D946EF] to-[#F59E0B] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {plan.name}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {plan.period}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-display">
                      {plan.price}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      {plan.currency}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-800/80">
                    <span className="text-xs font-semibold text-[#00F0FF] block mb-1">
                      Personal Incluido:
                    </span>
                    <span className="text-xs text-white font-bold">
                      {plan.staffIncluded}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    {plan.tagline}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => handleHirePlan(plan)}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#D946EF] to-[#F59E0B] text-white hover:brightness-110 shadow-lg'
                        : 'bg-gradient-to-r from-[#00F0FF] to-[#0284C7] text-slate-950 hover:brightness-110 shadow-lg'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SHOWCASE MULTIMEDIA REAL DESDE LA CARPETA ASSETS
          ============================================================ */}
      <section className="rounded-3xl glass-panel border border-[#1E2952] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>MEDIA DE LA CARPETA ASSETS &bull; SHOW &amp; STAFF EN VIVO</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Demostración en Video del Staff &amp; Entretenimiento
            </h2>
            <p className="text-xs text-slate-400">
              Video real cargado desde <code className="text-[#00F0FF] font-mono">assets/video/ANIMALAEPICA_202609011716.mp4</code> y música desde <code className="text-[#D946EF] font-mono">assets/musica/Todo En Su Lugar.wav</code>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
            >
              {isVideoMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isVideoMuted ? 'Silenciado' : 'Audio Activo'}</span>
            </button>
            <button
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="px-3 py-2 rounded-xl bg-[#00F0FF] hover:bg-[#00F0FF]/80 text-xs font-bold text-slate-950 flex items-center gap-2 transition-colors"
            >
              {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isVideoPlaying ? 'Pausar Video' : 'Reproducir'}</span>
            </button>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[460px] bg-black border border-[#00F0FF]/30 shadow-2xl flex items-center justify-center">
          <video
            src={STAFF_MEDIA_CONFIG.videoDemoUrl}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            controls
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>STAFF &amp; SHOW ÉPICO EN VIVO</span>
          </div>
        </div>

        {/* Audio Track Preview */}
        <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D946EF]/20 text-[#D946EF] flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#D946EF] uppercase tracking-wider block">
                Pista Musical Oficial de Gala
              </span>
              <span className="text-sm font-bold text-white">Todo En Su Lugar</span>
              <span className="text-xs text-slate-400 block font-mono">assets/musica/Todo En Su Lugar.wav</span>
            </div>
          </div>
          <audio 
            controls 
            src={STAFF_MEDIA_CONFIG.audioTrackUrl} 
            className="w-full sm:w-72 h-9"
          />
        </div>
      </section>

      {/* ============================================================
          DIRECTORIO DEL STAFF (CON ASSETS/IMAGES/STAFF)
          ============================================================ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>DIRECTORIO DE PERSONAL CALIFICADO</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Miembros del Staff Asignables
            </h2>
            <p className="text-xs text-slate-400">
              Imágenes y perfiles almacenados en <code className="text-[#00F0FF] font-mono">assets/images/staff/</code>
            </p>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            {[
              { id: 'ALL', label: 'Todos' },
              { id: 'CONTROL_QR', label: 'Acceso QR' },
              { id: 'COORDINADOR', label: 'Coordinación' },
              { id: 'ARTISTA_SHOW', label: 'Shows & Gala' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedRoleFilter === tab.id
                    ? 'bg-[#00F0FF] text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="rounded-3xl glass-panel border border-[#1E2952] p-5 flex flex-col justify-between hover:border-[#00F0FF]/50 transition-all group"
            >
              <div className="space-y-4">
                {/* Staff Avatar / Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{staff.rating.toFixed(1)}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    {staff.status === 'EN_TURNO' ? 'En Turno' : 'Disponible'}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    {staff.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D946EF]">
                    {staff.roleLabel}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {staff.specialty}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Eventos atendidos:</span>
                    <strong className="text-white">{staff.eventsCompleted}</strong>
                  </div>
                  {staff.assignedDoor && (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Puesto asignado:</span>
                      <strong className="text-[#00F0FF] text-[10px]">{staff.assignedDoor}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveView('CHECKIN')}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 text-[#00F0FF] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Probar Check-in</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
