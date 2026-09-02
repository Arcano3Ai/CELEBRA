import React, { createContext, useContext, useState } from 'react';
import { EventModel, Guest, Template } from '../types';
import { DEMO_EVENT, DEMO_TEMPLATES } from '../data/demoData';

export type AppView = 
  | 'LANDING' 
  | 'DASHBOARD' 
  | 'WIZARD' 
  | 'EDITOR' 
  | 'INVITATION' 
  | 'CHECKIN' 
  | 'GUESTS' 
  | 'STAFF'
  | 'ADMIN';

interface EventContextType {
  event: EventModel;
  updateEvent: (partial: Partial<EventModel>) => void;
  templates: Template[];
  selectedTemplate: Template;
  setSelectedTemplate: (template: Template) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  activeGuest: Guest | null;
  setActiveGuest: (guest: Guest | null) => void;
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id' | 'qrToken'>) => void;
  updateGuestStatus: (guestId: string, status: Guest['status']) => void;
  performCheckIn: (qrToken: string, staffName?: string) => { success: boolean; message: string; guest?: Guest; alreadyCheckedIn?: boolean };
  rsvpSubmit: (guestId: string, willAttend: boolean, companions: number, names?: string[], restrictions?: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<EventModel>(DEMO_EVENT);
  const [templates] = useState<Template[]>(DEMO_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(DEMO_TEMPLATES[0]);
  const [activeView, setActiveView] = useState<AppView>('LANDING');
  const [activeGuest, setActiveGuest] = useState<Guest | null>(DEMO_EVENT.guests[0]);
  const [guests, setGuests] = useState<Guest[]>(DEMO_EVENT.guests);

  const updateEvent = (partial: Partial<EventModel>) => {
    setEvent(prev => ({ ...prev, ...partial }));
  };

  const addGuest = (guestData: Omit<Guest, 'id' | 'qrToken'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: `g-${Date.now()}`,
      qrToken: `CEL-${guestData.group.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
    };
    setGuests(prev => [newGuest, ...prev]);
    setEvent(prev => ({
      ...prev,
      totalExpected: prev.totalExpected + 1 + guestData.companionsCount,
      pendingCount: prev.pendingCount + 1
    }));
  };

  const updateGuestStatus = (guestId: string, status: Guest['status']) => {
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, status } : g));
  };

  const performCheckIn = (qrToken: string, staffName = 'Staff Principal') => {
    const tokenClean = qrToken.trim();
    const guest = guests.find(g => g.qrToken === tokenClean);

    if (!guest) {
      return {
        success: false,
        message: 'Código QR no reconocido o inválido. Verifique con el anfitrión.'
      };
    }

    if (guest.status === 'INGRESADO') {
      return {
        success: false,
        alreadyCheckedIn: true,
        guest,
        message: `Atención: ${guest.name} ya registró ingreso a las ${guest.checkedInAt || '19:30 hrs'}.`
      };
    }

    // Mark as checked in
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' hrs';
    const updatedGuest: Guest = {
      ...guest,
      status: 'INGRESADO',
      checkedInAt: nowTime,
      checkedInBy: staffName
    };

    setGuests(prev => prev.map(g => g.id === guest.id ? updatedGuest : g));
    setEvent(prev => ({
      ...prev,
      checkedInCount: prev.checkedInCount + 1
    }));

    return {
      success: true,
      guest: updatedGuest,
      message: `¡Acceso autorizado para ${guest.name}! (+${guest.companionsCount} acompañantes)`
    };
  };

  const rsvpSubmit = (guestId: string, willAttend: boolean, companions: number, names?: string[], restrictions?: string) => {
    const newStatus: Guest['status'] = willAttend ? 'CONFIRMADO' : 'NO_ASISTIRA';
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        return {
          ...g,
          status: newStatus,
          companionsCount: willAttend ? companions : 0,
          companionsNames: names,
          dietaryRestrictions: restrictions
        };
      }
      return g;
    }));

    // Update event stats
    setEvent(prev => {
      const isConfirmed = willAttend;
      return {
        ...prev,
        confirmedCount: isConfirmed ? prev.confirmedCount + 1 : prev.confirmedCount,
        declinedCount: !isConfirmed ? prev.declinedCount + 1 : prev.declinedCount,
        pendingCount: Math.max(0, prev.pendingCount - 1)
      };
    });
  };

  return (
    <EventContext.Provider
      value={{
        event,
        updateEvent,
        templates,
        selectedTemplate,
        setSelectedTemplate,
        activeView,
        setActiveView,
        activeGuest,
        setActiveGuest,
        guests,
        addGuest,
        updateGuestStatus,
        performCheckIn,
        rsvpSubmit
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
