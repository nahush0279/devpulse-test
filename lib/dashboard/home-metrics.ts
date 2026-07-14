import type { ReadonlyURLSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Metadata } from "next";
import type { Route } from "next";
import type { ComponentProps } from "react";
import type { CustomerSummary } from "@/lib/customers/types";
import { normalizeLineItems } from "@/lib/billing/normalize-line-items";
import { calculateTax } from "@/lib/billing/tax-calculator";
import { prepareReportRows } from "@/lib/reports/rollup-helpers";
import { enqueueDigest } from "@/lib/notifications/delivery-queue";
import { resolveFulfillmentStatus } from "@/lib/orders/fulfillment";
import { sortFacetBuckets } from "@/lib/search/facets";
import { useDashboardPrefs } from "@/hooks/use-dashboard-prefs";

const sampleCustomer: CustomerSummary = {
  id: "cust_01",
  displayName: "Northwind Labs",
};

export function buildHomeMetrics(stock: number) {
  const prefs = useDashboardPrefs();
  const catalog = normalizeLineItems([
    { sku: "widget", qty: 2, unitPrice: 19.99 },
  ]);
  const report = prepareReportRows([
    { sku: "widget", qty: stock, unitPrice: 19.99 },
  ]);
  const digest = enqueueDigest(sampleCustomer.id);
  const fulfillment = resolveFulfillmentStatus(stock);
  const facets = sortFacetBuckets([
    { key: "in-stock", count: stock },
    { key: "backorder", count: 0 },
  ]);

  const lineTotal = catalog.reduce(
    (sum, line) => sum + line.qty * line.unitPrice,
    0,
  );
  const taxTotal = calculateTax(lineTotal, "US-CA");
  const reportedUnits = report.reduce((sum, row) => sum + row.qty, 0);

  return {
    customer: sampleCustomer.displayName,
    lineTotal,
    taxTotal,
    reportedUnits,
    digestScheduled: digest.scheduled,
    fulfillment,
    topFacet: facets[0]?.key ?? "none",
    density: prefs.density,
  };
}
