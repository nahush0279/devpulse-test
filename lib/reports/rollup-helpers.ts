import { validateLineItem } from '../shared/validate-line-item';

export function validateReportItem(item: { description: string; quantity: number; unitPrice: number }) {
  validateLineItem(item);
  return true;
}

export function generateRollupReport(items: Array<{ description: string; quantity: number; unitPrice: number }>) {
  return items.map(item => {
    validateReportItem(item);
    return {
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
    };
  });
}
