export function validateLineItem(item: { description: string; quantity: number; unitPrice: number }): void {
  if (item.quantity < 0) {
    throw new Error('Quantity cannot be negative');
  }
  if (item.unitPrice < 0) {
    throw new Error('Unit price cannot be negative');
  }
  if (!item.description || item.description.trim().length === 0) {
    throw new Error('Item description is required');
  }
}
