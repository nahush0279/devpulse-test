import { computeAvailableUnits } from "./unit-count";

const shelves = new Map<string, number>();

export function reserveShelfSpace(sku: string): void {
  const current = shelves.get(sku) ?? computeAvailableUnits(1);
  shelves.set(sku, current);
}
