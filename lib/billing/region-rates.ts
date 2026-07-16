const regionRates = new Map<string, number>([["US-CA", 0.0875]]);

export function resolveRegionRate(region: string): number {
  return regionRates.get(region) ?? 0.05;
}
