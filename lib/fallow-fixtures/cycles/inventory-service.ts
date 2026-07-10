import { stockLevelForStatus, statusForStockLevel } from './shared-stock';

export function getInventoryStatus(productId: string): string {
  const stock = stockLevelForStatus('in-stock');
  return statusForStockLevel(stock);
}
