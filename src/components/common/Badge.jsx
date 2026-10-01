import React from 'react';
import { Truck, CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function StatusBadge({ status }) {
  const { t } = useApp();

  const configs = {
    in_transit: {
      bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      icon: Truck,
      dot: 'bg-cyan-500 dark:bg-cyan-400'
    },
    delivered: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2,
      dot: 'bg-emerald-500 dark:bg-emerald-400'
    },
    pending: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: Clock,
      dot: 'bg-amber-500 dark:bg-amber-400'
    },
    customs_hold: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      icon: AlertTriangle,
      dot: 'bg-rose-500 dark:bg-rose-400 animate-pulse'
    },
    delayed: {
      bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
      icon: XCircle,
      dot: 'bg-orange-500 dark:bg-orange-400'
    },
    paid: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: ShieldCheck,
      dot: 'bg-emerald-500 dark:bg-emerald-400'
    },
    overdue: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      icon: AlertTriangle,
      dot: 'bg-rose-500 dark:bg-rose-400'
    },
    on_route: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: Truck,
      dot: 'bg-emerald-500'
    },
    maintenance: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      icon: AlertTriangle,
      dot: 'bg-rose-500'
    },
    idle: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: Clock,
      dot: 'bg-amber-500'
    }
  };

  const config = configs[status] || {
    bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    icon: Clock,
    dot: 'bg-slate-400'
  };

  const translatedLabel = t(`status.${status}`) || (status ? status.replace('_', ' ') : 'Unknown');
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{translatedLabel}</span>
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const { t } = useApp();

  const configs = {
    Urgent: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    High: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    Normal: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  };

  const translatedPriority = t(`priority.${priority}`) || priority;

  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide border uppercase ${configs[priority] || configs.Normal}`}>
      {translatedPriority}
    </span>
  );
}
