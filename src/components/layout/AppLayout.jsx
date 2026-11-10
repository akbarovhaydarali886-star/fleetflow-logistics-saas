import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileBottomNav } from './MobileBottomNav';
import { ShipmentDetailModal } from '../shipments/ShipmentDetailModal';
import { InvoiceModal } from '../shipments/InvoiceModal';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white transition-colors">
      {/* Responsive Sidebar (Desktop Sticky + Mobile Drawer) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 pb-20 md:pb-8 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (visible < md) */}
      <MobileBottomNav />

      {/* Global Modals */}
      <ShipmentDetailModal />
      <InvoiceModal />
    </div>
  );
}
