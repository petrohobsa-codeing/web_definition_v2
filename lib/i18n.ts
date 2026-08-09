import type { Lang } from "@/lib/translations";

/**
 * Picks the English variant of a field when the site is in English and a
 * translation exists, otherwise falls back to the Arabic original.
 *
 * All bilingual content in `lib/store.ts` follows the `field` / `fieldEn`
 * convention, so components can render either language without branching.
 */
export function tr<T>(lang: Lang, ar: T, en?: T | null): T {
  if (lang === "en" && en !== undefined && en !== null) {
    if (typeof en === "string" && en.trim() === "") return ar;
    if (Array.isArray(en) && en.length === 0) return ar;
    return en;
  }
  return ar;
}
