import { getInventoryByWarehouse } from "./inventory-service";

export function getWarehouseByCode(code: string) {
  return {
    code,
    name: `Warehouse-${code}`,
  };
}

export function getWarehouseWithInventory(code: string) {
  const warehouse = getWarehouseByCode(code);
  const inventory = getInventoryByWarehouse(code);
  return { ...warehouse, inventory };
}
