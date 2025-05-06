import { create } from 'zustand';

interface ServiceCenter {
  id: string;
  name: string;
  location: string;
  currentQueue: number;
  waitTime: number; // in minutes
  operatingHours: string;
}

interface QueueTicket {
  id: string;
  centerId: string;
  centerName: string;
  ticketNumber: number;
  estimatedWaitTime: number; // in minutes
  status: 'waiting' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  notifyBeforeMinutes: number;
}

interface QueueState {
  serviceCenters: ServiceCenter[];
  myTickets: QueueTicket[];
  fetchServiceCenters: () => Promise<void>;
  getServiceCenter: (id: string) => ServiceCenter | undefined;
  bookTicket: (centerId: string, notifyBeforeMinutes: number) => Promise<QueueTicket>;
  cancelTicket: (ticketId: string) => Promise<void>;
  updateNotificationTime: (ticketId: string, minutes: number) => void;
}

// Mock data for service centers
const mockServiceCenters: ServiceCenter[] = [
  {
    id: '1',
    name: 'Hospitali ya Muhimbili',
    location: 'Dar es Salaam',
    currentQueue: 15,
    waitTime: 45,
    operatingHours: '08:00 - 17:00',
  },
  {
    id: '2',
    name: 'TTCL Makao Makuu',
    location: 'Dar es Salaam',
    currentQueue: 8,
    waitTime: 25,
    operatingHours: '08:30 - 16:30',
  },
  {
    id: '3',
    name: 'Benki ya NMB - Tawi la Kariakoo',
    location: 'Kariakoo, Dar es Salaam',
    currentQueue: 22,
    waitTime: 65,
    operatingHours: '08:00 - 16:00',
  },
  {
    id: '4',
    name: 'Ofisi ya Uhamiaji',
    location: 'Arusha',
    currentQueue: 30,
    waitTime: 90,
    operatingHours: '09:00 - 15:00',
  },
  {
    id: '5',
    name: 'TRA Ofisi ya Kodi',
    location: 'Mwanza',
    currentQueue: 12,
    waitTime: 35,
    operatingHours: '08:30 - 16:00',
  },
];

export const useQueueStore = create<QueueState>((set, get) => ({
  serviceCenters: [],
  myTickets: [],
  
  fetchServiceCenters: async () => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ serviceCenters: mockServiceCenters });
  },
  
  getServiceCenter: (id: string) => {
    return get().serviceCenters.find(center => center.id === id);
  },
  
  bookTicket: async (centerId: string, notifyBeforeMinutes: number) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const center = get().serviceCenters.find(c => c.id === centerId);
    if (!center) {
      throw new Error('Service center not found');
    }
    
    const ticketNumber = center.currentQueue + 1;
    
    const newTicket: QueueTicket = {
      id: Date.now().toString(),
      centerId,
      centerName: center.name,
      ticketNumber,
      estimatedWaitTime: center.waitTime,
      status: 'waiting',
      createdAt: new Date(),
      notifyBeforeMinutes,
    };
    
    set(state => ({
      myTickets: [...state.myTickets, newTicket],
      serviceCenters: state.serviceCenters.map(c => 
        c.id === centerId 
          ? { ...c, currentQueue: c.currentQueue + 1 } 
          : c
      )
    }));
    
    return newTicket;
  },
  
  cancelTicket: async (ticketId: string) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    set(state => ({
      myTickets: state.myTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'cancelled' } 
          : ticket
      )
    }));
  },
  
  updateNotificationTime: (ticketId: string, minutes: number) => {
    set(state => ({
      myTickets: state.myTickets.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, notifyBeforeMinutes: minutes } 
          : ticket
      )
    }));
  },
}));