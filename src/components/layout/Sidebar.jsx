import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Navigation, 
  Truck, 
  Receipt, 
  BarChart3, 
  Settings, 
  Radio, 
  Globe,
  X,
  ShieldCheck,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Sidebar() {
  const { shipments, t, mobileMenuOpen, setMobileMenuOpen, currentUser } = useApp();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const activeCount = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending').length;

  const navItems = [
    { label: t('nav.dashboard'), path: '/app/dashboard', icon: LayoutDashboard },
    { label: t('nav.shipments'), path: '/app/shipments', icon: Package, badge: activeCount },
    { label: t('nav.liveTracking'), path: '/app/tracking', icon: Navigation },
    { label: t('nav.fleet'), path: '/app/fleet', icon: Truck },
    { label: t('nav.invoices'), path: '/app/invoices', icon: Receipt },
    { label: t('nav.analytics'), path: '/app/analytics', icon: BarChart3 },
    { label: t('nav.settings'), path: '/app/settings', icon: Settings },
  ];

  const renderContent = (isMobile = false) => (
    <div className="flex flex-col justify-between h-full">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <Link 
            to="/" 
            onClick={() => isMobile && setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              FF
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition">
                FleetFlow
              </span>
              <span className="text-[10px] block font-mono text-cyan-600 dark:text-cyan-400 tracking-wider">LOGISTICS OS</span>
            </div>
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Badge on mobile */}
        {isMobile && (
          <div className="mx-4 mt-3 p-3 rounded-2xl bg-cyan-50/70 dark:bg-slate-900 border border-cyan-200/60 dark:border-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-inner shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">{currentUser.name}</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 capitalize font-medium">{currentUser.role} • {currentUser.company}</span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="p-4 space-y-1.5">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            {t('nav.mainManagement')}
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => isMobile && setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive 
                          ? 'bg-cyan-500 text-slate-950' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Info Widget */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              {t('nav.gpsTelemetry')}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">{t('nav.gpsConnected')}</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            {t('nav.gpsNote')}
          </p>
        </div>

        <div className="flex items-center justify-between px-1 text-slate-400 text-xs">
          <Link 
            to="/" 
            onClick={() => isMobile && setMobileMenuOpen(false)}
            className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 text-[11px]"
          >
            <Globe className="w-3.5 h-3.5" /> {t('nav.landingLink')}
          </Link>
          <span className="text-[10px] text-slate-400 dark:text-slate-600">{t('nav.systemVersion')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (>= 1024px lg) */}
      <aside className="hidden lg:flex w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none transition-colors">
        {renderContent(false)}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 lg:hidden transition-opacity animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Drawer (< 1024px lg) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between h-full select-none shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {renderContent(true)}
      </aside>
    </>
  );
}
