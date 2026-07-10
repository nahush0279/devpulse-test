import { reserveShelfSpace } from "./warehouse-service";
import { resolveAvailableQuantity } from "./unit-quantity";

export function countAvailableUnits(sku: string, quantity: number): number {
  reserveShelfSpace(sku);

  return resolveAvailableQuantity(quantity);
}
