import { normalizeCurrency, computeAbsoluteAmount } from "../shared/numeric-helpers";

export interface ReportRow {
  label: string;
  value: number;
  currency: string;
  quantity: number;
}

export function rollupReportRows(rows: ReportRow[]) {
  return rows.map((row) => {
    const currency = normalizeCurrency(row.currency);
    const value = computeAbsoluteAmount(row.quantity, row.value);
    
    return {
      ...row,
      currency,
      value,
    };
  });
}

export function computeGrandTotal(rows: ReportRow[]) {
  return rows.reduce((sum, row) => {
    const currency = normalizeCurrency(row.currency);
    const value = computeAbsoluteAmount(row.quantity, row.value);
    return sum + value;
  }, 0);
}
