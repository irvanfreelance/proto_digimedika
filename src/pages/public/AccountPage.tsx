import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  LogOut,
  Plus,
  Smartphone,
  Lock,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AccountPage: React.FC = () => {
  const {
    isPatientLoggedIn,
    patientName,
    patientPhone,
    loginPatient,
    logoutPatient,
    familyMembers,
    addFamilyMember,
  } = useDemo();
  const navigate = useNavigate();

  const [phoneInput, setPhoneInput] = useState('0812-8899-4411');
  const [otpSent, setOtpSent] = useState(false);
  const [showAddFam, setShowAddFam] = useState(false);
  const [newFamName, setNewFamName] = useState('');
  const [newFamRel, setNewFamRel] = useState('Anak');

  const handleAddFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamName.trim()) return;
    addFamilyMember({
      name: newFamName.trim(),
      relation: newFamRel,
      dob: '10 Jan 2020',
      gender: 'L',
      allergies: [],
    });
    setNewFamName('');
    setShowAddFam(false);
  };

  if (!isPatientLoggedIn) {
    return (
      <div className="px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
            <Smartphone className="w-7 h-7" />
          </div>
          <h1 className="font-display text-xl font-bold text-[#1E293B]">Masuk sebagai Pasien</h1>
          <p className="text-xs text-slate-500">
            Cukup gunakan nomor WhatsApp Anda — tanpa password rumit.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#059669]"
            />
          </div>

          {!otpSent ? (
            <button
              onClick={() => setOtpSent(true)}
              className="w-full py-3 rounded-xl bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] cursor-pointer"
            >
              Kirim Kode OTP WhatsApp
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-[#059669] font-medium">
                Kode OTP 6-digit terkirim ke {phoneInput} (Simulasi: 123456)
              </p>
              <button
                onClick={() => {
                  loginPatient(phoneInput);
                  setOtpSent(false);
                }}
                className="w-full py-3 rounded-xl bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] cursor-pointer"
              >
                Verifikasi & Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white font-display font-bold flex items-center justify-center text-lg">
            RW
          </div>
          <div>
            <h1 className="font-display font-bold text-base text-[#1E293B]">{patientName}</h1>
            <p className="text-xs text-slate-500">{patientPhone} • Terverifikasi</p>
          </div>
        </div>
        <button
          onClick={logoutPatient}
          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          title="Keluar"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Family Profiles */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#059669]" />
            <h2 className="font-display font-bold text-sm text-[#1E293B]">
              Satu Akun Keluarga ({familyMembers.length})
            </h2>
          </div>
          <button
            onClick={() => setShowAddFam(!showAddFam)}
            className="text-xs font-semibold text-[#059669] flex items-center gap-0.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah
          </button>
        </div>

        {showAddFam && (
          <form onSubmit={handleAddFamily} className="bg-[#F8FAF9] p-3 rounded-2xl space-y-2 border border-slate-200">
            <input
              type="text"
              placeholder="Nama anggota keluarga"
              value={newFamName}
              onChange={(e) => setNewFamName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
            />
            <div className="flex gap-2">
              <select
                value={newFamRel}
                onChange={(e) => setNewFamRel(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white flex-1"
              >
                <option value="Anak">Anak</option>
                <option value="Pasangan">Pasangan</option>
                <option value="Orang Tua">Orang Tua</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#059669] text-white text-xs font-semibold cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {familyMembers.map((fam) => (
            <div
              key={fam.id}
              className="p-3 rounded-2xl bg-[#F8FAF9] border border-slate-100 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-[#1E293B]">{fam.name}</p>
                <p className="text-[11px] text-slate-500">
                  {fam.relation} • {fam.rmNumber}
                </p>
              </div>
              {fam.allergies.length > 0 && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {fam.allergies[0]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Admin Switch */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Lock className="w-4 h-4 text-[#059669]" />
          <span>Data medis Anda dilindungi sesuai standar UU PDP.</span>
        </div>

        <button
          onClick={() => navigate('/panel/login')}
          className="w-full py-3 px-4 rounded-2xl bg-[#1E293B] text-white text-xs font-semibold flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Buka Prototype Panel Admin (/panel)
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
