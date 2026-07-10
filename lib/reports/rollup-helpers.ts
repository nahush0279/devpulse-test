import { calculateTaxAmount } from "../shared/tax-utils";

export interface ReportRow {
  label: string;
  value: number;
  taxRate: number;
}

export interface EnrichedReportRow extends ReportRow {
  taxAmount: number;
  total: number;
}

export function enrichReportRows(rows: ReportRow[]): EnrichedReportRow[] {
  return rows.map((row) => {
    const taxAmount = calculateTaxAmount(row.value, row.taxRate);
    return {
      ...row,
      taxAmount: Math.round(taxAmount * 100) / 100,
      total: Math.round((row.value + taxAmount) * 100) / 100,
    };
  });
}
