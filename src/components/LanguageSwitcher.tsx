import React from 'react';
import { useDemo } from '../context/DemoContext';
import { Language } from '../i18n/translations';

export const LanguageSwitcher: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const { language, setLanguage } = useDemo();

  const langs: { id: Language; label: string }[] = [
    { id: 'id', label: 'ID' },
    { id: 'en', label: 'EN' },
    { id: 'ar', label: 'AR' },
  ];

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-lg border ${
        dark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
      }`}
    >
      {langs.map((l) => {
        const active = language === l.id;
        return (
          <button
            key={l.id}
            onClick={() => setLanguage(l.id)}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              active
                ? 'bg-[#059669] text-white shadow-xs'
                : dark
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};
