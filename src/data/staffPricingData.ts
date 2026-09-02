export interface StaffMember {
  id: string;
  name: string;
  role: 'CONTROL_QR' | 'RECEPCION' | 'COORDINADOR' | 'ARTISTA_SHOW' | 'SEGURIDAD';
  roleLabel: string;
  avatar: string;
  rating: number;
  eventsCompleted: number;
  phone: string;
  status: 'DISPONIBLE' | 'ASIGNADO' | 'EN_TURNO';
  assignedDoor?: string;
  specialty: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  amount: number;
  currency: string;
  period: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  staffIncluded: string;
  features: string[];
  cta: string;
  accentColor: string;
  gradient: string;
}

export const STAFF_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-399',
    name: 'STAFF ACCESO QR',
    price: '$399',
    amount: 399,
    currency: 'MXN',
    period: 'por evento',
    tagline: 'Ideal para fiestas privadas, cumpleaños y bautizos con control de puerta.',
    staffIncluded: '1 Elemento de Staff de Acceso QR',
    features: [
      '1 Elemento de Staff capacitado en puerta',
      'Escáner móvil con smartphone / tablet',
      'Validación de pases QR en menos de 1 segundo',
      'Protección anti-duplicados y colados',
      'Hasta 100 invitados gestionados',
      'Reporte de accesos al finalizar el evento'
    ],
    cta: 'Contratar Staff $399',
    accentColor: '#00F0FF',
    gradient: 'from-[#00F0FF]/20 via-[#0B1126] to-[#060913]'
  },
  {
    id: 'plan-799',
    name: 'STAFF PUERTA PRO & ASISTENCIA',
    price: '$799',
    amount: 799,
    currency: 'MXN',
    period: 'por evento',
    badge: 'MÁS SOLICITADO',
    popular: true,
    tagline: 'Para bodas, graduaciones y XV años con alta afluencia y múltiples accesos.',
    staffIncluded: '2 Elementos de Staff dedicados',
    features: [
      '2 Elementos de Staff con credencial CELEBRA',
      'Control simultáneo en puerta principal y secundaria',
      'Registro de acompañantes en tiempo real',
      'Sincronización directa a WhatsApp del anfitrión',
      'Aforo en vivo y control de mesas / zonas VIP',
      'Hasta 400 invitados gestionados',
      'Soporte técnico directo durante la recepción'
    ],
    cta: 'Elegir Plan Pro $799',
    accentColor: '#D946EF',
    gradient: 'from-[#D946EF]/25 via-[#0B1126] to-[#060913]'
  },
  {
    id: 'plan-1999',
    name: 'STAFF VIP & COORDINACIÓN TOTAL',
    price: '$1,999',
    amount: 1999,
    currency: 'MXN',
    period: 'servicio completo',
    badge: 'EXPERIENCIA PREMIUM',
    tagline: 'Cobertura integral de gala con coordinador de logística, show y recepción VIP.',
    staffIncluded: 'Equipo Completo (3+ Staff + Coordinador)',
    features: [
      'Equipo completo de Staff (Recepción + Coordinador de tiempos)',
      '1 Coordinador logístico para protocolo e itinerario',
      '2 Operadores de acceso QR con bienvenida personalizada',
      'Opción a performance/show de gala (Fuego o Malabares luminosos)',
      'Invitados ilimitados y eventos masivos',
      'Panel de métricas ejecutivas en tiempo real',
      'Soporte prioritario 24/7 y asistencia presencial'
    ],
    cta: 'Contratar Todo VIP $1,999',
    accentColor: '#F59E0B',
    gradient: 'from-[#F59E0B]/25 via-[#0B1126] to-[#060913]'
  }
];

export const STAFF_DIRECTORY: StaffMember[] = [
  {
    id: 'staff-01',
    name: 'Rodrigo Morales',
    role: 'COORDINADOR',
    roleLabel: 'Coordinador General de Eventos',
    avatar: '/assets/images/staff/staff-2.svg',
    rating: 4.9,
    eventsCompleted: 142,
    phone: '+52 55 1234 5678',
    status: 'ASIGNADO',
    assignedDoor: 'Acceso Principal & Protocolo',
    specialty: 'Logística de Bodas, Gala e Itinerarios'
  },
  {
    id: 'staff-02',
    name: 'Valeria Mendoza',
    role: 'CONTROL_QR',
    roleLabel: 'Operadora de Escáner QR & Recepción',
    avatar: '/assets/images/staff/staff-1.svg',
    rating: 5.0,
    eventsCompleted: 98,
    phone: '+52 55 8765 4321',
    status: 'EN_TURNO',
    assignedDoor: 'Puerta Norte — Pases VIP',
    specialty: 'Validación Rápida & Registro de Familias'
  },
  {
    id: 'staff-03',
    name: 'Dante "Ignis" Reyes',
    role: 'ARTISTA_SHOW',
    roleLabel: 'Performer de Gala & Fuego',
    avatar: '/assets/images/staff/staff-artista-fuego.jpg',
    rating: 5.0,
    eventsCompleted: 165,
    phone: '+52 55 4567 8901',
    status: 'DISPONIBLE',
    specialty: 'Show con Fuego Veneciano & Luces Neón'
  },
  {
    id: 'staff-04',
    name: 'Alexis Cruz',
    role: 'ARTISTA_SHOW',
    roleLabel: 'Malabarista Luminoso & Animador',
    avatar: '/assets/images/staff/staff-malabares-show.jpg',
    rating: 4.8,
    eventsCompleted: 110,
    phone: '+52 55 9876 5432',
    status: 'DISPONIBLE',
    specialty: 'Malabares LED & Dinámicas de Entrada'
  }
];

export const STAFF_MEDIA_CONFIG = {
  videoDemoUrl: '/assets/video/ANIMALAEPICA_202609011716.mp4',
  audioTrackUrl: '/assets/musica/Todo En Su Lugar.wav',
  fireShowImage: '/assets/images/fire-performer-luxury.jpg',
  jugglerShowImage: '/assets/images/juggler-gala-show.jpg',
  brandLogo: '/assets/logo/divertifiesta-codex.png'
};
