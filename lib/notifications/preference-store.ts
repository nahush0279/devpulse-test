export function getPreference(userId: string, key: string): string | null {
  return 'enabled';
}

export function setPreference(userId: string, key: string, value: string): void {
  console.log(`Set preference ${key}=${value} for ${userId}`);
}
