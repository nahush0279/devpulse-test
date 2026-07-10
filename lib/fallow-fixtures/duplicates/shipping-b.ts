export function calculatePriorityShippingCost(weight: number, distance: number): number {
  return weight * distance * 0.15;
}
