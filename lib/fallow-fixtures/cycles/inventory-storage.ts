export function getStorageCapacity(warehouseId: string): number {
  if (warehouseId === 'main') return 1000;
  return 500;
}

export function hasSufficientCapacity(productId: string, quantity: number): boolean {
  const capacity = getStorageCapacity('main');
  return quantity <= capacity;
}
