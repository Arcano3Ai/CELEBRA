import React, { useState } from 'react';
import { Download, Copy, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface QRCodeViewProps {
  token: string;
  guestName: string;
  groupName?: string;
  size?: number;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  token,
  guestName,
  groupName = 'Invitado General',
  size = 220
}) => {
  const [copied, setCopied] = useState(false);

  // Generate deterministic SVG visual representation of QR code with encryption/security aesthetic
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pseudo-random deterministic grid based on token hash
  const getCellFill = (r: number, c: number) => {
    // Corner anchor targets
    const isTopLeft = (r < 7 && c < 7);
    const isTopRight = (r < 7 && c >= 14);
    const isBottomLeft = (r >= 14 && c < 7);

    if (isTopLeft) {
      if (r === 0 || r === 6 || c === 0 || c === 6) return true;
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    if (isTopRight) {
      if (r === 0 || r === 6 || c === 14 || c === 20) return true;
      if (r >= 2 && r <= 4 && c >= 16 && c <= 18) return true;
      return false;
    }
    if (isBottomLeft) {
      if (r === 14 || r === 20 || c === 0 || c === 6) return true;
      if (r >= 16 && r <= 18 && c >= 2 && c <= 4) return true;
      return false;
    }

    // Hash pseudo generator based on char codes
    const hash = (r * 31 + c * 17 + token.charCodeAt(r % token.length) * 7) % 100;
    return hash > 45;
  };

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl glass-panel border border-[#00F0FF]/30 shadow-2xl relative overflow-hidden group">
      {/* Background festive glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00F0FF]/15 rounded-full blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#D946EF]/15 rounded-full blur-2xl" />

      {/* Header Badge */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-semibold mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>PASAPORTE DIGITAL CELEBRA</span>
      </div>

      <p className="text-sm font-medium text-slate-300 mb-1 text-center">{guestName}</p>
      <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md mb-4 uppercase tracking-wider">
        {groupName}
      </span>

      {/* QR Visual Box */}
      <div className="p-4 bg-white rounded-xl shadow-xl flex flex-col items-center relative">
        <svg width={size} height={size} viewBox="0 0 210 210" className="shape-rendering-crispEdges">
          {Array.from({ length: 21 }).map((_, r) =>
            Array.from({ length: 21 }).map((_, c) => {
              const filled = getCellFill(r, c);
              if (!filled) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * 10}
                  y={r * 10}
                  width="10"
                  height="10"
                  fill="#060913"
                />
              );
            })
          )}
        </svg>

        {/* Center CELEBRA emblem badge on QR */}
        <div className="absolute inset-0 m-auto w-10 h-10 bg-[#060913] rounded-lg border border-[#F59E0B] flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        </div>
      </div>

      {/* Token Code and Actions */}
      <div className="mt-4 flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/60 font-mono text-xs text-slate-200">
          <span className="text-[#00F0FF] font-bold">TOKEN:</span>
          <span>{token}</span>
          <button
            onClick={handleCopy}
            className="p-1 hover:text-white transition-colors ml-1 text-slate-400"
            title="Copiar token criptográfico"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar Pase
          </button>
        </div>
      </div>
    </div>
  );
};
