export interface ProductListing {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: Date;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  userId: string;
  issuedAt: Date;
}

interface DeprecatedAuditEntry {
  entryId: string;
  action: string;
  timestamp: Date;
  userId: string;
}
