export type ProductListing = {
  id: string;
  sku: string;
  price: number;
  category: string;
};

type ArchivedUserRecord = {
  userId: string;
  archivedAt: Date;
  reason: string;
};

type LegacySessionToken = {
  tokenId: string;
  issuedAt: Date;
  expiresAt: Date;
};

type DeprecatedAuditEntry = {
  entryId: string;
  action: string;
  timestamp: Date;
};
