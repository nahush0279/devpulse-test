export interface ProductListing {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: string;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  expiresAt: string;
  format: string;
}

interface DeprecatedAuditEntry {
  entryId: string;
  action: string;
  timestamp: string;
}

export type { ProductListing };
