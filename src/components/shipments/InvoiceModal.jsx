import React from 'react';
import { X, Printer, CheckCircle, Download, Building, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';

export function InvoiceModal() {
  const { activeInvoiceModal: invoice, setActiveInvoiceModal, markInvoicePaid } = useApp();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const taxAmount = (invoice.amount * (invoice.taxRate / 100));
  const totalAmount = invoice.amount + taxAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Actions bar (hidden during print) */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">B2B Commercial Invoice</span>
            <StatusBadge status={invoice.status} />
          </div>

          <div className="flex items-center gap-2">
            {invoice.status !== 'paid' && (
              <button
                onClick={() => {
                  markInvoicePaid(invoice.id);
                  setActiveInvoiceModal({ ...invoice, status: 'paid' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Mark as Paid
              </button>
            )}

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>

            <button
              onClick={() => setActiveInvoiceModal(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Area */}
        <div className="p-8 space-y-8 bg-slate-50/50 dark:bg-slate-950/40 print:bg-white print:p-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 print:border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black">
                  FF
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight print:text-black">FleetFlow Global</h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 print:text-neutral-600">
                Supply Chain & Freight Logistics Group<br />
                Amir Temur Ave 107B, Tashkent, Uzbekistan<br />
                VAT ID: UZ-992019482 • support@fleetflow.io
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest print:text-blue-700">INVOICE</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5 print:text-black">{invoice.id}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 print:text-neutral-600">
                Date Issued: <span className="text-slate-800 dark:text-slate-200 font-medium print:text-black">{invoice.date}</span><br />
                Payment Due: <span className="text-slate-800 dark:text-slate-200 font-medium print:text-black">{invoice.dueDate}</span><br />
                Ref Shipment: <span className="text-cyan-600 dark:text-cyan-400 font-mono print:text-blue-700">{invoice.shipmentId}</span>
              </p>
            </div>
          </div>

          {/* Billed To & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider print:text-neutral-500">Billed Client:</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 print:text-black">{invoice.clientName}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 print:text-neutral-600">
                Verified Enterprise Logistics Account<br />
                Payment Terms: Net 20 Days
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider print:text-neutral-500">Payment Channel:</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 print:text-black">{invoice.paymentMethod}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 print:text-neutral-600">
                SWIFT: UZLSCH22XXX<br />
                Account: 2020 8000 4001 9820 4401
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden print:border-neutral-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase tracking-wider print:bg-neutral-100 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-neutral-200">
                <tr>
                  <th className="px-4 py-3">Description of Freight Service</th>
                  <th className="px-4 py-3 text-center">Distance</th>
                  <th className="px-4 py-3 text-right">Tax Rate</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 print:divide-neutral-200">
                <tr>
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">{invoice.service}</p>
                    <p className="text-[11px] text-slate-500 print:text-neutral-500">Includes fuel surcharge, road toll permits, and GPS telematics reporting</p>
                  </td>
                  <td className="px-4 py-3.5 text-center text-slate-700 dark:text-slate-300 print:text-black">{invoice.distance}</td>
                  <td className="px-4 py-3.5 text-right text-slate-700 dark:text-slate-300 print:text-black">{invoice.taxRate}%</td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-900 dark:text-slate-200 print:text-black">${invoice.amount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Calculation */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 print:text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-medium text-slate-900 dark:text-slate-200 print:text-black">${invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 print:text-neutral-600">
                <span>VAT / Cargo Tax ({invoice.taxRate}%):</span>
                <span className="font-medium text-slate-900 dark:text-slate-200 print:text-black">${taxAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between text-sm font-bold text-slate-900 dark:text-white print:border-neutral-300 print:text-black">
                <span>Total Amount:</span>
                <span className="text-cyan-600 dark:text-cyan-400 text-base print:text-black">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 text-[11px] text-slate-400 dark:text-slate-500 print:border-neutral-200 print:text-neutral-500 flex items-center justify-between">
            <span>Thank you for using FleetFlow Freight Solutions. Electronic signature verified.</span>
            <span className="font-mono">HASH: 9A8B-27FC-810C</span>
          </div>

        </div>

      </div>
    </div>
  );
}
