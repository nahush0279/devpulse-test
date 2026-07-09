import { twMerge } from "tailwind-merge";
import type { Route } from "next";
import { readQuietHours, writeQuietHours } from "./digest-state";

export function getQuietHours(userId: string): boolean {
  const cached = readQuietHours(userId);
  if (cached === undefined) {
    writeQuietHours(userId, false);
    return false;
  }

  return cached;
}
