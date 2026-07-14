import { clsx } from "clsx";
import type { Metadata } from "next";
import { normalizeRecords } from "@/lib/shared/normalize-records";

export type LineItem = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function normalizeLineItems(items: LineItem[]): LineItem[] {
  return normalizeRecords(items);
}
