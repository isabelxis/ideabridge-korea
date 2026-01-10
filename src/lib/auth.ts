'use client';

import { User, UserRole } from '@/types';

const STORAGE_KEY = 'ideabridge_user';
const STORAGE_KEY_PROBLEMS = 'ideabridge_problems';
const STORAGE_KEY_SOLUTIONS = 'ideabridge_solutions';
const STORAGE_KEY_CONNECTIONS = 'ideabridge_connections';

export function setUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(STORAGE_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}

export function getProblems() {
  if (typeof window === 'undefined') return [];
  const problemsJson = localStorage.getItem(STORAGE_KEY_PROBLEMS);
  if (!problemsJson) return [];
  try {
    return JSON.parse(problemsJson);
  } catch {
    return [];
  }
}

export function saveProblem(problem: any) {
  if (typeof window === 'undefined') return;
  const problems = getProblems();
  problems.push({ ...problem, id: Date.now().toString() });
  localStorage.setItem(STORAGE_KEY_PROBLEMS, JSON.stringify(problems));
}

export function getSolutions() {
  if (typeof window === 'undefined') return [];
  const solutionsJson = localStorage.getItem(STORAGE_KEY_SOLUTIONS);
  if (!solutionsJson) return [];
  try {
    return JSON.parse(solutionsJson);
  } catch {
    return [];
  }
}

export function saveSolution(solution: any) {
  if (typeof window === 'undefined') return;
  const solutions = getSolutions();
  solutions.push({ ...solution, id: Date.now().toString() });
  localStorage.setItem(STORAGE_KEY_SOLUTIONS, JSON.stringify(solutions));
}

export function getConnections() {
  if (typeof window === 'undefined') return [];
  const connectionsJson = localStorage.getItem(STORAGE_KEY_CONNECTIONS);
  if (!connectionsJson) return [];
  try {
    return JSON.parse(connectionsJson);
  } catch {
    return [];
  }
}

export function saveConnection(connection: any) {
  if (typeof window === 'undefined') return;
  const connections = getConnections();
  connections.push({ ...connection, id: Date.now().toString() });
  localStorage.setItem(STORAGE_KEY_CONNECTIONS, JSON.stringify(connections));
}
