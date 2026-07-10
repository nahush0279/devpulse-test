export interface ProductListing {
  id: string;
  sku: string;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
}

type ArchivedUserRecord = {
  userId: string;
  archivedAt: Date;
  reason: string;
};

type LegacySessionToken = {
  token: string;
  expiresAt: Date;
  userId: string;
};

type DeprecatedAuditEntry = {
  action: string;
  performedBy: string;
  timestamp: Date;
  details: Record<string, unknown>;
};
