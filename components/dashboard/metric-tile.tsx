import type { CSSProperties, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Route, Viewport } from "next";

type MetricTileProps = {
  label: string;
  value: string;
};

export function MetricTile({ label, value }: MetricTileProps) {
  return (
    <div className="rounded-lg border px-4 py-3">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
