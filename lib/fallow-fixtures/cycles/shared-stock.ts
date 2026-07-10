/**
 * Shared module to break the circular dependency between inventory-service.ts and warehouse-service.ts.
 * Contains pure mapping functions between stock levels and status values.
 */

export function stockLevelForStatus(status: string): number {
  if (status === 'in-stock') return 200;
  if (status === 'low-stock') return 50;
  return 0;
}

export function statusForStockLevel(stock: number): string {
  if (stock > 100) return 'in-stock';
  if (stock > 0) return 'low-stock';
  return 'out-of-stock';
}
