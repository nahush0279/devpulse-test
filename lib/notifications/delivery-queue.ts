import { getPreference } from './preference-store';

export function enqueueNotification(userId: string, message: string): void {
  const preference = getPreference(userId, 'email');
  if (preference) {
    console.log(`Enqueued notification for ${userId}: ${message}`);
  }
}
