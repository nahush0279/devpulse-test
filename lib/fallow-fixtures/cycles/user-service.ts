import { validateToken } from "./auth-service";

export function formatUser(value: string): string {
  if (!validateToken()) {
    return value.trim();
  }

  return value.trim().toUpperCase();
}
