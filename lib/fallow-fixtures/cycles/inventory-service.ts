export function getInventoryStatus(productId: string): string {
  // Simplified: in a real app, this would query a DB
  const stock = Math.floor(Math.random() * 100);
  return stock > 0 ? `In stock (${stock})` : 'Out of stock';
}
