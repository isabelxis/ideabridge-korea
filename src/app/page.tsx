'use client';

import Link from 'next/link';
import { ArrowRight, Users, Lightbulb, Shield } from 'lucide-react';
import { useI18n } from '@/lib/i18n-client';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 whitespace-pre-line">
              {t('home.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
              >
                {t('home.getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                {t('home.browseProblems')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.specialPlatform')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.specialPlatformDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.safeConnection')}</h3>
              <p className="text-gray-600">
                {t('home.safeConnectionDesc')}
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.problemSolving')}</h3>
              <p className="text-gray-600">
                {t('home.problemSolvingDesc')}
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.culturalFit')}</h3>
              <p className="text-gray-600">
                {t('home.culturalFitDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.howItWorks')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.howItWorksDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.step1Title')}</h3>
              <p className="text-gray-600">
                {t('home.step1Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.step2Title')}</h3>
              <p className="text-gray-600">
                {t('home.step2Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.step3Title')}</h3>
              <p className="text-gray-600">
                {t('home.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('home.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=problem_owner"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              {t('home.submitProblem')}
            </Link>
            <Link
              href="/register?role=it_professional"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              {t('home.registerAsExpert')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}