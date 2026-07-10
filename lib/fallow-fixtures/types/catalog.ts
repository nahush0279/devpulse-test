export interface CatalogProduct {
  id: string;
  title: string;
  sku: string;
  price: number;
  category: string;
  tags: string[];
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: number;
  reason: 'deleted' | 'suspended' | 'expired';
}

interface LegacySessionToken {
  token: string;
  issuedAt: number;
  expiresAt: number;
  scopes: string[];
}

interface DeprecatedAuditEntry {
  action: string;
  actorId: string;
  timestamp: number;
  details: Record<string, unknown>;
}
