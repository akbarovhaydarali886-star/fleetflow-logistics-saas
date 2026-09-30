import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Package, Search, Filter, Download, Plus, 
  MapPin, Truck, ArrowUpDown, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';

export function ShipmentsPage() {
  const { shipments, setActiveShipmentModal, updateShipmentStatus } = useApp();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filtered shipments
  const filteredShipments = useMemo(() => {
    return shipments.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sender.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.receiver.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.driver.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchPriority = priorityFilter === 'all' || item.priority === priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [shipments, searchQuery, statusFilter, priorityFilter]);

  // Real CSV export
  const exportToCSV = () => {
    const headers = ['TrackingID', 'SenderCity', 'ReceiverCity', 'Cargo', 'Driver', 'Status', 'RateUSD', 'ETA'];
    const rows = filteredShipments.map(s => [
      s.id,
      `"${s.sender.city}"`,
      `"${s.receiver.city}"`,
      `"${s.cargo}"`,
      `"${s.driver}"`,
      s.status,
      s.price,
      `"${s.eta}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FleetFlow_Shipments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Shipment Operations & Manifests</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track, filter, and inspect international freight orders in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition"
          >
            <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/app/shipments/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Shipment</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'in_transit', label: 'In Transit' },
            { id: 'pending', label: 'Pending Pickup' },
            { id: 'customs_hold', label: 'Customs Hold' },
            { id: 'delivered', label: 'Delivered' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Tracking ID, origin/dest city, cargo, or driver..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500 transition w-full sm:w-auto"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>

      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Tracking Number</th>
                <th className="px-5 py-3.5">Route</th>
                <th className="px-5 py-3.5">Cargo Specs</th>
                <th className="px-5 py-3.5">Carrier / Driver</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Rate ($)</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-500 text-xs">
                    No shipments match the current search filters.
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setActiveShipmentModal(s)}
                        className="font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline block"
                      >
                        {s.id}
                      </button>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">ETA: {s.eta}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {s.sender.city} &rarr; {s.receiver.city}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                        {s.currentLocation}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-700 dark:text-slate-300 font-medium">{s.cargo}</div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{s.weight} • {s.volume}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-800 dark:text-slate-200 font-medium">{s.driver}</div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{s.carrier}</span>
                    </td>
                    <td className="px-5 py-4">
                      <PriorityBadge priority={s.priority} />
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      ${s.price?.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setActiveShipmentModal(s)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Showing {filteredShipments.length} of {shipments.length} shipments</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">Real-time sync via WebSockets</span>
        </div>
      </div>

    </div>
  );
}
