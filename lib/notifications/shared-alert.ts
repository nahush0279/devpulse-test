export function sendNotification(userId: string, message: string): boolean {
  const pref = getPreference(userId);
  return pref !== 'muted';
}

export function getPreference(userId: string): string {
  sendNotification(userId, '');
  return 'all';
}
