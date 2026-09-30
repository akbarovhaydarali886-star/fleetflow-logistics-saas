import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, PackageCheck, AlertTriangle, DollarSign, 
  ArrowUpRight, ArrowRight, ShieldCheck, Activity, 
  CheckCircle2, Clock, MapPin, Plus, Navigation
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';

export function DashboardPage() {
  const { 
    shipments, 
    fleet, 
    invoices, 
    currentUser, 
    setActiveShipmentModal,
    MONTHLY_METRICS,
    CARGO_CATEGORY_DATA,
    theme 
  } = useApp();

  const isDark = theme === 'dark';
  const activeShipments = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending');
  const delayedShipments = shipments.filter(s => s.status === 'delayed' || s.status === 'customs_hold');
  const totalRevenue = invoices.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Logistics Control Tower</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 uppercase">
              {currentUser.role} Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-modal freight monitoring, automated billing, and telematics telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/tracking"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition"
          >
            <Navigation className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Open GPS Map</span>
          </Link>

          <Link
            to="/app/shipments/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Shipment</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Shipments</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">{activeShipments.length}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">3 approaching destination today</span>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fleet Active Duty</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {fleet.filter(f => f.status === 'on_route').length} / {fleet.length}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">85% Utilized</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">1 vehicle undergoing scheduled service</span>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Freight Pipeline Value</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              ${(totalRevenue).toLocaleString()}
            </span>
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">USD</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Across {invoices.length} active invoices</span>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Customs & Inspection</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">{delayedShipments.length}</span>
            <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Action Req</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Sarakhs border customs check</span>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Revenue & Growth Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Monthly Freight Revenue & Delivery SLA</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Historical revenue volume ($USD) over past 6 months</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
              Avg. 98.4% On-Time
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_METRICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0', 
                    color: isDark ? '#ffffff' : '#0f172a',
                    borderRadius: '0.75rem', 
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                  formatter={(val) => [`$${val.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cargo Category Distribution Donut */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cargo Type Breakdown</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Percentage volume by freight class</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CARGO_CATEGORY_DATA}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CARGO_CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0', 
                    color: isDark ? '#ffffff' : '#0f172a',
                    borderRadius: '0.75rem', 
                    fontSize: '11px' 
                  }} 
                  formatter={(val) => [`${val}%`, 'Volume']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">100%</span>
              <span className="text-[10px] block text-slate-500 uppercase">Inspected</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            {CARGO_CATEGORY_DATA.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Shipments Live Table Overview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Cargo In-Transit</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live operational shipments with checkpoint updates</p>
          </div>
          <Link
            to="/app/shipments"
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 transition"
          >
            <span>View All Shipments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Tracking ID</th>
                <th className="px-4 py-3">Route (Origin &rarr; Dest)</th>
                <th className="px-4 py-3">Cargo Spec</th>
                <th className="px-4 py-3">Carrier / Driver</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {shipments.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition group">
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setActiveShipmentModal(s)}
                      className="font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      {s.id}
                    </button>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">ETA: {s.eta}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {s.sender.city} &rarr; {s.receiver.city}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{s.currentLocation}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-slate-700 dark:text-slate-300">{s.cargo}</div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{s.weight}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-slate-800 dark:text-slate-200 font-medium">{s.driver}</div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{s.carrier}</span>
                  </td>
                  <td className="px-4 py-3.5 w-32">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                      <span>{s.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-500 h-full rounded-full transition-all"
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setActiveShipmentModal(s)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition"
                    >
                      Inspect
                    </button>
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
