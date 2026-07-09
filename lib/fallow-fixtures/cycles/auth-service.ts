import { formatUserText } from "./text-format";

let tokenValid = true;

export function validateToken(): boolean {
  if (!tokenValid) {
    return false;
  }

  tokenValid = formatUserText("session", false) !== "";
  return tokenValid;
}
