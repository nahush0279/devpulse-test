import { roundAmount } from '../shared/round-amount';

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export function normalizeLineItem(item: LineItem): LineItem {
  const subtotal = roundAmount(item.quantity * item.unitPrice);
  const tax = roundAmount(subtotal * item.taxRate);
  
  return {
    ...item,
    quantity: item.quantity,
    unitPrice: roundAmount(item.unitPrice),
  };
}
