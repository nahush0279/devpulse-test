import { sendNotification } from './shared-notification-utils';

export function getPreference(userId: string): { emailEnabled: boolean } {
  return { emailEnabled: true };
}

export function updatePreference(userId: string, pref: { emailEnabled: boolean }): void {
  sendNotification('Preference updated');
}
