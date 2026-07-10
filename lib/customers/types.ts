export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
  createdAt: string;
}

interface PendingInvitation {
  email: string;
  role: string;
  invitedAt: string;
  expiresAt: string;
}

interface StaleCacheEntry {
  key: string;
  storedAt: string;
  ttl: number;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  migrationId: string;
  status: string;
  startedAt: string;
}
