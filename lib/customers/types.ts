export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  tier: "standard" | "premium" | "enterprise";
}

interface PendingInvitation {
  email: string;
  role: "admin" | "member";
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: Date;
  ttl: number;
}

interface WorkspaceMigrationState {
  fromVersion: number;
  toVersion: number;
  progress: number;
}
