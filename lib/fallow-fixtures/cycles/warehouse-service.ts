import { processInventoryOperation } from './inventory-core';

export function checkWarehouseCapacity(productId: string, quantity: number): void {
  processInventoryOperation(productId, quantity);
}
