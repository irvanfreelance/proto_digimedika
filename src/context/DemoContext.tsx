import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ClinicType,
  FamilyMember,
  INITIAL_FAMILY,
  INITIAL_PRESCRIPTIONS,
  INITIAL_QUEUES,
  PrescriptionItem,
  QueueItem,
} from '../data/mockData';
import { Language, translations } from '../i18n/translations';

export type AdminRole = 'owner' | 'frontdesk' | 'dokter' | 'apotek';

export interface ActiveBooking {
  code: string;
  doctorName: string;
  serviceName: string;
  date: string;
  time: string;
  patientName: string;
  isExecutive: boolean;
  checkedIn: boolean;
  queueNumber?: string;
  room: string;
}

interface DemoContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: (typeof translations)[Language];
  clinicType: ClinicType;
  setClinicType: (type: ClinicType) => void;
  isPatientLoggedIn: boolean;
  patientName: string;
  patientPhone: string;
  loginPatient: (phone: string) => void;
  logoutPatient: () => void;
  adminRole: AdminRole | null;
  loginAdmin: (role: AdminRole) => void;
  logoutAdmin: () => void;
  queues: QueueItem[];
  updateQueueStatus: (id: string, status: QueueItem['status']) => void;
  escalateQueueToExecutive: (id: string) => void;
  addWalkInQueue: (patientName: string, doctorName: string, serviceName: string) => QueueItem;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'rmNumber'>) => void;
  prescriptions: PrescriptionItem[];
  choosePrescriptionDelivery: (id: string, method: 'ambil' | 'gosend') => void;
  activeBooking: ActiveBooking | null;
  setActiveBooking: (booking: ActiveBooking | null) => void;
  checkInBooking: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [clinicType, setClinicType] = useState<ClinicType>('kecantikan');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState<boolean>(true);
  const [patientPhone, setPatientPhone] = useState<string>('0812-8899-4411');
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);

  const [queues, setQueues] = useState<QueueItem[]>(INITIAL_QUEUES);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>(INITIAL_PRESCRIPTIONS);

  const [bookingsByClinic, setBookingsByClinic] = useState<Record<ClinicType, ActiveBooking | null>>({
    kecantikan: {
      code: 'DM-8824',
      doctorName: 'dr. Nadia Kusuma, Sp.DVE',
      serviceName: 'Pico Laser Brightening',
      date: 'Hari ini, 19 Nov 2026',
      time: '10:15 WIB',
      patientName: 'Rina Wijaya',
      isExecutive: true,
      checkedIn: true,
      queueNumber: 'E-02',
      room: 'Ruang Laser 1 (Lt. 2)',
    },
    mata_gigi: {
      code: 'DM-5412',
      doctorName: 'drg. Arya Pratama, Sp.Ort',
      serviceName: 'Scaling & Polishing Gigi',
      date: 'Hari ini, 19 Nov 2026',
      time: '11:00 WIB',
      patientName: 'Rina Wijaya',
      isExecutive: false,
      checkedIn: true,
      queueNumber: 'A-04',
      room: 'Poli Gigi 1 (Lt. 1)',
    },
    lab: {
      code: 'DM-3091',
      doctorName: 'Paket Pemeriksaan Lab',
      serviceName: 'Panel Metabolik Lengkap (Darah)',
      date: 'Hari ini, 19 Nov 2026',
      time: '08:30 WIB',
      patientName: 'Rina Wijaya',
      isExecutive: false,
      checkedIn: true,
      queueNumber: 'A-07',
      room: 'Ruang Sampling Lab 1',
    },
  });

  const activeBooking = bookingsByClinic[clinicType];

  const setActiveBooking = (booking: ActiveBooking | null) => {
    setBookingsByClinic((prev) => ({ ...prev, [clinicType]: booking }));
  };

  const loginPatient = (phone: string) => {
    setPatientPhone(phone || '0812-8899-4411');
    setIsPatientLoggedIn(true);
  };

  const logoutPatient = () => setIsPatientLoggedIn(false);

  const loginAdmin = (role: AdminRole) => setAdminRole(role);
  const logoutAdmin = () => setAdminRole(null);

  const updateQueueStatus = (id: string, status: QueueItem['status']) => {
    setQueues((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  const escalateQueueToExecutive = (id: string) => {
    setQueues((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              lane: 'E',
              number: `E-${q.number.split('-')[1] || '09'}`,
              estimatedWaitMin: 3,
            }
          : q
      )
    );
  };

  const addWalkInQueue = (patientName: string, doctorName: string, serviceName: string) => {
    const nextNum = queues.filter((q) => q.lane === 'W').length + 5;
    const newItem: QueueItem = {
      id: `q-${Date.now()}`,
      number: `W-0${nextNum}`,
      lane: 'W',
      patientName,
      doctorName,
      serviceName,
      room: 'Poli Umum 1',
      status: 'menunggu',
      estimatedWaitMin: 18,
      time: 'Sekarang',
    };
    setQueues((prev) => [newItem, ...prev]);
    return newItem;
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id' | 'rmNumber'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`,
      rmNumber: `RM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  const choosePrescriptionDelivery = (id: string, method: 'ambil' | 'gosend') => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id !== id) return rx;
        if (method === 'ambil') {
          return {
            ...rx,
            deliveryMethod: 'ambil',
            status: 'Siap Diambil',
            pickupCode: 'APT-409',
          };
        }
        return {
          ...rx,
          deliveryMethod: 'gosend',
          status: 'Dikirim GoSend',
          driverName: 'Bapak Hendra (GoSend Instant)',
          driverPlate: 'B 4821 KLM',
        };
      })
    );
  };

  const checkInBooking = () => {
    if (!activeBooking) return;
    setActiveBooking({
      ...activeBooking,
      checkedIn: true,
      queueNumber: activeBooking.isExecutive ? 'E-04' : 'A-15',
    });
  };

  return (
    <DemoContext.Provider
      value={{
        language,
        setLanguage,
        isRtl: language === 'ar',
        t: translations[language],
        clinicType,
        setClinicType,
        isPatientLoggedIn,
        patientName: 'Rina Wijaya',
        patientPhone,
        loginPatient,
        logoutPatient,
        adminRole,
        loginAdmin,
        logoutAdmin,
        queues,
        updateQueueStatus,
        escalateQueueToExecutive,
        addWalkInQueue,
        familyMembers,
        addFamilyMember,
        prescriptions,
        choosePrescriptionDelivery,
        activeBooking,
        setActiveBooking,
        checkInBooking,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
};
