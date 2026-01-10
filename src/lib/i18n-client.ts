'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Locale, getTranslations, defaultLocale, getNestedTranslation } from '@/i18n';
import React from 'react';

type Translations = ReturnType<typeof getTranslations>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  translations: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'ideabridge-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Translations>(getTranslations(defaultLocale));

  useEffect(() => {
    // Load locale from localStorage or browser preference
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    const browserLocale = navigator.language.split('-')[0] as Locale;
    
    const initialLocale = 
      storedLocale && ['ko', 'en'].includes(storedLocale) 
        ? storedLocale 
        : browserLocale === 'en' 
        ? 'en' 
        : defaultLocale;

    setLocaleState(initialLocale);
    setTranslations(getTranslations(initialLocale));
    // Update HTML lang attribute on initial load
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initialLocale;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setTranslations(getTranslations(newLocale));
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  const t = (path: string): string => {
    return getNestedTranslation(translations, path);
  };

  const contextValue: I18nContextType = {
    locale,
    setLocale,
    t,
    translations,
  };

  return React.createElement(
    I18nContext.Provider, 
    { value: contextValue }, 
    children
  );

}


export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
  }
