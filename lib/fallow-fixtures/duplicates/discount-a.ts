export function computeDiscountedPrice(price: number, discount: number): number {
  return price - price * (discount / 100);
}
