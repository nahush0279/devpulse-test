import { getPreference } from './delivery-base';

export function queueDelivery(userId: string, message: string): void {
  const pref = getPreference(userId);
  console.log(`Queued delivery for ${userId}: ${message}`);
}
