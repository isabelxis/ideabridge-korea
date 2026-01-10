'use client';

import { Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n-client';
import { Locale, locales } from '@/i18n';
import { useState, useRef, useEffect } from 'react';

const localeLabels: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
};

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span>{localeLabels[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  locale === loc
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
