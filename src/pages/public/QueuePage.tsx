import React, { useEffect, useState } from 'react';
import {
  QrCode,
  Navigation,
  Accessibility,
  Volume2,
  PlusCircle,
  CheckCircle2,
  RefreshCw,
  Clock,
  Users,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { getClinicTheme } from '../../utils/clinicTheme';

export const QueuePage: React.FC = () => {
  const { clinicType, activeBooking, checkInBooking, addWalkInQueue } = useDemo();
  const theme = getClinicTheme(clinicType);

  const [wheelchairMode, setWheelchairMode] = useState(false);
  const [walkInSuccess, setWalkInSuccess] = useState<string | null>(null);

  // Simulasi Real-time Antrian
  const totalQueue = 8;
  const myOrder = 5;
  const [currentOrder, setCurrentOrder] = useState(2);
  const [lastUpdated, setLastUpdated] = useState('Baru saja');

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

  // Auto-update berkala setiap 12 detik untuk simulasi real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOrder((prev) => (prev < myOrder ? prev + 1 : 2));
      setLastUpdated(
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleAdvanceQueue = () => {
    setCurrentOrder((prev) => (prev < myOrder ? prev + 1 : 2));
    setLastUpdated(
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
  };

  const handleWalkIn = () => {
    const item = addWalkInQueue('Rina Wijaya (Walk-in)', 'dr. Budi Santoso, Sp.PD', 'Konsultasi Umum');
    setWalkInSuccess(item.number);
  };

  return (
    <div className="px-4 py-4 space-y-5">
      <div>
        <h1 className="font-display text-lg font-bold text-[#1E293B]">Antrian & Tiket Live</h1>
        <p className="text-xs text-slate-500">Pantau posisi antrian & petunjuk arah ruangan</p>
      </div>

      {/* Active Ticket & Live Queue Card */}
      {activeBooking ? (
        <div className={`bg-white rounded-3xl p-4 border ${theme.softBorder} shadow-sm space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${theme.badgeText} ${theme.badgeBg} px-2.5 py-1 rounded-full`}
              >
                {activeBooking.code}
              </span>
              <h2 className="font-display font-bold text-base text-[#1E293B] mt-2">
                {activeBooking.serviceName}
              </h2>
              <p className="text-xs text-slate-500">{activeBooking.doctorName}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <QrCode className="w-14 h-14 text-[#1E293B]" strokeWidth={1.5} />
            </div>
          </div>

          {activeBooking.checkedIn ? (
            <div className={`${theme.softBg} rounded-2xl p-4 border ${theme.softBorder} space-y-3`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[11px] font-semibold ${theme.primaryText}`}>Nomor Tiket Anda</p>
                  <p className={`font-display text-3xl font-extrabold ${theme.primaryText}`}>
                    {activeBooking.queueNumber}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE • {lastUpdated}
                  </span>
                  <p className="text-[11px] text-slate-600 mt-1 font-medium flex items-center justify-end gap-1">
                    <Volume2 className="w-3 h-3" /> {activeBooking.room}
                  </p>
                </div>
              </div>

              {/* Prominent Realtime Countdown Banner */}
              <div className="bg-amber-300 text-amber-950 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Estimasi Countdown Giliran
                  </p>
                  <p className="font-display font-extrabold font-mono text-3xl leading-tight tracking-tight mt-0.5">
                    {countdownSec === 0 ? 'GILIRAN ANDA!' : formatCountdown(countdownSec)}
                  </p>
                  {countdownSec > 0 && (
                    <p className="text-[11px] font-semibold opacity-85 mt-0.5">
                      {formatCountdownText(countdownSec)}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-950/15">
                  {remainingQueues === 0 ? 'Siap' : `${remainingQueues} lagi`}
                </span>
              </div>

              {/* Detail Urutan & Sedang Dilayani */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="bg-white/80 rounded-xl p-2.5">
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Posisi Anda
                  </p>
                  <p className="font-bold text-[#1E293B] mt-0.5">
                    Urutan ke-{myOrder} dari {totalQueue}
                  </p>
                </div>
                <div className="bg-white/80 rounded-xl p-2.5">
                  <p className="text-[10px] text-slate-500">Sedang Dihandle</p>
                  <p className="font-bold text-[#1E293B] mt-0.5">
                    Urutan ke-{currentOrder} (E-0{currentOrder})
                  </p>
                </div>
              </div>

              <button
                onClick={handleAdvanceQueue}
                className={`w-full py-2 rounded-xl bg-white border ${theme.softBorder} ${theme.primaryText} text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Simulasikan Antrian Maju / Refresh Live
              </button>
            </div>
          ) : (
            <button
              onClick={checkInBooking}
              className={`w-full py-3 rounded-2xl ${theme.primaryBg} ${theme.primaryHoverBg} text-white font-semibold text-sm transition-colors cursor-pointer`}
            >
              Check-in Mandiri Sekarang
            </button>
          )}
        </div>
      ) : null}

      {/* Wayfinder Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl ${theme.softBg} ${theme.primaryText} flex items-center justify-center`}>
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-[#1E293B]">Wayfinder Klinik</h3>
              <p className="text-[11px] text-slate-500">
                Tujuan: {activeBooking?.room || 'Ruang Laser 1 (Lt. 2)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setWheelchairMode(!wheelchairMode)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border flex items-center gap-1 cursor-pointer transition-all ${
              wheelchairMode
                ? `${theme.primaryBg} ${theme.primaryBorder} text-white`
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" />
            Kursi Roda
          </button>
        </div>

        <div className="bg-[#F8FAF9] rounded-2xl p-3.5 border border-slate-200/70 space-y-2.5">
          {[
            '1. Dari Lobi Utama / Meja Front Desk, lurus 15 meter ke arah kanan.',
            wheelchairMode
              ? '2. Gunakan Lift Prioritas (sebelah Apotek) menuju Lantai 2.'
              : '2. Naik tangga utama atau Lift menuju Lantai 2.',
            '3. Belok kiri di koridor utama — Ruang tujuan berada di pintu kedua.',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
              <span className={`w-2 h-2 rounded-full ${theme.primaryBg} mt-1.5 shrink-0`} />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Walk-in */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-sm text-[#1E293B]">Walk-in Digital</h3>
            <p className="text-[11px] text-slate-500">
              Datang langsung tanpa booking? Ambil nomor W- di sini
            </p>
          </div>
          <button
            onClick={handleWalkIn}
            className={`px-3 py-2 rounded-xl ${theme.softBg} ${theme.primaryText} font-semibold text-xs flex items-center gap-1 cursor-pointer`}
          >
            <PlusCircle className="w-4 h-4" /> Ambil W-
          </button>
        </div>

        {walkInSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
            Nomor Walk-in <strong>{walkInSuccess}</strong> berhasil diambil & masuk ke antrian admin!
          </div>
        )}
      </div>
    </div>
  );
};
