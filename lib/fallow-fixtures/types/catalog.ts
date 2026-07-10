export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
}

export interface InventoryItem {
  productId: string;
  quantity: number;
  warehouse: string;
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
  entryId: string;
  action: string;
  timestamp: Date;
  userId: string;
  details: Record<string, unknown>;
}
