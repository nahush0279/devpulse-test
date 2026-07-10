export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface PendingInvitation {
  email: string;
  token: string;
  expiresAt: Date;
}

interface StaleCacheEntry {
  key: string;
  lastAccessed: Date;
  size: number;
}

interface WorkspaceMigrationState {
  workspaceId: string;
  phase: "drain" | "copy" | "verify" | "cutover";
  startedAt: Date;
}
