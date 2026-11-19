export type ClinicType = 'kecantikan' | 'mata_gigi' | 'lab';

export interface ClinicInfo {
  id: ClinicType;
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  openHours: string;
  accentLabel: string;
}

export interface Doctor {
  id: string;
  clinicType: ClinicType;
  name: string;
  specialty: string;
  strVerified: boolean;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  priceRegular: number;
  priceExecutive: number;
  nextSlots: { time: string; status: 'tersedia' | 'hampir_penuh' | 'penuh'; isExecutive?: boolean }[];
}

export interface ServiceItem {
  id: string;
  clinicType: ClinicType;
  name: string;
  category: string;
  durationMin: number;
  priceRegular: number;
  priceExecutive: number;
  description: string;
  prepNote: string;
  hasPackage?: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  rmNumber: string;
  dob: string;
  gender: 'L' | 'P';
  allergies: string[];
}

export interface QueueItem {
  id: string;
  number: string; // E-01, A-12, W-05
  lane: 'E' | 'A' | 'W';
  patientName: string;
  doctorName: string;
  serviceName: string;
  room: string;
  status: 'menunggu' | 'dipanggil' | 'dilayani' | 'selesai';
  estimatedWaitMin: number;
  time: string;
}

export interface LabResultItem {
  id: string;
  date: string;
  title: string;
  doctorName: string;
  status: 'Siap' | 'Menunggu Validasi';
  parameters: {
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    flag: 'N' | 'L' | 'H';
  }[];
}

export interface PrescriptionItem {
  id: string;
  date: string;
  doctorName: string;
  status: 'Menunggu Pilihan' | 'Siap Diambil' | 'Dikirim GoSend' | 'Selesai';
  deliveryMethod?: 'ambil' | 'gosend';
  pickupCode?: string;
  driverName?: string;
  driverPlate?: string;
  meds: { name: string; dose: string; freq: string; daysLeft: number }[];
}

export const CLINICS: Record<ClinicType, ClinicInfo> = {
  kecantikan: {
    id: 'kecantikan',
    name: 'DigiMedika Glow Clinic',
    shortName: 'Klinik Kecantikan',
    tagline: 'Perawatan kulit & estetika medis terpercaya',
    address: 'Jl. Kemang Raya No. 48, Jakarta Selatan',
    city: 'Jakarta Selatan',
    phone: '021-7182-9900',
    openHours: '09:00 – 20:00 WIB',
    accentLabel: 'Estetika & Laser',
  },
  mata_gigi: {
    id: 'mata_gigi',
    name: 'DigiMedika Dental & Eye Care',
    shortName: 'Klinik Mata & Gigi',
    tagline: 'Senyum sehat & penglihatan jernih untuk keluarga',
    address: 'Jl. Senopati No. 12, Kebayoran Baru',
    city: 'Jakarta Selatan',
    phone: '021-5290-1122',
    openHours: '08:00 – 21:00 WIB',
    accentLabel: 'Gigi & Mata',
  },
  lab: {
    id: 'lab',
    name: 'DigiMedika Medika & Lab',
    shortName: 'Klinik Umum & Lab',
    tagline: 'Poli umum, anak, dan laboratorium cepat akurat',
    address: 'Jl. HOS. Cokroaminoto No. 88, Menteng',
    city: 'Jakarta Pusat',
    phone: '021-3190-4455',
    openHours: '07:00 – 21:00 WIB',
    accentLabel: 'Poli & Laboratorium',
  },
};

export const DOCTORS: Doctor[] = [
  // Kecantikan
  {
    id: 'doc-k1',
    clinicType: 'kecantikan',
    name: 'dr. Nadia Kusuma, Sp.DVE',
    specialty: 'Dokter Spesialis Kulit & Estetika',
    strVerified: true,
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 312,
    avatar: 'NK',
    priceRegular: 250000,
    priceExecutive: 400000,
    nextSlots: [
      { time: '10:00', status: 'hampir_penuh' },
      { time: '11:30', status: 'tersedia', isExecutive: true },
      { time: '14:00', status: 'tersedia' },
      { time: '16:30', status: 'penuh' },
    ],
  },
  {
    id: 'doc-k2',
    clinicType: 'kecantikan',
    name: 'dr. Clarissa Tan, M.Biomed (AAM)',
    specialty: 'Aesthetic & Laser Physician',
    strVerified: true,
    experienceYears: 7,
    rating: 4.8,
    reviewCount: 218,
    avatar: 'CT',
    priceRegular: 200000,
    priceExecutive: 350000,
    nextSlots: [
      { time: '09:30', status: 'tersedia' },
      { time: '13:00', status: 'tersedia', isExecutive: true },
      { time: '15:30', status: 'hampir_penuh' },
    ],
  },
  // Mata & Gigi
  {
    id: 'doc-mg1',
    clinicType: 'mata_gigi',
    name: 'drg. Arya Pratama, Sp.Ort',
    specialty: 'Dokter Gigi Spesialis Ortodonti',
    strVerified: true,
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 405,
    avatar: 'AP',
    priceRegular: 220000,
    priceExecutive: 370000,
    nextSlots: [
      { time: '09:00', status: 'tersedia' },
      { time: '11:00', status: 'hampir_penuh', isExecutive: true },
      { time: '15:00', status: 'tersedia' },
    ],
  },
  {
    id: 'doc-mg2',
    clinicType: 'mata_gigi',
    name: 'dr. Hendra Wijaya, Sp.M',
    specialty: 'Dokter Spesialis Mata',
    strVerified: true,
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 520,
    avatar: 'HW',
    priceRegular: 280000,
    priceExecutive: 450000,
    nextSlots: [
      { time: '10:30', status: 'tersedia', isExecutive: true },
      { time: '13:30', status: 'tersedia' },
      { time: '16:00', status: 'hampir_penuh' },
    ],
  },
  // Lab & Umum
  {
    id: 'doc-l1',
    clinicType: 'lab',
    name: 'dr. Budi Santoso, Sp.PD',
    specialty: 'Dokter Spesialis Penyakit Dalam',
    strVerified: true,
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 610,
    avatar: 'BS',
    priceRegular: 250000,
    priceExecutive: 420000,
    nextSlots: [
      { time: '08:30', status: 'hampir_penuh' },
      { time: '10:00', status: 'tersedia', isExecutive: true },
      { time: '14:30', status: 'tersedia' },
    ],
  },
  {
    id: 'doc-l2',
    clinicType: 'lab',
    name: 'dr. Siti Rahma, Sp.A',
    specialty: 'Dokter Spesialis Anak',
    strVerified: true,
    experienceYears: 10,
    rating: 4.8,
    reviewCount: 290,
    avatar: 'SR',
    priceRegular: 230000,
    priceExecutive: 380000,
    nextSlots: [
      { time: '09:00', status: 'tersedia' },
      { time: '11:30', status: 'tersedia', isExecutive: true },
      { time: '16:00', status: 'penuh' },
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  // Kecantikan
  {
    id: 'srv-k1',
    clinicType: 'kecantikan',
    name: 'Pico Laser Brightening',
    category: 'Laser & Rejuvenation',
    durationMin: 45,
    priceRegular: 1250000,
    priceExecutive: 1650000,
    description: 'Mencerahkan flek hitam, meratakan warna kulit, dan merangsang kolagen tanpa downtime.',
    prepNote: 'Hindari paparan sinar matahari langsung 48 jam sebelum tindakan.',
    hasPackage: true,
  },
  {
    id: 'srv-k2',
    clinicType: 'kecantikan',
    name: 'HydraFacial & Skin Booster',
    category: 'Facial Medis',
    durationMin: 60,
    priceRegular: 850000,
    priceExecutive: 1150000,
    description: 'Pembersihan pori mendalam dilanjutkan infus serum hidrasi intensif.',
    prepNote: 'Datang tanpa makeup tebal; hentikan krim eksfoliasi 2 hari sebelumnya.',
    hasPackage: true,
  },
  // Mata & Gigi
  {
    id: 'srv-mg1',
    clinicType: 'mata_gigi',
    name: 'Scaling & Polishing Gigi',
    category: 'Perawatan Gigi',
    durationMin: 45,
    priceRegular: 450000,
    priceExecutive: 650000,
    description: 'Pembersihan karang gigi menyeluruh dengan alat ultrasonik minim ngilu.',
    prepNote: 'Sikat gigi sebelum datang; informasikan jika ada riwayat gusi sensitif.',
  },
  {
    id: 'srv-mg2',
    clinicType: 'mata_gigi',
    name: 'Skrining Mata & Retinopati',
    category: 'Pemeriksaan Mata',
    durationMin: 30,
    priceRegular: 350000,
    priceExecutive: 500000,
    description: 'Pemeriksaan tajam penglihatan, tekanan bola mata, dan foto fundus.',
    prepNote: 'Lepas lensa kontak minimal 2 jam sebelum pemeriksaan.',
  },
  // Lab & Umum
  {
    id: 'srv-l1',
    clinicType: 'lab',
    name: 'Panel Metabolik Lengkap (Darah)',
    category: 'Laboratorium',
    durationMin: 20,
    priceRegular: 550000,
    priceExecutive: 750000,
    description: 'Cek kolesterol total, LDL/HDL, trigliserida, gula darah puasa, dan fungsi hati/ginjal.',
    prepNote: 'Wajib puasa 10–12 jam sebelum pengambilan sampel (boleh minum air putih).',
  },
  {
    id: 'srv-l2',
    clinicType: 'lab',
    name: 'Konsultasi Poli Umum & Vaksinasi',
    category: 'Poli Umum',
    durationMin: 25,
    priceRegular: 150000,
    priceExecutive: 275000,
    description: 'Pemeriksaan fisik menyeluruh, resep digital, dan layanan imunisasi dewasa/anak.',
    prepNote: 'Bawa catatan riwayat alergi atau obat yang sedang dikonsumsi.',
  },
];

export const INITIAL_FAMILY: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Rina Wijaya',
    relation: 'Saya (Utama)',
    rmNumber: 'RM-2026-0841',
    dob: '14 Mei 1992',
    gender: 'P',
    allergies: ['Penisilin'],
  },
  {
    id: 'fam-2',
    name: 'Budi Wijaya',
    relation: 'Suami',
    rmNumber: 'RM-2026-0842',
    dob: '22 Agu 1990',
    gender: 'L',
    allergies: [],
  },
  {
    id: 'fam-3',
    name: 'Kaira Wijaya',
    relation: 'Anak',
    rmNumber: 'RM-2026-1094',
    dob: '03 Nov 2019',
    gender: 'P',
    allergies: ['Debu', 'Kacang'],
  },
];

export const INITIAL_QUEUES: QueueItem[] = [
  {
    id: 'q-1',
    number: 'E-02',
    lane: 'E',
    patientName: 'Rina Wijaya',
    doctorName: 'dr. Nadia Kusuma, Sp.DVE',
    serviceName: 'Pico Laser Brightening',
    room: 'Ruang Laser 1 (Lt. 2)',
    status: 'dipanggil',
    estimatedWaitMin: 0,
    time: '10:15',
  },
  {
    id: 'q-2',
    number: 'A-11',
    lane: 'A',
    patientName: 'Dian Pertiwi',
    doctorName: 'dr. Nadia Kusuma, Sp.DVE',
    serviceName: 'Konsultasi Kulit',
    room: 'Poli Estetika 2',
    status: 'menunggu',
    estimatedWaitMin: 12,
    time: '10:30',
  },
  {
    id: 'q-3',
    number: 'A-12',
    lane: 'A',
    patientName: 'Fajar Ramadhan',
    doctorName: 'drg. Arya Pratama, Sp.Ort',
    serviceName: 'Scaling & Polishing',
    room: 'Poli Gigi 1',
    status: 'dilayani',
    estimatedWaitMin: 0,
    time: '10:00',
  },
  {
    id: 'q-4',
    number: 'W-04',
    lane: 'W',
    patientName: 'Siti Aminah',
    doctorName: 'dr. Budi Santoso, Sp.PD',
    serviceName: 'Konsultasi Umum',
    room: 'Poli Umum 1',
    status: 'menunggu',
    estimatedWaitMin: 25,
    time: '10:40',
  },
  {
    id: 'q-5',
    number: 'E-03',
    lane: 'E',
    patientName: 'Kevin Hartono',
    doctorName: 'dr. Hendra Wijaya, Sp.M',
    serviceName: 'Skrining Mata',
    room: 'Poli Mata Eksekutif',
    status: 'menunggu',
    estimatedWaitMin: 5,
    time: '10:30',
  },
];

export const INITIAL_LAB_RESULTS: LabResultItem[] = [
  {
    id: 'lab-101',
    date: '15 Nov 2026',
    title: 'Panel Metabolik & Profil Lipid',
    doctorName: 'dr. Budi Santoso, Sp.PD',
    status: 'Siap',
    parameters: [
      { name: 'Gula Darah Puasa', value: '92', unit: 'mg/dL', normalRange: '70 - 99', flag: 'N' },
      { name: 'Kolesterol Total', value: '214', unit: 'mg/dL', normalRange: '< 200', flag: 'H' },
      { name: 'LDL Kolesterol', value: '138', unit: 'mg/dL', normalRange: '< 100', flag: 'H' },
      { name: 'HDL Kolesterol', value: '56', unit: 'mg/dL', normalRange: '> 40', flag: 'N' },
      { name: 'Hemoglobin', value: '13.4', unit: 'g/dL', normalRange: '12.0 - 15.5', flag: 'N' },
    ],
  },
];

export const INITIAL_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: 'rx-201',
    date: '19 Nov 2026',
    doctorName: 'dr. Nadia Kusuma, Sp.DVE',
    status: 'Menunggu Pilihan',
    meds: [
      { name: 'Niacinamide 5% Soothing Gel', dose: 'Oles tipis', freq: '2x sehari (pagi & malam)', daysLeft: 14 },
      { name: 'Sunscreen SPF 50+ PA++++', dose: '2 ruas jari', freq: 'Setiap pagi', daysLeft: 30 },
    ],
  },
];
