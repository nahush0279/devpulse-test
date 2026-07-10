import { processNotification } from './notification-core';

export function sendNotification(userId: string, message: string): void {
  processNotification(userId, message);
}
