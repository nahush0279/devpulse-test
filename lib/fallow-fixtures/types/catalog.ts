export type ProductID = string;
export type SKU = string;
export type CategorySlug = string;
export type TaxRateID = number;
export type SupplierCode = string;
export type ReviewScore = number;

interface ArchivedUserRecord {
  userId: string;
  archivedAt: Date;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  issuedAt: Date;
  expiresAt: Date;
}

interface DeprecatedAuditEntry {
  action: string;
  performedBy: string;
  timestamp: Date;
}
