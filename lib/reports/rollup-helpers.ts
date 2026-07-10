import { roundToTwoDecimals } from '../shared/round-helper';

export interface ReportEntry {
  id: string;
  label: string;
  value: number;
}

export function normalizeReportEntries(entries: ReportEntry[]): ReportEntry[] {
  return entries.map(entry => ({
    ...entry,
    value: roundToTwoDecimals(entry.value),
  }));
}
