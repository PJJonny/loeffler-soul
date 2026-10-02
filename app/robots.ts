import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Erzeugt /robots.txt: alles darf gelesen werden, plus Verweis auf die Sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
