import { NotificationPreferences } from "./preference-store";

export function enqueueNotification(userId: string) {
  const prefs = NotificationPreferences.get(userId);
  if (prefs) {
    return { sent: true, channel: prefs.channel };
  }
  return { sent: false };
}
