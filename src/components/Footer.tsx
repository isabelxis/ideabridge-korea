'use client';

import { Network } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-client';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Network className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">{t('common.appName')}</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/problems" className="hover:text-blue-400 transition-colors">
                  {t('footer.findProblems')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-400 transition-colors">
                  {t('footer.register')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
