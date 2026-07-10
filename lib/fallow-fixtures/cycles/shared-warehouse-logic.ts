// Shared logic extracted to break circular dependency
// between inventory-service.ts and warehouse-service.ts

export function getBaseCapacity(): number {
  return 100;
}
