export function calculateShippingCost(weight: number, destination: string): number {
  const baseRate = 5.00;
  const weightSurcharge = weight * 0.50;
  const destinationMultiplier = destination === 'international' ? 2.5 : 1.0;
  return (baseRate + weightSurcharge) * destinationMultiplier;
}
