import { DEFAULT_SHELF_UNITS } from "./shelf-shared";

const shelves = new Map<string, number>();

export function reserveShelfSpace(sku: string): void {
  const current = shelves.get(sku) ?? DEFAULT_SHELF_UNITS;
  shelves.set(sku, current);
}
