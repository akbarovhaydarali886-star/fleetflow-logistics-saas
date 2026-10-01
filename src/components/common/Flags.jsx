import React from 'react';

export function FlagUZ({ className = "w-5 h-3.5 rounded-xs shadow-xs object-cover" }) {
  return (
    <svg className={className} viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue stripe */}
      <rect width="500" height="80" fill="#0099B5" />
      {/* Red border 1 */}
      <rect y="80" width="500" height="5" fill="#CE1126" />
      {/* White stripe */}
      <rect y="85" width="500" height="80" fill="#FFFFFF" />
      {/* Red border 2 */}
      <rect y="165" width="500" height="5" fill="#CE1126" />
      {/* Green stripe */}
      <rect y="170" width="500" height="80" fill="#1EB53A" />
      
      {/* Crescent */}
      <circle cx="70" cy="40" r="26" fill="#FFFFFF" />
      <circle cx="78" cy="40" r="23" fill="#0099B5" />
      
      {/* 12 Stars arranged in 3 tiers */}
      <g fill="#FFFFFF">
        {/* Row 1 (3 stars) */}
        <circle cx="120" cy="20" r="3.5" />
        <circle cx="140" cy="20" r="3.5" />
        <circle cx="160" cy="20" r="3.5" />
        {/* Row 2 (4 stars) */}
        <circle cx="100" cy="38" r="3.5" />
        <circle cx="120" cy="38" r="3.5" />
        <circle cx="140" cy="38" r="3.5" />
        <circle cx="160" cy="38" r="3.5" />
        {/* Row 3 (5 stars) */}
        <circle cx="80" cy="56" r="3.5" />
        <circle cx="100" cy="56" r="3.5" />
        <circle cx="120" cy="56" r="3.5" />
        <circle cx="140" cy="56" r="3.5" />
        <circle cx="160" cy="56" r="3.5" />
      </g>
    </svg>
  );
}

export function FlagRU({ className = "w-5 h-3.5 rounded-xs shadow-xs object-cover" }) {
  return (
    <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="66.7" fill="#FFFFFF" />
      <rect y="66.7" width="300" height="66.7" fill="#0039A6" />
      <rect y="133.4" width="300" height="66.6" fill="#D52B1E" />
    </svg>
  );
}

export function FlagEN({ className = "w-5 h-3.5 rounded-xs shadow-xs object-cover" }) {
  return (
    <svg className={className} viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="uk-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="30" fill="#012169" />
        {/* White diagonals */}
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        {/* Red diagonals */}
        <path d="M0,0 L30,15 M60,30 L30,15 M60,0 L30,15 M0,30 L30,15" stroke="#C8102E" strokeWidth="2.2" />
        {/* White cross */}
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        {/* Red cross */}
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function LanguageFlag({ lang, className }) {
  if (lang === 'uz') return <FlagUZ className={className} />;
  if (lang === 'ru') return <FlagRU className={className} />;
  return <FlagEN className={className} />;
}
