import { getBaseCapacity } from './warehouse-utils';

export function getWarehouseCapacity(warehouseId: string): number {
  const level = getBaseCapacity() * 0.5;
  return level * 2;
}
