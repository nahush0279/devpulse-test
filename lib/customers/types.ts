export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface PendingInvitation {
  email: string;
  role: string;
  invitedAt: Date;
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: Date;
  ttl: number;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  sourceRegion: string;
  targetRegion: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: Date;
}

export type CustomerStatus = 'active' | 'inactive' | 'suspended';
