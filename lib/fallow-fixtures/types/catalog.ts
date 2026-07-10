export interface ProductItem {
  sku: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: Date;
  reason: string;
  restoredData?: Record<string, unknown>;
}

interface LegacySessionToken {
  tokenId: string;
  userId: string;
  issuedAt: Date;
  expiresAt: Date;
  scope: string[];
}

interface DeprecatedAuditEntry {
  id: string;
  action: string;
  targetId: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export type CatalogSortOption = 'price_asc' | 'price_desc' | 'name' | 'popularity';
