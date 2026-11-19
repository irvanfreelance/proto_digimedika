import React, { useState } from 'react';
import { Pill, FlaskConical, Sparkles, Truck, Store, FileText } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { INITIAL_LAB_RESULTS } from '../../data/mockData';

export const HistoryPage: React.FC = () => {
  const { prescriptions, choosePrescriptionDelivery } = useDemo();
  const [tab, setTab] = useState<'obat' | 'lab' | 'paket'>('obat');

  return (
    <div className="px-4 py-4 space-y-4">
      <div>
        <h1 className="font-display text-lg font-bold text-[#1E293B]">Riwayat & Hasil Medis</h1>
        <p className="text-xs text-slate-500">Resep, hasil laboratorium, dan saldo paket Anda</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-200/70 p-1 rounded-xl">
        {[
          { id: 'obat', label: 'Obat & Resep', icon: Pill },
          { id: 'lab', label: 'Hasil Lab', icon: FlaskConical },
          { id: 'paket', label: 'Paket', icon: Sparkles },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                active ? 'bg-white text-[#059669] shadow-sm' : 'text-slate-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Obat & Resep */}
      {tab === 'obat' && (
        <div className="space-y-3">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1E293B]">{rx.doctorName}</p>
                  <p className="text-[11px] text-slate-500">{rx.date}</p>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669]">
                  {rx.status}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-2.5">
                {rx.meds.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">{m.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {m.dose} • {m.freq}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400">{m.daysLeft} hari</span>
                  </div>
                ))}
              </div>

              {rx.status === 'Menunggu Pilihan' ? (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => choosePrescriptionDelivery(rx.id, 'ambil')}
                    className="py-2.5 px-3 rounded-xl border border-[#059669] text-[#059669] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#ECFDF5] cursor-pointer"
                  >
                    <Store className="w-3.5 h-3.5" /> Ambil di Klinik
                  </button>
                  <button
                    onClick={() => choosePrescriptionDelivery(rx.id, 'gosend')}
                    className="py-2.5 px-3 rounded-xl bg-[#059669] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#047857] cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" /> Kirim GoSend
                  </button>
                </div>
              ) : rx.deliveryMethod === 'ambil' ? (
                <div className="bg-[#ECFDF5] p-3 rounded-xl text-xs text-[#047857] font-medium">
                  Kode Ambil Apotek: <strong className="text-sm">{rx.pickupCode}</strong>
                </div>
              ) : (
                <div className="bg-emerald-50 p-3 rounded-xl text-xs text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#059669]" /> Driver Dalam Perjalanan
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {rx.driverName} • {rx.driverPlate}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab: Hasil Lab */}
      {tab === 'lab' && (
        <div className="space-y-3">
          {INITIAL_LAB_RESULTS.map((lab) => (
            <div key={lab.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-[#1E293B]">{lab.title}</h3>
                  <p className="text-[11px] text-slate-500">
                    {lab.date} • {lab.doctorName}
                  </p>
                </div>
                <button className="p-2 rounded-xl bg-[#ECFDF5] text-[#059669] hover:bg-emerald-100 cursor-pointer">
                  <FileText className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {lab.parameters.map((p) => (
                  <div key={p.name} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-slate-700">{p.name}</p>
                      <p className="text-[10px] text-slate-400">Normal: {p.normalRange}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="font-bold text-[#1E293B]">
                        {p.value} <span className="font-normal text-slate-400">{p.unit}</span>
                      </span>
                      {p.flag !== 'N' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                          {p.flag}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Paket Treatment */}
      {tab === 'paket' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669]">
              PAKET AKTIF
            </span>
            <span className="text-[11px] text-slate-400">Berlaku s/d 30 Jun 2027</span>
          </div>
          <h3 className="font-display font-bold text-sm text-[#1E293B]">
            Paket Pico Laser Brightening (5 Sesi)
          </h3>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#059669] h-full w-2/5 rounded-full" />
          </div>
          <p className="text-xs text-slate-600">
            Terpakai <strong>2 dari 5 sesi</strong> • Sisa 3 sesi
          </p>
        </div>
      )}
    </div>
  );
};
