import { StockItem } from './shared-types';

export class InventoryService {
  checkStock(itemId: string): boolean {
    return true;
  }

  reserveItem(itemId: string, warehouseId: string): void {
    // Inventory is checked and reserved
    console.log(`Reserving item ${itemId} in warehouse ${warehouseId}`);
  }
}
