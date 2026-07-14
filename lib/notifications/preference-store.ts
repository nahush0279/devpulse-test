import { twMerge } from "tailwind-merge";
import type { Route } from "next";
import { computeScheduled } from "./digest-schedule";

const digestState = new Map<string, boolean>();

export function getQuietHours(userId: string): boolean {
  if (!digestState.has(userId)) {
    digestState.set(userId, computeScheduled(false));
  }

  return digestState.get(userId) ?? false;
}
