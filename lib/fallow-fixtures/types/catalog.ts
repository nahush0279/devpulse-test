export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface InventoryItem {
  productId: string;
  quantity: number;
  warehouse: string;
}

type ArchivedUserRecord = {
  userId: string;
  archivedAt: Date;
  reason: string;
};

type LegacySessionToken = {
  token: string;
  expiresAt: Date;
  version: number;
};

type DeprecatedAuditEntry = {
  action: string;
  userId: string;
  timestamp: Date;
  details: string;
};
