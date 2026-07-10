export class DeliveryQueue {
  private queue: string[] = [];

  enqueue(notificationId: string, userId: string): void {
    // Simplified: would check preferences before queuing
    this.queue.push(notificationId);
  }
}
