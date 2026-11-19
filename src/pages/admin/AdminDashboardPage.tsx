import React from 'react';
import { CalendarCheck, Users, Wallet, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminDashboardPage: React.FC = () => {
  const { queues, adminRole } = useDemo();

  const stats = [
    { label: 'Booking Hari Ini', value: '42', sub: '34 Check-in • 8 Menunggu', icon: CalendarCheck, color: 'text-[#059669] bg-[#ECFDF5]' },
    { label: 'Antrian Live', value: String(queues.filter((q) => q.status !== 'selesai').length), sub: 'Rata-rata tunggu 11 mnt', icon: Clock, color: 'text-sky-600 bg-sky-50' },
    { label: 'Pasien Walk-in', value: '9', sub: 'Kapasitas tersisa 6 slot', icon: Users, color: 'text-amber-600 bg-amber-50' },
    { label: 'Omzet Hari Ini', value: 'Rp 18,4 Jt', sub: '72% QRIS • 28% VA/Tunai', icon: Wallet, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-[#1E293B]">Dashboard Operasional</h1>
        <p className="text-xs text-slate-500">Ringkasan real-time kunjungan, antrian, dan omzet hari ini</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="font-display text-2xl font-extrabold text-[#1E293B] mt-2">{s.value}</p>
              <p className="text-[11px] text-slate-500 mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <p className="font-bold">Peringatan Operasional (3)</p>
          <p>• 2 hasil laboratorium menunggu validasi dokter • Stok Serum Niacinamide tersisa 4 unit • 1 pembayaran QRIS tertunda.</p>
        </div>
      </div>

      {/* Owner Multi-Branch Comparison */}
      {adminRole === 'owner' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#059669]" />
            <h2 className="font-display font-bold text-sm text-[#1E293B]">
              Perbandingan Cabang (Dashboard Owner)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-2 font-semibold">Cabang</th>
                  <th className="py-2 font-semibold">Kunjungan</th>
                  <th className="py-2 font-semibold">Utilisasi Dokter</th>
                  <th className="py-2 font-semibold">No-Show</th>
                  <th className="py-2 font-semibold">Omzet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-semibold text-[#1E293B]">Glow Clinic — Kemang</td>
                  <td className="py-2.5">42</td>
                  <td className="py-2.5 text-[#059669] font-semibold">88%</td>
                  <td className="py-2.5">2.1%</td>
                  <td className="py-2.5 font-bold">Rp 18,4 Jt</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-[#1E293B]">Dental & Eye — Senopati</td>
                  <td className="py-2.5">35</td>
                  <td className="py-2.5 text-[#059669] font-semibold">81%</td>
                  <td className="py-2.5">3.0%</td>
                  <td className="py-2.5 font-bold">Rp 14,2 Jt</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-[#1E293B]">Medika & Lab — Menteng</td>
                  <td className="py-2.5">58</td>
                  <td className="py-2.5 text-[#059669] font-semibold">92%</td>
                  <td className="py-2.5">1.4%</td>
                  <td className="py-2.5 font-bold">Rp 21,9 Jt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
