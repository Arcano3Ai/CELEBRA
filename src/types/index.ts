export type EventCategory = 
  | 'BODAS' 
  | 'XV_ANOS' 
  | 'CUMPLEANOS' 
  | 'BAUTIZOS' 
  | 'BABY_SHOWERS' 
  | 'GRADUACIONES' 
  | 'ANIVERSARIOS' 
  | 'CORPORATIVOS' 
  | 'FIESTAS';

export type GuestStatus = 'PENDIENTE' | 'CONFIRMADO' | 'NO_ASISTIRA' | 'INGRESADO';

export interface Guest {
  id: string;
  name: string;
  phone: string;
  group: string; // 'Familia' | 'Amigos' | 'VIP' | 'Mesa 1' | etc.
  companionsAllowed: number;
  companionsCount: number;
  companionsNames?: string[];
  status: GuestStatus;
  qrToken: string;
  checkedInAt?: string;
  checkedInBy?: string;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GiftRegistryItem {
  id: string;
  storeName: string;
  type: 'AMAZON' | 'LIVERPOOL' | 'MERCADO_LIBRE' | 'TRANSFERENCIA' | 'CUSTOM';
  details: string;
  url?: string;
  accountNumber?: string;
  clabe?: string;
  bankName?: string;
}

export interface Template {
  id: string;
  name: string;
  category: EventCategory;
  categoryLabel: string;
  theme: 'GOLD' | 'NEON' | 'ROYAL' | 'LOVE' | 'FLORAL' | 'LUXURY' | 'KIDS' | 'MINIMAL';
  description: string;
  previewGradient: string;
  accentColor: string;
  fontFamily: string;
}

export interface EventModel {
  id: string;
  slug: string;
  title: string;
  hosts: string;
  category: EventCategory;
  categoryName: string;
  date: string;
  time: string;
  endTime?: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  description: string;
  coverImage: string;
  audioTrack: string;
  templateId: string;
  dressCode: {
    title: string;
    description: string;
    colors: string[];
  };
  itinerary: ItineraryItem[];
  giftRegistries: GiftRegistryItem[];
  guests: Guest[];
  totalExpected: number;
  confirmedCount: number;
  pendingCount: number;
  declinedCount: number;
  checkedInCount: number;
  viewsCount: number;
}
