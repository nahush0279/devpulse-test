export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  usageCredits: number;
}

interface PendingInvitation {
  inviteeEmail: string;
  role: 'editor' | 'viewer';
  expiresAt: number;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: number;
  ttl: number;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  migrationPhase: 'draining' | 'copying' | 'verifying';
}
