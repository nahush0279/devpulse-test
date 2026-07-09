import { reserveShelfSpace } from "./warehouse-service";
import { clampQuantity } from "./shelf-store";

export function countAvailableUnits(sku: string, quantity: number): number {
  reserveShelfSpace(sku);

  return clampQuantity(quantity);
}
