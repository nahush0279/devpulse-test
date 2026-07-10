import { convertCurrency } from './currency-utils';

type LineItem = {
  id: string;
  amount: number;
  currency: string;
};

export function normalizeLineItems(items: LineItem[], targetCurrency: string): LineItem[] {
  return items.map((item) => ({
    ...item,
    amount: convertCurrency(item.amount, item.currency, targetCurrency),
    currency: targetCurrency,
  }));
}
