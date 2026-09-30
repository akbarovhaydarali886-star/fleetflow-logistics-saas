import React from 'react';
import { Truck, CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export function StatusBadge({ status }) {
  const configs = {
    in_transit: {
      label: 'In Transit',
      bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      icon: Truck,
      dot: 'bg-cyan-400'
    },
    delivered: {
      label: 'Delivered',
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2,
      dot: 'bg-emerald-400'
    },
    pending: {
      label: 'Pending Pickup',
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: Clock,
      dot: 'bg-amber-400'
    },
    customs_hold: {
      label: 'Customs Hold',
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      icon: AlertTriangle,
      dot: 'bg-rose-400 animate-pulse'
    },
    delayed: {
      label: 'Delayed',
      bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      icon: XCircle,
      dot: 'bg-orange-400'
    },
    paid: {
      label: 'Paid',
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: ShieldCheck,
      dot: 'bg-emerald-400'
    },
    overdue: {
      label: 'Overdue',
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      icon: AlertTriangle,
      dot: 'bg-rose-400'
    }
  };

  const config = configs[status] || {
    label: status ? status.replace('_', ' ') : 'Unknown',
    bg: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: Clock,
    dot: 'bg-slate-400'
  };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const configs = {
    Urgent: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    High: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Normal: 'bg-slate-800 text-slate-300 border-slate-700'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide border uppercase ${configs[priority] || configs.Normal}`}>
      {priority}
    </span>
  );
}
