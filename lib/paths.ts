/** Public-file prefix. Empty in local dev; `/SAKECAT` on GitHub Pages. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public file. Unoptimized `next/image` does not add `basePath` on its own. */
export function asset(path: string) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
