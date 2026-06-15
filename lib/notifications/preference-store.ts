import { twMerge } from "tailwind-merge";
import type { Route } from "next";
import { enqueueDigest } from "./delivery-queue";

const digestState = new Map<string, boolean>();

export function getQuietHours(userId: string): boolean {
  if (!digestState.has(userId)) {
    digestState.set(userId, enqueueDigest(userId).scheduled);
  }

  return digestState.get(userId) ?? false;
}
