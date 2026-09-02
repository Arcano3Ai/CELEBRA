import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  src = './assets/musica/todo-en-su-lugar.mp3',
  autoPlay = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isExpanded, setIsExpanded] = useState(true);
  const [needsUserTouch, setNeedsUserTouch] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const interactionUnlockedRef = useRef<boolean>(false);

  // Intentar reproducir de forma segura
  const safePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = volume;
    } catch {}

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsUserTouch(false);
        })
        .catch((err) => {
          // Si el navegador móvil restringe el autoplay sin gesto previo
          console.warn('Autoplay retenido por el navegador hasta primer toque:', err?.name);
          setIsPlaying(false);
          setNeedsUserTouch(true);
        });
    }
  }, [volume]);

  // Manejo de interacción inicial y autoplay
  useEffect(() => {
    if (autoPlay) {
      safePlay();
    }

    // Desbloqueo al primer toque/gesto en la pantalla (sin duplicar llamadas)
    const unlockAndPlay = () => {
      if (interactionUnlockedRef.current) return;
      interactionUnlockedRef.current = true;

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setNeedsUserTouch(false);
          })
          .catch(() => {});
      }

      cleanupGlobalListeners();
    };

    const cleanupGlobalListeners = () => {
      window.removeEventListener('pointerdown', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('scroll', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
    };

    window.addEventListener('pointerdown', unlockAndPlay, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAndPlay, { once: true, passive: true });
    window.addEventListener('click', unlockAndPlay, { once: true });
    window.addEventListener('scroll', unlockAndPlay, { once: true, passive: true });
    window.addEventListener('keydown', unlockAndPlay, { once: true });

    return () => {
      cleanupGlobalListeners();
    };
  }, [autoPlay, safePlay]);

  // Alternar Play/Pausa de forma atómica (sin dobles disparos en móviles)
  const togglePlay = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const audio = audioRef.current;
    if (!audio) return;

    interactionUnlockedRef.current = true;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      safePlay();
    }
  };

  const toggleMute = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    const nextMute = !isMuted;
    audio.muted = nextMute;
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.volume = newVol;
      } catch {}
      if (newVol === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <aside 
      aria-label="Reproductor de audio ambiental oficial"
      className={`fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 select-none max-w-[calc(100vw-1.5rem)] ${className}`}
    >
      {/* Elemento de audio con src directo y fallback en sources */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="./assets/musica/todo-en-su-lugar.mp3" type="audio/mpeg" />
        <source src="/assets/musica/todo-en-su-lugar.mp3" type="audio/mpeg" />
        <source src="./assets/musica/Todo En Su Lugar.wav" type="audio/wav" />
      </audio>

      {/* Sugerencia táctil cuando el navegador móvil requiere primer toque */}
      {needsUserTouch && !isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="mb-2 w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00F0FF]/30 via-[#D946EF]/30 to-[#F59E0B]/30 border border-[#00F0FF]/60 text-white text-xs font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-xl flex items-center justify-center sm:justify-start gap-2 cursor-pointer active:scale-95 transition-transform animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-[#00F0FF] shrink-0" />
          <span className="text-[11px] sm:text-xs">🎵 Toca aquí para encender la música</span>
        </button>
      )}

      {/* Dock de Control de Audio de Lujo */}
      <div 
        className={`relative rounded-3xl transition-all duration-300 border bg-[#060913]/95 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.85)] ${
          isPlaying 
            ? 'border-[#00F0FF]/60 shadow-[0_0_30px_rgba(0,240,255,0.3)]' 
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Glow dinámico animado al estar reproduciendo */}
        {isPlaying && (
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#00F0FF]/30 via-[#D946EF]/25 to-[#F59E0B]/30 blur-sm pointer-events-none -z-10 animate-pulse" />
        )}

        <div className="p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3">
          
          {/* Botón táctil unificado (48x48px) — sin rebotes ni dobles disparos en móviles */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar música oficial' : 'Reproducir música oficial'}
            className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer active:scale-90 touch-manipulation ${
              isPlaying
                ? 'bg-gradient-to-tr from-[#00F0FF] to-[#D946EF] text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700'
            }`}
            title={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? (
              <Disc3 className="w-6 h-6 text-slate-950 animate-spin [animation-duration:3s]" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 text-[#00F0FF] fill-[#00F0FF]" />
            )}
          </button>

          {/* Información y Ecualizador Dinámico */}
          {isExpanded && (
            <div className="flex flex-col pr-1 min-w-[130px] sm:min-w-[155px] max-w-[175px] sm:max-w-[210px]">
              <div className="flex items-center justify-between gap-1.5">
                <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#00F0FF]">
                  <Music className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>CELEBRA VIBE</span>
                </div>
                {/* Ecualizador animado */}
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-2.5 px-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-[#00F0FF] rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                    <span className="w-0.5 bg-[#D946EF] rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                    <span className="w-0.5 bg-[#F59E0B] rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                    <span className="w-0.5 bg-[#00F0FF] rounded-full animate-[bounce_0.8s_infinite_400ms] h-1/2" />
                  </div>
                )}
              </div>

              <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                Todo En Su Lugar
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 truncate">
                {isPlaying ? 'Divertifiesta Oficial' : 'Toca para escuchar'}
              </span>

              {/* Botón Silenciar y Slider de volumen */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 -ml-1 text-slate-400 hover:text-white transition-colors cursor-pointer touch-manipulation"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? (
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
                  aria-label="Volumen de música"
                  className="hidden sm:block w-16 sm:w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
                />
              </div>
            </div>
          )}

          {/* Botón Minimizar / Expandir */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 touch-manipulation"
            title={isExpanded ? 'Minimizar reproductor' : 'Expandir controles'}
            aria-label={isExpanded ? 'Minimizar reproductor' : 'Expandir controles'}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>

        </div>
      </div>
    </aside>
  );
};
