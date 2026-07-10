import { standardizeAmount } from '../shared/amount-utils';

export function normalizeLineItems(items: Array<{ amount: number; currency: string }>): Array<{ amount: number; currency: string }> {
  return items.map(item => ({
    amount: standardizeAmount(item.amount),
    currency: item.currency.toUpperCase()
  }));
}
