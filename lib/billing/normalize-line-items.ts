import { clampTaxRate, clampPositive } from '../shared-utils';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return items.map(item => ({
    ...item,
    taxRate: clampTaxRate(item.taxRate),
    quantity: clampPositive(item.quantity),
    unitPrice: clampPositive(item.unitPrice),
  }));
}

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calculateTax(items: LineItem[]): number {
  return items.reduce((sum, item) => {
    const subtotal = item.quantity * item.unitPrice;
    return sum + subtotal * clampTaxRate(item.taxRate);
  }, 0);
}
