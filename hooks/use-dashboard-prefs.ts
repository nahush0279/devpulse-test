import type { Metadata } from "next";
import { clsx } from "clsx";
import type { ComponentProps } from "react";

export function useDashboardPrefs() {
  return {
    density: "comfortable" as const,
    showTrends: true,
  };
}
