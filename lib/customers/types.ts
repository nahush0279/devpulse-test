export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
};

type PendingInvitation = {
  email: string;
  invitedAt: Date;
};

type StaleCacheEntry = {
  key: string;
  lastAccessed: Date;
};

type WorkspaceMigrationState = {
  workspaceId: string;
  fromPlan: string;
  toPlan: string;
};

export type BillingCycle = {
  start: Date;
  end: Date;
  amount: number;
};
