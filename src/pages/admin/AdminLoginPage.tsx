import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Building2, Stethoscope, Pill, UserCheck } from 'lucide-react';
import { AdminRole, useDemo } from '../../context/DemoContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useDemo();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@digimedika.id');
  const [password, setPassword] = useState('••••••••');

  const handleRoleLogin = (role: AdminRole) => {
    loginAdmin(role);
    navigate('/panel');
  };

  const roles: { id: AdminRole; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'owner',
      label: 'Owner / Super Admin',
      desc: 'Akses penuh semua cabang, laporan & pengaturan',
      icon: <Building2 className="w-4 h-4 text-emerald-600" />,
    },
    {
      id: 'frontdesk',
      label: 'Front Desk & Kasir',
      desc: 'Check-in, antrian 3 jalur, walk-in & pembayaran',
      icon: <UserCheck className="w-4 h-4 text-sky-600" />,
    },
    {
      id: 'dokter',
      label: 'Dokter / Expert',
      desc: 'Antrian poli, RME ringkas (SOAP), resep & foto',
      icon: <Stethoscope className="w-4 h-4 text-amber-600" />,
    },
    {
      id: 'apotek',
      label: 'Apotek & Lab',
      desc: 'Stok obat, GoSend, input & validasi hasil lab',
      icon: <Pill className="w-4 h-4 text-purple-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col lg:flex-row">
      {/* Left Branding Panel */}
      <div className="lg:w-5/12 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#132A24] to-[#064E3B] text-white">
        <div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Aplikasi Pasien
          </button>

          <div className="mt-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#059669] flex items-center justify-center font-display font-bold text-lg shadow-lg">
              DM
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">
                DigiMedika <span className="text-emerald-400">Panel</span>
              </h1>
              <p className="text-xs text-emerald-200/80">Internal Clinic Operating System</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-300 leading-relaxed max-w-md">
            Satu sistem terintegrasi untuk Front Desk, Kontrol Antrian 3 Jalur (Eksekutif / Booking /
            Walk-in), RME Ringkas, Kasir, Apotek, hingga Dashboard Multi-Cabang.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Prototype Simulasi Role-Based Access Control (RBAC)</span>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="lg:w-7/12 bg-[#F8FAF9] p-6 sm:p-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-xl border border-slate-200/70 space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold text-[#1E293B]">Masuk Portal Internal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Gunakan akun staf atau pilih simulasi peran di bawah ini.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRoleLogin('owner');
            }}
            className="space-y-3.5"
          >
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Email Staf</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#059669]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#059669]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] transition-colors cursor-pointer"
            >
              Masuk sebagai Owner
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Quick Demo Login (Pilih Peran)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleLogin(r.id)}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-[#059669] hover:bg-[#ECFDF5]/40 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {r.icon}
                    <span className="text-xs font-bold text-[#1E293B] group-hover:text-[#059669]">
                      {r.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-snug">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
