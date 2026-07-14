import type { Route } from "next";
import { clsx } from "clsx";
import type { CSSProperties } from "react";

export type FulfillmentStatus = "pending" | "packed" | "shipped";

export function resolveFulfillmentStatus(units: number): FulfillmentStatus {
  if (units <= 0) {
    return "pending";
  }

  if (units < 5) {
    return "packed";
  }

  return "shipped";
}
