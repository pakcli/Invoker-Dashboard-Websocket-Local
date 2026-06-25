/**
 * Formats a card title by truncating it in the middle if it exceeds the maximum length,
 * while preserving the last 8 characters (e.g., "Comptia Network Plus Lab" -> "Comptia Net ..Plus Lab").
 */
export const formatCardTitle = (title: string, maxLength: number = 22): string => {
  if (!title) return '';
  if (title.length <= maxLength) return title;
  const lastPart = title.slice(-8);
  const firstPartLength = maxLength - 11; // maxLength - 3 (dots) - 8 (lastPart)
  const firstPart = title.slice(0, Math.max(3, firstPartLength));
  return `${firstPart} ..${lastPart}`;
};
