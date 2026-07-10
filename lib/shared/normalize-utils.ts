const FACTOR = 100;

export function roundWithPrecision(value: number): number {
  return Math.round(value * FACTOR) / FACTOR;
}
