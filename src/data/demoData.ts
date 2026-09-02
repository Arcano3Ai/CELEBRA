import { EventModel, Template, Guest } from '../types';

export const DEMO_TEMPLATES: Template[] = [
  {
    id: 'celebra-fire-cirque',
    name: 'CELEBRA Cirque, Fuego & Globos Gala',
    category: 'FIESTAS',
    categoryLabel: 'Shows & Fiestas VIP',
    theme: 'LUXURY',
    description: 'Espectacularidad de circo de lujo, avienta fuegos con trajes venecianos, malabaristas luminosos y racimos de globos metálicos.',
    previewGradient: 'from-[#1A0500] via-[#2E0B20] to-[#041D2D]',
    accentColor: '#F59E0B',
    fontFamily: 'Cinzel, serif'
  },
  {
    id: 'celebra-gold',
    name: 'CELEBRA Gold & Champagne',
    category: 'BODAS',
    categoryLabel: 'Bodas & Galas',
    theme: 'GOLD',
    description: 'Elegancia atemporal con bordes biselados en oro radiante, tipografía serif de alta costura y partículas luminosas.',
    previewGradient: 'from-[#0B1126] via-[#1E1B2E] to-[#2E2008]',
    accentColor: '#F59E0B',
    fontFamily: 'Playfair Display, serif'
  },
  {
    id: 'celebra-neon',
    name: 'CELEBRA Cyber Neon',
    category: 'XV_ANOS',
    categoryLabel: 'XV Años & Fiestas',
    theme: 'NEON',
    description: 'Impacto visual electrizante con gradientes de cyan y magenta, brillos de neón y efecto de club futurista.',
    previewGradient: 'from-[#060913] via-[#160D2E] to-[#0A2540]',
    accentColor: '#00F0FF',
    fontFamily: 'Outfit, sans-serif'
  },
  {
    id: 'celebra-royal',
    name: 'CELEBRA Royal Blue',
    category: 'ANIVERSARIOS',
    categoryLabel: 'Aniversarios & Banquetes',
    theme: 'ROYAL',
    description: 'Profundidad majestuosa con azul zafiro, detalles dorados tallados y acabados aristocráticos.',
    previewGradient: 'from-[#040D21] via-[#0A1B44] to-[#121A38]',
    accentColor: '#38BDF8',
    fontFamily: 'Cinzel, serif'
  },
  {
    id: 'celebra-love',
    name: 'CELEBRA Romantic Love',
    category: 'BODAS',
    categoryLabel: 'Bodas Románticas',
    theme: 'LOVE',
    description: 'Tonos rosa empolvado, orquídeas magenta, caligrafía manuscrita y atmósfera de romance puro.',
    previewGradient: 'from-[#1A0B2E] via-[#2D1236] to-[#3B072B]',
    accentColor: '#EC4899',
    fontFamily: 'Great Vibes, cursive'
  },
  {
    id: 'celebra-floral',
    name: 'CELEBRA Botanical Floral',
    category: 'BABY_SHOWERS',
    categoryLabel: 'Baby Showers & Jardín',
    theme: 'FLORAL',
    description: 'Hojas botánicas de acuarela, toques dorados finos y sensación fresca de celebración al aire libre.',
    previewGradient: 'from-[#061B1C] via-[#0D2E2B] to-[#163628]',
    accentColor: '#10B981',
    fontFamily: 'Montserrat, sans-serif'
  },
  {
    id: 'celebra-luxury',
    name: 'CELEBRA Onyx Luxury',
    category: 'GRADUACIONES',
    categoryLabel: 'Graduaciones & Noche de Gala',
    theme: 'LUXURY',
    description: 'Minimalismo de lujo extremo en negro medianoche, acentos en platino y oro puro.',
    previewGradient: 'from-[#000000] via-[#0D1117] to-[#1A1A1A]',
    accentColor: '#FBBF24',
    fontFamily: 'Cinzel, serif'
  },
  {
    id: 'celebra-party',
    name: 'CELEBRA Fiesta & Confeti',
    category: 'CUMPLEANOS',
    categoryLabel: 'Cumpleaños & Fiestas',
    theme: 'NEON',
    description: 'Explosión de confeti, serpentinas, destellos multicolores y música contagiosa para celebrar la vida.',
    previewGradient: 'from-[#18002E] via-[#2F063D] to-[#042436]',
    accentColor: '#D946EF',
    fontFamily: 'Outfit, sans-serif'
  },
  {
    id: 'celebra-corporate',
    name: 'CELEBRA Executive Gala',
    category: 'CORPORATIVOS',
    categoryLabel: 'Corporativo & Premiaciones',
    theme: 'MINIMAL',
    description: 'Sobriedad tecnológica y prestigio empresarial con líneas limpias, métricas y elegancia institucional.',
    previewGradient: 'from-[#090D1A] via-[#0F172A] to-[#1E293B]',
    accentColor: '#0EA5E9',
    fontFamily: 'Inter, sans-serif'
  }
];

export const DEMO_GUESTS: Guest[] = [
  {
    id: 'g-01',
    name: 'Lic. Roberto Morales & Sra.',
    phone: '+52 55 1234 5678',
    group: 'VIP',
    companionsAllowed: 2,
    companionsCount: 2,
    companionsNames: ['Carmen Garza'],
    status: 'INGRESADO',
    qrToken: 'CEL-VIP-8841-A',
    checkedInAt: '19:42 hrs',
    checkedInBy: 'Staff Puerta 1',
    notes: 'Mesa Presidencial'
  },
  {
    id: 'g-02',
    name: 'Arq. Mariana Salgado',
    phone: '+52 55 9876 5432',
    group: 'Familia',
    companionsAllowed: 1,
    companionsCount: 1,
    companionsNames: ['Esteban Salgado'],
    status: 'CONFIRMADO',
    qrToken: 'CEL-FAM-2914-B',
    dietaryRestrictions: 'Vegetariana',
    notes: 'Mesa 3'
  },
  {
    id: 'g-03',
    name: 'Dr. Alejandro Peña',
    phone: '+52 55 4567 8901',
    group: 'Amigos',
    companionsAllowed: 1,
    companionsCount: 1,
    companionsNames: ['Sofía Herrera'],
    status: 'CONFIRMADO',
    qrToken: 'CEL-AMI-7732-C',
    notes: 'Mesa 5'
  },
  {
    id: 'g-04',
    name: 'Ing. Carlos Mendoza',
    phone: '+52 55 2345 6789',
    group: 'Amigos',
    companionsAllowed: 2,
    companionsCount: 0,
    status: 'PENDIENTE',
    qrToken: 'CEL-AMI-1124-D'
  },
  {
    id: 'g-05',
    name: 'Valeria Cárdenas',
    phone: '+52 55 3456 7890',
    group: 'Familia',
    companionsAllowed: 1,
    companionsCount: 0,
    status: 'NO_ASISTIRA',
    qrToken: 'CEL-FAM-9981-E',
    notes: 'Viaje fuera del país'
  },
  {
    id: 'g-06',
    name: 'Sebastián y Paulina Ortiz',
    phone: '+52 55 5678 1234',
    group: 'VIP',
    companionsAllowed: 2,
    companionsCount: 2,
    companionsNames: ['Paulina Ortiz'],
    status: 'CONFIRMADO',
    qrToken: 'CEL-VIP-4431-F',
    notes: 'Mesa VIP 2'
  },
  {
    id: 'g-07',
    name: 'Diego Fernando Torres',
    phone: '+52 55 6789 2345',
    group: 'Amigos',
    companionsAllowed: 1,
    companionsCount: 1,
    status: 'INGRESADO',
    qrToken: 'CEL-AMI-6652-G',
    checkedInAt: '20:15 hrs',
    checkedInBy: 'Staff Puerta 2'
  },
  {
    id: 'g-08',
    name: 'Dra. Gabriela Fuentes',
    phone: '+52 55 7890 3456',
    group: 'Trabajo',
    companionsAllowed: 1,
    companionsCount: 1,
    status: 'CONFIRMADO',
    qrToken: 'CEL-TRA-3312-H'
  },
  {
    id: 'g-09',
    name: 'Mauricio Garza Hinojosa',
    phone: '+52 55 8901 4567',
    group: 'Familia',
    companionsAllowed: 3,
    companionsCount: 3,
    companionsNames: ['Lucía Garza', 'Patricio Garza'],
    status: 'CONFIRMADO',
    qrToken: 'CEL-FAM-5521-I'
  },
  {
    id: 'g-10',
    name: 'Camila Villalobos',
    phone: '+52 55 9012 5678',
    group: 'Amigos',
    companionsAllowed: 1,
    companionsCount: 0,
    status: 'PENDIENTE',
    qrToken: 'CEL-AMI-7789-J'
  }
];

export const DEMO_EVENT: EventModel = {
  id: 'event-gran-fiesta-2026',
  slug: 'gran-fiesta-celebra-2026',
  title: 'Boda Carlos & Sofía — CELEBRA',
  hosts: 'Carlos Mendoza & Sofía Villarreal',
  category: 'BODAS',
  categoryName: 'Boda & Gran Celebración',
  date: '2026-11-21',
  time: '18:30 hrs',
  endTime: '03:00 hrs',
  venueName: 'Hacienda San José de las Palmas',
  address: 'Carretera Real al Santuario Km 4.5, Jardín Principal, Cuernavaca',
  googleMapsUrl: 'https://maps.google.com',
  description: 'Hay momentos en la vida que son inolvidables, y compartirlos con las personas que más queremos los hace eternos. Te invitamos a celebrar el inicio de nuestra historia de amor con una noche llena de magia, música y alegría.',
  coverImage: '/assets/images/wedding-cover.jpg',
  audioTrack: './assets/musica/todo-en-su-lugar.mp3',
  templateId: 'celebra-gold',
  dressCode: {
    title: 'Rigurosa Etiqueta / Black Tie Elegante',
    description: 'Ellas: Vestido largo de noche (favor de reservar los tonos blanco y marfil para la novia). Ellos: Smoking o traje oscuro formal con corbata o moño.',
    colors: ['#0B1126', '#1E1B4B', '#0F172A', '#0284C7', '#B45309']
  },
  itinerary: [
    {
      id: 'it-1',
      time: '18:30 hrs',
      title: 'Recepción & Cóctel de Bienvenida',
      description: 'Música en vivo con cuarteto de cuerdas contemporáneo, barra de champagne y canapés de autor en el jardín de fuentes.',
      iconName: 'Sparkles'
    },
    {
      id: 'it-2',
      time: '19:45 hrs',
      title: 'Ceremonia Solemne & Votos',
      description: 'Intercambio de anillos y bendición bajo la cúpula de luces de cristal.',
      iconName: 'Heart'
    },
    {
      id: 'it-3',
      time: '21:00 hrs',
      title: 'Banquete Gourmet de 4 Tiempos',
      description: 'Experiencia gastronómica maridada con vinos seleccionados del Valle de Guadalupe.',
      iconName: 'Utensils'
    },
    {
      id: 'it-4',
      time: '22:30 hrs',
      title: 'Vals & Primer Baile de Esposos',
      description: 'Apertura de pista con pirotecnia fría y lluvia de confeti dorado.',
      iconName: 'Music'
    },
    {
      id: 'it-5',
      time: '23:00 hrs — 03:00 hrs',
      title: 'Gran Fiesta CELEBRA & DJ Set',
      description: 'Barra libre premium, sorpresas luminosas, barra de desvelados y celebración sin fin.',
      iconName: 'PartyPopper'
    }
  ],
  giftRegistries: [
    {
      id: 'reg-1',
      storeName: 'Amazon México',
      type: 'AMAZON',
      details: 'Mesa de Regalos #8849-CS-2026',
      url: 'https://amazon.com.mx'
    },
    {
      id: 'reg-2',
      storeName: 'Liverpool',
      type: 'LIVERPOOL',
      details: 'Evento Código: 51290483',
      url: 'https://liverpool.com.mx'
    },
    {
      id: 'reg-3',
      storeName: 'Lluvia de Sobres / Transferencia',
      type: 'TRANSFERENCIA',
      details: 'Para nuestra Luna de Miel a Japón',
      bankName: 'BBVA Bancomer',
      clabe: '012 180 015 892 456 123',
      accountNumber: '1589 2456 12'
    }
  ],
  guests: DEMO_GUESTS,
  totalExpected: 150,
  confirmedCount: 118,
  pendingCount: 22,
  declinedCount: 10,
  checkedInCount: 42,
  viewsCount: 384
};
