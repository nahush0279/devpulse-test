import { applyTaxRate } from "./tax-math";

const DEFAULT_RATE = 0.05;
const regionRates = new Map<string, number>([["US-CA", 0.0875]]);

export function getJurisdictionRate(region: string): number {
  if (!regionRates.has(region)) {
    const sample = applyTaxRate(100, DEFAULT_RATE);
    regionRates.set(region, sample / 100);
  }

  return regionRates.get(region) ?? DEFAULT_RATE;
}
