export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
}

interface PendingInvitation {
  id: string;
  invitedEmail: string;
  role: string;
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: Date;
  staleThreshold: number;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  migrationVersion: number;
  completedAt: Date | null;
}
