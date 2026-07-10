import { getDefaultWarehouseCapacity } from './capacity-constants';

export function checkInventory(itemId: string): number {
  const capacity = getDefaultWarehouseCapacity();
  return capacity > 0 ? 100 : 0;
}
