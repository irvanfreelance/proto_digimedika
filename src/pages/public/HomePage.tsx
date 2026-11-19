import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  FlaskConical,
  Pill,
  Users,
  Navigation,
  Clock,
  Star,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  QrCode,
  RefreshCw,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { CLINICS, DOCTORS, SERVICES } from '../../data/mockData';
import { getClinicTheme } from '../../utils/clinicTheme';

export const HomePage: React.FC = () => {
  const { clinicType, patientName, activeBooking, checkInBooking } = useDemo();
  const navigate = useNavigate();

  const clinic = CLINICS[clinicType];
  const theme = getClinicTheme(clinicType);
  const clinicDoctors = DOCTORS.filter((d) => d.clinicType === clinicType);
  const clinicServices = SERVICES.filter((s) => s.clinicType === clinicType);
  const isPackageBased = clinicType === 'kecantikan' || clinicType === 'lab';

  // Live Queue Simulation on Home
  const totalQueue = 8;
  const myOrder = 5;
  const [currentOrder, setCurrentOrder] = useState(2);
  const remainingQueues = Math.max(0, myOrder - currentOrder);
  const [countdownSec, setCountdownSec] = useState(remainingQueues * 5 * 60);

  useEffect(() => {
    setCountdownSec(remainingQueues * 5 * 60);
  }, [remainingQueues]);

  useEffect(() => {
    const secTimer = setInterval(() => {
      setCountdownSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(secTimer);
  }, []);

  const formatCountdown = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatCountdownText = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h} jam ${m} menit ${s} detik lagi`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOrder((prev) => (prev < myOrder ? prev + 1 : 2));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const heroImage =
    clinicType === 'kecantikan'
      ? '/images/aesthetic.jpg'
      : clinicType === 'mata_gigi'
      ? '/images/dental-eye.jpg'
      : '/images/lab.jpg';

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Greeting & Active Clinic */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">Halo, Selamat Datang 👋</p>
          <h1 className="font-display text-xl font-bold text-[#1E293B] mt-0.5">{patientName}</h1>
          <div className={`flex items-center gap-1 text-xs ${theme.primaryText} font-medium mt-1`}>
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[260px]">{clinic.name}</span>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.softBorder}`}
          >
            {clinic.accentLabel}
          </span>
        </div>
      </div>

      {/* Realistic Clinic Banner */}
      <div className="relative rounded-2xl overflow-hidden h-36 shadow-sm border border-slate-200/60">
        <img
          src={heroImage}
          alt={clinic.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent flex flex-col justify-end p-3.5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
            {isPackageBased ? 'Booking by Paket' : 'Booking by Dokter'}
          </p>
          <p className="font-display font-bold text-sm">{clinic.tagline}</p>
        </div>
      </div>

      {/* Quick Search */}
      <button
        onClick={() => navigate('/booking')}
        className="w-full flex items-center gap-3 bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-left shadow-sm hover:border-[#059669]/40 transition-all cursor-pointer"
      >
        <Search className="w-4 h-4 text-[#059669]" />
        <span className="text-sm text-slate-400 flex-1">Cari dokter, layanan, atau lab...</span>
        <span className="text-[11px] font-semibold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-md">
          Booking
        </span>
      </button>

      {/* Upcoming Booking Card */}
      {activeBooking && (
        <div
          className={`rounded-2xl bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} p-4 text-white shadow-lg relative overflow-hidden transition-all`}
        >
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Booking Mendatang • {activeBooking.code}
            </span>
            {activeBooking.isExecutive && (
              <span className="text-[10px] font-bold bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> EKSEKUTIF
              </span>
            )}
          </div>

          <h2 className="font-display font-bold text-base">{activeBooking.serviceName}</h2>
          <p className="text-xs text-emerald-50 mt-0.5">{activeBooking.doctorName}</p>

          <div className="flex items-center gap-4 mt-3 text-xs text-emerald-50">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {activeBooking.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {activeBooking.room}
            </span>
          </div>

          {activeBooking.checkedIn && (
            <div className="mt-3 space-y-2">
              <div className="bg-amber-300 text-amber-950 rounded-2xl px-3.5 py-2.5 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                    Estimasi Giliran Anda
                  </p>
                  <p className="font-display font-extrabold font-mono text-2xl leading-tight tracking-tight">
                    {countdownSec === 0 ? 'GILIRAN ANDA!' : formatCountdown(countdownSec)}
                  </p>
                  {countdownSec > 0 && (
                    <p className="text-[11px] font-semibold opacity-85 mt-0.5">
                      {formatCountdownText(countdownSec)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setCurrentOrder((prev) => (prev < myOrder ? prev + 1 : 2))}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-950/15 hover:bg-amber-950/25 text-amber-950 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Simulasikan Antrian Maju"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Maju
                </button>
              </div>

              <div className="bg-white/15 backdrop-blur-xs rounded-xl p-2.5 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <p className="text-white/75 text-[10px]">Posisi Anda</p>
                  <p className="font-bold">Urutan {myOrder}/{totalQueue}</p>
                </div>
                <div>
                  <p className="text-white/75 text-[10px]">Dihandle</p>
                  <p className="font-bold">Urutan {currentOrder}</p>
                </div>
                <div>
                  <p className="text-white/75 text-[10px]">Sisa</p>
                  <p className="font-bold">
                    {remainingQueues === 0 ? 'Sekarang' : `${remainingQueues} lagi`}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2">
            {activeBooking.checkedIn ? (
              <>
                <button
                  onClick={() => navigate('/antrian')}
                  className="flex-1 bg-white text-[#047857] font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  Antrian {activeBooking.queueNumber} • Live
                </button>
                <button
                  onClick={() => navigate('/antrian')}
                  className="px-3 py-2.5 rounded-xl bg-white/15 text-white text-xs font-semibold hover:bg-white/25 transition-colors cursor-pointer"
                >
                  Wayfinder
                </button>
              </>
            ) : (
              <button
                onClick={checkInBooking}
                className="flex-1 bg-white text-[#047857] font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                Check-in Mandiri / Saya Sudah Dekat
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quick Shortcuts */}
      <div>
        <h3 className="font-display font-bold text-sm text-[#1E293B] mb-2.5">Pintasan Cepat</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { label: 'Hasil Lab', icon: FlaskConical, to: '/riwayat', color: 'bg-emerald-50 text-[#059669]' },
            { label: 'Obat Saya', icon: Pill, to: '/riwayat', color: 'bg-teal-50 text-teal-700' },
            { label: 'Keluarga', icon: Users, to: '/akun', color: 'bg-sky-50 text-sky-700' },
            { label: 'Wayfinder', icon: Navigation, to: '/antrian', color: 'bg-amber-50 text-amber-700' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="flex flex-col items-center gap-1.5 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Services / Packages */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-display font-bold text-sm text-[#1E293B]">
            {isPackageBased ? 'Paket Unggulan' : 'Layanan Unggulan'}
          </h3>
          <button
            onClick={() => navigate('/booking')}
            className="text-xs font-semibold text-[#059669] flex items-center gap-0.5 cursor-pointer"
          >
            Lihat semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-2.5">
          {clinicServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigate('/booking')}
              className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-slate-300 transition-all cursor-pointer"
            >
              <img
                src={heroImage}
                alt={srv.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
              />
              <div className="min-w-0 flex-1">
                <span className={`text-[10px] font-semibold ${theme.badgeText} ${theme.badgeBg} px-2 py-0.5 rounded-full`}>
                  {srv.category}
                </span>
                <h4 className="font-display font-bold text-sm text-[#1E293B] mt-1 truncate">
                  {srv.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{srv.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-bold ${theme.primaryText}`}>
                  Rp {(srv.priceRegular / 1000).toLocaleString('id-ID')}rb
                </p>
                <p className="text-[10px] text-slate-400">{srv.durationMin} mnt</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Doctors */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-display font-bold text-sm text-[#1E293B]">Dokter Rekomendasi</h3>
          <button
            onClick={() => navigate('/booking')}
            className="text-xs font-semibold text-[#059669] flex items-center gap-0.5 cursor-pointer"
          >
            Jadwal <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-2.5">
          {clinicDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate('/booking')}
              className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 hover:border-emerald-200 transition-all cursor-pointer"
            >
              <img
                src={doc.name.includes('Arya') || doc.name.includes('Hendra') || doc.name.includes('Budi') ? '/images/doctor-male.jpg' : '/images/doctor-female.jpg'}
                alt={doc.name}
                className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="font-display font-bold text-sm text-[#1E293B] truncate">
                    {doc.name}
                  </h4>
                  {doc.strVerified && <BadgeCheck className="w-4 h-4 text-[#059669] shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 truncate">{doc.specialty}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {doc.rating}
                  </span>
                  <span>{doc.experienceYears} thn pengalaman</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
