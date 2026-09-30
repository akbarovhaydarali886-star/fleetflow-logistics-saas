import React, { useState } from 'react';
import { 
  Truck, User, Star, ShieldCheck, Wrench, Phone, 
  Plus, CheckCircle2, AlertTriangle, BatteryCharging, Gauge 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function FleetPage() {
  const { fleet, drivers } = useApp();
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Fleet Assets & Driver Operations</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maintain vehicle diagnostics, safety ratings, and driver duty hours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'vehicles' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vehicles ({fleet.length})
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'drivers' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Drivers ({drivers.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* Vehicles Grid Tab */}
      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((v) => (
            <div key={v.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{v.id}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{v.model}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{v.plate}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  v.status === 'on_route' 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                    : v.status === 'maintenance'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}>
                  {v.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span className="block text-slate-400 dark:text-slate-500 text-[11px]">Vehicle Type:</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{v.type}</span>
              </div>

              {/* Progress Bars for Health & Fuel */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Engine Diagnostics Health</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{v.engineHealth}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 dark:bg-emerald-400 h-full rounded-full" style={{ width: `${v.engineHealth}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Fuel Tank / Charge Level</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{v.fuelLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${v.fuelLevel}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Assigned Driver</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{v.driver}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Mileage</span>
                  <span className="font-mono text-slate-600 dark:text-slate-300">{v.mileage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drivers Grid Tab */}
      {activeTab === 'drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((d) => (
            <div key={d.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{d.name}</h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{d.experience}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {d.rating}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Completed Trips</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">{d.tripsCompleted}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Safety Score</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">{d.safetyScore}</span>
                </div>
              </div>

              <div className="text-xs space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {d.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Vehicle:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[170px]">{d.assignedVehicle}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  d.status === 'On Trip' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  Status: {d.status}
                </span>
                <span className="text-[11px] text-slate-500">ADR Hazmat Certified</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal Dummy Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Register New Fleet Asset / Driver</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Input new Scania / Volvo truck or invite certified international commercial driver.
            </p>
            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-xs text-cyan-800 dark:text-cyan-300">
              Asset registration API active. In production, this syncs with the Department of Transportation telematics registry.
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
