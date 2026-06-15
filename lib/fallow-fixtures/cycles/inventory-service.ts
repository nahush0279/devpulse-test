import { reserveShelfSpace } from "./warehouse-service";

export function countAvailableUnits(sku: string, quantity: number): number {
  reserveShelfSpace(sku);

  if (quantity <= 0) {
    return 0;
  }

  return quantity;
}
