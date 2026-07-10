import { computeLineItemsTotal } from './compute-line-items';

export interface LineItem {
  item: string;
  quantity: number;
  unitPrice: number;
}

export function normalizeLineItems(items: LineItem[]) {
  // Normalise all line items to a standard format
  const normalized = items.map((item) => ({
    ...item,
    total: item.quantity * item.unitPrice,
  }));
  const total = computeLineItemsTotal(items);
  return { items: normalized, total };
}
