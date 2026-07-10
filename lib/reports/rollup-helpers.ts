import { calculateLineItemTotals } from '../billing/calc-helpers';

export interface OrderRollup {
  orderId: string;
  items: Array<{
    sku: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxRate: number;
  }>;
}

export function rollupOrder(order: OrderRollup): {
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
} {
  let netAmount = 0;
  let taxAmount = 0;
  let totalAmount = 0;
  for (const item of order.items) {
    const totals = calculateLineItemTotals(item);
    netAmount += totals.netAmount;
    taxAmount += totals.taxAmount;
    totalAmount += totals.totalAmount;
  }
  return { netAmount, taxAmount, totalAmount };
}
