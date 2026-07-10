import { WarehouseService } from "./warehouse-service";

export class InventoryService {
  getStockLevels(productId: string): number {
    const warehouse = new WarehouseService();
    return warehouse.getStock(productId);
  }
}
