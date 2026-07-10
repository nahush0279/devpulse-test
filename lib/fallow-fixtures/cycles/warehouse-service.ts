import { calculateBaseCapacity } from './shared-inventory';

export function getWarehouseCapacity(warehouseId: string): number {
  return calculateBaseCapacity();
}
