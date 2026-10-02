import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Erzeugt /sitemap.xml. Enthält nur Seiten, die in Google erscheinen sollen –
// Impressum und Datenschutz sind bewusst ausgenommen (noindex).
// Der Shop (shop.loefflersoul.de) hat seine eigene Sitemap von Shopify.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
