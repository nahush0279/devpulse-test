export type NormalizableRecord = {
  sku: string;
  qty: number;
  unitPrice: number;
};

export function normalizeRecords<T extends NormalizableRecord>(records: T[]): T[] {
  return records
    .filter((item) => item.qty > 0 && item.unitPrice >= 0)
    .map((item) => ({
      ...item,
      sku: item.sku.trim().toUpperCase(),
      qty: Math.floor(item.qty),
      unitPrice: Math.round(item.unitPrice * 100) / 100,
    }))
    .sort((a, b) => a.sku.localeCompare(b.sku));
}
