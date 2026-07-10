import { twMerge } from "tailwind-merge";
import type { Viewport } from "next";
import type { ComponentProps } from "react";
import { normalizeSkuRows } from "@/lib/shared/normalize-sku-rows";

export type ReportRow = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function prepareReportRows(rows: ReportRow[]): ReportRow[] {
  return normalizeSkuRows(rows);
}
