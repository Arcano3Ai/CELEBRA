import React from 'react';
import { useEvent } from '../../context/EventContext';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Database, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const { event, guests } = useEvent();

  const platformStats = [
    { label: 'Usuarios Registrados', val: '4,892', change: '+18% este mes', icon: Users, color: '#00F0FF' },
    { label: 'Eventos Creados', val: '1,420', change: '+24% este mes', icon: Calendar, color: '#D946EF' },
    { label: 'Invitados Gestionados', val: '184,320', change: '+32% este mes', icon: Sparkles, color: '#F59E0B' },
    { label: 'Ingresos MRR', val: '$684,500 MXN', change: '+15.4% este mes', icon: DollarSign, color: '#10B981' },
    { label: 'Suscripciones Pro/VIP', val: '864', change: '84% retención', icon: Layers, color: '#8B5CF6' },
    { label: 'Check-ins en Puerta', val: '98.9%', change: 'Sin caídas de red', icon: Activity, color: '#EC4899' }
  ];

  const recentEvents = [
    { title: 'Boda Carlos & Sofía', host: 'Sofía Villarreal', plan: 'PRO ($799)', guests: 150, status: 'ACTIVO', revenue: '$799 MXN' },
    { title: 'XV Años Valentina', host: 'Familia Morales', plan: 'VIP ($1,999)', guests: 300, status: 'ACTIVO', revenue: '$1,999 MXN' },
    { title: 'Gala Anual Arcano Solutions', host: 'Arcano Corp', plan: 'VIP ($1,999)', guests: 500, status: 'ACTIVO', revenue: '$1,999 MXN' },
    { title: 'Bautizo Mateo', host: 'Lucía Peña', plan: 'STAFF QR ($399)', guests: 45, status: 'ACTIVO', revenue: '$399 MXN' },
    { title: 'Cumpleaños Diego (Rock Party)', host: 'Diego Torres', plan: 'PRO ($799)', guests: 120, status: 'FINALIZADO', revenue: '$799 MXN' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Super Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-[#D946EF]/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D946EF]/20 text-[#D946EF] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>GLOBAL SUPER ADMIN CELEBRA</span>
          </div>
          <h1 className="text-3xl font-black font-display text-white">
            Panel de Control Global &amp; SaaS Health
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Supervisión integral de infraestructura, métricas financieras y actividad de anfitriones en México y LatAm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-400 font-bold">API / DB ONLINE (99.98%)</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-6 rounded-3xl glass-panel border border-[#1E2952] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{item.val}</div>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{item.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Events Table */}
      <div className="rounded-3xl glass-panel border border-[#1E2952] overflow-hidden shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00F0FF]" />
            <span>Eventos Recientes en la Red CELEBRA</span>
          </h2>
          <span className="text-xs text-slate-400">Mostrando últimos 5</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Evento</th>
                <th className="py-3 px-4">Anfitrión</th>
                <th className="py-3 px-4">Plan SaaS</th>
                <th className="py-3 px-4">Aforo</th>
                <th className="py-3 px-4">Ingreso</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentEvents.map((evt, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{evt.title}</td>
                  <td className="py-3.5 px-4 text-slate-300">{evt.host}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-[#00F0FF]">
                      {evt.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{evt.guests} inv.</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{evt.revenue}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
