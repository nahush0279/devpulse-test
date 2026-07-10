import { processNotification } from './notification-core';

export function getPreference(userId: string): string {
  processNotification(userId, 'fetching pref');
  return 'email';
}
