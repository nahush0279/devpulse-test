export function computeLineItemsTotal(items: Array<{ quantity: number; unitPrice: number }>): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}
