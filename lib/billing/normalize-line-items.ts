import { calculateTaxAmount } from "../shared/tax-utils";

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface NormalizedLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  taxAmount: number;
  grandTotal: number;
}

export function normalizeLineItems(items: LineItem[]): NormalizedLineItem[] {
  return items.map((item) => {
    const lineTotal = item.quantity * item.unitPrice;
    const taxAmount = calculateTaxAmount(lineTotal, item.taxRate);
    return {
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal,
      taxAmount: Math.round(taxAmount * 100) / 100,
      grandTotal: Math.round((lineTotal + taxAmount) * 100) / 100,
    };
  });
}
