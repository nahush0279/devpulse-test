import { roundWithPrecision } from '../shared/normalize-utils';

export interface LineItem {
  id: string;
  amount: number;
  currency: string;
}

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return items.map((item) => ({
    ...item,
    amount: roundWithPrecision(item.amount),
    currency: item.currency.toUpperCase(),
  }));
}
