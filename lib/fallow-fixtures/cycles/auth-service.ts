import { formatUser } from "./user-service";

let tokenValid = true;
let validating = false;

export function validateToken(): boolean {
  if (!tokenValid) {
    return false;
  }

  if (validating) {
    return tokenValid;
  }

  // Runtime reference keeps this a real circular dependency, not type-only.
  validating = true;
  tokenValid = formatUser("session") !== "";
  validating = false;

  return tokenValid;
}
