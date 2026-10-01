import React, { useState } from 'react';
import { 
  Settings, Shield, Key, Bell, User, History, 
  Copy, Check, RefreshCw, Radio 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SettingsPage() {
  const { currentUser, switchRole, auditLogs, t, language, setLanguage } = useApp();
  const [apiKey, setApiKey] = useState('ff_live_9a8b27fc810ce42019482');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(`ff_live_${random}`);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('settings.title')}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* Role & Profile Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('settings.activeProfile')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.profileSub')}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 uppercase font-mono">
            {currentUser.role}
          </span>
        </div>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">{t('settings.fullName')}</label>
            <input
              type="text"
              defaultValue={currentUser.name}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">{t('settings.businessEmail')}</label>
            <input
              type="email"
              defaultValue={currentUser.email}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">{t('settings.orgName')}</label>
            <input
              type="text"
              defaultValue={currentUser.company}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">{t('settings.currency')}</label>
            <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500">
              <option value="USD">USD ($) - US Dollar</option>
              <option value="EUR">EUR (€) - Euro</option>
              <option value="UZS">UZS - O'zbek So'mi</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">{t('nav.language')}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="uz">🇺🇿 O'zbekcha</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> {t('settings.savedSuccess')}
              </span>
            ) : <div />}

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
            >
              {t('settings.btnSaveProfile')}
            </button>
          </div>
        </form>
      </div>

      {/* Developer API & Webhooks */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 font-bold">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('settings.apiTitle')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.apiSubtitle')}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">{t('settings.apiKeyLabel')}</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 bg-slate-50 dark:bg-slate-950 font-mono text-cyan-600 dark:text-cyan-400 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? t('settings.copied') : t('settings.btnCopy')}</span>
              </button>
              <button
                type="button"
                onClick={handleRegenerateKey}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition"
                title="Regenerate Key"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-slate-800 dark:text-slate-300 font-semibold block">{t('settings.webhookLabel')}</span>
              <span className="text-[11px] text-slate-500 font-mono">https://api.fleetflow.io/v2/telematics/stream</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              {t('settings.webhookActive')}
            </span>
          </div>
        </div>
      </div>

      {/* Immutable Enterprise Audit Logs */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('settings.auditTitle')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.auditSubtitle')}</p>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">SOC2 Type II Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">{t('settings.colTime')}</th>
                <th className="px-4 py-3">{t('settings.colUser')}</th>
                <th className="px-4 py-3">{t('settings.colAction')}</th>
                <th className="px-4 py-3">{t('settings.colDetails')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                  <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">{log.user}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      log.type === 'warning'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                        : log.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
