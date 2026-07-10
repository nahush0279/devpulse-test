export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
};

type PendingInvitation = {
  invitedEmail: string;
  invitedAt: Date;
  expiresAt: Date;
};

type StaleCacheEntry = {
  key: string;
  lastAccessed: Date;
  ttl: number;
};

type WorkspaceMigrationState = {
  workspaceId: string;
  migrationTarget: string;
  status: 'pending' | 'in-progress' | 'completed';
};
