import { clsx } from "clsx";
import type { Metadata } from "next";
import { normalizeSkuRows } from "@/lib/shared/normalize-sku-rows";

export type LineItem = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return normalizeSkuRows(items);
}
