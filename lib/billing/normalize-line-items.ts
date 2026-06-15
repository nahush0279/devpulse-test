import { clsx } from "clsx";
import type { Metadata } from "next";

export type LineItem = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return items
    .filter((item) => item.qty > 0 && item.unitPrice >= 0)
    .map((item) => ({
      sku: item.sku.trim().toUpperCase(),
      qty: Math.floor(item.qty),
      unitPrice: Math.round(item.unitPrice * 100) / 100,
    }))
    .sort((a, b) => a.sku.localeCompare(b.sku));
}
