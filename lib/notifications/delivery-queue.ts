import { getDefaultPreference } from './shared-utils';

export function enqueueNotification(userId: string, message: string): void {
  const pref = getDefaultPreference();
  if (pref === 'email') {
    // send email
  }
}
