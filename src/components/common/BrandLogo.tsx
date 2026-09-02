import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const titleSizes = {
    sm: 'text-lg tracking-[0.2em]',
    md: 'text-2xl tracking-[0.25em]',
    lg: 'text-3xl tracking-[0.3em]',
    xl: 'text-5xl tracking-[0.35em]'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]'
  };

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      {/* Stylized Interlocking C Icon with Glow */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Glow halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/30 via-[#D946EF]/20 to-[#F59E0B]/30 rounded-full blur-md group-hover:scale-125 transition-transform duration-500" />
        
        {/* SVG Emblem matching official brand image */}
        <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-[0_2px_12px_rgba(0,240,255,0.4)]">
          <defs>
            <linearGradient id="cMetallicMini" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B"/>
              <stop offset="50%" stopColor="#0F172A"/>
              <stop offset="100%" stopColor="#334155"/>
            </linearGradient>
            <linearGradient id="goldMini" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB"/>
              <stop offset="50%" stopColor="#FCD34D"/>
              <stop offset="100%" stopColor="#F59E0B"/>
            </linearGradient>
            <linearGradient id="borderMini" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF"/>
              <stop offset="50%" stopColor="#D946EF"/>
              <stop offset="100%" stopColor="#F59E0B"/>
            </linearGradient>
          </defs>

          {/* Intertwined Ribbon C */}
          <path
            d="M75,28 C68,18 56,15 44,19 C28,24 20,40 22,56 C24,72 36,83 52,85 C67,86 78,76 81,63 C82,60 79,57 76,57 C73,57 71,59 70,61 C66,72 56,79 45,77 C32,75 25,64 25,52 C24,40 31,27 44,23 C53,20 62,23 68,31 C70,33 73,33 75,31 C77,29 77,26 75,28 Z"
            fill="url(#cMetallicMini)"
            stroke="url(#borderMini)"
            strokeWidth="2.5"
          />
          {/* Inner Golden Line */}
          <path
            d="M68,34 C62,26 52,24 44,27 C32,31 27,42 28,54 C30,65 37,73 49,74 C59,75 67,68 70,59"
            fill="none"
            stroke="url(#goldMini)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Main 4-point golden star */}
          <g transform="translate(54, 48)">
            <path
              d="M0,-14 Q1.5,-4 12,0 Q1.5,4 0,14 Q-1.5,4 -12,0 Q-1.5,-4 0,-14 Z"
              fill="url(#goldMini)"
            />
            <circle cx="0" cy="0" r="1.8" fill="#FFFFFF"/>
          </g>
          {/* Secondary sparkles */}
          <circle cx="72" cy="42" r="1.8" fill="#00F0FF"/>
          <circle cx="76" cy="52" r="1.2" fill="#D946EF"/>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-black font-display text-white tracking-[0.25em] ${titleSizes[size]} drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
            CELEBRA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping opacity-75" />
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-3 bg-gradient-to-r from-transparent to-[#D946EF]" />
            <span className={`font-bold font-display uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#E879F9] to-[#F59E0B] ${subtitleSizes[size]}`}>
              Invitaciones Digitales
            </span>
            <span className="h-[1px] w-3 bg-gradient-to-l from-transparent to-[#F59E0B]" />
          </div>
        )}
      </div>
    </div>
  );
};
