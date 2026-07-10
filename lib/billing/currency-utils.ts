export function convertCurrency(amount: number, from: string, to: string): number {
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 1.18,
    GBP: 1.38,
  };
  return (amount / (rates[from] || 1)) * (rates[to] || 1);
}
