import { getBaseCapacity } from './shared-warehouse-logic';

export function checkInventoryAvailability(productId: string): boolean {
  return getBaseCapacity() > 0;
}
