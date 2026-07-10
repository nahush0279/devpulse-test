import { InventoryService } from "./inventory-service";

export class WarehouseService {
  getStock(productId: string): number {
    const inventory = new InventoryService();
    return inventory.getStockLevels(productId);
  }
}
