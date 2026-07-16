import { getJurisdictionRate } from "./jurisdiction-lookup";
import { applyRate } from "./rate-math";

export function calculateTax(amount: number, region: string): number {
  const rate = getJurisdictionRate(region);
  return applyRate(amount, rate);
}
