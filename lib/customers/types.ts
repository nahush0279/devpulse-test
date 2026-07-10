export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
}

interface PendingInvitation {
  email: string;
  role: string;
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  value: unknown;
  lastAccessed: Date;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  status: 'pending' | 'in-progress' | 'completed';
  startedAt: Date | null;
}
