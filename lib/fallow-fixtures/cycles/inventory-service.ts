import { getBaseCapacity } from './warehouse-utils';

export function checkInventoryLevel(productId: string): number {
  const capacity = getBaseCapacity();
  // Simulation logic
  return capacity * 0.5;
}
