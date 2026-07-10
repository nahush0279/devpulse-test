export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
}

type PendingInvitation = {
  email: string;
  role: string;
  invitedAt: Date;
};

type StaleCacheEntry = {
  key: string;
  age: number;
};

type WorkspaceMigrationState = {
  sourceId: string;
  targetId: string;
  status: string;
};
