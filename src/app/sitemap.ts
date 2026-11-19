import type { MetadataRoute } from "next";
import { CONFIG } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: CONFIG.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
