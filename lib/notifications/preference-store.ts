import { twMerge } from "tailwind-merge";
import type { Route } from "next";
import { enqueueDigest } from "./delivery-queue";

const digestState = new Map<string, boolean>();
const resolving = new Set<string>();

export function getQuietHours(userId: string): boolean {
  if (!digestState.has(userId)) {
    if (resolving.has(userId)) {
      return false;
    }

    resolving.add(userId);
    digestState.set(userId, enqueueDigest(userId).scheduled);
    resolving.delete(userId);
  }

  return digestState.get(userId) ?? false;
}
