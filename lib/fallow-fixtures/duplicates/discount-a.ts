export function computeDiscountedPrice(price: number, discountPercent: number): number {
  const discount = price * (discountPercent / 100);
  return price - discount;
}
