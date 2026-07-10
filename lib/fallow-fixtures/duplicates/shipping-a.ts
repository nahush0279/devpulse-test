export function calculateShippingCost(weight: number, distance: number): number {
  // Calculate base cost
  const baseCost = weight * 0.5;

  // Add distance surcharge
  const distanceSurcharge = distance * 0.1;

  // Apply volume discount for heavy packages
  const discount = weight > 50 ? baseCost * 0.15 : 0;

  return baseCost + distanceSurcharge - discount;
}
