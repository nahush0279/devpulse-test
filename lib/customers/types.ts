export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface PendingInvitation {
  inviteId: string;
  email: string;
  role: string;
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  data: unknown;
  lastAccessed: Date;
}

interface WorkspaceMigrationState {
  sourceWorkspaceId: string;
  targetWorkspaceId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: Date;
}
