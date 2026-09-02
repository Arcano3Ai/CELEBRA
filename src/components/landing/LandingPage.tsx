import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti, triggerGoldStars } from '../common/ConfettiTrigger';
import { LuxuryBalloonsAndSparks } from '../common/LuxuryBalloonsAndSparks';
import { VideoDemoModal } from '../common/VideoDemoModal';
import { 
  Sparkles, 
  PartyPopper, 
  QrCode, 
  Users, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Play, 
  Crown, 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Zap, 
  Smartphone,
  Star,
  Flame,
  Film
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, templates, setSelectedTemplate } = useEvent();
  const [activeTab, setActiveTab] = useState<'ALL' | 'BODAS' | 'XV_ANOS' | 'CUMPLEANOS'>('ALL');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const categories = [
    { id: 'BODAS', icon: '💍', label: 'Bodas', desc: 'Elegancia nupcial de ensueño' },
    { id: 'XV_ANOS', icon: '👑', label: 'XV Años', desc: 'Magia, vestidos y fiesta inolvidable' },
    { id: 'CUMPLEANOS', icon: '🎂', label: 'Cumpleaños', desc: 'Celebraciones vibrantes y únicas' },
    { id: 'BAUTIZOS', icon: '👶', label: 'Bautizos', desc: 'Ternura, bendición y detalles finos' },
    { id: 'BABY_SHOWERS', icon: '🍼', label: 'Baby Showers', desc: 'Bienvenida dulce y memorable' },
    { id: 'GRADUACIONES', icon: '🎓', label: 'Graduaciones', desc: 'Triunfo, toga y noche de gala' },
    { id: 'ANIVERSARIOS', icon: '🥂', label: 'Aniversarios', desc: 'Brindis por historias de amor' },
    { id: 'CORPORATIVOS', icon: '🏢', label: 'Corporativos', desc: 'Convenciones, congresos y galas' },
    { id: 'FIESTAS', icon: '🎉', label: 'Fiestas & Festivales', desc: 'Diversión, beats y buen ambiente' },
  ];

  const valueProps = [
    {
      icon: Sparkles,
      color: 'from-[#00F0FF] to-[#0EA5E9]',
      title: 'Invitaciones Digitales',
      description: 'Diseña una experiencia interactiva única con música, fotos, cuenta regresiva e itinerario.'
    },
    {
      icon: Heart,
      color: 'from-[#D946EF] to-[#EC4899]',
      title: 'Sistema RSVP Inteligente',
      description: 'Recibe confirmaciones al instante, número de acompañantes y alergias alimentarias.'
    },
    {
      icon: Users,
      color: 'from-[#7928CA] to-[#A855F7]',
      title: 'Control de Invitados',
      description: 'Organiza tus invitados por familias, amigos o mesas VIP sin listas de papel desordenadas.'
    },
    {
      icon: QrCode,
      color: 'from-[#F59E0B] to-[#FCD34D]',
      title: 'Códigos QR Criptográficos',
      description: 'Genera un pasaporte QR intransferible para cada invitado con validación de seguridad.'
    },
    {
      icon: ShieldCheck,
      color: 'from-[#10B981] to-[#34D399]',
      title: 'Check-in en Tiempo Real',
      description: 'El staff escanea con un smartphone en la puerta y valida entradas en milisegundos.'
    },
    {
      icon: BarChart3,
      color: 'from-[#3B82F6] to-[#00F0FF]',
      title: 'Estadísticas Vivas',
      description: 'Conoce exactamente el porcentaje de asistencia, confirmados y personas en el salón.'
    },
    {
      icon: MessageSquare,
      color: 'from-[#22C55E] to-[#10B981]',
      title: 'Difusión por WhatsApp',
      description: 'Comparte pases personalizados con un solo clic directamente a los chats de tus invitados.'
    }
  ];

  const pricingPlans = [
    {
      name: 'CELEBRA STAFF EXPRESS',
      price: '$399',
      currency: 'MXN',
      period: 'por evento',
      description: 'Ideal para celebraciones íntimas, cumpleaños y bautizos con 1 Staff en puerta.',
      features: [
        '1 Elemento de Staff de Acceso QR',
        'Hasta 100 invitados gestionados',
        'Plantillas de diseño premium',
        'Confirmación RSVP automática vía WhatsApp',
        'Validación de pases QR en menos de 1 segundo',
        'Protección anti-duplicados y colados'
      ],
      cta: 'Elegir Plan $399',
      popular: false
    },
    {
      name: 'CELEBRA STAFF PRO',
      price: '$799',
      currency: 'MXN',
      period: 'por evento',
      badge: 'MÁS POPULAR',
      description: 'La solución preferida para bodas, graduaciones y XV años con 2 elementos en puerta.',
      features: [
        '2 Elementos de Staff dedicados en recepción',
        'Hasta 500 invitados gestionados',
        'Editor visual Canva-style con música y video',
        'Control simultáneo en puerta principal y VIP',
        'Mesa de regalos (Amazon, Liverpool, Bancaria)',
        'Sincronización en tiempo real a WhatsApp',
        'Reporte de asistencia y aforo en vivo'
      ],
      cta: 'Elegir Plan Pro $799',
      popular: true
    },
    {
      name: 'CELEBRA VIP & COORDINACIÓN',
      price: '$1,999',
      currency: 'MXN',
      period: 'servicio completo',
      description: 'Para wedding planners, galas y salones con coordinador logístico y show de gala.',
      features: [
        'Equipo completo de Staff + Coordinador',
        '1 Coordinador logístico para protocolo y tiempos',
        '2 Operadores de acceso con bienvenida VIP',
        'Invitados ilimitados y eventos masivos',
        'Shows de gala opcionales (Fuego o Malabares)',
        'Panel de control SaaS y métricas en vivo',
        'Soporte prioritario presencial 24/7'
      ],
      cta: 'Obtener Todo VIP $1,999',
      popular: false
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Floating Chrome Balloons & Sparkles */}
      <LuxuryBalloonsAndSparks />

      {/* Dynamic Background Stars & Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-40 right-1/4 w-[32rem] h-[32rem] bg-[#D946EF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-[800px] left-1/3 w-80 h-80 bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#00F0FF]/30 text-xs font-semibold text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>EL ECOSISTEMA DIGITAL PARA EVENTOS PREMIUM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight leading-[1.08] text-white">
              Tu evento <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#D946EF] to-[#F59E0B]">
                comienza aquí.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Crea una invitación digital increíble, confirma a tus invitados en automático y controla el acceso con códigos QR en tiempo real. 
              <span className="text-white font-semibold"> Canva + Eventbrite + RSVP + Check-in</span> bajo una sola experiencia inolvidable.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  triggerCelebrationConfetti();
                  setActiveView('WIZARD');
                }}
                className="px-8 py-4 rounded-2xl text-base font-black uppercase tracking-wider bg-gradient-to-r from-[#00F0FF] via-[#D946EF] to-[#F59E0B] text-slate-950 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(217,70,239,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <PartyPopper className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>CREAR MI INVITACIÓN</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => {
                  triggerCelebrationConfetti();
                  setIsVideoModalOpen(true);
                }}
                className="px-6 py-4 rounded-2xl text-base font-semibold bg-[#0B1126]/80 hover:bg-[#121A38] text-slate-200 border border-[#1E2952] hover:border-[#00F0FF]/50 transition-all flex items-center justify-center gap-2 group"
              >
                <Film className="w-4 h-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
                <span>VER VIDEO DEMO</span>
              </button>

              <button
                onClick={() => {
                  triggerCelebrationConfetti();
                  triggerGoldStars();
                }}
                className="px-5 py-4 rounded-2xl text-sm font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
                title="Lanzar pirotecnia de gala y globos"
              >
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>¡PIROTECNIA &amp; FIESTA!</span>
              </button>
            </div>

            {/* Social Proof Mini */}
            <div className="pt-6 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex -space-x-2">
                {['#00F0FF', '#D946EF', '#F59E0B', '#10B981'].map((c, idx) => (
                  <div key={idx} className="w-8 h-8 rounded-full border-2 border-[#060913] flex items-center justify-center font-bold text-[10px] text-white" style={{ backgroundColor: c }}>
                    ★
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="font-bold text-white ml-1">4.9/5</span>
                </div>
                <span>Más de 15,000 celebraciones realizadas</span>
              </div>
            </div>

          </div>

          {/* Right Hero: 3D Smartphone Interactive Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Phone Case Frame */}
            <div className="relative w-[320px] sm:w-[350px] rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.25)] border-4 border-slate-700/60 animate-float">
              
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-6 inset-x-0 mx-auto w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
              </div>

              {/* Phone Screen Container */}
              <div className="relative w-full h-[620px] rounded-[40px] overflow-hidden bg-[#060913] border border-slate-800 flex flex-col text-left">
                
                {/* Simulated Screen Content: Elegant Wedding Invitation con Video Real en Vivo */}
                <div className="relative h-72 p-6 flex flex-col justify-end overflow-hidden bg-black">
                  <video
                    src="./assets/video/ANIMALAEPICA_202609011716.mp4"
                    poster="./assets/images/fire-performer-luxury.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/30 to-black/40 pointer-events-none" />
                  
                  {/* Decorative Sparkle overlay */}
                  <div className="relative z-10 flex items-center justify-between mb-auto">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#00F0FF]/40">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>VIDEO SAVE THE DATE</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/40">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>VIP</span>
                    </div>
                  </div>

                  {/* Text Overlay sobre el Video */}
                  <div className="relative z-10 space-y-0.5">
                    <p className="text-[11px] font-medium tracking-[0.25em] text-[#00F0FF] uppercase">
                      ¡Nos Casamos!
                    </p>
                    <h3 className="text-2xl font-serif font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      Carlos &amp; Sofía
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-amber-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Sábado 21 Nov 2026</span>
                    </div>
                  </div>
                </div>

                {/* Body Details Inside Phone */}
                <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                  
                  {/* Countdown Mini */}
                  <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-xl bg-[#0B1126] border border-[#1E2952] text-center">
                    <div>
                      <span className="block text-sm font-black text-[#00F0FF]">78</span>
                      <span className="text-[9px] text-slate-400 uppercase">Días</span>
                    </div>
                    <div>
                      <span className="block text-sm font-black text-[#D946EF]">14</span>
                      <span className="text-[9px] text-slate-400 uppercase">Horas</span>
                    </div>
                    <div>
                      <span className="block text-sm font-black text-[#F59E0B]">32</span>
                      <span className="text-[9px] text-slate-400 uppercase">Min</span>
                    </div>
                    <div>
                      <span className="block text-sm font-black text-emerald-400">45</span>
                      <span className="text-[9px] text-slate-400 uppercase">Seg</span>
                    </div>
                  </div>

                  {/* Place & Time */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Hacienda San José</h4>
                      <p className="text-[10px] text-slate-400">Jardín Principal de Fuentes, Cuernavaca</p>
                    </div>
                  </div>

                  {/* Personalized Guest Badge */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#D946EF]/20 to-[#00F0FF]/20 border border-[#D946EF]/30 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-300">Pase Exclusivo:</p>
                      <p className="text-xs font-bold text-white">Lic. Roberto Morales (VIP)</p>
                    </div>
                    <span className="text-[10px] font-extrabold bg-[#00F0FF] text-slate-950 px-2 py-0.5 rounded-md">
                      2 PASES
                    </span>
                  </div>

                  {/* RSVP Interactive Button inside phone */}
                  <button 
                    onClick={() => setActiveView('INVITATION')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform"
                  >
                    <Check className="w-4 h-4" />
                    <span>CONFIRMAR ASISTENCIA</span>
                  </button>

                  {/* QR Preview Mini */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-amber-400" />
                      <span className="text-[10px] text-slate-300">Check-in listo en puerta</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      ACTIVO
                    </span>
                  </div>

                </div>

                {/* Floating Action Button at Bottom of screen */}
                <div className="p-3 bg-[#0B1126] border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#F59E0B]">
                    CELEBRA EXPERIENCES
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-400">RSVP abierto</span>
                  </div>
                </div>

              </div>

              {/* Floating Floating Pill: QR Checkin Authorized Badge */}
              <div className="absolute -bottom-6 -left-8 glass-panel-glow px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#00F0FF]/50 animate-bounce">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-medium">Lectura QR Staff</p>
                  <p className="text-xs font-bold text-white">✓ Acceso Autorizado</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================
          PROPUESTA DE VALOR: "TODO PARA CELEBRAR"
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2952]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#00F0FF] uppercase">
            Plataforma All-In-One
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
            Todo para celebrar. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#D946EF] to-[#F59E0B]">
              Todo en un solo lugar.
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Despídete de los PDFs estáticos que nadie lee y las listas de papel en la entrada. CELEBRA digitaliza cada segundo de tu evento.
          </p>
        </div>

        {/* 7 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="group relative p-6 rounded-3xl glass-panel border border-[#1E2952] hover:border-[#00F0FF]/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-slate-950 mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* 8th Action Card */}
          <div 
            onClick={() => setActiveView('WIZARD')}
            className="cursor-pointer p-6 rounded-3xl bg-gradient-to-br from-[#00F0FF]/20 via-[#D946EF]/20 to-[#F59E0B]/20 border border-[#00F0FF]/50 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-2xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF] text-slate-950 flex items-center justify-center font-black mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">¿Listo para probarlo?</h3>
              <p className="text-xs text-slate-300 mt-2">Crea tu evento demo en menos de 2 minutos sin tarjeta de crédito.</p>
            </div>
            <span className="text-xs font-bold text-[#00F0FF] flex items-center gap-1 mt-4">
              Comenzar ahora <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

      </section>

      {/* ============================================================
          TIPOS DE EVENTOS: "CELEBRA CUALQUIER OCASIÓN"
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2952]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#D946EF] uppercase">
            Versatilidad Total
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
            CELEBRA cualquier ocasión
          </h2>
          <p className="text-slate-400">
            Diseñado tanto para la solemnidad de una boda o evento corporativo, como para la emoción electrizante de unos XV años o cumpleaños.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                const matched = templates.find(t => t.category === cat.id) || templates[0];
                setSelectedTemplate(matched);
                setActiveView('EDITOR');
              }}
              className="cursor-pointer p-6 rounded-2xl glass-panel border border-[#1E2952] hover:border-[#D946EF] hover:bg-[#121A38] transition-all group text-left relative overflow-hidden"
            >
              <span className="text-3xl sm:text-4xl block mb-3 group-hover:scale-125 transition-transform origin-left">
                {cat.icon}
              </span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#D946EF] transition-colors">
                {cat.label}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {cat.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver plantillas</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ============================================================
          SHOWS & EXPERIENCIAS DE LUJO: FUEGO, MALABARISTAS Y GLOBOS
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2952]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/40">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>ESPECTÁCULOS &amp; AMBIENTACIONES VIBE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
            Experiencias de Lujo Inolvidables
          </h2>
          <p className="text-slate-300 text-base">
            Lleva tu evento al siguiente nivel con avienta fuegos de gala, malabaristas luminosos de cirque y majestuosas instalaciones de globos metálicos.
          </p>
        </div>

        {/* Video Épico de Assets en Landing Page */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#00F0FF]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <div className="p-4 sm:p-5 bg-[#060913]/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                VIDEO OFICIAL EN VIVO • DIVERTIFIESTA &amp; CELEBRA SHOWS
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-full border border-[#00F0FF]/20">
              HD 1080p • ANIMALA ÉPICA
            </span>
          </div>

          <div className="relative aspect-video max-h-[520px] bg-black flex items-center justify-center">
            <video
              src="./assets/video/ANIMALAEPICA_202609011716.mp4"
              poster="./assets/images/fire-performer-luxury.jpg"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2 Spectacular Show Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Avienta Fuegos & Pirotecnia Fría */}
          <div className="group rounded-3xl glass-panel-gold border border-amber-500/40 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-amber-400 transition-all duration-300">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img
                src="/assets/images/fire-performer-luxury.jpg"
                alt="Avienta fuegos de lujo y pirotecnia de gala"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1126] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>SHOW DE FUEGO &amp; PIROTECNIA</span>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                Avienta Fuegos de Gala &amp; Fuentes Pirotécnicas
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Artistas caracterizados con trajes de alta costura, máscaras venecianas de oro y espectáculos de fuego controlado. Incluye cascadas de chispas frías para la entrada de novios, corte de pastel o brindis VIP.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  🔥 Pirotecnia Fría Segura
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  ✨ Chispas Doradas
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  🎈 Globos Flotantes
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Malabaristas & Cirque VIP */}
          <div className="group rounded-3xl glass-panel-magenta border border-[#D946EF]/40 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#D946EF] transition-all duration-300">
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img
                src="/assets/images/juggler-gala-show.jpg"
                alt="Malabarista de gala y circo de lujo"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1126] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D946EF]/50 text-[#E879F9] text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E879F9]" />
                <span>CIRQUE &amp; MALABARISTAS VIP</span>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-black text-white group-hover:text-[#00F0FF] transition-colors">
                Malabaristas de Luces &amp; Esculturas de Globos
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Malabaristas con esferas de cristal iluminadas, aros LED giratorios con estelas de chispas y ambientación con arcos y racimos de globos metálicos cromados en magenta, cyan eléctrico y dorado.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-[#D946EF]/10 text-[#E879F9] border border-[#D946EF]/20 font-semibold">
                  🤹 Malabares de Cristal
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 font-semibold">
                  🎈 Globos Cromados 3D
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#D946EF]/10 text-[#E879F9] border border-[#D946EF]/20 font-semibold">
                  🎆 Lluvia de Confeti
                </span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ============================================================
          SHOWCASE DE PLANTILLAS
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2952]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#F59E0B] uppercase">
              Catálogo de Diseño
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white mt-1">
              Plantillas que enamoran a primera vista
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Personaliza cada color, tipografía, bloques y música con nuestro editor tipo Canva.
            </p>
          </div>

          <button
            onClick={() => setActiveView('EDITOR')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <span>Abrir Editor Visual</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              className="rounded-3xl glass-panel border border-[#1E2952] overflow-hidden group hover:border-[#00F0FF]/60 transition-all flex flex-col"
            >
              {/* Template Card Visual Preview */}
              <div className={`h-48 bg-gradient-to-br ${tpl.previewGradient} p-5 relative flex flex-col justify-between overflow-hidden border-b border-white/5`}>
                
                {/* Floating Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/50 text-white uppercase tracking-wider border border-white/10">
                    {tpl.categoryLabel}
                  </span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tpl.accentColor }} />
                </div>

                <div className="text-center my-auto">
                  <p className="text-xs font-light text-slate-300 uppercase tracking-widest">Nuestra Boda</p>
                  <h4 className="text-xl font-bold text-white mt-1" style={{ fontFamily: tpl.fontFamily }}>
                    {tpl.name.split(' ')[1] || 'Celebración'}
                  </h4>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>RSVP • QR • Música</span>
                  <span className="text-[#00F0FF] font-semibold">Preview</span>
                </div>
              </div>

              {/* Template Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-[#00F0FF] transition-colors">
                    {tpl.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedTemplate(tpl);
                      setActiveView('EDITOR');
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 text-[#00F0FF] text-xs font-bold transition-colors border border-[#00F0FF]/30"
                  >
                    Personalizar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(tpl);
                      setActiveView('INVITATION');
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    title="Ver invitación"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ============================================================
          PLANES Y PRECIOS
          ============================================================ */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2952]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-[#00F0FF] uppercase">
            Inversión Transparente
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
            Planes hechos para cada celebración
          </h2>
          <p className="text-slate-400">
            Sin suscripciones forzosas. Paga solo por el evento que estás organizando.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#121A38] to-[#0B1126] border-2 border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.2)] lg:-translate-y-2'
                  : 'glass-panel border border-[#1E2952] hover:border-slate-600'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit px-4 py-1 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-2 min-h-[32px]">{plan.description}</p>

                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                  {plan.currency && <span className="text-sm font-semibold text-[#00F0FF]">{plan.currency}</span>}
                  <span className="text-xs text-slate-400 ml-2">/ {plan.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 font-bold" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    triggerCelebrationConfetti();
                    setActiveView('WIZARD');
                  }}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02]'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ============================================================
          FOOTER CELEBRA
          ============================================================ */}
      <footer className="border-t border-[#1E2952] bg-[#03060D] py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CELEBRA — INVITACIONES DIGITALES. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="hover:text-[#00F0FF] cursor-pointer">Términos del Servicio</span>
            <span className="hover:text-[#00F0FF] cursor-pointer">Aviso de Privacidad</span>
            <span className="hover:text-[#00F0FF] cursor-pointer">Soporte Concierge</span>
          </div>
        </div>
      </footer>

      {/* Video Demo Modal */}
      <VideoDemoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

    </div>
  );
};
