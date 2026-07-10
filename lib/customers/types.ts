export interface CustomerSegment {
  id: string;
  name: string;
  customerIds: string[];
  createdAt: Date;
}

interface PendingInvitation {
  email: string;
  role: string;
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: Date;
  ttl: number;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  fromVersion: string;
  toVersion: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
  segment: CustomerSegment;
  metadata: Record<string, unknown>;
};
