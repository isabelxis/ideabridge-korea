'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { getUser, setUser } from '@/lib/auth';
import { UserRole } from '@/types';
import { useI18n } from '@/lib/i18n-client';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'problem_owner' as UserRole,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (getUser()) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For MVP, we'll create a simple demo user if email matches
    // In production, this would verify against a database
    const demoUsers: Record<string, any> = {
      'owner@example.com': {
        id: '1',
        name: t('auth.login.problemOwner'),
        email: 'owner@example.com',
        role: 'problem_owner',
        createdAt: new Date(),
      },
      'pro@example.com': {
        id: '2',
        name: t('auth.login.itProfessional'),
        email: 'pro@example.com',
        role: 'it_professional',
        skills: ['React', 'Node.js', 'TypeScript'],
        createdAt: new Date(),
      },
    };

    if (demoUsers[formData.email] && formData.password.length >= 6) {
      setUser(demoUsers[formData.email]);
      router.push(formData.role === 'it_professional' ? '/dashboard' : '/problems');
    } else {
      // Create a new user for MVP simplicity
      const newUser = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.role,
        createdAt: new Date(),
      };
      setUser(newUser);
      router.push(formData.role === 'it_professional' ? '/dashboard' : '/problems');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('auth.login.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.login.email')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('auth.login.emailPlaceholder')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.login.password')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('auth.login.passwordPlaceholder')}
                  required
                  minLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {t('auth.login.mvpNote')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.login.userType')}
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="problem_owner">{t('auth.login.problemOwner')}</option>
                <option value="it_professional">{t('auth.login.itProfessional')}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {t('auth.login.loginButton')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              {t('auth.login.signUp')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}