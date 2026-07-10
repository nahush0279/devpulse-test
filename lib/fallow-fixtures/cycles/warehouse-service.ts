import { WarehouseAllocation } from './shared-types';

export class WarehouseService {
  allocateSpace(itemId: string): void {
    console.log(`Allocating space for ${itemId}`);
  }

  checkCapacity(): number {
    return 100;
  }
}
