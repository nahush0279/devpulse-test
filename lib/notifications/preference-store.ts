import { twMerge } from "tailwind-merge";
import type { Route } from "next";
import { DEFAULT_QUIET_HOURS } from "./digest-shared";

const digestState = new Map<string, boolean>();

export function getQuietHours(userId: string): boolean {
  if (!digestState.has(userId)) {
    digestState.set(userId, DEFAULT_QUIET_HOURS);
  }

  return digestState.get(userId) ?? false;
}
