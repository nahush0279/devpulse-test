export function computeDiscountedPrice(
  basePrice: number,
  discountPercent: number,
  minPrice: number
): number {
  if (basePrice <= 0) {
    return minPrice;
  }

  const clampedDiscount = Math.min(Math.max(discountPercent, 0), 100);
  const discounted = basePrice - basePrice * (clampedDiscount / 100);
  const finalPrice = Math.max(discounted, minPrice);

  return Math.round(finalPrice * 100) / 100;
}
