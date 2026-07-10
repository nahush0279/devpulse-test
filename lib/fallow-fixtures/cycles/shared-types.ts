export interface StockItem {
  itemId: string;
  quantity: number;
}

export interface WarehouseAllocation {
  itemId: string;
  spaceRequired: number;
}
