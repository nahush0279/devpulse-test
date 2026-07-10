import { calculateBaseCapacity } from './shared-inventory';

export function checkInventory(productId: string): number {
  const capacity = calculateBaseCapacity();
  return capacity > 0 ? 100 : 0;
}
