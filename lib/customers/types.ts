export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type PendingInvitation = {
  email: string;
  token: string;
  expiresAt: Date;
};

type StaleCacheEntry<T = unknown> = {
  key: string;
  data: T;
  lastAccessed: Date;
};

type WorkspaceMigrationState = {
  sourceId: string;
  targetId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
};

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
