/**
 * cn — class name helper
 * Une clases CSS filtrando valores falsy.
 * No requiere dependencias externas.
 */
export function cn(
  ...classes: (string | undefined | null | false | 0)[]
): string {
  return classes.filter(Boolean).join(" ");
}
