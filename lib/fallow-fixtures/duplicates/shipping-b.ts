type WeightUnit = "kg" | "lb";

export function calculateShippingCostB(
  weight: number,
  unit: WeightUnit,
  distanceKm: number,
  express: boolean
): number {
  const normalizedWeight = unit === "lb" ? weight * 0.453592 : weight;
  const baseRate = normalizedWeight * 1.25;
  const distanceFee = distanceKm * 0.08;
  const expressMultiplier = express ? 1.75 : 1;

  const subtotal = (baseRate + distanceFee) * expressMultiplier;
  return Math.round(subtotal * 100) / 100;
}
