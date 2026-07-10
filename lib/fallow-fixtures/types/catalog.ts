export interface CatalogProduct {
  id: string;
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
  archivedAt: string;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

interface DeprecatedAuditEntry {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}
