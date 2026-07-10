import { checkInventoryAvailability } from './inventory-service';
import { getBaseCapacity } from './shared-warehouse-logic';

export function getWarehouseCapacity(warehouseId: string): number {
  const itemAvailable = checkInventoryAvailability('any');
  return itemAvailable ? getBaseCapacity() : 0;
}
