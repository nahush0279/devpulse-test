import { countAvailableUnits } from "./inventory-service";

const shelves = new Map<string, number>();

export function reserveShelfSpace(sku: string): void {
  const current = shelves.get(sku) ?? countAvailableUnits(sku, 1);
  shelves.set(sku, current);
}
