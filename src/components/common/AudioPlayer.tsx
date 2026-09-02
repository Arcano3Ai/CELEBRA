import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Music, 
  Sparkles, 
  ChevronUp, 
  ChevronDown,
  Disc3
} from 'lucide-react';

interface AudioPlayerProps {
  src?: string;
  autoPlay?: boolean;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src = '/assets/musica/Todo En Su Lugar.wav',
  autoPlay = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isExpanded, setIsExpanded] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar volumen y reproducción automática
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (autoPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            // El navegador bloqueó el autoplay sin gesto previo del usuario
            setIsPlaying(false);
            setAutoplayBlocked(true);
          });
      }
    }

    // Listener global: cualquier clic o toque en la pantalla inicia la música automáticamente
    const handleFirstUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {});
      }
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };

    window.addEventListener('pointerdown', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, [autoPlay, src]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          console.warn('No se pudo reproducir el audio:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol === 0) {
        audioRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 select-none ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Notificación sutil si el navegador bloqueó el autoplay */}
      {autoplayBlocked && !isPlaying && (
        <div 
          onClick={togglePlay}
          className="mb-2.5 px-3.5 py-2 rounded-2xl bg-[#0B1126]/95 border border-[#00F0FF]/50 text-white text-xs font-semibold shadow-[0_0_25px_rgba(0,240,255,0.3)] backdrop-blur-xl flex items-center gap-2 cursor-pointer hover:border-[#D946EF] transition-all animate-bounce"
        >
          <Sparkles className="w-4 h-4 text-[#00F0FF] animate-pulse" />
          <span>🎵 Haz clic aquí para activar la música de fiesta</span>
        </div>
      )}

      {/* Control Bonito — Glassmorphism Luxury Music Dock */}
      <div 
        className={`relative rounded-3xl transition-all duration-300 border bg-[#060913]/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] ${
          isPlaying 
            ? 'border-[#00F0FF]/50 shadow-[0_0_35px_rgba(0,240,255,0.25)]' 
            : 'border-[#1E2952] hover:border-slate-600'
        }`}
      >
        {/* Glow ambient pulse */}
        {isPlaying && (
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#00F0FF]/30 via-[#D946EF]/20 to-[#F59E0B]/30 blur-sm pointer-events-none -z-10 animate-pulse" />
        )}

        <div className="p-2.5 flex items-center gap-3">
          
          {/* Botón Principal Play / Pause con Disco Giratorio */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-tr from-[#00F0FF] to-[#D946EF] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-105'
                : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700'
            }`}
            title={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? (
              <div className="relative flex items-center justify-center">
                <Disc3 className="w-6 h-6 text-slate-950 animate-spin [animation-duration:3s]" />
              </div>
            ) : (
              <Play className="w-5 h-5 ml-0.5 text-[#00F0FF] fill-[#00F0FF] group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Información y Ecualizador */}
          {isExpanded && (
            <div className="flex flex-col pr-1 min-w-[140px] max-w-[200px]">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#00F0FF]">
                  <Music className="w-3 h-3" />
                  <span>CELEBRA VIBE</span>
                </div>
                {/* Ecualizador animado */}
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-3 px-1">
                    <span className="w-0.5 bg-[#00F0FF] rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                    <span className="w-0.5 bg-[#D946EF] rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                    <span className="w-0.5 bg-[#F59E0B] rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                    <span className="w-0.5 bg-[#00F0FF] rounded-full animate-[bounce_0.8s_infinite_400ms] h-1/2" />
                  </div>
                )}
              </div>

              <span className="text-xs font-bold text-white truncate">
                Todo En Su Lugar
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {isPlaying ? 'Divertifiesta Oficial' : 'Pausado • Toca Play'}
              </span>

              {/* Slider de volumen interactivo */}
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Control de volumen"
                  className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
                />
              </div>
            </div>
          )}

          {/* Botón Minimizar / Expandir */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title={isExpanded ? 'Minimizar reproductor' : 'Expandir controles'}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
