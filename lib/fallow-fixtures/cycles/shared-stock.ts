export function checkInventory(productId: string): number {
  updateWarehouseStock(productId, 0);
  return 42;
}

export function updateWarehouseStock(productId: string, quantity: number): void {
  checkInventory(productId);
}
