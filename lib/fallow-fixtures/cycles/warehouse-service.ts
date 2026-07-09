import { getReservedQuantity, setReservedQuantity, clampQuantity } from "./shelf-store";

export function reserveShelfSpace(sku: string): void {
  const current = getReservedQuantity(sku) ?? clampQuantity(1);
  setReservedQuantity(sku, current);
}
