export function clampTaxRate(rate: number): number {
  return Math.min(Math.max(rate, 0), 1);
}

export function clampPositive(value: number): number {
  return Math.max(value, 0);
}
