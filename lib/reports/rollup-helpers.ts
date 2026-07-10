import { calculateLineItemTotal } from '../billing/shared-billing-utils';

export function rollupLineItems(items: Array<{ price: number; quantity: number }>): Array<{ total: number }> {
  return items.map(item => ({
    total: calculateLineItemTotal(item.price, item.quantity)
  }));
}
