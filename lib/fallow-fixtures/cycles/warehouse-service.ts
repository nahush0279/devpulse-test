import { getWarehouseCapacity, WarehouseCapacity } from './shared-types';

export function allocateSpace(warehouseId: string, size: number): boolean {
  const capacity = getWarehouseCapacity(warehouseId);
  return size <= capacity.available;
}
