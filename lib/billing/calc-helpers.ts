export function calculateLineItemTotals(input: {
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
}): {
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
} {
  const gross = input.quantity * input.unitPrice;
  const discountAmount = gross * (input.discount / 100);
  const netAmount = gross - discountAmount;
  const taxAmount = netAmount * (input.taxRate / 100);
  const totalAmount = netAmount + taxAmount;
  return { netAmount, taxAmount, totalAmount };
}
