export function calculateShippingCost(weight: number, distance: number): number {
  return weight * distance * 0.1;
}
