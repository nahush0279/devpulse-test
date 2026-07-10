import { getPreference } from './preference-store';
import { sendNotification } from './shared-notification-utils';

export function enqueueDelivery(userId: string, message: string): void {
  const pref = getPreference(userId);
  if (pref.emailEnabled) {
    sendNotification(message);
  }
}
