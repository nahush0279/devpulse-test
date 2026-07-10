export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface InventoryItem {
  productId: string;
  quantity: number;
  warehouse: string;
  lastRestocked: Date;
}

interface ArchivedUserRecord {
  userId: string;
  archivedAt: Date;
  reason: string;
}

interface LegacySessionToken {
  token: string;
  userId: string;
  expiresAt: Date;
  version: number;
}

interface DeprecatedAuditEntry {
  action: string;
  performedBy: string;
  timestamp: Date;
  details: string;
}

export interface Order {
  id: string;
  product: Product;
  quantity: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export interface PickingListItem {
  orderId: string;
  product: Product;
  quantity: number;
  picked: boolean;
}
