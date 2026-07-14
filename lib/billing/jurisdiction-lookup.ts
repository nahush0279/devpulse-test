import { applyRate } from "./tax-math";

const regionRates = new Map<string, number>([["US-CA", 0.0875]]);

export function getJurisdictionRate(region: string): number {
  if (!regionRates.has(region)) {
    const sample = applyRate(100, regionRates.get(region) ?? 0.05);
    regionRates.set(region, sample / 100);
  }

  return regionRates.get(region) ?? 0.05;
}
