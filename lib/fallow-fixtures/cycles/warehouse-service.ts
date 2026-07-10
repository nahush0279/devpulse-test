import { resolveAvailableQuantity } from "./unit-quantity";

const shelves = new Map<string, number>();

export function reserveShelfSpace(sku: string): void {
  const current = shelves.get(sku) ?? resolveAvailableQuantity(1);
  shelves.set(sku, current);
}
