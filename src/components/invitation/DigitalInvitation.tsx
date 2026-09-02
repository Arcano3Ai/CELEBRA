import React, { useState, useEffect } from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti, triggerGoldStars } from '../common/ConfettiTrigger';
import { AudioPlayer } from '../common/AudioPlayer';
import { QRCodeView } from '../common/QRCodeView';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Users, 
  QrCode, 
  Music, 
  AlertCircle,
  Share2
} from 'lucide-react';

export const DigitalInvitation: React.FC = () => {
  const { event, activeGuest, guests, setActiveGuest, rsvpSubmit, selectedTemplate } = useEvent();

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 78,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // RSVP Form State
  const [rsvpAnswer, setRsvpAnswer] = useState<'YES' | 'NO' | null>(null);
  const [companionsCount, setCompanionsCount] = useState<number>(activeGuest?.companionsAllowed || 1);
  const [companionNameInput, setCompanionNameInput] = useState<string>('');
  const [dietary, setDietary] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(activeGuest?.status === 'CONFIRMADO');
  const [copiedClabe, setCopiedClabe] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGuest || rsvpAnswer === null) return;

    rsvpSubmit(
      activeGuest.id,
      rsvpAnswer === 'YES',
      rsvpAnswer === 'YES' ? companionsCount : 0,
      companionNameInput ? [companionNameInput] : [],
      dietary
    );

    setSubmitted(true);
    if (rsvpAnswer === 'YES') {
      triggerCelebrationConfetti();
      triggerGoldStars();
    }
  };

  const handleCopyClabe = (clabe: string) => {
    navigator.clipboard.writeText(clabe);
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#04060E] text-slate-100 overflow-x-hidden selection:bg-[#00F0FF]/30 pb-24">

      {/* Guest Simulation Bar (Permite probar URLs personalizadas /e/slug/i/[token]) */}
      <div className="sticky top-20 z-30 bg-[#0B1126]/95 border-b border-[#00F0FF]/30 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Simulador de Invitado Personalizado:</span>
            <span className="text-[#00F0FF] font-mono">/e/{event.slug}/i/{activeGuest?.qrToken.slice(-6)}</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-slate-400">Ver como:</label>
            <select
              value={activeGuest?.id || ''}
              onChange={(e) => {
                const found = guests.find(g => g.id === e.target.value);
                if (found) {
                  setActiveGuest(found);
                  setSubmitted(found.status === 'CONFIRMADO');
                  setRsvpAnswer(found.status === 'CONFIRMADO' ? 'YES' : found.status === 'NO_ASISTIRA' ? 'NO' : null);
                }
              }}
              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:border-[#00F0FF] focus:outline-none"
            >
              {guests.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.group} - {g.status})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowQrModal(true)}
              className="px-2.5 py-1 rounded-lg bg-[#00F0FF]/20 text-[#00F0FF] hover:bg-[#00F0FF]/30 font-semibold flex items-center gap-1 border border-[#00F0FF]/40"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Ver QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          PORTADA CINEMATOGRÁFICA
          ============================================================ */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Background Radial Glow & Festive Lights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#180838] via-[#090D22] to-[#04060E] -z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#D946EF]/20 to-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Personalized Welcome Badge */}
        {activeGuest && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F0FF]/20 to-[#D946EF]/20 border border-[#00F0FF]/40 text-xs font-semibold text-[#00F0FF] mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>¡Hola, {activeGuest.name.split(' ')[0]}! Nos encantará celebrar contigo</span>
          </div>
        )}

        <span className="text-xs sm:text-sm font-semibold tracking-[0.35em] text-amber-400 uppercase drop-shadow">
          Nuestra Boda &amp; Celebración
        </span>

        <h1 
          className="text-4xl sm:text-7xl lg:text-8xl font-black text-white mt-4 mb-3 tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: selectedTemplate.fontFamily }}
        >
          {event.title.replace('— CELEBRA', '')}
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 font-light max-w-xl mx-auto italic leading-relaxed">
          "{event.description}"
        </p>

        {/* Live Dynamic Countdown Clock */}
        <div className="mt-12 grid grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-3xl glass-panel-glow border border-[#00F0FF]/40 max-w-xl w-full shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <div className="text-center">
            <span className="block text-2xl sm:text-5xl font-black text-white">{timeLeft.days}</span>
            <span className="text-[10px] sm:text-xs text-[#00F0FF] font-bold uppercase tracking-wider">Días</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-5xl font-black text-[#D946EF]">{timeLeft.hours}</span>
            <span className="text-[10px] sm:text-xs text-[#D946EF] font-bold uppercase tracking-wider">Horas</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-5xl font-black text-amber-400">{timeLeft.minutes}</span>
            <span className="text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider">Minutos</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl sm:text-5xl font-black text-emerald-400">{timeLeft.seconds}</span>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-bold uppercase tracking-wider">Segundos</span>
          </div>
        </div>

        {/* Quick Date and Venue Capsule */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
            <Calendar className="w-4 h-4 text-[#00F0FF]" />
            <span>Sábado, 21 de Noviembre 2026</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
            <Clock className="w-4 h-4 text-[#D946EF]" />
            <span>18:30 hrs</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{event.venueName}</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-1 text-[11px] text-slate-400 animate-bounce">
          <span>Desliza para ver itinerario y confirmar</span>
          <span>↓</span>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN: ITINERARIO INTERACTIVO
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F0FF]">Cronograma</span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            Itinerario del Evento
          </h2>
          <p className="text-xs text-slate-400">Cada momento fue planeado para disfrutar juntos al máximo.</p>
        </div>

        <div className="relative border-l-2 border-[#1E2952] ml-4 sm:ml-8 space-y-10">
          {event.itinerary.map((item, index) => (
            <div key={item.id} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#060913] border-2 border-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(0,240,255,0.6)]" />

              <div className="p-6 rounded-2xl glass-panel border border-[#1E2952] group-hover:border-[#00F0FF]/40 transition-colors">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-black text-[#00F0FF] tracking-wider uppercase bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-md">
                    {item.time}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">Momento #{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECCIÓN: UBICACIÓN Y MAPA
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1E2952]">
        <div className="p-8 rounded-3xl glass-panel border border-[#1E2952] text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/20 text-[#00F0FF] mx-auto flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest">¿Dónde nos vemos?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{event.venueName}</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">{event.address}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#0EA5E9] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://waze.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-slate-800 transition-all"
            >
              <span>Abrir en Waze</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN: DRESS CODE (CÓDIGO DE VESTIMENTA)
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-[#1E2952]">
        <div className="p-8 rounded-3xl glass-panel-gold border border-amber-500/30 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Etiqueta</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{event.dressCode.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
              {event.dressCode.description}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Paleta de Color Sugerida para Invitados
            </p>
            <div className="flex items-center justify-center gap-3">
              {event.dressCode.colors.map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white/20 shadow-lg transform hover:scale-125 transition-transform"
                  style={{ backgroundColor: c }}
                  title={`Color ${c}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN: MESA DE REGALOS & CLABE
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1E2952]">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D946EF]">Agradecimiento</span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            Mesa de Regalos
          </h2>
          <p className="text-xs text-slate-400">
            Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, estas son las opciones disponibles:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {event.giftRegistries.map((reg) => (
            <div
              key={reg.id}
              className="p-6 rounded-2xl glass-panel border border-[#1E2952] hover:border-[#D946EF]/40 transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#D946EF]/15 text-[#D946EF] flex items-center justify-center mb-4">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{reg.storeName}</h3>
                <p className="text-xs text-slate-400 mt-1">{reg.details}</p>

                {reg.clabe && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase">CLABE Interbancaria ({reg.bankName}):</p>
                    <p className="text-[#00F0FF] font-bold text-xs">{reg.clabe}</p>
                  </div>
                )}
              </div>

              {reg.clabe ? (
                <button
                  onClick={() => handleCopyClabe(reg.clabe!)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedClabe ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedClabe ? '¡CLABE Copiada!' : 'Copiar Datos CLABE'}</span>
                </button>
              ) : (
                <a
                  href={reg.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#D946EF]/20 hover:bg-[#D946EF]/30 text-[#D946EF] border border-[#D946EF]/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Ver Mesa de Regalos</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECCIÓN: RSVP (CONFIRMACIÓN DE ASISTENCIA)
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto border-t border-[#1E2952]">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-[#00F0FF]/50 shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F0FF]">
              Confirmación de Asistencia
            </span>
            <h2 className="text-3xl font-black font-display text-white">
              ¿Nos acompañas?
            </h2>
            <p className="text-xs text-slate-300">
              Favor de confirmar antes del <span className="text-amber-400 font-bold">1 de Noviembre 2026</span>
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">
                {rsvpAnswer === 'NO' ? 'Lamentamos que no puedas asistir' : '¡Gracias por confirmar tu asistencia!'}
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {rsvpAnswer === 'NO'
                  ? 'Agradecemos tu aviso para coordinar el evento. ¡Te mandamos un fuerte abrazo!'
                  : `Tu pase digital para ${companionsCount} persona(s) está registrado. Nos vemos en CELEBRA.`}
              </p>

              {rsvpAnswer === 'YES' && (
                <div className="pt-4 flex flex-col items-center gap-3">
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Ver mi Pase con Código QR</span>
                  </button>
                  <span className="text-[11px] text-slate-400">
                    Muéstralo en la entrada para un acceso inmediato sin filas.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-6">
              
              {/* Attend decision buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRsvpAnswer('YES')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    rsvpAnswer === 'YES'
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-white ring-2 ring-[#00F0FF]/40'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className={`w-6 h-6 ${rsvpAnswer === 'YES' ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">Sí, Asistiré</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRsvpAnswer('NO')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    rsvpAnswer === 'NO'
                      ? 'border-rose-500 bg-rose-500/15 text-white ring-2 ring-rose-500/40'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <XCircle className={`w-6 h-6 ${rsvpAnswer === 'NO' ? 'text-rose-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">No Podré Asistir</span>
                </button>
              </div>

              {rsvpAnswer === 'YES' && (
                <div className="space-y-4 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">
                      Número total de personas que asisten (incluyéndote):
                    </label>
                    <select
                      value={companionsCount}
                      onChange={(e) => setCompanionsCount(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                    >
                      {Array.from({ length: activeGuest?.companionsAllowed || 2 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'persona (Solo yo)' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {companionsCount > 1 && (
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">
                        Nombre de tus acompañantes:
                      </label>
                      <input
                        type="text"
                        value={companionNameInput}
                        onChange={(e) => setCompanionNameInput(e.target.value)}
                        placeholder="Ej. Carmen Garza"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">
                      Restricciones alimentarias o alergias (opcional):
                    </label>
                    <input
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="Vegetariano, celíaco, alergia a mariscos, etc."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={rsvpAnswer === null}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
              >
                Enviar Respuesta
              </button>
            </form>
          )}

        </div>
      </section>

      {/* QR Passport Modal */}
      {showQrModal && activeGuest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold z-10 hover:bg-slate-700 shadow-lg"
            >
              ✕
            </button>
            <QRCodeView
              token={activeGuest.qrToken}
              guestName={activeGuest.name}
              groupName={`${activeGuest.group} • ${companionsCount} Pases`}
            />
          </div>
        </div>
      )}

    </div>
  );
};
