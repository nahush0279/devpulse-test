import { roundToTwoDecimals } from '../shared/round-helper';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return items.map(item => ({
    ...item,
    unitPrice: roundToTwoDecimals(item.unitPrice),
  }));
}
