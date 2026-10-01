import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, ShieldCheck, ArrowRight, UserCheck, Lock, Mail, Sparkles, Sun, Moon, Globe, ChevronDown, CheckCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { switchRole, theme, toggleTheme, language, setLanguage, t } = useApp();
  const [email, setEmail] = useState('admin@fleetflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/app/dashboard');
  };

  const handleQuickLogin = (role) => {
    switchRole(role);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top right language & theme switchers */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm text-xs font-bold"
          >
            <span className="text-sm">{language === 'uz' ? '🇺🇿' : (language === 'ru' ? '🇷🇺' : '🇬🇧')}</span>
            <span className="uppercase font-mono">{language}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1 z-50 animate-fade-in text-xs">
              <button
                onClick={() => { setLanguage('uz'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'uz' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>🇺🇿 O'zbekcha</span>
                {language === 'uz' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { setLanguage('ru'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'ru' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>🇷🇺 Русский</span>
                {language === 'ru' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'en' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>🇬🇧 English</span>
                {language === 'en' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </div>

      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-xl shadow-cyan-500/20 group-hover:scale-105 transition">
          FF
        </div>
        <div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
            FleetFlow
          </span>
          <span className="text-[10px] block font-mono text-cyan-600 dark:text-cyan-400 tracking-wider">{t('login.brandSub')}</span>
        </div>
      </Link>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative z-10">
        
        {/* Recruiter Quick Test Banner */}
        <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 mb-6">
          <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t('login.roleBanner')}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 leading-snug">
            {t('login.roleNote')}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 transition text-center shadow-xs"
            >
              {t('login.btnAdmin')}
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('dispatcher')}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 transition text-center shadow-xs"
            >
              {t('login.btnDispatcher')}
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('client')}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] font-semibold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 transition text-center shadow-xs"
            >
              {t('login.btnClient')}
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('login.title')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{t('login.emailLabel')}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('login.passwordLabel')}</label>
              <a href="#" className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline">{t('login.forgotPass')}</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20 mt-2"
          >
            <span>{t('login.btnSubmit')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <Link to="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition">
            {t('login.backHome')}
          </Link>
        </div>

      </div>
    </div>
  );
}
