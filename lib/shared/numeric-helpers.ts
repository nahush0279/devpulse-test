export function normalizeCurrency(currency: string): string {
  return currency.toUpperCase();
}

export function computeAbsoluteAmount(quantity: number, unitValue: number): number {
  return Math.abs(quantity * unitValue);
}
