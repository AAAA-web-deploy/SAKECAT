/** Public-file prefix. Empty in local dev; `/SAKECAT` on GitHub Pages. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Use for canvas, CSS, and raw URLs. Do not wrap `next/image` src — it prefixes basePath itself. */
export function asset(path: string) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
