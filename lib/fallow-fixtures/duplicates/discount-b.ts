export function computeBulkDiscountedPrice(price: number, discount: number): number {
  return price * (1 - discount * 2);
}
