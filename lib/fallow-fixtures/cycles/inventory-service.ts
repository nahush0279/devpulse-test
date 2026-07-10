import { Warehouse } from "./warehouse-service";

export function checkProductAvailability(productId: string, quantity: number): boolean {
  const warehouse = new Warehouse("main-warehouse", "Main Warehouse");
  return warehouse.hasStock(productId, quantity);
}

export class InventoryManager {
  private warehouse: Warehouse;

  constructor(warehouseId: string, name: string) {
    this.warehouse = new Warehouse(warehouseId, name);
  }

  checkStock(productId: string, quantity: number): boolean {
    return this.warehouse.hasStock(productId, quantity);
  }

  getInventoryLevel(productId: string, warehouseId: string): number {
    const warehouse = new Warehouse(warehouseId, `Warehouse ${warehouseId}`);
    return warehouse.getStockLevel(productId);
  }
}
