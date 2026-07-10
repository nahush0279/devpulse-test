import { getPreference } from "./preference-store";

export function deliverNotification(
  userId: string,
  notification: { type: string; message: string }
) {
  const prefs = getPreference(userId);
  if (prefs.blockedTypes.includes(notification.type)) return false;
  // ... delivery logic
  return true;
}
