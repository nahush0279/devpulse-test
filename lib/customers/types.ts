export type CustomerSummary = {
  id: string;
  displayName: string;
};

type PendingInvitation = {
  email: string;
  role: "admin" | "member" | "viewer";
  sentAt: string;
};

type StaleCacheEntry = {
  key: string;
  fetchedAt: number;
  ttlSeconds: number;
};

interface WorkspaceMigrationState {
  sourceId: string;
  targetId: string;
  phase: "pending" | "running" | "complete";
}
