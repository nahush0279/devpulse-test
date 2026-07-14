import { calculateTax } from "./tax-calculator";

const regionRates = new Map<string, number>([["US-CA", 0.0875]]);

export function getJurisdictionRate(region: string): number {
  if (!regionRates.has(region)) {
    const sample = calculateTax(100, region);
    regionRates.set(region, sample / 100);
  }

  return regionRates.get(region) ?? 0.05;
}
