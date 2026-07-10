import { NotificationPreference } from "./preference-store";

export interface QueueItem {
  id: string;
  userId: string;
  message: string;
  priority: "high" | "medium" | "low";
}

export function createQueueItem(userId: string, message: string): QueueItem {
  const preference = new NotificationPreference(userId, message.length > 100 ? "digest" : "immediate");
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    message,
    priority: preference.determinePriority(message),
  };
}

export class DeliveryQueue {
  private items: QueueItem[] = [];

  enqueue(item: QueueItem): void {
    this.items.push(item);
  }

  dequeue(): QueueItem | undefined {
    return this.items.shift();
  }

  get pendingCount(): number {
    return this.items.length;
  }
}
