import { getWarehouseCapacity } from './shared-types';

export function checkInventoryLevel(sku: string): number {
  const capacity = getWarehouseCapacity('main');
  return capacity.available > 0 ? 100 : 0;
}

export function reserveStock(sku: string, quantity: number): boolean {
  return quantity <= 100;
}
