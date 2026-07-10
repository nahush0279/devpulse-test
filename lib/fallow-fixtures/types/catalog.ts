export interface Product {
  sku: string;
  name: string;
  price: number;
}

interface ArchivedUserRecord {
  id: string;
  archivedAt: string;
}

interface LegacySessionToken {
  token: string;
  expiresAt: number;
}

interface DeprecatedAuditEntry {
  id: string;
  action: string;
  timestamp: string;
}

export const TAX_RATE = 0.08;
