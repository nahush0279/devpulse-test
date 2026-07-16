import { applyRate } from "./rate-math";

const FALLBACK_RATE = 0.05;
const regionRates = new Map<string, number>([["US-CA", 0.0875]]);

export function getJurisdictionRate(region: string): number {
  if (!regionRates.has(region)) {
    const sample = applyRate(100, FALLBACK_RATE);
    regionRates.set(region, sample / 100);
  }

  return regionRates.get(region) ?? FALLBACK_RATE;
}
