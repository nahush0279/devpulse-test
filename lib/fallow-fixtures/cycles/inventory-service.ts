import { WAREHOUSE_CAPACITY } from './shared-types';

export function checkInventory(itemId: string): boolean {
  return WAREHOUSE_CAPACITY > 0;
}
