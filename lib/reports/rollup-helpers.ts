import { LineItem, calculateLineItemTotal } from '../billing/shared-helpers';

export interface RollupResult {
  totalRevenue: number;
  totalItems: number;
  itemDetails: Array<{ sku: string; total: number }>;
}

export function computeRollup(items: LineItem[]): RollupResult {
  const itemDetails = items.map(item => ({
    sku: item.sku,
    total: calculateLineItemTotal(item),
  }));
  const totalRevenue = itemDetails.reduce((sum, item) => sum + item.total, 0);
  return {
    totalRevenue,
    totalItems: items.length,
    itemDetails,
  };
}
