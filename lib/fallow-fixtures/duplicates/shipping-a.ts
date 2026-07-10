export function calculateShippingCostStandard(weight: number, zone: string): number {
  const baseRate = 5.0;
  const zoneMultiplier: Record<string, number> = { local: 1.0, regional: 1.5, national: 2.0 };
  return baseRate * (zoneMultiplier[zone] ?? 2.5) * weight;
}
