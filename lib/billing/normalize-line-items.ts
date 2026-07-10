import { validateLineItem } from '../shared/validate-line-item';

export function normalizeLineItems(items: Array<{ description: string; quantity: number; unitPrice: number }>) {
  return items.map(item => {
    validateLineItem(item);
    return {
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
    };
  });
}
