export function resolveAvailableQuantity(quantity: number): number {
  if (quantity <= 0) {
    return 0;
  }

  return quantity;
}
