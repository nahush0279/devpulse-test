import { type NotificationPreference } from './notification-types';

export function getPreference(userId: string): NotificationPreference {
  return 'email';
}
