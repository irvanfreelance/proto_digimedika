import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { CLINICS } from '../../data/mockData';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

export const TvDisplayPage: React.FC = () => {
  const { queues, clinicType, t } = useDemo();
  const clinic = CLINICS[clinicType];
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const active = queues.find((q) => q.status === 'dipanggil') || queues[0];
  const nextList = queues.filter((q) => q.id !== active?.id && q.status !== 'selesai').slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between p-6 lg:p-10 select-none">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#059669] flex items-center justify-center font-display font-bold text-xl shadow-lg">
            DM
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">{clinic.name}</h1>
            <p className="text-sm text-emerald-400 font-medium">{clinic.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher dark />
          <div className="text-right">
          <p className="font-display font-extrabold font-mono text-3xl text-white">
            {now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-xs text-slate-400">
            {now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        </div>
      </header>

      {/* Main Display */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
        {/* Currently Called */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#059669] to-[#047857] rounded-3xl p-10 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full">
              {t.tvCalled}
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-emerald-100">
              <Volume2 className="w-5 h-5 animate-pulse" /> Suara Pemanggil Aktif
            </span>
          </div>

          <div className="my-6">
            <p className="font-display font-extrabold text-8xl lg:text-9xl tracking-tight">
              {active?.number || 'E-02'}
            </p>
            <p className="text-2xl font-bold text-emerald-50 mt-3">{active?.patientName}</p>
          </div>

          <div className="border-t border-white/20 pt-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-100/80">Ruang Tujuan</p>
              <p className="font-display text-2xl font-bold">{active?.room || 'Ruang Laser 1 (Lt. 2)'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-emerald-100/80">{t.tvDoctor}</p>
              <p className="text-lg font-semibold">{active?.doctorName}</p>
            </div>
          </div>
        </div>

        {/* Next Queues */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold uppercase tracking-wider text-slate-400">
              {t.tvNext}
            </h2>
            <div className="space-y-3">
              {nextList.map((q) => (
                <div
                  key={q.id}
                  className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-display font-extrabold text-2xl text-emerald-400">{q.number}</p>
                    <p className="text-xs text-slate-300 mt-0.5">{q.patientName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-white">{q.room}</p>
                    <p className="text-[11px] text-slate-400">± {q.estimatedWaitMin} mnt</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
            Scan QR di lobi untuk Check-in Mandiri atau ambil nomor Walk-in Digital.
          </div>
        </div>
      </main>

      {/* Bottom Ticker */}
      <footer className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between text-xs text-slate-300">
        <span className="font-bold text-emerald-400">INFO KLINIK</span>
        <span>Selamat datang di {clinic.name} • Jam Operasional: {clinic.openHours}</span>
        <span className="text-slate-500">DigiMedika Display OS</span>
      </footer>
    </div>
  );
};
