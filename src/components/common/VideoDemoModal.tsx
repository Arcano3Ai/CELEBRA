import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Film, Sparkles, Flame, QrCode, Check } from 'lucide-react';
import { triggerCelebrationConfetti } from './ConfettiTrigger';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeClip, setActiveClip] = useState<'SAVE_THE_DATE' | 'STAFF_QR' | 'SHOWS_LUJO'>('SAVE_THE_DATE');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const clips = [
    {
      id: 'SAVE_THE_DATE',
      title: 'Video-Invitación Save The Date',
      category: 'Experiencia Digital',
      icon: Film,
      desc: 'Cinematografía de presentación para enviar por WhatsApp a los invitados.',
      poster: '/assets/images/juggler-gala-show.jpg',
      badge: 'BODAS & XV'
    },
    {
      id: 'STAFF_QR',
      title: 'Escaneo y Control QR Staff',
      category: 'Tecnología en Puerta',
      icon: QrCode,
      desc: 'Validación en milisegundos con smartphone para evitar duplicados o colados.',
      poster: '/assets/images/fire-performer-luxury.jpg',
      badge: 'CHECK-IN'
    },
    {
      id: 'SHOWS_LUJO',
      title: 'Shows de Fuego & Malabaristas',
      category: 'Entretenimiento VIP',
      icon: Flame,
      desc: 'Atmósfera festiva con avienta fuegos venecianos y malabares luminosos.',
      poster: '/assets/images/fire-performer-luxury.jpg',
      badge: 'FIESTA VIBE'
    }
  ];

  const current = clips.find(c => c.id === activeClip)!;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#0B1126] border border-[#00F0FF]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#060913]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-widest">
                SALA DE DEMOS CELEBRA
              </span>
              <h3 className="text-sm sm:text-base font-black text-white">{current.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas / Player Simulation con Video Real de Assets */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <video
            src="/assets/video/ANIMALAEPICA_202609011716.mp4"
            poster={current.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00F0FF]/40 text-white text-[11px] font-bold z-10">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[#00F0FF]">{current.badge}</span>
            <span className="text-slate-300">• {current.title}</span>
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-3 inset-x-4 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:text-[#00F0FF] text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-[#00F0FF] text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00F0FF]" />}
              </button>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Clip: {current.title}
              </span>
            </div>

            {/* Fake progress bar */}
            <div className="flex-1 max-w-xs h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-2/5 h-full bg-gradient-to-r from-[#00F0FF] to-[#D946EF] animate-pulse" />
            </div>

            <button
              onClick={() => triggerCelebrationConfetti()}
              className="px-2.5 py-1 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] font-bold text-[10px] hover:bg-[#F59E0B]/30 transition-colors"
            >
              🎉 Confeti
            </button>
          </div>
        </div>

        {/* Clip Selector Tabs */}
        <div className="p-4 sm:p-5 bg-[#060913] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-400">Seleccionar Clip de Demostración:</span>

          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            {clips.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveClip(c.id as any);
                  setIsPlaying(true);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeClip === c.id
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {c.badge}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
