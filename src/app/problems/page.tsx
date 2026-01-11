'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, Clock, DollarSign, Tag } from 'lucide-react';
import { getProblems, getUser } from '@/lib/auth';
import { Problem } from '@/types';
import { format } from 'date-fns';
import { useI18n } from '@/lib/i18n-client';
import { ko, enUS } from 'date-fns/locale';

export default function ProblemsPage() {
  const { t, locale } = useI18n();
  const [problems, setProblems] = useState<any[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const user = getUser();
  
  const dateLocale = locale === 'ko' ? ko : enUS;

  useEffect(() => {
    const storedProblems = getProblems();
    setProblems(storedProblems);
    setFilteredProblems(storedProblems);
  }, []);

  useEffect(() => {
    let filtered = problems;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredProblems(filtered);
  }, [searchQuery, categoryFilter, statusFilter, problems]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return t('problems.status.open');
      case 'in_progress':
        return t('problems.status.inProgress');
      case 'completed':
        return t('problems.status.completed');
      case 'closed':
        return t('problems.status.closed');
      default:
        return status;
    }
  };
  
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return t('problems.urgency.high');
      case 'medium':
        return t('problems.urgency.medium');
      case 'low':
        return t('problems.urgency.low');
      default:
        return urgency;
    }
  };

  const categories = Array.from(new Set(problems.map((p) => p.category))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('problems.title')}</h1>
            <p className="text-gray-600">{t('problems.subtitle')}</p>
          </div>
          {user?.role === 'problem_owner' && (
            <Link
              href="/problems/new"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('problems.newProblem')}
            </Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('problems.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('problems.allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('problems.allStatuses')}</option>
              <option value="open">{t('problems.status.open')}</option>
              <option value="in_progress">{t('problems.status.inProgress')}</option>
              <option value="completed">{t('problems.status.completed')}</option>
              <option value="closed">{t('problems.status.closed')}</option>
            </select>
          </div>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 mb-4">{t('problems.noProblems')}</p>
            {user?.role === 'problem_owner' && (
              <Link
                href="/problems/new"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                {t('problems.submitFirst')}
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {problem.title}
                  </h3>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                      problem.status
                    )}`}
                  >
                    {getStatusLabel(problem.status)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{problem.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.category && (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {problem.category}
                    </span>
                  )}
                  {problem.urgency && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(
                        problem.urgency
                      )}`}
                    >
                      {getUrgencyLabel(problem.urgency)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {problem.createdAt
                      ? format(new Date(problem.createdAt), locale === 'ko' ? 'yyyy년 M월 d일' : 'MMMM d, yyyy', { locale: dateLocale })
                      : t('problems.detail.noDate')}
                  </div>
                  {problem.budget && (
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {problem.budget}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
