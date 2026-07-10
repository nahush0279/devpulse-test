import { calculateLineItemTotals } from './calc-helpers';

export interface LineItem {
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
}

export function normalizeLineItem(item: LineItem): {
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
} {
  return calculateLineItemTotals(item);
}
