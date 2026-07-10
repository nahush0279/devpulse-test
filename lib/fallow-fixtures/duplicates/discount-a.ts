export function computeDiscountedPrice(originalPrice: number, discountPercent: number): number {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return originalPrice - discountAmount;
}
