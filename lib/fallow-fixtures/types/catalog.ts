export interface ProductCatalogItem {
  sku: string;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: string;
  reason: "deleted" | "merged" | "inactive";
}

type LegacySessionToken = {
  token: string;
  expiresAt: string;
  issuedTo: string;
};

interface DeprecatedAuditEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
}
