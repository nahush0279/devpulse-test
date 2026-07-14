import { reserveShelfSpace } from "./warehouse-service";
import { resolveAvailableUnits } from "./unit-availability";

export function countAvailableUnits(sku: string, quantity: number): number {
  reserveShelfSpace(sku);

  return resolveAvailableUnits(quantity);
}
