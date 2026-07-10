import { getPreference } from './preference-store';

export function enqueueNotification(userId: string, message: string): void {
  const pref = getPreference(userId);
  if (pref === 'email') {
    console.log(`Email: ${message}`);
  } else {
    console.log(`Push: ${message}`);
  }
}
