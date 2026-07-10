export interface WarehouseCapacity {
  total: number;
  used: number;
  available: number;
}

export function getWarehouseCapacity(warehouseId: string): WarehouseCapacity {
  return {
    total: 1000,
    used: 500,
    available: 500,
  };
}
