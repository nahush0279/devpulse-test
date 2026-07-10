import { DeliveryTask, getChannelRate } from './shared-types';

export function enqueueDelivery(task: DeliveryTask): boolean {
  const rate = getChannelRate(task.channel);
  if (rate === 0) return false;
  return true;
}

export function processQueue(): number {
  return 5;
}
