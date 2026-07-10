export class NotificationPreference {
  constructor(
    public readonly userId: string,
    public readonly deliveryMethod: "immediate" | "digest" | "suppressed"
  ) {}

  determinePriority(message: string): "high" | "medium" | "low" {
    if (message.includes("urgent") || message.includes("critical")) {
      return "high";
    }
    if (message.length > 100) {
      return "medium";
    }
    return "low";
  }

  shouldSend(priority: "high" | "medium" | "low"): boolean {
    if (this.deliveryMethod === "suppressed") return false;
    if (this.deliveryMethod === "digest" && priority === "low") return false;
    return true;
  }
}
