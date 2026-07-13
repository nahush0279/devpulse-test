// fixed by nahush — shared tax math extracted here to break the
// jurisdiction-lookup <-> tax-calculator import cycle.
export function applyTaxRate(amount: number, rate: number): number {
  return Math.round(amount * rate * 100) / 100;
}
