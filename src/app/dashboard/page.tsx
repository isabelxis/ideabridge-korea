'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code, CheckCircle, Clock, TrendingUp, FileText, AlertCircle } from 'lucide-react';
import { getUser, getProblems, getSolutions, isAuthenticated } from '@/lib/auth';
import { format } from 'date-fns';
import { useI18n } from '@/lib/i18n-client';
import { ko, enUS } from 'date-fns/locale';

export default function DashboardPage() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const dateLocale = locale === 'ko' ? ko : enUS;
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalProblems: 0,
    mySolutions: 0,
    acceptedSolutions: 0,
    pendingSolutions: 0,
  });
  const [recentProblems, setRecentProblems] = useState<any[]>([]);
  const [mySolutions, setMySolutions] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    const currentUser = getUser();
    if (currentUser?.role !== 'it_professional') {
      router.push('/problems');
      return;
    }
    setUser(currentUser);

    // Load data
    const problems = getProblems();
    const solutions = getSolutions();
    const mySolutionsList = solutions.filter((s: any) => s.professionalId === currentUser.id);

    // Calculate stats
    const accepted = mySolutionsList.filter((s: any) => s.status === 'accepted').length;
    const pending = mySolutionsList.filter((s: any) => s.status === 'pending').length;

    setStats({
      totalProblems: problems.length,
      mySolutions: mySolutionsList.length,
      acceptedSolutions: accepted,
      pendingSolutions: pending,
    });

    // Get recent problems
    const sortedProblems = [...problems]
      .filter((p: any) => p.status === 'open')
      .sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
    setRecentProblems(sortedProblems);

    // Get my recent solutions
    const sortedSolutions = [...mySolutionsList]
      .sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
    setMySolutions(sortedSolutions);
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard.title')}</h1>
          <p className="text-gray-600">{t('dashboard.subtitle')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('dashboard.totalProblems')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProblems}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('dashboard.mySolutions')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.mySolutions}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('dashboard.acceptedSolutions')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.acceptedSolutions}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('dashboard.pendingSolutions')}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingSolutions}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Problems */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.recentProblems')}</h2>
              <Link
                href="/problems"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('dashboard.viewAll')}
              </Link>
            </div>
            {recentProblems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>{t('dashboard.noProblems')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProblems.map((problem) => (
                  <Link
                    key={problem.id}
                    href={`/problems/${problem.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {problem.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {problem.category && (
                        <span className="px-2 py-1 bg-gray-100 rounded">{problem.category}</span>
                      )}
                      {problem.createdAt && (
                        <span>{format(new Date(problem.createdAt), locale === 'ko' ? 'yyyy년 M월 d일' : 'MMMM d, yyyy', { locale: dateLocale })}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* My Solutions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.mySolutionsTitle')}</h2>
              <Link
                href="/problems"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('dashboard.viewProblems')}
              </Link>
            </div>
            {mySolutions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>{t('dashboard.noSolutions')}</p>
                <Link
                  href="/problems"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {t('dashboard.browseProblems')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {mySolutions.map((solution) => {
                  const problem = getProblems().find((p: any) => p.id === solution.problemId);
                  return (
                    <div
                      key={solution.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {solution.title}
                        </h3>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                            solution.status
                          )}`}
                        >
                          {solution.status === 'accepted'
                            ? t('dashboard.solutionStatus.accepted')
                            : solution.status === 'rejected'
                            ? t('dashboard.solutionStatus.rejected')
                            : t('dashboard.solutionStatus.pending')}
                        </span>
                      </div>
                      {problem && (
                        <Link
                          href={`/problems/${problem.id}`}
                          className="text-sm text-blue-600 hover:text-blue-700 mb-2 block"
                        >
                          {t('dashboard.problem')}: {problem.title}
                        </Link>
                      )}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {solution.proposedSolution}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        {solution.estimatedTime && (
                          <span>{t('dashboard.estimatedTime')}: {solution.estimatedTime}</span>
                        )}
                        {solution.createdAt && (
                          <span>{format(new Date(solution.createdAt), locale === 'ko' ? 'yyyy년 M월 d일' : 'MMMM d, yyyy', { locale: dateLocale })}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
