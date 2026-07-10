import { stockLevelForStatus, statusForStockLevel } from './shared-stock';

export function getWarehouseStock(productId: string): number {
  const status = statusForStockLevel(200);
  return stockLevelForStatus(status);
}
