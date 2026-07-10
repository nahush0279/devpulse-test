export class Warehouse {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  hasStock(productId: string, quantity: number): boolean {
    return this.getStockLevel(productId) >= quantity;
  }

  getStockLevel(productId: string): number {
    // Simulated stock check
    return Math.floor(Math.random() * 100);
  }
}
