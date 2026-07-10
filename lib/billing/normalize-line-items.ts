import { LineItem, calculateLineItemTotal } from './shared-helpers';

export interface NormalizedLineItem extends LineItem {
  total: number;
}

export function normalizeLineItems(items: LineItem[]): NormalizedLineItem[] {
  return items.map(item => ({
    ...item,
    total: calculateLineItemTotal(item),
  }));
}
