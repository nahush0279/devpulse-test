export interface ProductRecord {
  sku: string;
  name: string;
  price: number;
  archived?: boolean;
}

interface ArchivedUserRecord {
  user: string;
  archivedAt: Date;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  expiresAt: Date;
  userId: string;
}

interface DeprecatedAuditEntry {
  entryId: string;
  timestamp: Date;
  oldValue: any;
  newValue: any;
}
