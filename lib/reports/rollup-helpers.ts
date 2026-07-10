import { LineItem, calculateLineItemTax } from './../billing/shared-line-item-utils';

export function rollupLineItems(items: LineItem[]): LineItem[] {
  return items.map(item => ({
    ...item,
    taxAmount: calculateLineItemTax(item)
  }));
}
