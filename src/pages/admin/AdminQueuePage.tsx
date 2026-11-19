import React from 'react';
import { Volume2, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminQueuePage: React.FC = () => {
  const { queues, updateQueueStatus, escalateQueueToExecutive } = useDemo();

  const lanes: { id: 'E' | 'A' | 'W'; title: string; badge: string }[] = [
    { id: 'E', title: 'Jalur Eksekutif (E-)', badge: 'bg-amber-100 text-amber-900' },
    { id: 'A', title: 'Jalur Booking (A-)', badge: 'bg-[#ECFDF5] text-[#047857]' },
    { id: 'W', title: 'Jalur Walk-in (W-)', badge: 'bg-sky-100 text-sky-800' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-bold text-[#1E293B]">Kontrol Antrian 3 Jalur</h1>
        <p className="text-xs text-slate-500">
          Kelola antrian Eksekutif, Booking, dan Walk-in secara real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {lanes.map((lane) => {
          const items = queues.filter((q) => q.lane === lane.id && q.status !== 'selesai');
          return (
            <div key={lane.id} className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="font-display font-bold text-sm text-[#1E293B]">{lane.title}</h2>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${lane.badge}`}>
                  {items.length} aktif
                </span>
              </div>

              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#F8FAF9] border border-slate-200/70 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-base text-[#059669]">
                        {item.number}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1E293B]">{item.patientName}</p>
                      <p className="text-[11px] text-slate-500">
                        {item.doctorName} • {item.room}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => updateQueueStatus(item.id, 'dipanggil')}
                        className="px-2.5 py-1 rounded-lg bg-[#059669] text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-[#047857] cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" /> Panggil
                      </button>
                      <button
                        onClick={() => updateQueueStatus(item.id, 'dilayani')}
                        className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-sky-700 cursor-pointer"
                      >
                        <Play className="w-3 h-3" /> Mulai
                      </button>
                      <button
                        onClick={() => updateQueueStatus(item.id, 'selesai')}
                        className="px-2.5 py-1 rounded-lg bg-slate-700 text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-slate-800 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Selesai
                      </button>
                      {item.lane !== 'E' && (
                        <button
                          onClick={() => escalateQueueToExecutive(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-[11px] font-semibold flex items-center gap-1 hover:bg-amber-200 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" /> Eskalasi E-
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-6">Tidak ada antrian aktif</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
