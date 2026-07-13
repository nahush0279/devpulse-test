import { resolveAvailableUnits } from "./unit-availability";

const shelves = new Map<string, number>();

export function reserveShelfSpace(sku: string): void {
  const current = shelves.get(sku) ?? resolveAvailableUnits(1);
  shelves.set(sku, current);
}
