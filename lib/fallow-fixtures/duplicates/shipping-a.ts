export function calculateStandardShipping(packageWeight: number, distance: number): number {
  const baseRate = 5.0;
  const weightRate = packageWeight * 0.5;
  const distanceRate = distance * 0.1;
  return baseRate + weightRate + distanceRate;
}
