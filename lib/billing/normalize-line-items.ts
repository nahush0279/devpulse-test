import { clsx } from "clsx";
import type { Metadata } from "next";
import { normalizeAndSortCatalogRows } from "../shared/normalize-catalog-rows";

export type LineItem = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return normalizeAndSortCatalogRows(items);
}
