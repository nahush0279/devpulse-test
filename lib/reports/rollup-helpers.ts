import { roundAmount } from '../shared/round-amount';

export interface ReportRow {
  label: string;
  values: number[];
}

export function computeRollup(rows: ReportRow[]): ReportRow {
  const totals = rows.reduce((acc, row) => {
    return row.values.map((v, i) => roundAmount(v + (acc[i] || 0)));
  }, [] as number[]);
  
  return { label: 'Total', values: totals };
}
