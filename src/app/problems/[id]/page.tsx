'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, Tag, AlertCircle, Send, User } from 'lucide-react';
import { getProblems, getUser, getSolutions, saveSolution, isAuthenticated } from '@/lib/auth';
import { format } from 'date-fns';
import { useI18n } from '@/lib/i18n-client';
import { ko, enUS } from 'date-fns/locale';

export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useI18n();
  const problemId = params.id as string;
  const dateLocale = locale === 'ko' ? ko : enUS;

  const [problem, setProblem] = useState<any>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [solutionData, setSolutionData] = useState({
    title: '',
    description: '',
    proposedSolution: '',
    estimatedTime: '',
    estimatedCost: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    const currentUser = getUser();
    setUser(currentUser);

    const problems = getProblems();
    const foundProblem = problems.find((p: any) => p.id === problemId);
    setProblem(foundProblem);

    const allSolutions = getSolutions();
    const problemSolutions = allSolutions.filter((s: any) => s.problemId === problemId);
    setSolutions(problemSolutions);
  }, [problemId, router]);

  const validateSolution = () => {
    const newErrors: Record<string, string> = {};

    if (!solutionData.title.trim()) newErrors.title = t('problems.detail.titleRequired');
    if (!solutionData.proposedSolution.trim()) newErrors.proposedSolution = t('problems.detail.solutionRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitSolution = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSolution() || !user || !problem) return;

    const solution = {
      ...solutionData,
      problemId: problem.id,
      professionalId: user.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveSolution(solution);
    
    const allSolutions = getSolutions();
    const problemSolutions = allSolutions.filter((s: any) => s.problemId === problemId);
    setSolutions(problemSolutions);
    
    setSolutionData({
      title: '',
      description: '',
      proposedSolution: '',
      estimatedTime: '',
      estimatedCost: '',
    });
    setShowSolutionForm(false);
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('problems.detail.problemNotFound')}</h2>
            <p className="text-gray-600 mb-6">{t('problems.detail.problemNotFoundDesc')}</p>
            <Link
              href="/problems"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t('problems.detail.backToList')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/problems"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('problems.detail.backToList')}
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{problem.title}</h1>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(problem.status)}`}>
                {problem.status === 'open' ? t('problems.status.open') : problem.status === 'in_progress' ? t('problems.status.inProgress') : problem.status === 'completed' ? t('problems.status.completed') : t('problems.status.closed')}
              </span>
              {problem.urgency && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(problem.urgency)}`}>
                  {problem.urgency === 'high' ? t('problems.urgency.high') : problem.urgency === 'medium' ? t('problems.urgency.medium') : t('problems.urgency.low')}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            {problem.category && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                {problem.category}
              </div>
            )}
            {problem.createdAt && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {format(new Date(problem.createdAt), locale === 'ko' ? 'yyyy년 M월 d일' : 'MMMM d, yyyy', { locale: dateLocale })}
              </div>
            )}
            {problem.budget && (
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                {problem.budget}
              </div>
            )}
          </div>

          <div className="prose max-w-none mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('problems.detail.problemDescription')}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
          </div>

          {problem.timeline && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>{t('problems.detail.expectedTimeline')}:</strong> {problem.timeline}
              </p>
            </div>
          )}

          {user?.role === 'it_professional' && problem.status === 'open' && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              {!showSolutionForm ? (
                <button
                  onClick={() => setShowSolutionForm(true)}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  {t('problems.detail.proposeSolution')}
                </button>
              ) : (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('problems.detail.solutionProposal')}</h3>
                  <form onSubmit={handleSubmitSolution} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('problems.detail.solutionTitle')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={solutionData.title}
                        onChange={(e) => setSolutionData({ ...solutionData, title: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('problems.detail.titlePlaceholder')}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('problems.detail.solutionDescription')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={solutionData.proposedSolution}
                        onChange={(e) => setSolutionData({ ...solutionData, proposedSolution: e.target.value })}
                        rows={6}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.proposedSolution ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('problems.detail.descriptionPlaceholder')}
                      />
                      {errors.proposedSolution && (
                        <p className="mt-1 text-sm text-red-600">{errors.proposedSolution}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('problems.detail.estimatedTime')}
                        </label>
                        <input
                          type="text"
                          value={solutionData.estimatedTime}
                          onChange={(e) => setSolutionData({ ...solutionData, estimatedTime: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('problems.detail.timePlaceholder')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('problems.detail.estimatedCost')}
                        </label>
                        <input
                          type="text"
                          value={solutionData.estimatedCost}
                          onChange={(e) => setSolutionData({ ...solutionData, estimatedCost: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('problems.detail.costPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSolutionForm(false);
                          setSolutionData({
                            title: '',
                            description: '',
                            proposedSolution: '',
                            estimatedTime: '',
                            estimatedCost: '',
                          });
                          setErrors({});
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {t('common.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        {t('problems.detail.submitSolution')}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {solutions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('problems.detail.proposedSolutions')} ({solutions.length})
            </h2>
            <div className="space-y-6">
              {solutions.map((solution) => (
                <div key={solution.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{solution.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        solution.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : solution.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {solution.status === 'accepted'
                        ? t('dashboard.solutionStatus.accepted')
                        : solution.status === 'rejected'
                        ? t('dashboard.solutionStatus.rejected')
                        : t('dashboard.solutionStatus.pending')}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap mb-4">{solution.proposedSolution}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-4 border-t border-gray-200">
                    {solution.estimatedTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {t('dashboard.estimatedTime')}: {solution.estimatedTime}
                      </div>
                    )}
                    {solution.estimatedCost && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {t('problems.detail.estimatedCost')}: {solution.estimatedCost}
                      </div>
                    )}
                    {solution.createdAt && (
                      <div className="flex items-center">
                        {format(new Date(solution.createdAt), locale === 'ko' ? 'yyyy년 M월 d일' : 'MMMM d, yyyy', { locale: dateLocale })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
