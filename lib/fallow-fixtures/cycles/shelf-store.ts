const shelves = new Map<string, number>();

export function getReservedQuantity(sku: string): number | undefined {
  return shelves.get(sku);
}

export function setReservedQuantity(sku: string, quantity: number): void {
  shelves.set(sku, quantity);
}

export function clampQuantity(quantity: number): number {
  return quantity <= 0 ? 0 : quantity;
}
