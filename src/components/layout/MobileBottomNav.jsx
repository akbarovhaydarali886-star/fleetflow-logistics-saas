import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Navigation, 
  Receipt, 
  Menu 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function MobileBottomNav() {
  const { shipments, t, setMobileMenuOpen } = useApp();

  const activeCount = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending').length;

  const tabs = [
    { label: t('nav.dashboard') || 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: t('nav.shipments') || 'Yuklar', path: '/app/shipments', icon: Package, badge: activeCount },
    { label: t('nav.liveTracking') || 'GPS', path: '/app/tracking', icon: Navigation },
    { label: t('nav.invoices') || 'Invoys', path: '/app/invoices', icon: Receipt },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex items-center justify-around md:hidden shadow-2xl transition-colors"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 absolute -bottom-0.5" />
                )}
              </>
            )}
          </NavLink>
        );
      })}

      {/* Menu Drawer opener tab */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(prev => !prev)}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-1 tracking-tight">
          Menyu
        </span>
      </button>
    </nav>
  );
}
