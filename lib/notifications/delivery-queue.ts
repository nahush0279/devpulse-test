import { getDefaultPreference } from './shared-notification-utils';

export function sendNotification(userId: string, message: string): void {
  const pref = getDefaultPreference();
  if (pref !== 'email') return;
  console.log(`[DELIVERY] ${userId}: ${message}`);
}
