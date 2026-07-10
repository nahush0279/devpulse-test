import { getPreference } from './preference-store';

export function enqueueDelivery(userId: string, message: string): void {
  const channel = getPreference(userId, 'channel');
  console.log(`Enqueuing ${message} for ${userId} via ${channel}`);
}
