import { getJurisdictionRate } from "./jurisdiction-lookup";
import { applyTaxRate } from "./tax-math";

export function calculateTax(amount: number, region: string): number {
  const rate = getJurisdictionRate(region);
  return applyTaxRate(amount, rate);
}
