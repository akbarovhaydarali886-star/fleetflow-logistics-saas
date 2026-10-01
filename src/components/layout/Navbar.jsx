import React, { useState } from 'react';
import { 
  Search, Bell, Plus, User, ShieldCheck, ChevronDown, 
  ExternalLink, Sun, Moon, CheckCheck, Truck, Globe
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function Navbar() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    switchRole, 
    shipments, 
    setActiveShipmentModal,
    auditLogs,
    theme,
    toggleTheme,
    language,
    setLanguage,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Check if query matches a shipment ID
    const found = shipments.find(s => 
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sender.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.receiver.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (found) {
      setActiveShipmentModal(found);
    } else {
      navigate(`/app/shipments?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('nav.searchPlaceholder')}
          className="w-full bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
        />
        {searchQuery && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            Enter ↵
          </span>
        )}
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 ml-auto">
        
        {/* Create Shipment CTA */}
        <Link
          to="/app/shipments/new"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/10 transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>{t('nav.newShipment')}</span>
        </Link>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition shadow-sm"
            title="Tilni tanlash / Select Language / Выбрать язык"
          >
            <span className="text-sm">{language === 'uz' ? '🇺🇿' : (language === 'ru' ? '🇷🇺' : '🇬🇧')}</span>
            <span className="uppercase font-mono text-[11px]">{language}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                {t('nav.language')}
              </div>
              <button
                onClick={() => { setLanguage('uz'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'uz' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span className="flex items-center gap-2">
                  <span>🇺🇿</span> O'zbekcha
                </span>
                {language === 'uz' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { setLanguage('ru'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'ru' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span className="flex items-center gap-2">
                  <span>🇷🇺</span> Русский
                </span>
                {language === 'ru' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'en' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span className="flex items-center gap-2">
                  <span>🇬🇧</span> English
                </span>
                {language === 'en' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle Button (Light / Dark) */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition shadow-sm"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-pulse-subtle" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Demo Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <div className="text-left hidden md:block">
              <span className="text-[10px] block text-slate-500 dark:text-slate-400 leading-none">{t('nav.role')}:</span>
              <span className="capitalize font-semibold text-slate-900 dark:text-slate-100">{currentUser.role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                {t('nav.roleSwitcherTitle')}
              </div>
              <button
                onClick={() => { switchRole('admin'); setShowRoleMenu(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${currentUser.role === 'admin' ? 'text-cyan-500 dark:text-cyan-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>{t('nav.roleAdmin')}</span>
                {currentUser.role === 'admin' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { switchRole('dispatcher'); setShowRoleMenu(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${currentUser.role === 'dispatcher' ? 'text-cyan-500 dark:text-cyan-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>{t('nav.roleDispatcher')}</span>
                {currentUser.role === 'dispatcher' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => { switchRole('client'); setShowRoleMenu(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${currentUser.role === 'client' ? 'text-cyan-500 dark:text-cyan-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span>{t('nav.roleClient')}</span>
                {currentUser.role === 'client' && <CheckCheck className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-cyan-500 absolute top-2 right-2 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{t('nav.notifications')}</span>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full font-medium">{t('nav.realTime')}</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition text-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px] mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{log.action}</span>
                      <span>{log.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Public Website Link */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <Link
            to="/"
            title={t('nav.landingLink')}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            {currentUser.name.charAt(0)}
          </div>
        </div>

      </div>

    </header>
  );
}
