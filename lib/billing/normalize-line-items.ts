import { formatCurrency } from '../shared/format-utils';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return items.map(item => ({
    ...item,
    description: item.description.trim(),
    total: item.quantity * item.unitPrice
  }));
}

export function getFormattedTotal(items: LineItem[]): string {
  const total = items.reduce((sum, item) => sum + item.total, 0);
  return formatCurrency(total);
}
