import { clsx } from "clsx";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { getQuietHours } from "./preference-store";

export function enqueueDigest(userId: string) {
  const quiet = getQuietHours(userId);

  return {
    userId,
    channel: "email" as const,
    scheduled: !quiet,
  };
}
