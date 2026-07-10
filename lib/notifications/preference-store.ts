export class NotificationPreferences {
  static store: Map<string, { channel: string }> = new Map();
  
  static get(userId: string) {
    return this.store.get(userId);
  }
  
  static set(userId: string, prefs: { channel: string }) {
    this.store.set(userId, prefs);
  }
}
