import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Navigation, 
  Truck, 
  Receipt, 
  BarChart3, 
  Settings, 
  Radio, 
  Globe 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Sidebar() {
  const { shipments } = useApp();

  const activeCount = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending').length;

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Shipments', path: '/app/shipments', icon: Package, badge: activeCount },
    { label: 'Live GPS Tracking', path: '/app/tracking', icon: Navigation },
    { label: 'Fleet & Drivers', path: '/app/fleet', icon: Truck },
    { label: 'Invoices & Billing', path: '/app/invoices', icon: Receipt },
    { label: 'Analytics & BI', path: '/app/analytics', icon: BarChart3 },
    { label: 'Settings & Logs', path: '/app/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 select-none transition-colors">
      
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
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
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-1.5">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
            Main Management
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
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
              GPS Telemetry
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">CONNECTED</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            6 satellite links active • 24ms cloud latency
          </p>
        </div>

        <div className="flex items-center justify-between px-1 text-slate-400 text-xs">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 text-[11px]">
            <Globe className="w-3.5 h-3.5" /> Landing
          </Link>
          <span className="text-[10px] text-slate-400 dark:text-slate-600">v2.4 Enterprise</span>
        </div>
      </div>

    </aside>
  );
}
