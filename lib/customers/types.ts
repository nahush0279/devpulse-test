export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type PendingInvitation = {
  email: string;
  role: "admin" | "member";
  invitedAt: Date;
};

type StaleCacheEntry = {
  key: string;
  lastAccessed: Date;
  ttl: number;
};

type WorkspaceMigrationState = {
  from: string;
  to: string;
  progress: number;
};
