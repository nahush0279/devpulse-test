export function computeDiscountedPriceBasic(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) throw new Error('Invalid discount');
  return price * (1 - discountPercent / 100);
}
