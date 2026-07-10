import { deliverNotification } from "./delivery-queue";

export function getPreference(userId: string) {
  return {
    userId,
    blockedTypes: ["marketing"],
  };
}
