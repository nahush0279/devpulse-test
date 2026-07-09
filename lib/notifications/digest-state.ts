const digestState = new Map<string, boolean>();

export function readQuietHours(userId: string): boolean | undefined {
  return digestState.get(userId);
}

export function writeQuietHours(userId: string, quiet: boolean): void {
  digestState.set(userId, quiet);
}
