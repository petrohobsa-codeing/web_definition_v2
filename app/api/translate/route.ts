import { NextResponse } from "next/server";

/**
 * Auto-translation fallback for admin-entered content (news, projects,
 * activities) that only exists in Arabic.
 *
 * All hand-written marketing copy is already bilingual in `lib/store.ts`,
 * so this only ever runs for rows the admin adds later. Results are cached
 * in memory per string, so each phrase is translated at most once per
 * server instance rather than on every page view.
 */

const cache = new Map<string, string>();
const MAX_CACHE = 2000;

async function translateOne(text: string, target: string): Promise<string> {
  const key = `${target}:${text}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;

  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
    encodeURIComponent(target) +
    "&dt=t&q=" +
    encodeURIComponent(text);

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    // translations for a given string never change; let the platform cache too
    next: { revalidate: 60 * 60 * 24 * 30 },
  });
  if (!res.ok) throw new Error(`translate upstream ${res.status}`);

  const data = await res.json();
  // shape: [[[translatedChunk, originalChunk, ...], ...], ...]
  const out = Array.isArray(data?.[0])
    ? data[0].map((c: unknown[]) => (Array.isArray(c) ? c[0] : "")).join("")
    : "";
  const result = out || text;

  if (cache.size >= MAX_CACHE) cache.clear();
  cache.set(key, result);
  return result;
}

export async function POST(req: Request) {
  try {
    const { texts, target = "en" } = await req.json();
    if (!Array.isArray(texts)) {
      return NextResponse.json({ error: "texts must be an array" }, { status: 400 });
    }

    const unique = Array.from(new Set(texts.filter((t) => typeof t === "string" && t.trim())));
    const pairs = await Promise.all(
      unique.map(async (t) => {
        try {
          return [t, await translateOne(t, target)] as const;
        } catch {
          return [t, t] as const; // fall back to the original on failure
        }
      })
    );

    return NextResponse.json({ translations: Object.fromEntries(pairs) });
  } catch {
    return NextResponse.json({ translations: {} }, { status: 200 });
  }
}
