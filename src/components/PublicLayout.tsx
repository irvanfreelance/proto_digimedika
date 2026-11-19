import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Home,
  CalendarSearch,
  Ticket,
  ClipboardList,
  User,
  Sparkles,
  Eye,
  FlaskConical,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { ClinicType } from '../data/mockData';
import { getClinicTheme } from '../utils/clinicTheme';

export const PublicLayout: React.FC = () => {
  const { clinicType, setClinicType } = useDemo();
  const navigate = useNavigate();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const theme = getClinicTheme(clinicType);

  const clinicTabs: { id: ClinicType; label: string; dotColor: string; icon: React.ReactNode }[] = [
    {
      id: 'kecantikan',
      label: 'Aesthetic',
      dotColor: 'bg-pink-600',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: 'mata_gigi',
      label: 'Mata & Gigi',
      dotColor: 'bg-blue-600',
      icon: <Eye className="w-3.5 h-3.5" />,
    },
    {
      id: 'lab',
      label: 'Umum & Lab',
      dotColor: 'bg-[#059669]',
      icon: <FlaskConical className="w-3.5 h-3.5" />,
    },
  ];

  const activeTab = clinicTabs.find((t) => t.id === clinicType)!;

  const navItems = [
    { to: '/', label: 'Beranda', icon: Home, end: true },
    { to: '/booking', label: 'Booking', icon: CalendarSearch },
    { to: '/antrian', label: 'Antrian', icon: Ticket },
    { to: '/riwayat', label: 'Riwayat', icon: ClipboardList },
    { to: '/akun', label: 'Akun', icon: User },
  ];

  return (
    <div className={`min-h-screen ${theme.outerBg} flex justify-center transition-colors duration-300`}>
      {/* Mobile-First Container */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#F8FAF9] shadow-2xl flex flex-col relative border-x border-slate-900/5">
        {/* Clean Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} flex items-center justify-center text-white font-display font-bold text-sm shadow-sm transition-all`}
            >
              DM
            </div>
            <div>
              <span className="font-display font-bold text-[#1E293B] text-base tracking-tight">
                Digi<span className={theme.primaryText}>Medika</span>
              </span>
              <span
                className={`ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.softBorder}`}
              >
                {activeTab.label}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/panel/login')}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#1E293B] text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Panel Admin
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-24 overflow-y-auto">
          <Outlet />
        </main>

        {/* Floating Clinic Switcher (Bottom Right) */}
        <div className="fixed bottom-20 z-40 w-full max-w-[430px] pointer-events-none flex justify-end px-4">
          <div className="pointer-events-auto flex flex-col items-end gap-2">
            {switcherOpen && (
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-1.5 shadow-xl flex flex-col gap-1 min-w-[160px]">
                {clinicTabs.map((tab) => {
                  const active = clinicType === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setClinicType(tab.id);
                        setSwitcherOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? `${theme.softBg} ${theme.primaryText}`
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-white text-xs font-semibold shadow-lg transition-all cursor-pointer bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} hover:opacity-95`}
              title="Ganti Vibe Klinik"
            >
              {switcherOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <SlidersHorizontal className="w-4 h-4" />
              )}
              <span>{activeTab.label}</span>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 z-30">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                      isActive
                        ? `${theme.primaryText} ${theme.softBg}`
                        : 'text-slate-400 hover:text-slate-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                      <span className="text-[10px] font-semibold">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};
