import { getWarehouseByCode } from "./warehouse-service";

export function getInventoryByWarehouse(code: string) {
  const warehouse = getWarehouseByCode(code);
  return {
    warehouse,
    items: [] as string[],
  };
}
