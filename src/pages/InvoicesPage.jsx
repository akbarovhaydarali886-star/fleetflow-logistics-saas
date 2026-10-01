import React, { useState } from 'react';
import { 
  Receipt, DollarSign, Download, Printer, CheckCircle2, 
  Clock, AlertTriangle, ArrowUpRight, Search, FileText 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/Badge';

export function InvoicesPage() {
  const { invoices, markInvoicePaid, setActiveInvoiceModal, setActiveShipmentModal, shipments, t } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const paidInvoiced = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingInvoiced = invoices.filter(i => i.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);
  const overdueInvoiced = invoices.filter(i => i.status === 'overdue').reduce((acc, curr) => acc + curr.amount, 0);

  const filteredInvoices = invoices.filter(inv => {
    const matchFilter = filter === 'all' || inv.status === filter;
    const matchSearch = 
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.shipmentId.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('invoices.title')}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('invoices.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition"
          >
            <Printer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t('invoices.btnPrint')}</span>
          </button>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t('invoices.totalBilled')}</span>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white font-mono">${totalInvoiced.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">{invoices.length} {t('invoices.acrossOrders')}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{t('invoices.collectedRevenue')}</span>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">${paidInvoiced.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600/80 dark:text-emerald-500/80 mt-1 block">{t('invoices.reconciled')}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{t('invoices.pendingReceivables')}</span>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">${pendingInvoiced.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">{t('invoices.standardNet')}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{t('invoices.overduePayments')}</span>
          <div className="mt-2 text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">${overdueInvoiced.toLocaleString()}</div>
          <span className="text-[11px] text-rose-600/80 dark:text-rose-500/80 mt-1 block">{t('invoices.dunningSent')}</span>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Status tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
          {[
            { id: 'all', label: t('invoices.tabAll') },
            { id: 'paid', label: t('invoices.tabPaid') },
            { id: 'pending', label: t('invoices.tabPending') },
            { id: 'overdue', label: t('invoices.tabOverdue') }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                filter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('invoices.searchPlaceholder')}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">{t('invoices.colId')}</th>
                <th className="px-5 py-3.5">{t('invoices.colClient')}</th>
                <th className="px-5 py-3.5">{t('invoices.colShipment')}</th>
                <th className="px-5 py-3.5">{t('invoices.colDates')}</th>
                <th className="px-5 py-3.5">{t('invoices.colAmount')}</th>
                <th className="px-5 py-3.5">{t('invoices.colStatus')}</th>
                <th className="px-5 py-3.5 text-right">{t('invoices.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setActiveInvoiceModal(inv)}
                      className="font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:underline block"
                    >
                      {inv.id}
                    </button>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{inv.paymentMethod}</span>
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{inv.clientName}</div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{inv.service}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => {
                        const s = shipments.find(item => item.id === inv.shipmentId);
                        if (s) setActiveShipmentModal(s);
                      }}
                      className="font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      {inv.shipmentId}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-slate-700 dark:text-slate-300">{inv.date}</div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{t('invoices.due')} {inv.dueDate}</span>
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => markInvoicePaid(inv.id)}
                        className="px-2.5 py-1 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold border border-emerald-500/30 transition"
                      >
                        {t('invoices.btnMarkPaid')}
                      </button>
                    )}
                    <button
                      onClick={() => setActiveInvoiceModal(inv)}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold transition"
                    >
                      {t('invoices.btnView')}
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
