export function getFlagPath(countryCode: string | null): string | null {
  if (!countryCode) {
    return null;
  }
  return `/flag-svg/${countryCode.toLowerCase()}.svg`;
}
