import { twMerge } from "tailwind-merge";
import type { Route } from "next";
import { getStoredQuietHours, setStoredQuietHours } from "./digest-state";

export function getQuietHours(userId: string): boolean {
  const stored = getStoredQuietHours(userId);
  if (stored === undefined) {
    setStoredQuietHours(userId, false);
    return false;
  }

  return stored;
}
