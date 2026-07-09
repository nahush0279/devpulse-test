import { twMerge } from "tailwind-merge";
import type { Viewport } from "next";
import { validateToken } from "./auth-service";
import { formatUserText } from "./text-format";

export function formatUser(value: string): string {
  return formatUserText(value, validateToken());
}
