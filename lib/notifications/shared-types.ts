export interface DeliveryTask {
  id: string;
  channel: string;
  payload: Record<string, unknown>;
  priority: number;
}

export interface NotificationChannel {
  type: 'email' | 'sms' | 'push';
  enabled: boolean;
  rate: number;
}

export function getChannelRate(type: string): number {
  const rates: Record<string, number> = {
    email: 10,
    sms: 5,
    push: 20,
  };
  return rates[type] ?? 0;
}
