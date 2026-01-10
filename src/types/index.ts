export type UserRole = 'problem_owner' | 'it_professional';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  company?: string;
  skills?: string[];
  bio?: string;
  createdAt: Date;
}

export interface Problem {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  budget?: string;
  timeline?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Solution {
  id: string;
  problemId: string;
  professionalId: string;
  title: string;
  description: string;
  proposedSolution: string;
  estimatedTime?: string;
  estimatedCost?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Connection {
  id: string;
  problemId: string;
  professionalId: string;
  ownerId: string;
  status: 'requested' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
}
