/** Unused file — not imported anywhere. */
export function normalizeSlug(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}
