import { twMerge } from "tailwind-merge";
import type { Viewport } from "next";
import type { ComponentProps } from "react";
import { normalizeRecords } from "@/lib/shared/normalize-records";

export type ReportRow = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function prepareReportRows(rows: ReportRow[]): ReportRow[] {
  return normalizeRecords(rows);
}
