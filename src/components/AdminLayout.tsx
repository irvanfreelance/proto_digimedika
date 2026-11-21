import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  ListOrdered,
  UserCheck,
  Tv,
  Clock,
  Users,
  Stethoscope,
  CreditCard,
  Pill,
  Database,
  BarChart3,
  Settings,
  LogOut,
  Smartphone,
  Menu,
  X,
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { CLINICS, ClinicType } from '../data/mockData';
import { LanguageSwitcher } from './LanguageSwitcher';

export const AdminLayout: React.FC = () => {
  const { adminRole, logoutAdmin, clinicType, setClinicType, t } = useDemo();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!adminRole) {
    return <Navigate to="/panel/login" replace />;
  }

  const menuGroups = [
    {
      title: 'Utama',
      items: [{ to: '/panel', label: 'Dashboard', icon: LayoutDashboard, end: true }],
    },
    {
      title: 'Operasional Harian',
      items: [
        { to: '/panel/agenda', label: 'Agenda & Booking', icon: CalendarDays },
        { to: '/panel/antrian', label: 'Kontrol Antrian (E/A/W)', icon: ListOrdered },
        { to: '/panel/front-desk', label: 'Front Desk & Walk-in', icon: UserCheck },
        { to: '/panel/display', label: 'Layar Antrian (TV)', icon: Tv },
        { to: '/panel/waiting-list', label: 'Waiting List', icon: Clock },
      ],
    },
    {
      title: 'Pelayanan & Medis',
      items: [
        { to: '/panel/pasien', label: 'Pasien & Gabung Data', icon: Users },
        { to: '/panel/klinis', label: 'Klinis (RME, Lab, Resep)', icon: Stethoscope },
      ],
    },
    {
      title: 'Keuangan & Farmasi',
      items: [
        { to: '/panel/kasir', label: 'Kasir & Keuangan', icon: CreditCard },
        { to: '/panel/apotek', label: 'Apotek & GoSend', icon: Pill },
      ],
    },
    {
      title: 'Sistem & Analitik',
      items: [
        { to: '/panel/master', label: 'Master Data', icon: Database },
        { to: '/panel/laporan', label: 'Laporan', icon: BarChart3 },
        { to: '/panel/pengaturan', label: 'Pengaturan & Peran', icon: Settings },
      ],
    },
  ];

  const roleLabels: Record<string, string> = {
    owner: 'Owner / Super Admin',
    frontdesk: 'Front Desk & Kasir',
    dokter: 'Dokter / Expert',
    apotek: 'Apotek & Lab',
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-300 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#059669] text-white font-display font-bold flex items-center justify-center text-sm">
              DM
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm">DigiMedika</p>
              <p className="text-[10px] text-emerald-400 font-semibold">ADMIN PANEL</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={'end' in item ? item.end : false}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#059669] text-white font-semibold'
                            : 'hover:bg-slate-800/80 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-emerald-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            {t.viewPublicMobile}
          </button>
          <button
            onClick={() => {
              logoutAdmin();
              navigate('/panel/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {t.logoutPanel}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[#1E293B]">{CLINICS[clinicType].name}</p>
              <p className="text-[11px] text-slate-500">{CLINICS[clinicType].address}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />
            <select
              value={clinicType}
              onChange={(e) => setClinicType(e.target.value as ClinicType)}
              className="text-xs font-semibold bg-[#F8FAF9] border border-slate-200 rounded-xl px-3 py-1.5 text-[#1E293B] focus:outline-none focus:border-[#059669]"
            >
              <option value="kecantikan">Klinik Kecantikan</option>
              <option value="mata_gigi">Klinik Mata & Gigi</option>
              <option value="lab">Klinik Umum & Lab</option>
            </select>

            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#ECFDF5] text-[#047857] border border-[#D1FAE5]">
              {roleLabels[adminRole]}
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
