import React from 'react';
import { 
  X, MapPin, Truck, Calendar, User, Phone, DollarSign, 
  Box, ShieldAlert, ArrowRight, CheckCircle2, Clock, 
  FileText, Activity
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export function ShipmentDetailModal() {
  const { 
    activeShipmentModal: shipment, 
    setActiveShipmentModal, 
    updateShipmentStatus, 
    setActiveInvoiceModal,
    invoices 
  } = useApp();

  if (!shipment) return null;

  const correspondingInvoice = invoices.find(inv => inv.shipmentId === shipment.id);

  const handleStatusChange = (e) => {
    updateShipmentStatus(shipment.id, e.target.value);
    setActiveShipmentModal({
      ...shipment,
      status: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{shipment.id}</h3>
                <StatusBadge status={shipment.status} />
                <PriorityBadge priority={shipment.priority} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Departed on {shipment.departureDate} • ETA: {shipment.eta}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {correspondingInvoice && (
              <button
                onClick={() => {
                  setActiveShipmentModal(null);
                  setActiveInvoiceModal(correspondingInvoice);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                View Invoice
              </button>
            )}

            <button
              onClick={() => setActiveShipmentModal(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Status Changer Quick Action */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="font-medium">Quick Status Override:</span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={shipment.status}
                onChange={handleStatusChange}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 transition"
              >
                <option value="pending">Pending Pickup</option>
                <option value="in_transit">In Transit</option>
                <option value="customs_hold">Customs Hold</option>
                <option value="delayed">Delayed</option>
                <option value="delivered">Delivered</option>
              </select>
              <span className="text-xs text-slate-500">Live operational sync enabled</span>
            </div>
          </div>

          {/* Route Overview Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Origin</span>
                <h4 className="text-base font-semibold text-slate-900 dark:text-white mt-1">{shipment.sender.city}, {shipment.sender.country}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{shipment.sender.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{shipment.sender.address}</p>
              </div>

              <div className="flex flex-col items-center px-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  <Truck className="w-4 h-4 animate-bounce" />
                  <span>{shipment.progress}% completed</span>
                </div>
                <div className="w-full sm:w-48 bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                  {shipment.currentLocation}
                </span>
              </div>

              <div className="flex-1 sm:text-right">
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Destination</span>
                <h4 className="text-base font-semibold text-slate-900 dark:text-white mt-1">{shipment.receiver.city}, {shipment.receiver.country}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{shipment.receiver.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{shipment.receiver.address}</p>
              </div>
            </div>
          </div>

          {/* Grid: Cargo Specs & Driver Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Cargo Specs */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Cargo Specifications
              </h4>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Cargo Description:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{shipment.cargo}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Handling Type:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{shipment.type}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Gross Weight:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{shipment.weight}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Total Volume:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{shipment.volume}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Declared Value:</span>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{shipment.value}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Freight Rate:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">${shipment.price?.toLocaleString()} USD</p>
                </div>
              </div>
            </div>

            {/* Carrier & Driver Info */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Assigned Vehicle & Driver
              </h4>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Vehicle Unit:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{shipment.carrier}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Assigned Driver:</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{shipment.driver}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Driver Contact:</span>
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {shipment.driverPhone}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Estimated Arrival:</span>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-300 mt-0.5">{shipment.eta}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Timeline Checkpoints */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Transit Checkpoint Timeline
            </h4>
            
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {shipment.checkpoints.map((cp, idx) => {
                const isCompleted = cp.status === 'completed';
                const isCurrent = cp.status === 'current';
                
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Bullet marker */}
                    <div className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500' 
                        : isCurrent 
                        ? 'bg-cyan-500 text-slate-950 animate-pulse ring-4 ring-cyan-500/20' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className={`text-xs font-bold ${isCurrent ? 'text-cyan-600 dark:text-cyan-400' : isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                          {cp.location}
                        </h5>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">{cp.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cp.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={() => setActiveShipmentModal(null)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
