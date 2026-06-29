import type { MetadataRoute } from "next";

const BASE = "https://petrohop.sa";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/services/diesel-supply`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/gas-supply`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/water-supply`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/services/generators`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/projects`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/news`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/quote`, priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
