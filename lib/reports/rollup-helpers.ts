import { twMerge } from "tailwind-merge";
import type { Viewport } from "next";
import type { ComponentProps } from "react";

export type ReportRow = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function prepareReportRows(rows: ReportRow[]): ReportRow[] {
  return rows
    .filter((item) => item.qty > 0 && item.unitPrice >= 0)
    .map((item) => ({
      sku: item.sku.trim().toUpperCase(),
      qty: Math.floor(item.qty),
      unitPrice: Math.round(item.unitPrice * 100) / 100,
    }))
    .sort((a, b) => a.sku.localeCompare(b.sku));
}
