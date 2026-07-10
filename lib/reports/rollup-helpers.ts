import { roundWithPrecision } from '../shared/normalize-utils';

export interface ReportRow {
  label: string;
  value: number;
  unit: string;
}

export function normalizeReportRows(rows: ReportRow[]): ReportRow[] {
  return rows.map((row) => ({
    ...row,
    value: roundWithPrecision(row.value),
    unit: row.unit.toUpperCase(),
  }));
}
