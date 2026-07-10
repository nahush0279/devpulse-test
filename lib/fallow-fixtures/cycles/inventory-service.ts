import { processInventoryOperation } from './inventory-core';

export function updateInventory(productId: string, quantity: number): void {
  processInventoryOperation(productId, quantity);
}
