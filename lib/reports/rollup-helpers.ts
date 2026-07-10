import { standardizeAmount } from '../shared/amount-utils';

export function rollupTransactions(transactions: Array<{ value: number; currency: string }>): number {
  const standardized = transactions.map(tx => ({
    value: standardizeAmount(tx.value),
    currency: tx.currency
  }));
  return standardized.reduce((sum, tx) => sum + tx.value, 0);
}
