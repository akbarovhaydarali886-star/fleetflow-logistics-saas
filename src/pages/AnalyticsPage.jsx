import React from 'react';
import { 
  BarChart3, TrendingUp, Zap, Clock, ShieldCheck, 
  MapPin, Truck, Leaf, CheckCircle2 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';

export function AnalyticsPage() {
  const { MONTHLY_METRICS, theme } = useApp();
  const isDark = theme === 'dark';

  const corridorData = [
    { corridor: 'Tashkent - Munich', days: 5.2, costPerTon: 840, rating: 99 },
    { corridor: 'Navoi - Stockholm', days: 6.8, costPerTon: 720, rating: 97 },
    { corridor: 'Ankara - Fergana', days: 7.4, costPerTon: 610, rating: 92 },
    { corridor: 'Dubai - Bukhara', days: 8.1, costPerTon: 890, rating: 95 },
    { corridor: 'Seoul - Tashkent (Air)', days: 1.2, costPerTon: 2400, rating: 100 },
  ];

  const fuelEfficiencyData = [
    { week: 'W1', dieselLiters: 4200, electricKwh: 1850 },
    { week: 'W2', dieselLiters: 3950, electricKwh: 2200 },
    { week: 'W3', dieselLiters: 3800, electricKwh: 2600 },
    { week: 'W4', dieselLiters: 3500, electricKwh: 3100 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Supply Chain BI & Performance Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Deep telemetry metrics, route transit punctuality, and fuel decarbonization reporting.
        </p>
      </div>

      {/* Top Impact KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">On-Time SLA Guarantee</span>
          <div className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">98.4%</div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">+1.2% higher than industry benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Average Transit Turnaround</span>
          <div className="mt-2 text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">5.4 Days</div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Cross-Eurasia multimodal corridors</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Electric Fleet Decarbonization</span>
          <div className="mt-2 text-3xl font-black text-teal-600 dark:text-teal-400 font-mono">-24.6% CO₂</div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Volvo FH Electric zero emissions</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Customs Clearance Velocity</span>
          <div className="mt-2 text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">3.8 Hours</div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Fast-track e-declaration pipeline</span>
        </div>

      </div>

      {/* Corridor Performance Bar Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Major Freight Corridors Average Transit Duration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Days to complete origin-to-destination multimodal delivery</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            SLA Compliant
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={corridorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="corridor" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
              <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} unit="d" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                  borderColor: isDark ? '#334155' : '#e2e8f0', 
                  color: isDark ? '#ffffff' : '#0f172a',
                  borderRadius: '0.75rem', 
                  fontSize: '12px' 
                }}
                formatter={(val) => [`${val} Days`, 'Transit Time']}
              />
              <Bar dataKey="days" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Decarbonization & On-time Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* On Time Rate Over Months */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Historical On-Time Punctuality (%)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">6-Month Trendline across all carriers</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_METRICS}>
                <XAxis dataKey="month" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} domain={[94, 100]} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0', 
                    color: isDark ? '#ffffff' : '#0f172a',
                    borderRadius: '0.75rem', 
                    fontSize: '12px' 
                  }}
                  formatter={(val) => [`${val}%`, 'On-Time SLA']}
                />
                <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clean Fuel Energy Transition */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Electric Energy Transition (kWh vs Diesel Liters)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Weekly shift towards electric heavy carriers</p>
            </div>
            <Leaf className="w-5 h-5 text-teal-500" />
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelEfficiencyData}>
                <XAxis dataKey="week" stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0', 
                    color: isDark ? '#ffffff' : '#0f172a',
                    borderRadius: '0.75rem', 
                    fontSize: '12px' 
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="electricKwh" name="Electric kWh" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dieselLiters" name="Diesel Liters" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
