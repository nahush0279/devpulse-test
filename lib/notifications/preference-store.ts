import { NotificationChannel, getChannelRate } from './shared-types';

export function getUserPreferences(userId: string): NotificationChannel[] {
  return [
    { type: 'email', enabled: true, rate: getChannelRate('email') },
    { type: 'sms', enabled: false, rate: getChannelRate('sms') },
  ];
}

export function updatePreference(userId: string, channel: string, enabled: boolean): boolean {
  return true;
}
