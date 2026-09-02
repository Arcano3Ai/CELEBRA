import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti } from '../common/ConfettiTrigger';
import { 
  QrCode, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Users, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  UserCheck, 
  Volume2
} from 'lucide-react';
import { Guest } from '../../types';

export const StaffCheckIn: React.FC = () => {
  const { event, guests, performCheckIn } = useEvent();
  
  const [tokenInput, setTokenInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'IDLE' | 'SUCCESS' | 'ALREADY_CHECKED' | 'INVALID';
    message: string;
    guest?: Guest;
  }>({ status: 'IDLE', message: '' });

  const [staffName, setStaffName] = useState('Staff Puerta Principal');

  // Play audio chime
  const playSound = (type: 'success' | 'warning' | 'error') => {
    try {
      if (type === 'success') {
        const audio = new Audio('/assets/music/checkin-success.wav');
        audio.play().catch(() => {});
      }
    } catch (e) {
      console.warn('Audio not playable', e);
    }
  };

  const handleScanToken = (tokenToProcess: string) => {
    const res = performCheckIn(tokenToProcess, staffName);

    if (res.success && res.guest) {
      playSound('success');
      triggerCelebrationConfetti();
      setScanResult({
        status: 'SUCCESS',
        message: res.message,
        guest: res.guest
      });
    } else if (res.alreadyCheckedIn && res.guest) {
      playSound('warning');
      setScanResult({
        status: 'ALREADY_CHECKED',
        message: res.message,
        guest: res.guest
      });
    } else {
      playSound('error');
      setScanResult({
        status: 'INVALID',
        message: res.message
      });
    }

    setTokenInput('');
  };

  const checkedInCount = guests.filter(g => g.status === 'INGRESADO').length;
  const filteredGuests = searchQuery
    ? guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.qrToken.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      
      {/* Staff Header Badge */}
      <div className="p-4 rounded-3xl glass-panel-glow border border-[#00F0FF]/40 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] text-[11px] font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MODO STAFF — CONTROL DE ACCESO</span>
        </div>
        <h1 className="text-xl font-black text-white">{event.title.split('—')[0]}</h1>
        <p className="text-xs text-slate-400">
          Personal: <span className="text-white font-semibold">{staffName}</span>
        </p>

        {/* Live Door Counter */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-around text-xs">
          <div>
            <span className="block text-2xl font-black text-[#00F0FF]">{checkedInCount}</span>
            <span className="text-[10px] text-slate-400 uppercase">Ingresados</span>
          </div>
          <div className="w-[1px] h-8 bg-slate-800" />
          <div>
            <span className="block text-2xl font-black text-slate-200">{guests.length}</span>
            <span className="text-[10px] text-slate-400 uppercase">En Lista</span>
          </div>
        </div>
      </div>

      {/* Main Scanner Big Button (Ergonomic Smartphone Action) */}
      <div className="space-y-4">
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col items-center text-center space-y-4">
          
          <div className="relative w-44 h-44 rounded-2xl bg-black/60 border-2 border-dashed border-[#00F0FF]/60 flex items-center justify-center p-4 group overflow-hidden">
            {/* Animated Laser Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-[bounce_2.5s_infinite] shadow-[0_0_15px_#00F0FF]" />
            
            <QrCode className="w-20 h-20 text-[#00F0FF]/40 group-hover:text-[#00F0FF] transition-colors" />

            <div className="absolute bottom-2 inset-x-0 text-[10px] text-slate-400 font-mono">
              CÁMARA LISTA
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Apunta la cámara al pasaporte digital del invitado o simula un escaneo rápido:
          </p>

          {/* Quick Simulation Buttons */}
          <div className="w-full space-y-2">
            <button
              onClick={() => handleScanToken('CEL-VIP-8841-A')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>📷 ESCANEAR QR (SIMULAR)</span>
            </button>
            <span className="text-[10px] text-slate-500 block">
              Prueba con token VIP, Familia o Amigos
            </span>
          </div>

        </div>
      </div>

      {/* Real-time Scan Result Card */}
      {scanResult.status !== 'IDLE' && (
        <div className={`p-6 rounded-3xl border shadow-2xl transition-all ${
          scanResult.status === 'SUCCESS'
            ? 'bg-emerald-950/70 border-emerald-500 text-white'
            : scanResult.status === 'ALREADY_CHECKED'
            ? 'bg-amber-950/70 border-amber-500 text-white'
            : 'bg-rose-950/70 border-rose-500 text-white'
        }`}>
          
          <div className="flex items-center gap-3 mb-3">
            {scanResult.status === 'SUCCESS' && (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 animate-bounce" />
            )}
            {scanResult.status === 'ALREADY_CHECKED' && (
              <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 animate-pulse" />
            )}
            {scanResult.status === 'INVALID' && (
              <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
            )}

            <div>
              <h3 className="text-base font-black uppercase tracking-wider">
                {scanResult.status === 'SUCCESS' && '✓ ACCESO AUTORIZADO'}
                {scanResult.status === 'ALREADY_CHECKED' && '⚠️ INVITADO YA REGISTRADO'}
                {scanResult.status === 'INVALID' && '❌ CÓDIGO NO VÁLIDO'}
              </h3>
              <p className="text-xs text-slate-200 mt-0.5">{scanResult.message}</p>
            </div>
          </div>

          {scanResult.guest && (
            <div className="mt-3 pt-3 border-t border-white/15 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Invitado:</span>
                <span className="font-bold text-white">{scanResult.guest.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Grupo / Mesa:</span>
                <span className="font-bold text-amber-300">{scanResult.guest.group} ({scanResult.guest.notes || 'General'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Acompañantes permitidos:</span>
                <span className="font-bold text-[#00F0FF]">+{scanResult.guest.companionsCount} pases</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Hora de Registro:</span>
                <span className="font-mono text-slate-200">{scanResult.guest.checkedInAt || 'Ahora mismo'}</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setScanResult({ status: 'IDLE', message: '' })}
            className="w-full mt-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase transition-colors"
          >
            Listo para siguiente invitado
          </button>
        </div>
      )}

      {/* Manual Search & Fallback Section */}
      <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Búsqueda Manual de Emergencia</span>
        </h3>

        <div className="space-y-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o token..."
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
          />

          {filteredGuests.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto pt-2">
              {filteredGuests.map((g) => (
                <div
                  key={g.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{g.name}</p>
                    <span className="text-[10px] text-slate-400">{g.group} • Token: {g.qrToken}</span>
                  </div>
                  <button
                    onClick={() => handleScanToken(g.qrToken)}
                    className="px-2.5 py-1 rounded-lg bg-[#00F0FF]/20 hover:bg-[#00F0FF] hover:text-slate-950 text-[#00F0FF] text-[11px] font-bold transition-colors"
                  >
                    Dar Entrada
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
