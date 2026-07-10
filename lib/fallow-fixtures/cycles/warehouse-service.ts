import { getInventoryStatus } from './inventory-service';

export function checkWarehouseStock(warehouseId: string, productId: string): number {
  // Simplified: in a real app, this would query a DB
  return Math.floor(Math.random() * 100);
}

export function needsRestock(warehouseId: string): boolean {
  const inventory = getInventoryStatus('sample-product');
  return inventory.includes('Out of stock');
}
