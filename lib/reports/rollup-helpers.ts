import { clampTaxRate, clampPositive } from '../shared-utils';

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

interface ReportRow {
  label: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export function buildReportRows(rows: ReportRow[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const row of rows) {
    const lineTotal = row.quantity * row.unitPrice;
    const tax = lineTotal * clampTaxRate(row.taxRate);
    totals[row.label] = lineTotal + tax;
  }
  return totals;
}
