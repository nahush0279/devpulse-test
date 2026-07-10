export function standardizeAmount(amount: number): number {
  if (amount < 0) {
    return Math.abs(amount);
  }
  return Math.round(amount * 100) / 100;
}
