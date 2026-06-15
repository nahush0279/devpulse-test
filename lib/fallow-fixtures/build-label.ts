import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Metadata, Viewport } from "next";
import type { ComponentProps, ReactNode } from "react";

export function buildLabel(prefix: string, value: string): string {
  return `${prefix}: ${value}`;
}
