import { getJurisdictionRate } from "./jurisdiction-lookup";
import { computeTaxAmount } from "./tax-core_test";

export function calculateTax(amount: number, region: string): number {
  const rate = getJurisdictionRate(region);
  return computeTaxAmount(amount, rate);
}
