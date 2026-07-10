import { getWarehouseCapacity } from "./warehouse-service";

export function checkInventoryLevel(productId: string) {
  const capacity = getWarehouseCapacity(productId);
  return capacity > 0;
}

export function reserveStock(productId: string, quantity: number) {
  const capacity = getWarehouseCapacity(productId);
  return capacity >= quantity;
}
