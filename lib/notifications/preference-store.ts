import { logNotification } from './shared-notification-utils';

export function getPreference(userId: string): string {
  logNotification(userId, 'preference-check');
  return 'email';
}
