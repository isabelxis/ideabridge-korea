import ko from './translations/ko.json';
import en from './translations/en.json';

export type Locale = 'ko' | 'en';

export const locales: Locale[] = ['ko', 'en'];
export const defaultLocale: Locale = 'ko';

export const translations = {
  ko,
  en,
} as const;

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale];
}

export function getNestedTranslation(translations: any, path: string): string {
  const keys = path.split('.');
  let value: any = translations;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return path if translation not found
    }
  }
  
  return typeof value === 'string' ? value : path;
}
