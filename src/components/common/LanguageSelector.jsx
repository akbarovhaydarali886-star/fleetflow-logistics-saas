import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlagUZ, FlagRU, FlagEN, LanguageFlag } from './Flags';

export function LanguageSelector({ align = 'right', size = 'md' }) {
  const { language, setLanguage, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'uz', name: "O'zbekcha", short: 'UZ', flag: <FlagUZ className="w-4 h-3 rounded-xs shadow-xs" /> },
    { code: 'ru', name: 'Русский', short: 'RU', flag: <FlagRU className="w-4 h-3 rounded-xs shadow-xs" /> },
    { code: 'en', name: 'English', short: 'ENG', flag: <FlagEN className="w-4 h-3 rounded-xs shadow-xs" /> }
  ];

  const currentShort = language === 'en' ? 'ENG' : language.toUpperCase();

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition shadow-sm"
        title="Tilni tanlash / Select Language / Выбрать язык"
      >
        <LanguageFlag lang={language} className="w-4 h-3 rounded-xs shadow-xs" />
        <span className="font-mono text-[11px] tracking-wide text-slate-700 dark:text-slate-300">
          {currentShort}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-1.5 z-50 animate-fade-in`}
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
            <span>{t('nav.language') || 'Til / Language'}</span>
            <span className="font-mono text-[9px] text-cyan-600 dark:text-cyan-400">3 TILLI</span>
          </div>

          {languages.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                  isSelected
                    ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50/50 dark:bg-cyan-950/30'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.flag}
                  <span className="text-xs">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    {item.short}
                  </span>
                  {isSelected && <CheckCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
