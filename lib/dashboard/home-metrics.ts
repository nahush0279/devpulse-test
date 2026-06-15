import type { ReadonlyURLSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Metadata } from "next";
import type {
  CustomerSummary,
  PendingInvitation,
} from "@/lib/customers/types";
import { normalizeLineItems } from "@/lib/billing/normalize-line-items";
import { prepareReportRows } from "@/lib/reports/rollup-helpers";
import { enqueueDigest } from "@/lib/notifications/delivery-queue";

const sampleCustomer: CustomerSummary = {
  id: "cust_01",
  displayName: "Northwind Labs",
};

export function buildHomeMetrics(stock: number) {
  const catalog = normalizeLineItems([
    { sku: "widget", qty: 2, unitPrice: 19.99 },
  ]);
  const report = prepareReportRows([
    { sku: "widget", qty: stock, unitPrice: 19.99 },
  ]);
  const digest = enqueueDigest(sampleCustomer.id);

  const lineTotal = catalog.reduce(
    (sum, line) => sum + line.qty * line.unitPrice,
    0
  );
  const reportedUnits = report.reduce((sum, row) => sum + row.qty, 0);

  return {
    customer: sampleCustomer.displayName,
    lineTotal,
    reportedUnits,
    digestScheduled: digest.scheduled,
  };
}
