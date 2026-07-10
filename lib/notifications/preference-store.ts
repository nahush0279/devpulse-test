export type NotificationPreferences = {
  email: boolean;
  push: boolean;
  sms: boolean;
};

export function getPreferences(userId: string): NotificationPreferences {
  return { email: true, push: false, sms: true };
}
