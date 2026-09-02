import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti } from '../common/ConfettiTrigger';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Palette, 
  Type, 
  Music, 
  Eye, 
  Sparkles, 
  Save, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Clock,
  MapPin,
  Gift,
  Heart,
  Calendar,
  Layers,
  Check
} from 'lucide-react';

type DeviceMode = 'MOBILE' | 'TABLET' | 'DESKTOP';

export const VisualEditor: React.FC = () => {
  const { event, updateEvent, setActiveView, selectedTemplate } = useEvent();
  
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('MOBILE');
  const [activeTab, setActiveTab] = useState<'BLOCKS' | 'THEME' | 'PROPERTIES'>('BLOCKS');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editable local state
  const [editorEvent, setEditorEvent] = useState({
    title: event.title,
    hosts: event.hosts,
    description: event.description,
    venueName: event.venueName,
    address: event.address,
    accentColor: '#00F0FF',
    fontChoice: 'Playfair Display',
    showCountdown: true,
    showItinerary: true,
    showDressCode: true,
    showGiftRegistry: true,
    showRsvp: true
  });

  const handleSave = () => {
    updateEvent({
      title: editorEvent.title,
      hosts: editorEvent.hosts,
      description: editorEvent.description,
      venueName: editorEvent.venueName,
      address: editorEvent.address
    });
    setSavedSuccess(true);
    triggerCelebrationConfetti();
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-[#060913]">
      
      {/* Editor Top Control Bar */}
      <div className="h-14 border-b border-[#1E2952] bg-[#0B1126] px-6 flex items-center justify-between shrink-0">
        
        {/* Left: Event name & badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span>EDITOR EN VIVO:</span>
            <span className="text-slate-300 font-normal truncate max-w-xs">{editorEvent.title}</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#D946EF]/20 text-[#D946EF] uppercase">
            {selectedTemplate.name}
          </span>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceMode('MOBILE')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              deviceMode === 'MOBILE' ? 'bg-[#00F0FF] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Móvil (375px)"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden md:inline">Móvil</span>
          </button>
          <button
            onClick={() => setDeviceMode('TABLET')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              deviceMode === 'TABLET' ? 'bg-[#00F0FF] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode('DESKTOP')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              deviceMode === 'DESKTOP' ? 'bg-[#00F0FF] text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Desktop (100%)"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden md:inline">Desktop</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('INVITATION')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden sm:inline">Previsualizar</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 font-black text-slate-950" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? '¡Guardado!' : 'Guardar'}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Layout: Left Tools | Center Canvas | Right Properties */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ============================================================
            PANEL IZQUIERDO: COMPONENTES Y BLOQUES
            ============================================================ */}
        <aside className="w-72 border-r border-[#1E2952] bg-[#0B1126] flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Bloques de Contenido</span>
            </h3>
          </div>

          <div className="p-4 space-y-2.5">
            {[
              { id: 'countdown', label: 'Cuenta Regresiva', icon: Clock, state: editorEvent.showCountdown, toggle: () => setEditorEvent({ ...editorEvent, showCountdown: !editorEvent.showCountdown }) },
              { id: 'itinerary', label: 'Itinerario Interactivo', icon: Calendar, state: editorEvent.showItinerary, toggle: () => setEditorEvent({ ...editorEvent, showItinerary: !editorEvent.showItinerary }) },
              { id: 'dresscode', label: 'Código de Vestimenta', icon: Sparkles, state: editorEvent.showDressCode, toggle: () => setEditorEvent({ ...editorEvent, showDressCode: !editorEvent.showDressCode }) },
              { id: 'gifts', label: 'Mesa de Regalos & CLABE', icon: Gift, state: editorEvent.showGiftRegistry, toggle: () => setEditorEvent({ ...editorEvent, showGiftRegistry: !editorEvent.showGiftRegistry }) },
              { id: 'rsvp', label: 'Formulario RSVP Digital', icon: Heart, state: editorEvent.showRsvp, toggle: () => setEditorEvent({ ...editorEvent, showRsvp: !editorEvent.showRsvp }) }
            ].map((block) => {
              const Icon = block.icon;
              return (
                <div
                  key={block.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#00F0FF]" />
                    <span className="text-xs font-semibold text-white">{block.label}</span>
                  </div>
                  <button
                    onClick={block.toggle}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${
                      block.state ? 'bg-[#00F0FF]' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      block.state ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-auto p-4 border-t border-slate-800 bg-[#060913]">
            <p className="text-[11px] text-slate-400">
              💡 Arrastra o activa bloques para personalizar la experiencia de tus invitados.
            </p>
          </div>
        </aside>

        {/* ============================================================
            CANVAS CENTRAL: PREVIEW INTERACTIVO
            ============================================================ */}
        <main className="flex-1 bg-[#04060E] p-6 overflow-y-auto flex items-start justify-center relative">
          
          {/* Responsive Viewport Frame */}
          <div
            className={`transition-all duration-300 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#1E2952] bg-[#060913] text-left ${
              deviceMode === 'MOBILE'
                ? 'w-[375px] min-h-[720px]'
                : deviceMode === 'TABLET'
                ? 'w-[680px] min-h-[850px]'
                : 'w-full max-w-4xl min-h-[900px]'
            }`}
          >
            
            {/* Live Preview Hero */}
            <div className={`p-8 bg-gradient-to-b from-[#18002E] to-[#060913] text-center border-b border-slate-800 relative overflow-hidden`}>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                Nuestra Celebración
              </span>
              <h1 
                className="text-3xl sm:text-4xl font-bold text-white mt-4 leading-tight"
                style={{ fontFamily: editorEvent.fontChoice }}
              >
                {editorEvent.title}
              </h1>
              <p className="text-xs text-slate-300 mt-2 font-light">
                {editorEvent.hosts}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#00F0FF] font-semibold bg-[#00F0FF]/10 px-4 py-1.5 rounded-full border border-[#00F0FF]/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date} • {event.time}</span>
              </div>
            </div>

            {/* Canvas Blocks Preview */}
            <div className="p-6 space-y-6 text-xs text-slate-300">
              
              {/* Description */}
              <div className="p-4 rounded-2xl bg-[#0B1126] border border-slate-800 leading-relaxed text-center italic">
                "{editorEvent.description}"
              </div>

              {/* Countdown Preview */}
              {editorEvent.showCountdown && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-[#00F0FF]/30 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#00F0FF] tracking-wider">Cuenta Regresiva</span>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    <div className="p-2 rounded-xl bg-slate-950 font-bold text-white text-base">78<span className="block text-[9px] text-slate-500 font-normal">Días</span></div>
                    <div className="p-2 rounded-xl bg-slate-950 font-bold text-[#D946EF] text-base">14<span className="block text-[9px] text-slate-500 font-normal">Horas</span></div>
                    <div className="p-2 rounded-xl bg-slate-950 font-bold text-amber-400 text-base">32<span className="block text-[9px] text-slate-500 font-normal">Min</span></div>
                    <div className="p-2 rounded-xl bg-slate-950 font-bold text-emerald-400 text-base">45<span className="block text-[9px] text-slate-500 font-normal">Seg</span></div>
                  </div>
                </div>
              )}

              {/* Venue Preview */}
              <div className="p-4 rounded-2xl bg-[#0B1126] border border-slate-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D946EF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">{editorEvent.venueName}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{editorEvent.address}</p>
                </div>
              </div>

              {/* Itinerary Preview */}
              {editorEvent.showItinerary && (
                <div className="p-4 rounded-2xl bg-[#0B1126] border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Itinerario del Evento</span>
                  </h4>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="font-semibold text-white">18:30 hrs</span>
                      <span className="text-slate-400">Recepción &amp; Cóctel de Bienvenida</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="font-semibold text-white">19:45 hrs</span>
                      <span className="text-slate-400">Ceremonia Solemne</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">21:00 hrs</span>
                      <span className="text-slate-400">Banquete Gourmet &amp; Gran Fiesta</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dress Code Preview */}
              {editorEvent.showDressCode && (
                <div className="p-4 rounded-2xl bg-[#0B1126] border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Código de Vestimenta</span>
                  <p className="font-bold text-white text-xs">Rigurosa Etiqueta / Black Tie</p>
                  <p className="text-[10px] text-slate-400">Vestido largo de noche y traje formal oscuro</p>
                </div>
              )}

              {/* RSVP Button Preview */}
              {editorEvent.showRsvp && (
                <div className="text-center pt-2">
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-bold uppercase tracking-wider shadow-lg">
                    Confirmar Asistencia (RSVP)
                  </button>
                </div>
              )}

            </div>
          </div>
        </main>

        {/* ============================================================
            PANEL DERECHO: PROPIEDADES EN VIVO
            ============================================================ */}
        <aside className="w-80 border-l border-[#1E2952] bg-[#0B1126] flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D946EF] flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>Propiedades Visuales</span>
            </h3>
          </div>

          <div className="p-5 space-y-6">
            {/* Title Editing */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Título del Evento</label>
              <input
                type="text"
                value={editorEvent.title}
                onChange={(e) => setEditorEvent({ ...editorEvent, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
              />
            </div>

            {/* Hosts Editing */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Anfitriones</label>
              <input
                type="text"
                value={editorEvent.hosts}
                onChange={(e) => setEditorEvent({ ...editorEvent, hosts: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
              />
            </div>

            {/* Typography Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Tipografía de Nombres</span>
              </label>
              <select
                value={editorEvent.fontChoice}
                onChange={(e) => setEditorEvent({ ...editorEvent, fontChoice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
              >
                <option value="Playfair Display">Playfair Display (Elegante Clásica)</option>
                <option value="Cinzel">Cinzel (Imperial &amp; Luxury)</option>
                <option value="Great Vibes">Great Vibes (Script Caligráfico)</option>
                <option value="Outfit">Outfit (Moderna &amp; Neón)</option>
                <option value="Montserrat">Montserrat (Minimalista)</option>
              </select>
            </div>

            {/* Venue & Location Editing */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre del Salón</label>
              <input
                type="text"
                value={editorEvent.venueName}
                onChange={(e) => setEditorEvent({ ...editorEvent, venueName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
              />
            </div>

            {/* Description Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dedicatoria / Descripción</label>
              <textarea
                rows={4}
                value={editorEvent.description}
                onChange={(e) => setEditorEvent({ ...editorEvent, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 text-xs font-bold uppercase tracking-wider transition-all hover:brightness-110 shadow-lg"
            >
              Aplicar Cambios
            </button>
          </div>
        </aside>

      </div>

    </div>
  );
};
