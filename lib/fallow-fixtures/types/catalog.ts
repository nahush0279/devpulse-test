export interface ProductListing {
  sku: string;
  title: string;
  price: number;
  stock: number;
}

type ArchivedUserRecord = {
  userId: string;
  archivedAt: Date;
  reason: string;
};

type LegacySessionToken = {
  token: string;
  userId: string;
  expiresAt: Date;
};

type DeprecatedAuditEntry = {
  id: string;
  action: string;
  timestamp: Date;
};

export interface ProductCategory {
  id: string;
  name: string;
  parentId: string | null;
}
