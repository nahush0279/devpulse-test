import { resolveRegionRate } from "./region-rates";

export function getJurisdictionRate(region: string): number {
  return resolveRegionRate(region);
}
