'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUser, logout } from '@/lib/auth';
import { User } from '@/types';
import { useI18n } from '@/lib/i18n-client';
import LanguageSelector from '@/components/LanguageSelector';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setUser(getUser());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = '/';
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Network className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">{t('common.appName')}</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/problems"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/problems')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {t('nav.findProblems')}
            </Link>
            {user && (
              <>
                {user.role === 'problem_owner' && (
                  <Link
                    href="/problems/new"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/problems/new')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {t('nav.submitProblem')}
                  </Link>
                )}
                {user.role === 'it_professional' && (
                  <Link
                    href="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                <Link
                  href="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {t('nav.profile')}
                </Link>
                <LanguageSelector />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('nav.logout')}</span>
                </button>
              </>
            )}
            {!user && (
              <>
                <LanguageSelector />
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                href="/problems"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/problems')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.findProblems')}
              </Link>
              {user && (
                <>
                  {user.role === 'problem_owner' && (
                    <Link
                      href="/problems/new"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/problems/new')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.submitProblem')}
                    </Link>
                  )}
                  {user.role === 'it_professional' && (
                    <Link
                      href="/dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/dashboard')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/profile')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.profile')}
                  </Link>
                  <div className="px-3 py-2">
                    <LanguageSelector />
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              )}
              {!user && (
                <>
                  <div className="px-3 py-2">
                    <LanguageSelector />
                  </div>
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
