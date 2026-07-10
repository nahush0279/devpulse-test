export interface LineItem {
  sku: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

export function calculateLineItemTotal(item: LineItem): number {
  const subtotal = item.quantity * item.unitPrice;
  const discount = item.discount ?? 0;
  return Math.round((subtotal - discount) * 100) / 100;
}
