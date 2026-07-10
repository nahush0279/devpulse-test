import { computeLineItemsTotal } from '../billing/compute-line-items';

export function rollupLineItems(items: any[]) {
  // Roll up line items for report generation
  const total = computeLineItemsTotal(items);
  const count = items.length;
  return { items, total, count };
}
