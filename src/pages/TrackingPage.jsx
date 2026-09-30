import React, { useState } from 'react';
import { 
  Navigation, Truck, MapPin, Gauge, Fuel, Thermometer, 
  Activity, ShieldAlert, Radio, Clock, User, Phone, RefreshCw 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function TrackingPage() {
  const { fleet, shipments, setActiveShipmentModal, theme } = useApp();
  const [selectedVehicleId, setSelectedVehicleId] = useState(fleet[0]?.id || 'TRK-101');
  const [simulatedSpeed, setSimulatedSpeed] = useState(74);
  const [isSimulating, setIsSimulating] = useState(false);

  const isDark = theme === 'dark';
  const selectedVehicle = fleet.find(f => f.id === selectedVehicleId) || fleet[0];
  const linkedShipment = shipments.find(s => s.id === selectedVehicle.assignedShipment);

  const handleSimulatePing = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedSpeed(prev => Math.floor(65 + Math.random() * 25));
      setIsSimulating(false);
    }, 600);
  };

  // Map coordinates simulation for SVG rendering
  const mapPoints = [
    { id: 'TRK-101', city: 'Baku, Azerbaijan', x: 280, y: 220, label: 'Scania R500' },
    { id: 'TRK-102', city: 'Aktau Port, KZ', x: 380, y: 170, label: 'Volvo FH16' },
    { id: 'TRK-104', city: 'Chimkent, KZ', x: 550, y: 200, label: 'Volvo Electric' },
    { id: 'TRK-105', city: 'Bandar Abbas, Iran', x: 320, y: 340, label: 'MAN Tanker' },
    { id: 'TRK-106', city: 'Tashkent Central Hub', x: 620, y: 230, label: 'Ford Transit' },
    { id: 'TRK-103', city: 'Sarakhs Border', x: 420, y: 280, label: 'Mercedes Actros' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Live Satellite GPS Telematics</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Orbit Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time telemetry, IoT cold-chain sensor status, and cross-border corridor telemetry.
          </p>
        </div>

        <button
          onClick={handleSimulatePing}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition"
        >
          <RefreshCw className={`w-4 h-4 text-cyan-600 dark:text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>Ping Telematics Sensors</span>
        </button>
      </div>

      {/* Main Grid: Interactive Map + Telemetry Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Simulated Map (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px] shadow-sm">
          
          {/* Map Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <Navigation className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-slate-800 dark:text-slate-300 font-semibold">Central Eurasia & Trans-Caspian Corridor</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>{fleet.length} Tracked Units</span>
            </div>
          </div>

          {/* Stylized Visual Map Vector Canvas */}
          <div className="relative my-4 flex-1 flex items-center justify-center">
            
            <svg 
              viewBox="0 0 800 420" 
              className="w-full h-full max-h-[380px] drop-shadow-xl select-none"
            >
              {/* Background Map Grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="0.5" />
                </pattern>
              </defs>

              <rect width="800" height="420" fill="url(#grid)" opacity={isDark ? "0.4" : "0.8"} />

              {/* Silk Road Major Freight Corridors */}
              <path 
                d="M 120 180 Q 280 220 380 170 T 550 200 T 620 230" 
                fill="none" 
                stroke={isDark ? "#0284c7" : "#0284c7"} 
                strokeWidth="2.5" 
                strokeDasharray="4 4"
                opacity={isDark ? "0.6" : "0.8"}
              />
              <path 
                d="M 320 340 L 420 280 L 620 230" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2" 
                strokeDasharray="6 3"
                opacity={isDark ? "0.4" : "0.7"}
              />

              {/* Map Waypoint City Nodes */}
              <g className={`text-[10px] font-mono ${isDark ? 'fill-slate-500' : 'fill-slate-600'}`}>
                <circle cx="120" cy="180" r="4" fill={isDark ? "#334155" : "#94a3b8"} />
                <text x="105" y="165">Istanbul</text>

                <circle cx="280" cy="220" r="4" fill={isDark ? "#334155" : "#94a3b8"} />
                <text x="270" y="240">Baku Port</text>

                <circle cx="380" cy="170" r="4" fill={isDark ? "#334155" : "#94a3b8"} />
                <text x="370" y="155">Aktau Port</text>

                <circle cx="420" cy="280" r="4" fill="#e11d48" />
                <text x="430" y="285" fill="#e11d48" fontWeight="bold">Sarakhs Customs</text>

                <circle cx="550" cy="200" r="4" fill={isDark ? "#334155" : "#94a3b8"} />
                <text x="540" y="185">Chimkent</text>

                <circle cx="620" cy="230" r="5" fill="#06b6d4" />
                <text x="610" y="250" fill="#0284c7" fontWeight="bold">Tashkent HQ</text>

                <circle cx="320" cy="340" r="4" fill={isDark ? "#334155" : "#94a3b8"} />
                <text x="290" y="360">Bandar Abbas</text>
              </g>

              {/* Interactive Vehicle Icons */}
              {mapPoints.map(point => {
                const vehicle = fleet.find(f => f.id === point.id);
                const isSelected = selectedVehicle.id === point.id;
                const isMoving = vehicle?.status === 'on_route';

                return (
                  <g 
                    key={point.id} 
                    className="cursor-pointer transition-transform duration-300"
                    onClick={() => setSelectedVehicleId(point.id)}
                  >
                    {/* Pulsing ring for active */}
                    {isMoving && (
                      <circle 
                        cx={point.x} 
                        cy={point.y} 
                        r={isSelected ? "18" : "12"} 
                        fill="#06b6d4" 
                        opacity="0.3" 
                        className="animate-ping" 
                      />
                    )}

                    {/* Vehicle Pin Icon */}
                    <circle 
                      cx={point.x} 
                      cy={point.y} 
                      r={isSelected ? "9" : "6"} 
                      fill={isSelected ? "#06b6d4" : vehicle?.status === 'maintenance' ? '#f43f5e' : '#10b981'} 
                      stroke={isDark ? "#0f172a" : "#ffffff"} 
                      strokeWidth="2" 
                    />

                    {/* Vehicle Tooltip Label */}
                    <rect 
                      x={point.x - 38} 
                      y={point.y - 28} 
                      width="76" 
                      height="18" 
                      rx="4" 
                      fill={isSelected ? '#0284c7' : isDark ? '#1e293b' : '#334155'} 
                      opacity="0.95"
                    />
                    <text 
                      x={point.x} 
                      y={point.y - 16} 
                      textAnchor="middle" 
                      fill="#ffffff" 
                      fontSize="9" 
                      fontWeight="bold"
                    >
                      {vehicle?.model.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

          </div>

          {/* Map Bottom Helper */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-3 z-10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> On Route
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Selected Unit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Maintenance / Hold
              </span>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">Click any marker or list item to inspect telemetry</span>
          </div>

        </div>

        {/* Selected Vehicle Telemetry Dossier */}
        <div className="space-y-4">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{selectedVehicle.id}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{selectedVehicle.model}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{selectedVehicle.plate}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                selectedVehicle.status === 'on_route'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
              }`}>
                {selectedVehicle.status.replace('_', ' ')}
              </span>
            </div>

            {/* Telemetry Gauge Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Gauge className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Ground Speed</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                  {selectedVehicle.status === 'on_route' ? `${simulatedSpeed} km/h` : '0 km/h'}
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Within speed limit</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Fuel className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Fuel / Battery</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{selectedVehicle.fuelLevel}%</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Range: ~640 km</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Thermometer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Cargo Temp</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{selectedVehicle.temp}</div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Sensor verified</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Engine Health</span>
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white font-mono">{selectedVehicle.engineHealth}%</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{selectedVehicle.tirePressure}</span>
              </div>

            </div>

            {/* Current Geo Location */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Current GPS Fix:</span>
              <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                {selectedVehicle.city}
              </p>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 block">
                Lat: {selectedVehicle.lat.toFixed(4)}, Lng: {selectedVehicle.lng.toFixed(4)}
              </span>
            </div>

            {/* Assigned Driver & Active Shipment Shortcut */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-white font-semibold block">{selectedVehicle.driver}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Certified Long-Haul Driver</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              {linkedShipment && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Assigned Freight Order</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{linkedShipment.id}</span>
                  </div>
                  <button
                    onClick={() => setActiveShipmentModal(linkedShipment)}
                    className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition"
                  >
                    View Manifest
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Quick Vehicle Switcher List */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 max-h-56 overflow-y-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-1 mb-2">
              Fleet Carrier Switcher
            </span>
            {fleet.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                  selectedVehicleId === v.id
                    ? 'bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-800 dark:text-white font-semibold'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div>
                  <span className="font-mono text-[11px] block">{v.id} - {v.model}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{v.city}</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">{v.fuelLevel}% fuel</span>
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
