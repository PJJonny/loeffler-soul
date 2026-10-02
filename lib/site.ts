/*
  WEBSITE & SUCHMASCHINEN (SEO)
  -----------------------------
  Zentrale Angaben für Google und für Link-Vorschauen (WhatsApp, Instagram,
  Facebook, iMessage …). Hier ändern – Layout, Startseite, Sitemap und
  robots.txt übernehmen es automatisch.

  Faustregeln: Titel höchstens ~60 Zeichen, Beschreibung höchstens
  ~155 Zeichen. Längere Texte schneidet Google in den Suchergebnissen ab.
*/
import { AB_PREIS, INSTAGRAM_URL, SHOP_URL } from "./shop";

/** Hauptadresse der Website – immer mit www (so ist die Domain bei Vercel eingerichtet) */
export const SITE_URL = "https://www.loefflersoul.de";
export const SITE_NAME = "LOEFFLER SOUL";

/** Titel in Google und im Browser-Tab */
export const SITE_TITLE = "LOEFFLER SOUL – Handgefertigte Ledertaschen vom Bodensee";

/** Beschreibung unter dem Titel in Google */
export const SITE_DESCRIPTION = `Handgefertigte Ledertaschen vom Bodensee: die Sling in Kompakt und Standard, als Crossbody oder Bauchtasche – jede ein Unikat. Ab ${AB_PREIS} im Shop.`;

/** Text für geteilte Links (WhatsApp, Instagram, Facebook …) */
export const SHARE_DESCRIPTION =
  "Die Sling in zwei Größen – Kompakt und Standard. In eigener Handarbeit gefertigt, in kleinen Chargen, jede Tasche ein Unikat.";

/** Vorschaubild für geteilte Links: /public/og-image.jpg (1200 × 630 px) */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Die Sling von LOEFFLER SOUL – handgefertigte Ledertasche auf dem Deck eines Segelboots",
};

/** Open-Graph-Angaben (Link-Vorschau), gemeinsam für Layout und Startseite */
export const OPEN_GRAPH = {
  type: "website" as const,
  locale: "de_DE",
  siteName: SITE_NAME,
  title: SITE_TITLE,
  description: SHARE_DESCRIPTION,
  images: [OG_IMAGE],
};

/**
 * Strukturierte Daten (schema.org) – helfen Google, Marke, Logo und
 * Website-Namen zu verstehen. Bewusst ohne Produkt- und Preisangaben:
 * Die liegen im Shopify-Shop, der dafür eigene strukturierte Daten ausliefert.
 */
export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Brand"],
      "@id": `${SITE_URL}/#brand`,
      name: SITE_NAME,
      alternateName: "Loeffler Soul",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 760,
        height: 701,
      },
      image: `${SITE_URL}${OG_IMAGE.url}`,
      email: "info@loefflersoul.de",
      slogan: "Handgefertigte Taschen mit Charakter.",
      description:
        "Handgefertigte Ledertaschen in eigener Handarbeit vom Bodensee, gefertigt in kleinen Chargen – überwiegend aus pflanzlich gegerbtem Rindleder, dazu Büffelnappa und geprägtes Büffelleder.",
      founder: { "@type": "Person", name: "Alina Loeffler" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Konstanz",
        addressRegion: "Baden-Württemberg",
        addressCountry: "DE",
      },
      areaServed: { "@type": "Country", name: "Deutschland" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@loefflersoul.de",
        availableLanguage: ["de"],
      },
      sameAs: [SHOP_URL, INSTAGRAM_URL],
      knowsAbout: [
        "Lederverarbeitung",
        "handgefertigte Ledertaschen",
        "pflanzlich gegerbtes Rindleder",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ["Loeffler Soul", "loefflersoul.de"],
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#brand` },
    },
  ],
};
