const digestState = new Map<string, boolean>();

export function getStoredQuietHours(userId: string): boolean | undefined {
  return digestState.get(userId);
}

export function setStoredQuietHours(userId: string, quiet: boolean): void {
  digestState.set(userId, quiet);
}
