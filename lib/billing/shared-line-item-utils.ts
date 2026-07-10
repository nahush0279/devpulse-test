export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export function calculateLineItemTax(item: LineItem): number {
  const subtotal = item.quantity * item.unitPrice;
  return subtotal * item.taxRate;
}
