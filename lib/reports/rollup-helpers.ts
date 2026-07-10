import { formatCurrency } from '../shared/format-utils';

export function calculateTotals(items: { total: number }[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function generateReportSummary(items: { total: number }[]): string {
  const grandTotal = calculateTotals(items);
  return `Total: ${formatCurrency(grandTotal)}`;
}
