import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { triggerCelebrationConfetti } from '../common/ConfettiTrigger';
import { QRCodeView } from '../common/QRCodeView';
import { 
  Users, 
  Search, 
  Filter, 
  Share2, 
  Plus, 
  Download, 
  QrCode, 
  Trash2, 
  Check, 
  Copy, 
  Send, 
  MessageCircle, 
  ExternalLink,
  Phone,
  CheckCircle2,
  Clock,
  UserX,
  Sparkles
} from 'lucide-react';
import { Guest, GuestStatus } from '../../types';

export const GuestManager: React.FC = () => {
  const { event, guests, addGuest, updateGuestStatus } = useEvent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuestForQr, setSelectedGuestForQr] = useState<Guest | null>(null);
  const [whatsappModalGuest, setWhatsappModalGuest] = useState<Guest | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // New Guest Form
  const [newGuest, setNewGuest] = useState({
    name: '',
    phone: '',
    group: 'Familia',
    companionsAllowed: 2,
    notes: ''
  });

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;

    addGuest({
      name: newGuest.name,
      phone: newGuest.phone || '+52 55 0000 0000',
      group: newGuest.group,
      companionsAllowed: newGuest.companionsAllowed,
      companionsCount: 0,
      status: 'PENDIENTE',
      notes: newGuest.notes
    });

    setNewGuest({ name: '', phone: '', group: 'Familia', companionsAllowed: 2, notes: '' });
    setIsAddModalOpen(false);
    triggerCelebrationConfetti();
  };

  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.phone.includes(searchQuery) || 
                          g.qrToken.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'ALL' || g.group === selectedGroup;
    const matchesStatus = selectedStatus === 'ALL' || g.status === selectedStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const getWhatsappMessage = (guest: Guest) => {
    const link = `https://celebra.app/e/${event.slug}/i/${guest.qrToken.slice(-6)}`;
    return `Hola ${guest.name} 👋\n\nTenemos el gusto de invitarte a nuestro evento:\n*${event.title}*\n\nConsulta todos los detalles, ubicación, mesa de regalos y confirma tu asistencia aquí:\n${link}\n\n¡Te esperamos para CELEBRAR! 🎉✨`;
  };

  const openWhatsAppDirect = (guest: Guest) => {
    const text = encodeURIComponent(getWhatsappMessage(guest));
    const phoneClean = guest.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean}?text=${text}`, '_blank');
  };

  const copyGuestLink = (guest: Guest) => {
    const link = `https://celebra.app/e/${event.slug}/i/${guest.qrToken.slice(-6)}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">
            Gestión y Pases Digitales
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
            Lista de Invitados &amp; WhatsApp
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administra confirmaciones, emite pases QR y envía recordatorios directos por chat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Invitado</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl glass-panel border border-[#1E2952] flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, teléfono o token..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-[#00F0FF] focus:outline-none"
          />
        </div>

        {/* Group and Status Filter pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-[#00F0FF] focus:outline-none"
          >
            <option value="ALL">Todos los Grupos</option>
            <option value="VIP">VIP</option>
            <option value="Familia">Familia</option>
            <option value="Amigos">Amigos</option>
            <option value="Trabajo">Trabajo</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-[#00F0FF] focus:outline-none"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="CONFIRMADO">Confirmados</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="NO_ASISTIRA">No Asistirán</option>
            <option value="INGRESADO">En Salón (Ingresados)</option>
          </select>
        </div>

      </div>

      {/* Guest Table */}
      <div className="rounded-3xl glass-panel border border-[#1E2952] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#060913] border-b border-[#1E2952] text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">Invitado</th>
                <th className="py-3.5 px-4">Grupo / Mesa</th>
                <th className="py-3.5 px-4">Pases</th>
                <th className="py-3.5 px-4">Estado RSVP</th>
                <th className="py-3.5 px-4">Token QR</th>
                <th className="py-3.5 px-6 text-right">Acciones WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredGuests.map((g) => (
                <tr key={g.id} className="hover:bg-slate-800/40 transition-colors">
                  
                  {/* Name and Phone */}
                  <td className="py-4 px-6">
                    <p className="font-bold text-white text-sm">{g.name}</p>
                    <span className="text-[11px] text-slate-400 font-mono">{g.phone}</span>
                    {g.dietaryRestrictions && (
                      <span className="block text-[10px] text-amber-400">Restricción: {g.dietaryRestrictions}</span>
                    )}
                  </td>

                  {/* Group */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 font-bold text-slate-200 text-[11px]">
                      {g.group}
                    </span>
                  </td>

                  {/* Pases */}
                  <td className="py-4 px-4 font-semibold text-white">
                    {g.companionsAllowed} {g.companionsAllowed === 1 ? 'pase' : 'pases'}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider inline-flex items-center gap-1 ${
                      g.status === 'CONFIRMADO'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : g.status === 'INGRESADO'
                        ? 'bg-[#D946EF]/20 text-[#D946EF] border border-[#D946EF]/30'
                        : g.status === 'NO_ASISTIRA'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {g.status}
                    </span>
                  </td>

                  {/* QR Token */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedGuestForQr(g)}
                      className="flex items-center gap-1.5 font-mono text-[11px] text-[#00F0FF] hover:underline"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{g.qrToken}</span>
                    </button>
                  </td>

                  {/* Actions: WhatsApp */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openWhatsAppDirect(g)}
                        className="px-3 py-1.5 rounded-xl bg-[#22C55E]/20 hover:bg-[#22C55E] text-[#22C55E] hover:text-slate-950 font-bold text-[11px] flex items-center gap-1.5 transition-all"
                        title="Enviar invitación vía WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>

                      <button
                        onClick={() => copyGuestLink(g)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Copiar enlace individual del invitado"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Viewer Modal */}
      {selectedGuestForQr && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <button
              onClick={() => setSelectedGuestForQr(null)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold z-10 hover:bg-slate-700 shadow-lg"
            >
              ✕
            </button>
            <QRCodeView
              token={selectedGuestForQr.qrToken}
              guestName={selectedGuestForQr.name}
              groupName={`${selectedGuestForQr.group} • ${selectedGuestForQr.companionsAllowed} Pases`}
            />
          </div>
        </div>
      )}

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl glass-panel-glow border border-[#00F0FF]/40 space-y-4 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm"
            >
              ✕
            </button>

            <div>
              <h3 className="text-lg font-black text-white">Agregar Nuevo Invitado</h3>
              <p className="text-xs text-slate-400">Generará automáticamente su pase y token QR único.</p>
            </div>

            <form onSubmit={handleAddGuest} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Ej. Ing. Carlos Mendoza & Familia"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Teléfono (WhatsApp)</label>
                <input
                  type="text"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  placeholder="+52 55 1234 5678"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Grupo</label>
                  <select
                    value={newGuest.group}
                    onChange={(e) => setNewGuest({ ...newGuest, group: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                  >
                    <option value="Familia">Familia</option>
                    <option value="Amigos">Amigos</option>
                    <option value="VIP">VIP</option>
                    <option value="Trabajo">Trabajo</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Número de Pases</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newGuest.companionsAllowed}
                    onChange={(e) => setNewGuest({ ...newGuest, companionsAllowed: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Notas / Mesa (opcional)</label>
                <input
                  type="text"
                  value={newGuest.notes}
                  onChange={(e) => setNewGuest({ ...newGuest, notes: e.target.value })}
                  placeholder="Mesa 5, alérgico a nueces, etc."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#D946EF] text-slate-950 font-bold uppercase tracking-wider"
              >
                Crear Pase y Guardar
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
