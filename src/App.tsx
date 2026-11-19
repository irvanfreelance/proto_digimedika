import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import { PublicLayout } from './components/PublicLayout';
import { HomePage } from './pages/public/HomePage';
import { BookingPage } from './pages/public/BookingPage';
import { QueuePage } from './pages/public/QueuePage';
import { HistoryPage } from './pages/public/HistoryPage';
import { AccountPage } from './pages/public/AccountPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminQueuePage } from './pages/admin/AdminQueuePage';
import { AdminModulePage } from './pages/admin/AdminModulePage';
import { TvDisplayPage } from './pages/admin/TvDisplayPage';

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Mobile-First App */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="antrian" element={<QueuePage />} />
            <Route path="riwayat" element={<HistoryPage />} />
            <Route path="akun" element={<AccountPage />} />
          </Route>

          {/* Admin Login */}
          <Route path="/panel/login" element={<AdminLoginPage />} />

          {/* Standalone TV Display (New Tab, No Sidebar/Menu) */}
          <Route path="/display-tv" element={<TvDisplayPage />} />

          {/* Internal Admin Panel */}
          <Route path="/panel" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="antrian" element={<AdminQueuePage />} />
            <Route path="agenda" element={<AdminModulePage module="agenda" />} />
            <Route path="front-desk" element={<AdminModulePage module="front-desk" />} />
            <Route path="display" element={<AdminModulePage module="display" />} />
            <Route path="waiting-list" element={<AdminModulePage module="waiting-list" />} />
            <Route path="pasien" element={<AdminModulePage module="pasien" />} />
            <Route path="klinis" element={<AdminModulePage module="klinis" />} />
            <Route path="kasir" element={<AdminModulePage module="kasir" />} />
            <Route path="apotek" element={<AdminModulePage module="apotek" />} />
            <Route path="master" element={<AdminModulePage module="master" />} />
            <Route path="laporan" element={<AdminModulePage module="laporan" />} />
            <Route path="pengaturan" element={<AdminModulePage module="pengaturan" />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoProvider>
  );
};

export default App;
