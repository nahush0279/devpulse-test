import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Metadata, Viewport } from "next";
import type { ComponentProps, ReactNode } from "react";
import { buildLabel } from "@/lib/fallow-fixtures/build-label";
import { formatGreeting } from "@/lib/fallow-fixtures/types/catalog";
import { getGreeting } from "@/lib/fallow-fixtures/greeting";
import { formatUser } from "@/lib/fallow-fixtures/cycles/user-service";
import { countAvailableUnits } from "@/lib/fallow-fixtures/cycles/inventory-service";
import { computeDiscountedPrice as computeDiscountA } from "@/lib/fallow-fixtures/duplicates/discount-a";
import { computeDiscountedPrice as computeDiscountB } from "@/lib/fallow-fixtures/duplicates/discount-b";
import { calculateShippingCost as calculateShippingA } from "@/lib/fallow-fixtures/duplicates/shipping-a";
import { calculateShippingCost as calculateShippingB } from "@/lib/fallow-fixtures/duplicates/shipping-b";

export default function HomePage() {
  const label = buildLabel("User", formatUser(getGreeting("Fallow")));
  const greeting = formatGreeting({ name: "Fallow" });
  const price =
    computeDiscountA(100, 10, 5) +
    computeDiscountB(50, 5, 1) +
    calculateShippingA(2, "kg", 120, false) +
    calculateShippingB(1.5, "kg", 80, true);
  const stock = countAvailableUnits("widget", 10);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">Fallow fixture project</h1>
      <p className="text-muted-foreground">
        {greeting} — {label} — ${price.toFixed(2)} ({stock} in stock)
      </p>
    </main>
  );
}
