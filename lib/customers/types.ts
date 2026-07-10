export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  tier: 'standard' | 'premium' | 'enterprise';
}

type PendingInvitation = {
  email: string;
  role: string;
  expiresAt: Date;
};

type StaleCacheEntry<T = unknown> = {
  key: string;
  data: T;
  lastAccessed: Date;
  ttlMs: number;
};

type WorkspaceMigrationState = {
  sourceWorkspaceId: string;
  targetWorkspaceId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: Date;
};
