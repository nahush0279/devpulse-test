import { NotificationPreference } from './shared-types';

export class DeliveryQueue {
  private queue: string[] = [];

  add(notificationId: string): void {
    this.queue.push(notificationId);
  }

  process(): void {
    // Get user preferences and process
    console.log('Processing delivery queue');
  }
}
