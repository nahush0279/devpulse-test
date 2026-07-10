import { normalizeCurrency, computeAbsoluteAmount } from "../shared/numeric-helpers";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  currency: string;
}

export function normalizeLineItems(items: LineItem[]) {
  return items.map((item) => {
    const currency = normalizeCurrency(item.currency);
    const total = computeAbsoluteAmount(item.quantity, item.unitPrice);
    
    return {
      ...item,
      currency,
      total,
    };
  });
}

export function calculateSubtotal(items: LineItem[]) {
  return items.reduce((sum, item) => {
    const currency = normalizeCurrency(item.currency);
    const total = computeAbsoluteAmount(item.quantity, item.unitPrice);
    return sum + total;
  }, 0);
}
