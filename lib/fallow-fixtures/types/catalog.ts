export type Product = {
  id: string;
  name: string;
  price: number;
};

type ArchivedUserRecord = {
  userId: string;
  archivedAt: Date;
};

type LegacySessionToken = {
  token: string;
  expiresAt: Date;
};

type DeprecatedAuditEntry = {
  id: string;
  action: string;
};

export type Order = {
  orderId: string;
  items: string[];
};
