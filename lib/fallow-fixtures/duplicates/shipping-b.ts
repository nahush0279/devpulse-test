export function calculateShippingCost(weight: number, distance: number): number {
  return weight * 0.5 + distance * 0.1;
}
