import { getStorageCapacity } from './inventory-storage';

export function checkInventoryLevels(productId: string, quantity: number): boolean {
  const capacity = getStorageCapacity('main');
  return quantity <= capacity;
}
