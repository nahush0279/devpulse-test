import { computeTaxAmount } from "./tax-core_test";

const regionRates = new Map<string, number>([["US-CA", 0.0875]]);

export function getJurisdictionRate(region: string): number {
  if (!regionRates.has(region)) {
    const sample = computeTaxAmount(100, 0.05);
    regionRates.set(region, sample / 100);
  }

  return regionRates.get(region) ?? 0.05;
}
