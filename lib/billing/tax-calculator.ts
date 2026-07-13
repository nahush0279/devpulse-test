import { getJurisdictionRate } from "./jurisdiction-lookup";

export function calculateTax(amount: number, region: string): number {
  const rate = getJurisdictionRate(region);
  return Math.round(amount * rate * 100) / 100;
}
