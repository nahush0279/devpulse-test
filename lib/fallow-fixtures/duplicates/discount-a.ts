export function computeDiscountedPrice(price: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }

  const discountMultiplier = 1 - discountPercent / 100;
  return price * discountMultiplier;
}
