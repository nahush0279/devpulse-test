import { convertCurrency } from '../billing/currency-utils';

type ReportRow = {
  id: string;
  value: number;
  unit: string;
};

export function rollupReport(rows: ReportRow[], targetUnit: string): ReportRow[] {
  return rows.map((row) => ({
    ...row,
    value: convertCurrency(row.value, row.unit, targetUnit),
    unit: targetUnit,
  }));
}
