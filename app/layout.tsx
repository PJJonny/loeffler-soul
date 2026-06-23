import type { Metadata, Viewport } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Display-Schrift: Playfair Display – elegante Editorial-Serife mit
// senkrechter Achse (wirkt aufrecht/gerade), passt zum Logo-Schriftzug.
const display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

// Body-Schrift: ruhig, klar, sehr lesbar
const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://loefflersoul.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LOEFFLER SOUL – Handgefertigte Ledertaschen vom Bodensee",
    template: "%s — LOEFFLER SOUL",
  },
  description:
    "Handgefertigte Ledertaschen aus pflanzlich gegerbtem, nubukiertem Rindleder – die Sling als Bauchtasche und Crossbody, unisex, in kleinen Chargen am Bodensee gefertigt. Entworfen für Jahre, nicht für Saisons.",
  keywords: [
    "handgefertigte Ledertasche",
    "Sling Tasche Leder",
    "Bauchtasche Leder",
    "Crossbody Tasche unisex",
    "Ledertasche unisex",
    "pflanzlich gegerbtes, nubukiertes Rindleder",
    "nachhaltige Ledertasche",
    "Lederwaren Manufaktur Bodensee",
    "handgemachte Tasche Konstanz",
    "Bauchtasche Herren Damen",
  ],
  applicationName: "LOEFFLER SOUL",
  authors: [{ name: "LOEFFLER SOUL" }],
  creator: "Alina Loeffler",
  publisher: "LOEFFLER SOUL",
  category: "Lederwaren",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "LOEFFLER SOUL",
    title: "LOEFFLER SOUL – Handgefertigte Ledertaschen vom Bodensee",
    description:
      "Die Sling aus pflanzlich gegerbtem, nubukiertem Rindleder – als Bauchtasche und Crossbody, unisex. Handgefertigt in kleinen Chargen. Entworfen, um mit der Zeit persönlicher zu werden.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LOEFFLER SOUL – handgefertigte Ledertaschen, die Sling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOEFFLER SOUL – Handgefertigte Ledertaschen vom Bodensee",
    description:
      "Handgefertigte Ledertaschen aus pflanzlich gegerbtem, nubukiertem Rindleder. Die Sling – unisex, als Bauchtasche und Crossbody.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    // Vorgenerierte Flammen-Icons (Cremehintergrund + Cognac-Flamme).
    // Zum Ersetzen einfach die Dateien in /public überschreiben.
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// Strukturierte Daten (helfen Google, Marke & Produkt zu verstehen).
// Bewusst ohne Preis-/Kauf-Angebote, da es (noch) keinen Checkout gibt.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Brand"],
      "@id": `${SITE_URL}/#brand`,
      name: "LOEFFLER SOUL",
      url: SITE_URL,
      email: "loefflersoul@gmail.com",
      slogan: "Handgefertigte Taschen mit Charakter.",
      description:
        "Handgefertigte Ledertaschen aus pflanzlich gegerbtem, nubukiertem Rindleder, in kleinen Chargen und eigener Handarbeit am Bodensee gefertigt.",
      founder: { "@type": "Person", name: "Alina Loeffler" },
      areaServed: "DE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Konstanz",
        addressRegion: "Baden-Württemberg",
        addressCountry: "DE",
      },
      knowsAbout: [
        "Lederverarbeitung",
        "pflanzlich gegerbtes, nubukiertes Rindleder",
        "handgefertigte Taschen",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "LOEFFLER SOUL",
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#brand` },
    },
    {
      "@type": "Product",
      name: "Die Sling",
      brand: { "@id": `${SITE_URL}/#brand` },
      category: "Ledertasche",
      material: "Pflanzlich gegerbtes, nubukiertes Rindleder",
      description:
        "Kompakte Sling / Crossbody aus pflanzlich gegerbtem, nubukiertem Rindleder in zwei Größen (Standard & Kompakt), unisex, handgefertigt in kleinen Chargen.",
      image: [`${SITE_URL}/produkt-front.jpg`, `${SITE_URL}/getragen.jpg`],
      audience: { "@type": "PeopleAudience", suggestedGender: "unisex" },
      offers: [
        {
          "@type": "Offer",
          name: "Sling — Standard",
          price: "429",
          priceCurrency: "EUR",
          availability: "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
          url: `${SITE_URL}/#kontakt`,
          seller: { "@id": `${SITE_URL}/#brand` },
        },
        {
          "@type": "Offer",
          name: "Sling — Kompakt",
          price: "349",
          priceCurrency: "EUR",
          availability: "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
          url: `${SITE_URL}/#kontakt`,
          seller: { "@id": `${SITE_URL}/#brand` },
        },
      ],
    },
  ],
};

// Mobile/iOS/Android: korrektes Skalieren, Theme-Farbe, Safe-Areas (Notch).
// Zoom bleibt erlaubt (Barrierefreiheit) – maximumScale großzügig.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f3eee5",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <a href="#hauptinhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
