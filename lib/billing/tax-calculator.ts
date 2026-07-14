import { getJurisdictionRate } from "./jurisdiction-lookup";
import { applyRate } from "./tax-math";

export function calculateTax(amount: number, region: string): number {
  const rate = getJurisdictionRate(region);
  return applyRate(amount, rate);
}
