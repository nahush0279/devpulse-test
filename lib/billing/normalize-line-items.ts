import { LineItem, calculateLineItemTax } from './shared-line-item-utils';

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return items.map(item => ({
    ...item,
    taxAmount: calculateLineItemTax(item)
  }));
}
