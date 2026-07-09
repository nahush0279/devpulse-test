export function formatUserText(value: string, uppercase: boolean): string {
  return uppercase ? value.trim().toUpperCase() : value.trim();
}
