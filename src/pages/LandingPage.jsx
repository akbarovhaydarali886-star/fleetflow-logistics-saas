import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Truck, ShieldCheck, Navigation, ArrowRight, CheckCircle2, 
  Globe2, BarChart3, Clock, DollarSign, Search, Sparkles, 
  MapPin, Activity, Zap, Sun, Moon, Users, ChevronDown, CheckCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { shipments, setActiveShipmentModal, theme, toggleTheme, language, setLanguage, t } = useApp();
  const [trackInput, setTrackInput] = useState('');
  const [trackError, setTrackError] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setTrackError('');
    const query = trackInput.trim().toUpperCase();
    if (!query) return;

    const match = shipments.find(s => s.id.toUpperCase() === query);
    if (match) {
      setActiveShipmentModal(match);
      navigate('/app/shipments');
    } else {
      setTrackError(`Shipment "${query}" not found. Try demo ID: FF-98214 or FF-98215`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors">
      
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              FF
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">FleetFlow</span>
              <span className="text-[10px] block font-mono text-cyan-600 dark:text-cyan-400 -mt-1 tracking-wider">ENTERPRISE SAAS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">{t('landing.solutions')}</a>
            <a href="#tracking-demo" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">{t('landing.liveTracking')}</a>
            <a href="#impact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">{t('landing.impact')}</a>
            <a href="#pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">{t('landing.pricing')}</a>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
              >
                <span className="text-sm">{language === 'uz' ? '🇺🇿' : (language === 'ru' ? '🇷🇺' : '🇬🇧')}</span>
                <span className="uppercase font-mono text-[11px]">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
                  <button
                    onClick={() => { setLanguage('uz'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'uz' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><span>🇺🇿</span> O'zbekcha</span>
                    {language === 'uz' && <CheckCheck className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('ru'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'ru' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><span>🇷🇺</span> Русский</span>
                    {language === 'ru' && <CheckCheck className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${language === 'en' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <span className="flex items-center gap-2"><span>🇬🇧</span> English</span>
                    {language === 'en' && <CheckCheck className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Switcher in Landing Header */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <Link
              to="/login"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition hidden sm:inline-block px-2"
            >
              {t('landing.login')}
            </Link>
            
            <Link
              to="/app/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
            >
              <span>{t('landing.launchApp')}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

        </div>
      </header>

      {/* Recruiter / Portfolio Demo Alert Banner */}
      <div className="bg-cyan-50 dark:bg-gradient-to-r dark:from-cyan-950 dark:via-slate-900 dark:to-emerald-950 border-b border-cyan-200 dark:border-cyan-850/50 py-2.5 px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400 animate-pulse" />
            <span>{t('landing.portfolioBadge')}</span>
          </div>
          <Link
            to="/app/dashboard"
            className="text-cyan-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
          >
            {t('landing.exploreDemo')}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>{t('landing.heroBadge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            {t('landing.heroTitle1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400">
              {t('landing.heroTitle2')}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {t('landing.heroSub')}
          </p>

          {/* Quick Tracking Search Box in Hero */}
          <div className="mt-10 max-w-xl mx-auto" id="tracking-demo">
            <form onSubmit={handleTrackSubmit} className="p-2 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-2 transition-colors">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder={t('landing.trackPlaceholder')}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('landing.btnTrack')}</span>
              </button>
            </form>

            {trackError ? (
              <p className="text-xs text-rose-500 dark:text-rose-400 mt-2">{trackError}</p>
            ) : (
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span>{t('landing.quickCodes')}</span>
                <button
                  type="button"
                  onClick={() => setTrackInput('FF-98214')}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
                >
                  FF-98214
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setTrackInput('FF-98216')}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
                >
                  FF-98216
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setTrackInput('FF-98219')}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
                >
                  FF-98219
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto pt-10 border-t border-slate-200 dark:border-slate-800/80">
            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">98.4%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.metricSla')}</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">140+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.metricFleet')}</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">$1.4M</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.metricCargo')}</div>
            </div>
            <div>
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">&lt; 15s</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.metricInvoice')}</div>
            </div>
          </div>

        </div>
      </section>

      {/* Real Problems Solved Section */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors" id="impact">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{t('landing.whyLogisticsFail')}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
              {t('landing.whySubtitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Bottleneck 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm transition">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-400 mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-wider">{t('landing.prob1Tag')}</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{t('landing.prob1Title')}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {t('landing.prob1Desc')}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t('landing.sol1Tag')}</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  {t('landing.sol1Desc')}
                </p>
              </div>
            </div>

            {/* Bottleneck 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-5">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{t('landing.prob2Tag')}</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{t('landing.prob2Title')}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {t('landing.prob2Desc')}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t('landing.sol2Tag')}</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  {t('landing.sol2Desc')}
                </p>
              </div>
            </div>

            {/* Bottleneck 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">{t('landing.prob3Tag')}</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{t('landing.prob3Title')}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {t('landing.prob3Desc')}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t('landing.sol3Tag')}</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  {t('landing.sol3Desc')}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="features">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{t('landing.featuresTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
            {t('landing.featuresTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Navigation className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('landing.feat1Title')}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t('landing.feat1Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Truck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-4" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('landing.feat2Title')}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t('landing.feat2Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <BarChart3 className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-4" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('landing.feat3Title')}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t('landing.feat3Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('landing.feat4Title')}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t('landing.feat4Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Activity className="w-8 h-8 text-rose-600 dark:text-rose-400 mb-4" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('landing.feat5Title')}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t('landing.feat5Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Globe2 className="w-8 h-8 text-cyan-600 dark:text-cyan-300 mb-4" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t('landing.feat6Title')}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {t('landing.feat6Desc')}
            </p>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{t('landing.pricingTag')}</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{t('landing.pricingTitle')}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{t('landing.pricingSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Tier 1 */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{t('landing.tier1Title')}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.tier1Sub')}</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">$249</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier1Feat1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier1Feat2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier1Feat3')}</li>
                  <li className="flex items-center gap-2 text-slate-400"><CheckCircle2 className="w-4 h-4 text-slate-300 dark:text-slate-700" /> {t('landing.tier1Feat4')}</li>
                </ul>
              </div>
              <Link to="/login" className="mt-8 block text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                {t('landing.tier1Btn')}
              </Link>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-cyan-500 flex flex-col justify-between relative shadow-2xl shadow-cyan-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                {t('landing.tier2Popular')}
              </span>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{t('landing.tier2Title')}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.tier2Sub')}</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-cyan-600 dark:text-cyan-400 font-mono">$699</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier2Feat1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier2Feat2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier2Feat3')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier2Feat4')}</li>
                </ul>
              </div>
              <Link to="/app/dashboard" className="mt-8 block text-center py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition">
                {t('landing.tier2Btn')}
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{t('landing.tier3Title')}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('landing.tier3Sub')}</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">Custom</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier3Feat1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier3Feat2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier3Feat3')}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> {t('landing.tier3Feat4')}</li>
                </ul>
              </div>
              <Link to="/login" className="mt-8 block text-center py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                {t('landing.tier3Btn')}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-12 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-[10px]">
              FF
            </div>
            <span className="font-bold text-slate-900 dark:text-white">FleetFlow Logistics OS</span>
            <span className="text-slate-400 dark:text-slate-600">© 2026. {t('landing.rights')}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/app/dashboard" className="text-cyan-600 dark:text-cyan-400 hover:underline">{t('landing.launchApp')}</Link>
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-white transition">{t('landing.login')}</Link>
            <span>{t('landing.builtWith')}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
