import { NotificationPreference } from './shared-types';

export class PreferenceStore {
  private preferences: Map<string, NotificationPreference> = new Map();

  getPreferences(userId: string): NotificationPreference | undefined {
    return this.preferences.get(userId);
  }

  setPreferences(userId: string, prefs: NotificationPreference): void {
    this.preferences.set(userId, prefs);
  }
}
