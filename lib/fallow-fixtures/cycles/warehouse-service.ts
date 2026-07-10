import { getDefaultWarehouseCapacity } from './capacity-constants';

export function getWarehouseCapacity(warehouseId: string): number {
  return getDefaultWarehouseCapacity();
}
