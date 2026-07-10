import type { ComponentProps, ReactNode } from "react";
import type { Metadata, Viewport } from "next";

/** Used by the home page. */
export type GreetingOptions = {
  name: string;
  formal?: boolean;
};

/** Unused type — should be flagged by Fallow. */
export type ArchivedUserRecord = {
  id: string;
  deletedAt: string;
};

/** Unused type — should be flagged by Fallow. */
export type LegacySessionToken = {
  token: string;
  expiresAt: number;
};

/** Unused interface — should be flagged by Fallow. */
interface DeprecatedAuditEntry {
  actor: string;
  action: string;
  timestamp: string;
}

export function formatGreeting({ name, formal = false }: GreetingOptions): string {
  return formal ? `Good day, ${name}.` : `Hi, ${name}!`;
}
