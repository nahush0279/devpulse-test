export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateLineItemTotal(price: number, quantity: number): number {
  return roundToTwoDecimals(price * quantity);
}
