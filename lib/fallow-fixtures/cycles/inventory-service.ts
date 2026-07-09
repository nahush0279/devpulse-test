import { reserveShelfSpace } from "./warehouse-service";
import { computeAvailableUnits } from "./unit-count";

export function countAvailableUnits(sku: string, quantity: number): number {
  reserveShelfSpace(sku);

  return computeAvailableUnits(quantity);
}
