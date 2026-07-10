/**
 * Shared helper to avoid code duplication between billing/normalize-line-items.ts
 * and reports/rollup-helpers.ts.
 */

export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}
