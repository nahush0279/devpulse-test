export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: Date;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  userId: string;
  expiresAt: Date;
  version: number;
}

interface DeprecatedAuditEntry {
  action: string;
  userId: string;
  timestamp: Date;
  details: Record<string, unknown>;
}
