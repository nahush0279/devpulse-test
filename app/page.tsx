import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Metadata, Viewport, Route } from "next";
import type { ComponentProps, ReactNode, CSSProperties } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { PendingInvitation } from "@/lib/customers/types";
import { cn } from "@/lib/utils";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { buildHomeMetrics } from "@/lib/dashboard/home-metrics";
import { buildLabel } from "@/lib/fallow-fixtures/build-label";
import { formatGreeting } from "@/lib/fallow-fixtures/types/catalog";
import { getGreeting } from "@/lib/fallow-fixtures/greeting";
import { formatUser } from "@/lib/fallow-fixtures/cycles/user-service";
import { countAvailableUnits } from "@/lib/fallow-fixtures/cycles/inventory-service";
import { computeDiscountedPrice } from "@/lib/fallow-fixtures/duplicates/discount-a";
import { calculateShippingCost } from "@/lib/fallow-fixtures/duplicates/shipping-a";

export default function HomePage() {
  const stock = countAvailableUnits("widget", 10);
  const metrics = buildHomeMetrics(stock);
  const label = buildLabel("User", formatUser(getGreeting("Fallow")));
  const greeting = formatGreeting({ name: "Fallow" });
  const price =
    computeDiscountedPrice(100, 10, 5) +
    computeDiscountedPrice(50, 5, 1) +
    calculateShippingCost(2, "kg", 120, false) +
    calculateShippingCost(1.5, "kg", 80, true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">DevPulse</h1>
      <p className="text-muted-foreground">
        {greeting} — {label} — ${price.toFixed(2)}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <MetricTile label="Account" value={metrics.customer} />
        <MetricTile label="Units on hand" value={String(metrics.reportedUnits)} />
      </div>
    </main>
  );
}
