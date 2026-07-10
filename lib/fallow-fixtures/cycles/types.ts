export interface StockProvider {
  getStockLevels(productId: string): number;
  getStock(productId: string): number;
}
