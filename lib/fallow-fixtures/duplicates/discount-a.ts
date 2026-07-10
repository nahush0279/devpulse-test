export function computeDiscountedPrice(price: number, discount: number): number {
  return price * (1 - discount);
}
