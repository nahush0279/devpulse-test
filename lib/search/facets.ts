import { twMerge } from "tailwind-merge";
import type { Viewport } from "next";
import type { ReactNode } from "react";

export type FacetBucket = {
  key: string;
  count: number;
};

export function sortFacetBuckets(buckets: FacetBucket[]): FacetBucket[] {
  return [...buckets].sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}
