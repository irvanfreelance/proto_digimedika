import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  Star,
  Sparkles,
  Calendar,
  UserCheck,
  AlertTriangle,
  QrCode,
  CheckCircle2,
  ArrowLeft,
  Wallet,
  Building2,
  Smartphone,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { DOCTORS, Doctor, SERVICES, ServiceItem } from '../../data/mockData';
import { getClinicTheme } from '../../utils/clinicTheme';

const DATES = [
  { label: 'Hari ini', day: '19 Nov', status: 'Ada Slot' },
  { label: 'Kam', day: '20 Nov', status: 'Ada Slot' },
  { label: 'Jum', day: '21 Nov', status: 'Terbatas' },
  { label: 'Sab', day: '22 Nov', status: 'Terbatas' },
  { label: 'Min', day: '23 Nov', status: 'Penuh' },
  { label: 'Sen', day: '24 Nov', status: 'Ada Slot' },
];

export const BookingPage: React.FC = () => {
  const { clinicType, familyMembers, setActiveBooking } = useDemo();
  const navigate = useNavigate();
  const theme = getClinicTheme(clinicType);

  const [viewMode, setViewMode] = useState<'dokter' | 'tanggal'>('dokter');
  const [selectedDate, setSelectedDate] = useState(0);
  const [onlyExecutive, setOnlyExecutive] = useState(false);

  // Inline Booking Page State (bukan modal)
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [isBookingActive, setIsBookingActive] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isExecSlot, setIsExecSlot] = useState<boolean>(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(familyMembers[0]?.id || 'fam-1');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va' | 'ewallet'>('qris');
  const [step, setStep] = useState<'pasien' | 'bayar' | 'sukses'>('pasien');

  const isPackageBased = clinicType === 'kecantikan' || clinicType === 'lab';
  const doctors = DOCTORS.filter((d) => d.clinicType === clinicType);
  const services = SERVICES.filter((s) => s.clinicType === clinicType);

  const openDoctorBooking = (doc: Doctor, time: string, isExec?: boolean) => {
    setSelectedTitle(doc.name);
    setSelectedSubtitle(`Konsultasi ${doc.specialty}`);
    setSelectedPrice(isExec ? doc.priceExecutive : doc.priceRegular);
    setSelectedTime(time);
    setIsExecSlot(!!isExec);
    setStep('pasien');
    setIsBookingActive(true);
  };

  const openPackageBooking = (srv: ServiceItem, time: string, isExec?: boolean) => {
    setSelectedTitle(srv.name);
    setSelectedSubtitle(`${srv.category} • ${srv.durationMin} menit`);
    setSelectedPrice(isExec ? srv.priceExecutive : srv.priceRegular);
    setSelectedTime(time);
    setIsExecSlot(!!isExec);
    setStep('pasien');
    setIsBookingActive(true);
  };

  const handleConfirmPay = () => {
    const patient = familyMembers.find((f) => f.id === selectedPatientId) || familyMembers[0];
    const code = `DM-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveBooking({
      code,
      doctorName: selectedTitle,
      serviceName: selectedSubtitle,
      date: `${DATES[selectedDate].label}, ${DATES[selectedDate].day} 2026`,
      time: `${selectedTime} WIB`,
      patientName: patient.name,
      isExecutive: isExecSlot,
      checkedIn: false,
      room: isPackageBased ? 'Ruang Tindakan / Lab 1' : 'Poli Utama 1 (Lt. 1)',
    });
    setStep('sukses');
  };

  // INLINE BOOKING & PAYMENT PAGE
  if (isBookingActive) {
    const totalAmount = selectedPrice;

    return (
      <div className="px-4 py-4 space-y-4">
        <button
          onClick={() => {
            if (step === 'bayar') setStep('pasien');
            else setIsBookingActive(false);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 'bayar' ? 'Kembali ke Pilih Pasien' : 'Kembali ke Daftar Jadwal'}
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span
            className={`px-2.5 py-1 rounded-full ${
              step === 'pasien' ? `${theme.primaryBg} text-white` : `${theme.softBg} ${theme.primaryText}`
            }`}
          >
            1. Pasien
          </span>
          <span className="text-slate-300">→</span>
          <span
            className={`px-2.5 py-1 rounded-full ${
              step === 'bayar' ? `${theme.primaryBg} text-white` : `${theme.softBg} ${theme.primaryText}`
            }`}
          >
            2. Pembayaran
          </span>
          <span className="text-slate-300">→</span>
          <span
            className={`px-2.5 py-1 rounded-full ${
              step === 'sukses' ? `${theme.primaryBg} text-white` : 'bg-slate-100 text-slate-400'
            }`}
          >
            3. Tiket
          </span>
        </div>

        {step === 'pasien' && (
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-4">
            <div className={`${theme.softBg} p-3.5 rounded-2xl border ${theme.softBorder}`}>
              <p className={`text-xs font-bold ${theme.primaryText}`}>{selectedTitle}</p>
              <p className="text-xs text-slate-600 mt-0.5">
                {DATES[selectedDate].day} • {selectedTime} WIB{' '}
                {isExecSlot && '• Jalur Eksekutif (Prioritas)'}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-2">
                Pilih Anggota Keluarga
              </label>
              <div className="space-y-2">
                {familyMembers.map((fam) => {
                  const active = selectedPatientId === fam.id;
                  return (
                    <button
                      key={fam.id}
                      onClick={() => setSelectedPatientId(fam.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        active ? `${theme.primaryBorder} ${theme.softBg}` : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-[#1E293B]">{fam.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {fam.relation} • {fam.rmNumber}
                        </p>
                        {fam.allergies.length > 0 && (
                          <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3" /> Alergi: {fam.allergies.join(', ')}
                          </p>
                        )}
                      </div>
                      {active && <UserCheck className={`w-5 h-5 ${theme.primaryText}`} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-sm">
              <span className="text-slate-600">Total Biaya</span>
              <span className={`font-display font-bold ${theme.primaryText}`}>
                Rp {(totalAmount / 1000).toLocaleString('id-ID')}.000
              </span>
            </div>

            <button
              onClick={() => setStep('bayar')}
              className={`w-full py-3 rounded-2xl ${theme.primaryBg} ${theme.primaryHoverBg} text-white font-semibold text-sm transition-colors cursor-pointer`}
            >
              Lanjut ke Pilih Pembayaran
            </button>
          </div>
        )}

        {step === 'bayar' && (
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-4">
            <div>
              <h2 className="font-display font-bold text-base text-[#1E293B]">
                Pilih Metode Pembayaran
              </h2>
              <p className="text-xs text-slate-500">
                Total: <strong>Rp {(totalAmount / 1000).toLocaleString('id-ID')}.000</strong> • Hold
                slot 15 menit
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 'qris',
                  label: 'QRIS (Rekomendasi)',
                  desc: 'GoPay, OVO, Dana, ShopeePay, Mobile Banking',
                  icon: <QrCode className="w-5 h-5" />,
                },
                {
                  id: 'va',
                  label: 'Virtual Account Bank',
                  desc: 'BCA, Mandiri, BNI, BRI (Verifikasi otomatis)',
                  icon: <Building2 className="w-5 h-5" />,
                },
                {
                  id: 'ewallet',
                  label: 'E-Wallet Langsung',
                  desc: 'Hubungkan akun GoPay / OVO Anda',
                  icon: <Smartphone className="w-5 h-5" />,
                },
              ].map((m) => {
                const active = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as typeof paymentMethod)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      active ? `${theme.primaryBorder} ${theme.softBg}` : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className={active ? theme.primaryText : 'text-slate-400'}>{m.icon}</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#1E293B]">{m.label}</p>
                      <p className="text-[11px] text-slate-500">{m.desc}</p>
                    </div>
                    <Wallet className={`w-4 h-4 ${active ? theme.primaryText : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'qris' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center">
                <QrCode className="w-28 h-28 text-[#1E293B]" strokeWidth={1.5} />
                <p className="text-[11px] font-semibold text-slate-600 mt-2">
                  Scan QRIS untuk menyelesaikan pembayaran
                </p>
              </div>
            )}

            <button
              onClick={handleConfirmPay}
              className={`w-full py-3 rounded-2xl ${theme.primaryBg} ${theme.primaryHoverBg} text-white font-semibold text-sm transition-colors cursor-pointer`}
            >
              Simulasikan Bayar Sukses
            </button>
          </div>
        )}

        {step === 'sukses' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 text-center">
            <CheckCircle2 className={`w-14 h-14 ${theme.primaryText} mx-auto`} />
            <div>
              <h4 className="font-display font-bold text-lg text-[#1E293B]">Tiket Anda Terbit!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Anda dapat langsung melakukan Check-in Mandiri saat tiba di klinik.
              </p>
            </div>
            <button
              onClick={() => {
                setIsBookingActive(false);
                navigate('/antrian');
              }}
              className={`w-full py-3 rounded-2xl ${theme.primaryBg} ${theme.primaryHoverBg} text-white font-semibold text-sm transition-colors cursor-pointer`}
            >
              Lihat Tiket & Antrian Live
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <div>
        <h1 className="font-display text-lg font-bold text-[#1E293B]">
          {isPackageBased ? 'Pilih Paket & Jadwal' : 'Cari Dokter & Jadwal'}
        </h1>
        <p className="text-xs text-slate-500">
          {isPackageBased
            ? 'Booking paket treatment atau pemeriksaan lab semudah pesan tiket'
            : 'Pilih dokter atau tanggal layaknya pesan tiket'}
        </p>
      </div>

      {/* Mode Switcher + Executive Filter */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex bg-slate-200/70 p-1 rounded-xl flex-1">
          <button
            onClick={() => setViewMode('dokter')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'dokter' ? `bg-white ${theme.primaryText} shadow-sm` : 'text-slate-600'
            }`}
          >
            Mode Dokter
          </button>
          <button
            onClick={() => setViewMode('tanggal')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'tanggal' ? `bg-white ${theme.primaryText} shadow-sm` : 'text-slate-600'
            }`}
          >
            Mode Tanggal
          </button>
        </div>

        <button
          onClick={() => setOnlyExecutive(!onlyExecutive)}
          className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-all cursor-pointer ${
            onlyExecutive
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Eksekutif
        </button>
      </div>

      {/* Horizontal Date Strip */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {DATES.map((d, idx) => {
          const active = selectedDate === idx;
          const isFull = d.status === 'Penuh';
          return (
            <button
              key={d.day}
              disabled={isFull}
              onClick={() => setSelectedDate(idx)}
              className={`shrink-0 px-3 py-2 rounded-2xl border text-center min-w-[78px] transition-all cursor-pointer ${
                active
                  ? `${theme.primaryBg} ${theme.primaryBorder} text-white shadow-sm`
                  : isFull
                  ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <p className="text-[10px] font-medium opacity-80">{d.label}</p>
              <p className="text-xs font-bold mt-0.5">{d.day}</p>
              <span
                className={`inline-block text-[9px] font-semibold mt-1 px-1.5 py-0.5 rounded-full ${
                  active
                    ? 'bg-white/20 text-white'
                    : d.status === 'Ada Slot'
                    ? `${theme.softBg} ${theme.primaryText}`
                    : d.status === 'Terbatas'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {d.status}
              </span>
            </button>
          );
        })}
      </div>

      {/* Package List (Aesthetic & Lab) OR Doctor List (Mata & Gigi) */}
      {isPackageBased ? (
        <div className="space-y-3">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={clinicType === 'kecantikan' ? '/images/aesthetic.jpg' : '/images/lab.jpg'}
                  alt={srv.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText}`}
                  >
                    {srv.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#1E293B] mt-1">{srv.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{srv.description}</p>
                  <p className="text-[11px] font-semibold text-slate-600 mt-1.5">
                    Mulai Rp {(srv.priceRegular / 1000).toLocaleString('id-ID')}rb • {srv.durationMin} menit
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <Calendar className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                  Pilih Jam Paket ({DATES[selectedDate].day}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { time: '09:30', isExec: false },
                    { time: '11:00', isExec: true },
                    { time: '14:00', isExec: false },
                  ].map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => openPackageBooking(srv, slot.time, slot.isExec)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                        slot.isExec
                          ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                          : `${theme.softBg} ${theme.softBorder} ${theme.primaryText}`
                      }`}
                    >
                      {slot.isExec && <Sparkles className="w-3 h-3 text-amber-500" />}
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {doctors.map((doc) => {
            const slots = onlyExecutive
              ? doc.nextSlots.filter((s) => s.isExecutive)
              : doc.nextSlots;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={doc.name.includes('Arya') || doc.name.includes('Hendra') || doc.name.includes('Budi') ? '/images/doctor-male.jpg' : '/images/doctor-female.jpg'}
                    alt={doc.name}
                    className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-display font-bold text-sm text-[#1E293B] truncate">
                        {doc.name}
                      </h3>
                      {doc.strVerified && <BadgeCheck className={`w-4 h-4 ${theme.primaryText} shrink-0`} />}
                    </div>
                    <p className="text-xs text-slate-500">{doc.specialty}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {doc.rating} (
                        {doc.reviewCount})
                      </span>
                      <span>•</span>
                      <span>Rp {(doc.priceRegular / 1000).toLocaleString('id-ID')}rb</span>
                    </div>
                  </div>
                </div>

                {/* Slot Chips */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1">
                    <Calendar className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                    Jadwal {DATES[selectedDate].day}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => {
                      const isPenuh = slot.status === 'penuh';
                      return (
                        <button
                          key={slot.time}
                          disabled={isPenuh}
                          onClick={() => openDoctorBooking(doc, slot.time, slot.isExecutive)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                            isPenuh
                              ? 'bg-slate-100 border-slate-200 text-slate-400 line-through cursor-not-allowed'
                              : slot.isExecutive
                              ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                              : slot.status === 'hampir_penuh'
                              ? 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100'
                              : `${theme.softBg} ${theme.softBorder} ${theme.primaryText}`
                          }`}
                        >
                          {slot.isExecutive && <Sparkles className="w-3 h-3 text-amber-500" />}
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
