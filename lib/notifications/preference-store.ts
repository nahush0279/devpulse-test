export function getPreference(userId: string, key: string): string {
  if (key === 'channel') return 'email';
  return 'default';
}
