import type { Metadata, Viewport } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import {
  OG_IMAGE,
  OPEN_GRAPH,
  SHARE_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  STRUCTURED_DATA,
} from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — LOEFFLER SOUL",
  },
  description: SITE_DESCRIPTION,
  // Von Google kaum noch genutzt, schadet aber nicht.
  keywords: [
    "handgefertigte Ledertasche",
    "Ledertasche handgemacht",
    "Sling Bag Leder",
    "Sling Tasche Leder",
    "Bauchtasche Leder",
    "Crossbody Tasche Leder",
    "Ledertasche unisex",
    "Ledertasche Unikat",
    "Ledertasche Bodensee",
    "Ledertasche Konstanz",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: "Alina Loeffler", url: SITE_URL }],
  creator: "Alina Loeffler",
  publisher: SITE_NAME,
  category: "Lederwaren",
  // Canonical & og:url setzt jede Seite selbst (siehe app/page.tsx),
  // damit Unterseiten nicht auf die Startseite verweisen.
  openGraph: OPEN_GRAPH,
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE.url],
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
  // Verhindert, dass iOS Maße oder Zahlen als Telefonnummern verlinkt
  formatDetection: { telephone: false, address: false, email: false },
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
        {/* Ohne JavaScript: eingeblendete Inhalte sofort sichtbar */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.reveal{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <a href="#hauptinhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </body>
    </html>
  );
}
