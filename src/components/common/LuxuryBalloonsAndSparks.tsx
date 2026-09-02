import React from 'react';

export const LuxuryBalloonsAndSparks: React.FC = () => {
  // Floating luxury balloons with chrome finish and soft swaying animations
  const balloons = [
    { color: '#00F0FF', left: '5%', size: 'w-14 h-18', delay: '0s', duration: '14s' },
    { color: '#D946EF', left: '15%', size: 'w-16 h-20', delay: '3s', duration: '18s' },
    { color: '#F59E0B', left: '25%', size: 'w-12 h-16', delay: '1s', duration: '16s' },
    { color: '#7928CA', left: '75%', size: 'w-16 h-22', delay: '4s', duration: '15s' },
    { color: '#00F0FF', left: '85%', size: 'w-12 h-16', delay: '2s', duration: '19s' },
    { color: '#EC4899', left: '92%', size: 'w-14 h-18', delay: '5s', duration: '17s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {/* Chrome Floating Balloons */}
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute -bottom-24 animate-[floatUp_linear_infinite]"
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        >
          {/* Balloon shape with metallic specular highlight */}
          <div className="relative group">
            <svg viewBox="0 0 100 130" className="w-12 h-16 sm:w-16 sm:h-20 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <defs>
                <radialGradient id={`balloonShine-${i}`} cx="35%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="25%" stopColor={b.color} stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#0B1126" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                </radialGradient>
              </defs>
              {/* Balloon Body */}
              <ellipse cx="50" cy="55" rx="42" ry="50" fill={`url(#balloonShine-${i})`} />
              {/* Specular Glint */}
              <ellipse cx="32" cy="35" rx="10" ry="16" fill="#FFFFFF" opacity="0.6" transform="rotate(-25 32 35)" />
              {/* Knot */}
              <polygon points="46,105 54,105 50,112" fill={b.color} />
              {/* Ribbon line */}
              <path
                d="M50,112 Q45,120 52,125 Q48,132 50,140"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      ))}

      {/* Floating Gold Fire Sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
    </div>
  );
};
