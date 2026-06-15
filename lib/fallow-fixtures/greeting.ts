import { clsx } from "clsx";
import type { Metadata } from "next";

export function getGreeting(name: string): string {
  return `Hello, ${name}!`;
}

/** Unused export — should be flagged by Fallow. */
export function getFarewell(name: string): string {
  return `Goodbye, ${name}!`;
}
