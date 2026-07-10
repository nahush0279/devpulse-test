// Shared logic extracted to break circular dependency
// between delivery-queue.ts and preference-store.ts

export function getDefaultPreference(): string {
  return 'email';
}

export function logNotification(userId: string, message: string): void {
  console.log(`[NOTIFICATION] ${userId}: ${message}`);
}
