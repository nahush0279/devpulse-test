export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  planTier: string;
  createdAt: string;
  lastLoginAt: string;
}

interface PendingInvitation {
  inviterId: string;
  inviteeEmail: string;
  sentAt: string;
}

type StaleCacheEntry = {
  key: string;
  lastAccessed: number;
  size: number;
};

interface WorkspaceMigrationState {
  fromOrgId: string;
  toOrgId: string;
  status: "pending" | "in_progress" | "completed";
  startedAt: string;
}
