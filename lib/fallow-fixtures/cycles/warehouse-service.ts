import { hasSufficientCapacity } from './inventory-storage';

export function getWarehouseCapacity(warehouseId: string): number {
  const canFulfill = hasSufficientCapacity('sample', 10);
  return canFulfill ? 1000 : 500;
}
