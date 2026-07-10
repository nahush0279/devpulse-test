export interface ProductListing {
  sku: string;
  title: string;
  price: number;
  category: string;
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
  timestamp: Date;
  userId: string;
};
