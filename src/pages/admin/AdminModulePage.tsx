import React, { useState } from 'react';
import {
  Tv,
  Stethoscope,
  CreditCard,
  Pill,
  Settings,
  Users,
  CalendarDays,
  Clock,
  Database,
  BarChart3,
  Plus,
  Search,
  Send,
  Volume2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

interface AdminModuleProps {
  module:
    | 'agenda'
    | 'front-desk'
    | 'display'
    | 'waiting-list'
    | 'pasien'
    | 'klinis'
    | 'kasir'
    | 'apotek'
    | 'master'
    | 'laporan'
    | 'pengaturan';
}

const Scorecard: React.FC<{ label: string; value: string; sub?: string }> = ({
  label,
  value,
  sub,
}) => (
  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
    <p className="text-xs font-semibold text-slate-500">{label}</p>
    <p className="font-display text-2xl font-extrabold text-[#1E293B] mt-1">{value}</p>
    {sub && <p className="text-[11px] text-[#059669] font-medium mt-1">{sub}</p>}
  </div>
);

export const AdminModulePage: React.FC<AdminModuleProps> = ({ module }) => {
  const { queues, addWalkInQueue, familyMembers } = useDemo();
  const [search, setSearch] = useState('');
  const [walkInName, setWalkInName] = useState('');
  const [walkInDoc, setWalkInDoc] = useState('dr. Budi Santoso, Sp.PD');
  const [walkInMsg, setWalkInMsg] = useState<string | null>(null);
  const [soapNote, setSoapNote] = useState('Keluhan membaik, lanjutkan terapi topikal.');
  const [soapSaved, setSoapSaved] = useState(false);

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) return;
    const item = addWalkInQueue(walkInName.trim(), walkInDoc, 'Walk-in Poli');
    setWalkInMsg(`Nomor antrian ${item.number} untuk ${item.patientName} berhasil dibuat!`);
    setWalkInName('');
  };

  if (module === 'agenda') {
    const rows = [
      { code: 'DM-8824', time: '10:15', patient: 'Rina Wijaya', service: 'Pico Laser Brightening', lane: 'Eksekutif', status: 'Check-in' },
      { code: 'DM-8825', time: '10:30', patient: 'Dian Pertiwi', service: 'Konsultasi Kulit', lane: 'Regular', status: 'Menunggu' },
      { code: 'DM-8826', time: '11:00', patient: 'Kevin Hartono', service: 'Skrining Mata', lane: 'Eksekutif', status: 'Terkonfirmasi' },
      { code: 'DM-8827', time: '11:30', patient: 'Siti Aminah', service: 'Panel Metabolik', lane: 'Regular', status: 'Menunggu' },
    ];
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-[#059669]" />
            <div>
              <h1 className="font-display text-xl font-bold text-[#1E293B]">Agenda & Booking</h1>
              <p className="text-xs text-slate-500">Jadwal hari ini: 19 Nov 2026</p>
            </div>
          </div>
          <button className="px-3.5 py-2 rounded-xl bg-[#059669] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#047857] cursor-pointer">
            <Plus className="w-4 h-4" /> Buat Booking
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Scorecard label="Total Booking" value="42" sub="+12% dari kemarin" />
          <Scorecard label="Sudah Check-in" value="34" sub="81% hadir tepat waktu" />
          <Scorecard label="Slot Eksekutif" value="11" sub="3 slot tersisa" />
          <Scorecard label="No-Show" value="1" sub="2.3% (Target < 5%)" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <h2 className="font-display font-bold text-sm text-[#1E293B]">Daftar Booking Hari Ini</h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari kode / nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Kode</th>
                  <th className="px-4 py-2.5 font-semibold">Jam</th>
                  <th className="px-4 py-2.5 font-semibold">Pasien</th>
                  <th className="px-4 py-2.5 font-semibold">Layanan / Paket</th>
                  <th className="px-4 py-2.5 font-semibold">Jalur</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows
                  .filter((r) => r.patient.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase()))
                  .map((r) => (
                    <tr key={r.code} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-bold text-[#059669]">{r.code}</td>
                      <td className="px-4 py-3">{r.time}</td>
                      <td className="px-4 py-3 font-semibold text-[#1E293B]">{r.patient}</td>
                      <td className="px-4 py-3 text-slate-600">{r.service}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.lane === 'Eksekutif' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                          {r.lane}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#047857]">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (module === 'front-desk') {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-xl font-bold text-[#1E293B]">Front Desk & Walk-in</h1>
          <p className="text-xs text-slate-500">Registrasi cepat ≤ 90 detik & penerbitan nomor Walk-in (W-)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <form onSubmit={handleWalkInSubmit} className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h2 className="font-display font-bold text-sm text-[#1E293B]">Form Daftar Walk-in Baru</h2>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Nama Pasien</label>
              <input
                type="text"
                placeholder="cth. Andi Wijaya"
                value={walkInName}
                onChange={(e) => setWalkInName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Dokter / Poli Tujuan</label>
              <select
                value={walkInDoc}
                onChange={(e) => setWalkInDoc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option>dr. Budi Santoso, Sp.PD</option>
                <option>dr. Nadia Kusuma, Sp.DVE</option>
                <option>drg. Arya Pratama, Sp.Ort</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#059669] text-white text-xs font-semibold hover:bg-[#047857] cursor-pointer"
            >
              Terbitkan Nomor Walk-in (W-)
            </button>
            {walkInMsg && (
              <div className="p-2.5 rounded-xl bg-[#ECFDF5] text-[#047857] text-xs font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {walkInMsg}
              </div>
            )}
          </form>

          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 space-y-3">
            <h2 className="font-display font-bold text-sm text-[#1E293B]">Antrian Check-in Terbaru</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Nomor</th>
                    <th className="px-3 py-2 font-semibold">Pasien</th>
                    <th className="px-3 py-2 font-semibold">Ruang</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queues.slice(0, 5).map((q) => (
                    <tr key={q.id}>
                      <td className="px-3 py-2.5 font-bold text-[#059669]">{q.number}</td>
                      <td className="px-3 py-2.5 font-semibold text-[#1E293B]">{q.patientName}</td>
                      <td className="px-3 py-2.5 text-slate-500">{q.room}</td>
                      <td className="px-3 py-2.5 uppercase text-[10px] font-bold text-slate-600">{q.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (module === 'display') {
    const active = queues.find((q) => q.status === 'dipanggil') || queues[0];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#059669]" />
            <h1 className="font-display text-xl font-bold text-[#1E293B]">Layar Antrian (TV Display)</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> TTS Aktif
            </span>
            <a
              href="/display-tv"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#059669] text-white text-xs font-semibold hover:bg-[#047857] transition-colors"
            >
              Buka di Tab Baru (Mode TV) ↗
            </a>
          </div>
        </div>

        <div className="bg-[#0F172A] text-white rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-xl">
          <div className="lg:col-span-2 bg-gradient-to-br from-[#059669] to-[#047857] rounded-2xl p-8 flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">
              Sedang Dipanggil
            </span>
            <p className="font-display text-6xl font-extrabold my-4">{active?.number || 'E-02'}</p>
            <div>
              <p className="text-lg font-bold">{active?.room || 'Ruang Laser 1 (Lt. 2)'}</p>
              <p className="text-xs text-emerald-100">{active?.doctorName}</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Berikutnya</p>
            {queues.slice(1, 5).map((q) => (
              <div key={q.id} className="bg-slate-800/80 rounded-xl p-3 flex items-center justify-between">
                <span className="font-display font-bold text-lg text-emerald-400">{q.number}</span>
                <span className="text-xs text-slate-300">{q.room}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (module === 'pasien') {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <Users className="w-6 h-6 text-[#059669]" />
          <div>
            <h1 className="font-display text-xl font-bold text-[#1E293B]">Manajemen Pasien</h1>
            <p className="text-xs text-slate-500">Daftar rekam medis, alergi, & deteksi data ganda</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Scorecard label="Total Pasien" value="2.480" sub="+64 bulan ini" />
          <Scorecard label="Akun Keluarga" value="612" sub="Terhubung" />
          <Scorecard label="Kandidat Duplikat" value="2" sub="Perlu tinjau" />
          <Scorecard label="Consent UU PDP" value="100%" sub="Tersimpan" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-semibold">No. RM</th>
                <th className="px-4 py-2.5 font-semibold">Nama</th>
                <th className="px-4 py-2.5 font-semibold">Hubungan</th>
                <th className="px-4 py-2.5 font-semibold">Tgl Lahir</th>
                <th className="px-4 py-2.5 font-semibold">Alergi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {familyMembers.map((f) => (
                <tr key={f.id}>
                  <td className="px-4 py-3 font-bold text-[#059669]">{f.rmNumber}</td>
                  <td className="px-4 py-3 font-semibold text-[#1E293B]">{f.name}</td>
                  <td className="px-4 py-3 text-slate-600">{f.relation}</td>
                  <td className="px-4 py-3 text-slate-500">{f.dob}</td>
                  <td className="px-4 py-3">
                    {f.allergies.length > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold">
                        {f.allergies.join(', ')}
                      </span>
                    ) : (
                      <span className="text-slate-400">Tidak ada</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (module === 'klinis') {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <Stethoscope className="w-6 h-6 text-[#059669]" />
          <div>
            <h1 className="font-display text-xl font-bold text-[#1E293B]">Klinis (RME Ringkas & Lab)</h1>
            <p className="text-xs text-slate-500">Input catatan SOAP, ICD-10, dan validasi hasil lab</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-3">
          <h2 className="font-display font-bold text-sm text-[#1E293B]">
            Form RME Ringkas — Rina Wijaya (RM-2026-0841)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Diagnosis ICD-10</label>
              <input
                type="text"
                defaultValue="L81.4 - Hyperpigmentation"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tindakan / Paket</label>
              <input
                type="text"
                defaultValue="Pico Laser Brightening (Sesi 3/5)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Catatan SOAP</label>
            <textarea
              rows={3}
              value={soapNote}
              onChange={(e) => setSoapNote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
          <button
            onClick={() => setSoapSaved(true)}
            className="px-4 py-2 rounded-xl bg-[#059669] text-white text-xs font-semibold hover:bg-[#047857] cursor-pointer"
          >
            Simpan & Tanda Tangan Elektronik
          </button>
          {soapSaved && (
            <p className="text-xs text-[#059669] font-semibold">✓ RME tersimpan & sesi paket terpotong.</p>
          )}
        </div>
      </div>
    );
  }

  if (module === 'kasir' || module === 'laporan') {
    const bars = [
      { day: 'Sen', val: 65 },
      { day: 'Sel', val: 78 },
      { day: 'Rab', val: 55 },
      { day: 'Kam', val: 90 },
      { day: 'Jum', val: 84 },
      { day: 'Sab', val: 95 },
    ];
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          {module === 'kasir' ? <CreditCard className="w-6 h-6 text-[#059669]" /> : <BarChart3 className="w-6 h-6 text-[#059669]" />}
          <div>
            <h1 className="font-display text-xl font-bold text-[#1E293B]">
              {module === 'kasir' ? 'Kasir & Keuangan' : 'Laporan & Analitik'}
            </h1>
            <p className="text-xs text-slate-500">Rekonsiliasi QRIS, VA, dan tren omzet mingguan</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Scorecard label="Omzet Hari Ini" value="Rp 18,4 Jt" sub="72% via QRIS" />
          <Scorecard label="Transaksi Lunas" value="39" sub="0 gagal" />
          <Scorecard label="Menunggu Bayar" value="1" sub="Hold 10 mnt" />
          <Scorecard label="Rata-rata Tiket" value="Rp 471rb" sub="+8% MoM" />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-4">
          <h2 className="font-display font-bold text-sm text-[#1E293B]">Tren Kunjungan & Omzet Mingguan</h2>
          <div className="flex items-end gap-3 h-36 pt-4">
            {bars.map((b) => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#ECFDF5] rounded-t-xl relative h-28 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-[#059669] rounded-t-xl transition-all"
                    style={{ height: `${b.val}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{b.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (module === 'apotek') {
    const stocks = [
      { name: 'Niacinamide 5% Soothing Gel', batch: 'B-2026-01', exp: 'Des 2027', qty: 4, status: 'Menipis' },
      { name: 'Sunscreen SPF 50+ PA++++', batch: 'B-2026-04', exp: 'Mar 2028', qty: 28, status: 'Aman' },
      { name: 'Amoxicillin 500mg', batch: 'B-2025-11', exp: 'Jan 2027', qty: 140, status: 'Aman' },
    ];
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <Pill className="w-6 h-6 text-[#059669]" />
          <div>
            <h1 className="font-display text-xl font-bold text-[#1E293B]">Apotek & GoSend</h1>
            <p className="text-xs text-slate-500">Kontrol stok FEFO & pengiriman kurir instan</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Produk</th>
                <th className="px-4 py-2.5 font-semibold">Batch</th>
                <th className="px-4 py-2.5 font-semibold">Kedaluwarsa</th>
                <th className="px-4 py-2.5 font-semibold">Stok</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stocks.map((s) => (
                <tr key={s.name}>
                  <td className="px-4 py-3 font-semibold text-[#1E293B]">{s.name}</td>
                  <td className="px-4 py-3 text-slate-500">{s.batch}</td>
                  <td className="px-4 py-3 text-slate-500">{s.exp}</td>
                  <td className="px-4 py-3 font-bold">{s.qty}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'Menipis' ? 'bg-amber-100 text-amber-800' : 'bg-[#ECFDF5] text-[#047857]'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Fallback for waiting-list, master, pengaturan
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        {module === 'waiting-list' ? <Clock className="w-6 h-6 text-[#059669]" /> : module === 'master' ? <Database className="w-6 h-6 text-[#059669]" /> : <Settings className="w-6 h-6 text-[#059669]" />}
        <div>
          <h1 className="font-display text-xl font-bold text-[#1E293B] capitalize">
            {module.replace('-', ' ')}
          </h1>
          <p className="text-xs text-slate-500">Konfigurasi & data operasional DigiMedika</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Scorecard label="Status Sistem" value="Aktif" sub="Sinkronisasi real-time" />
        <Scorecard label="Integrasi WA & QRIS" value="Terhubung" sub="Latensi 120ms" />
        <Scorecard label="Audit Log" value="1.204" sub="Tercatat hari ini" />
      </div>
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[#059669]" />
          <p className="text-xs text-slate-700">
            Semua aturan bisnis (slot Eksekutif, antrian 3 jalur, dan RBAC) aktif berjalan sesuai PRD.
          </p>
        </div>
        <button className="px-3 py-1.5 rounded-xl bg-[#ECFDF5] text-[#047857] text-xs font-semibold flex items-center gap-1 cursor-pointer">
          <Send className="w-3.5 h-3.5" /> Test Notifikasi
        </button>
      </div>
    </div>
  );
};
