export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
}

interface PendingInvitation {
  email: string;
  role: string;
  invitedAt: string;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: string;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  status: string;
  progress: number;
}

export type { CustomerProfile };
