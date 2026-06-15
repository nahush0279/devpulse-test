import { formatUser } from "./user-service";

let tokenValid = true;

export function validateToken(): boolean {
  if (!tokenValid) {
    return false;
  }

  // Runtime reference keeps this a real circular dependency, not type-only.
  tokenValid = formatUser("session") !== "";
  return tokenValid;
}
