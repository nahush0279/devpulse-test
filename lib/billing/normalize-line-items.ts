import { calculateLineItemTotal } from './shared-billing-utils';

export function normalizeLineItems(items: Array<{ price: number; quantity: number }>): Array<{ total: number }> {
  return items.map(item => ({
    total: calculateLineItemTotal(item.price, item.quantity)
  }));
}
