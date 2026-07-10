export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type PendingInvitation = {
  email: string;
  role: string;
  expiresAt: Date;
};

type StaleCacheEntry = {
  key: string;
  lastAccessed: Date;
  ttl: number;
};

type WorkspaceMigrationState = {
  workspaceId: string;
  fromVersion: number;
  toVersion: number;
  status: 'pending' | 'in-progress' | 'complete' | 'failed';
};
