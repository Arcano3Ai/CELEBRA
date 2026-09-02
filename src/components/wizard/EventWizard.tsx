import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti } from '../common/ConfettiTrigger';
import { EventCategory } from '../../types';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Palette, 
  Music, 
  Users, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  PartyPopper, 
  Share2, 
  ExternalLink,
  Plus
} from 'lucide-react';

export const EventWizard: React.FC = () => {
  const { event, updateEvent, templates, selectedTemplate, setSelectedTemplate, setActiveView, addGuest } = useEvent();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: event.title,
    hosts: event.hosts,
    category: event.category as EventCategory,
    date: event.date,
    time: event.time,
    endTime: event.endTime || '02:00 hrs',
    venueName: event.venueName,
    address: event.address,
    googleMapsUrl: event.googleMapsUrl,
    description: event.description,
    selectedTemplateId: selectedTemplate.id,
    accentColor: '#00F0FF',
    fontStyle: 'Playfair Display',
    enableMusic: true
  });

  const [manualGuest, setManualGuest] = useState({ name: '', phone: '', group: 'Familia', passes: 2 });
  const [addedCount, setAddedCount] = useState<number>(0);

  const handleNext = () => {
    if (step === 4) {
      // Finalize and save
      updateEvent({
        title: formData.title,
        hosts: formData.hosts,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        endTime: formData.endTime,
        venueName: formData.venueName,
        address: formData.address,
        description: formData.description,
        templateId: formData.selectedTemplateId
      });
      triggerCelebrationConfetti();
    }
    setStep(prev => Math.min(5, prev + 1));
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleAddQuickGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualGuest.name.trim()) return;
    addGuest({
      name: manualGuest.name,
      phone: manualGuest.phone || '+52 55 0000 0000',
      group: manualGuest.group,
      companionsAllowed: manualGuest.passes,
      companionsCount: 0,
      status: 'PENDIENTE'
    });
    setManualGuest({ name: '', phone: '', group: 'Familia', passes: 2 });
    setAddedCount(prev => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Wizard Step Progress Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#1E2952] -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#00F0FF] to-[#D946EF] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {[
            { num: 1, label: 'Datos' },
            { num: 2, label: 'Plantilla' },
            { num: 3, label: 'Estilo' },
            { num: 4, label: 'Invitados' },
            { num: 5, label: 'Publicar' }
          ].map((item) => (
            <div key={item.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  step > item.num
                    ? 'bg-[#00F0FF] text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                    : step === item.num
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 ring-4 ring-[#00F0FF]/30 shadow-lg scale-110'
                    : 'bg-[#0B1126] text-slate-400 border border-[#1E2952]'
                }`}
              >
                {step > item.num ? <Check className="w-5 h-5 font-bold" /> : item.num}
              </div>
              <span className={`text-[11px] font-semibold mt-2 ${step >= item.num ? 'text-white' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Step Form Container */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-[#1E2952]">
        
        {/* ============================================================
            PASO 1: DATOS DEL EVENTO
            ============================================================ */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#00F0FF] tracking-wider uppercase">Paso 1 de 5</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                Datos principales de tu celebración
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ingresa los detalles clave para comenzar a generar tu invitación personalizada.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre del Evento</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej. Boda Carlos & Sofía"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Anfitriones / Festejados</label>
                <input
                  type="text"
                  value={formData.hosts}
                  onChange={(e) => setFormData({ ...formData, hosts: e.target.value })}
                  placeholder="Ej. Carlos Mendoza & Sofía Villarreal"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Fecha del Evento</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hora Inicio</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="18:30 hrs"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hora Fin (opcional)</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="03:00 hrs"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre del Lugar / Salón</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  placeholder="Ej. Hacienda San José de las Palmas"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dirección Completa</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle, Número, Colonia, Ciudad, Estado"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mensaje de Bienvenida</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mensaje o dedicatoria para tus invitados..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-[#00F0FF] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            PASO 2: SELECCIÓN DE PLANTILLA
            ============================================================ */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#D946EF] tracking-wider uppercase">Paso 2 de 5</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                Elige la plantilla visual
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Cada diseño viene con paletas de colores optimizadas, tipografías y efectos de iluminación.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
              {templates.map((tpl) => {
                const isSelected = selectedTemplate.id === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl);
                      setFormData({ ...formData, selectedTemplateId: tpl.id });
                    }}
                    className={`cursor-pointer rounded-2xl p-5 transition-all relative overflow-hidden border ${
                      isSelected
                        ? 'border-[#00F0FF] ring-2 ring-[#00F0FF]/40 bg-[#121A38] shadow-[0_0_30px_rgba(0,240,255,0.25)]'
                        : 'border-[#1E2952] glass-panel hover:border-slate-600'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#00F0FF] text-slate-950 flex items-center justify-center font-bold shadow-md">
                        <Check className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`h-28 rounded-xl bg-gradient-to-br ${tpl.previewGradient} p-3 flex flex-col justify-between mb-4`}>
                      <span className="text-[10px] font-bold text-slate-300 uppercase">{tpl.categoryLabel}</span>
                      <p className="text-lg font-bold text-white text-center" style={{ fontFamily: tpl.fontFamily }}>
                        {tpl.name.split(' ')[1] || 'Diseño'}
                      </p>
                      <div className="w-2.5 h-2.5 rounded-full self-end" style={{ backgroundColor: tpl.accentColor }} />
                    </div>

                    <h4 className="font-bold text-white text-sm">{tpl.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tpl.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================
            PASO 3: PERSONALIZACIÓN
            ============================================================ */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#F59E0B] tracking-wider uppercase">Paso 3 de 5</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                Personalización de la Experiencia
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Define los colores acento, música ambiental y animaciones festivas.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              
              {/* Color Palettes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-3">Color de Acento Principal</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { hex: '#00F0FF', label: 'Cyan Neón' },
                    { hex: '#D946EF', label: 'Magenta Fiesta' },
                    { hex: '#F59E0B', label: 'Oro Real' },
                    { hex: '#10B981', label: 'Esmeralda' },
                    { hex: '#EC4899', label: 'Rosa Amor' },
                    { hex: '#8B5CF6', label: 'Púrpura' }
                  ].map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setFormData({ ...formData, accentColor: color.hex })}
                      className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                        formData.accentColor === color.hex
                          ? 'border-white ring-2 ring-white/50 bg-slate-800 text-white'
                          : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full shadow" style={{ backgroundColor: color.hex }} />
                      <span>{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Music Switch */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Música Ambiental de Entrada</h4>
                    <p className="text-xs text-slate-400">Pista: Vals Mágico de Celebración (Loop suave 12s)</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, enableMusic: !formData.enableMusic })}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    formData.enableMusic ? 'bg-[#00F0FF]' : 'bg-slate-700'
                  }`}
                >
                  <span className={`block w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                    formData.enableMusic ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Dress Code Quick Definition */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">Código de Vestimenta (Dress Code)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 font-semibold text-white">
                    Rigurosa Etiqueta / Black Tie
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400">
                    Ellas de vestido largo, ellos de smoking o traje oscuro.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================
            PASO 4: AGREGAR INVITADOS INICIALES
            ============================================================ */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Paso 4 de 5</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                Agrega a tus primeros invitados
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Puedes agregar algunos ahora o importar la lista completa después desde el panel de invitados.
              </p>
            </div>

            {/* Quick Guest Form */}
            <form onSubmit={handleAddQuickGuest} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={manualGuest.name}
                    onChange={(e) => setManualGuest({ ...manualGuest, name: e.target.value })}
                    placeholder="Ej. Tía Laura y Familia"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Grupo / Mesa</label>
                  <select
                    value={manualGuest.group}
                    onChange={(e) => setManualGuest({ ...manualGuest, group: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
                  >
                    <option value="Familia">Familia</option>
                    <option value="Amigos">Amigos</option>
                    <option value="VIP">VIP</option>
                    <option value="Trabajo">Trabajo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">No. Pases</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={manualGuest.passes}
                    onChange={(e) => setManualGuest({ ...manualGuest, passes: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-[#00F0FF]">
                  {addedCount > 0 ? `✓ ${addedCount} invitado(s) agregado(s) recientemente` : 'Ingresa el nombre y presiona agregar'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar a la lista</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================
            PASO 5: PUBLICAR Y CELEBRAR
            ============================================================ */}
        {step === 5 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#D946EF] to-[#F59E0B] mx-auto flex items-center justify-center text-slate-950 shadow-[0_0_40px_rgba(0,240,255,0.6)] animate-bounce">
              <PartyPopper className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">¡Todo Listo!</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                ¡Tu invitación está lista para celebrar!
              </h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                Tu enlace exclusivo ha sido generado con pasaportes QR y sistema de confirmación activo.
              </p>
            </div>

            {/* Generated Link Box */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#060913] border border-[#00F0FF]/40 text-xs font-mono text-[#00F0FF] flex items-center justify-between">
              <span className="truncate">https://celebra.app/e/{event.slug}</span>
              <span className="text-slate-400 text-[10px] ml-2">PÚBLICA</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  triggerCelebrationConfetti();
                  setActiveView('INVITATION');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>VER MI INVITACIÓN VIVA</span>
              </button>

              <button
                onClick={() => setActiveView('GUESTS')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:border-[#22C55E] transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-[#22C55E]" />
                <span>COMPARTIR POR WHATSAPP</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
          {step > 1 && step < 5 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:brightness-110 transition-all ml-auto"
            >
              <span>{step === 4 ? 'Publicar Evento' : 'Siguiente Paso'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 5 && (
            <button
              onClick={() => setActiveView('DASHBOARD')}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors ml-auto"
            >
              Ir al Dashboard
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
