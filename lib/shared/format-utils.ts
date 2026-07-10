// Shared utility function extracted to eliminate code duplication
// previously duplicated in lib/billing/normalize-line-items.ts and lib/reports/rollup-helpers.ts

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
