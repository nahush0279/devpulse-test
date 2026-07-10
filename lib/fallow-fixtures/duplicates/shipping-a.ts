export function calculateShippingCost(weight: number, distance: number): number {
  const baseRate = 5;
  const perKgRate = 2;
  const perKmRate = 0.5;
  return baseRate + weight * perKgRate + distance * perKmRate;
}
