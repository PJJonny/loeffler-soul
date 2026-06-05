import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

// Display-Schrift: warm, editorial – optische Größe wird in globals.css
// fest gepinnt, damit die Buchstaben gleichmäßig/gerade bleiben.
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
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
  title: "LOEFFLER SOUL – Handgefertigte Taschen mit Charakter",
  description:
    "Handgefertigte Taschen aus pflanzlich gegerbtem Vollnarbenleder. Entworfen für Jahre, nicht für Saisons. Kleine Chargen, ehrliche Materialien und echtes Handwerk.",
  keywords: [
    "handgefertigte Ledertaschen",
    "pflanzlich gegerbtes Leder",
    "Vollnarbenleder Tasche",
    "Ledertasche handgemacht",
    "kleine Lederwaren Manufaktur",
    "Crossbody Ledertasche",
  ],
  authors: [{ name: "LOEFFLER SOUL" }],
  creator: "LOEFFLER SOUL",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "LOEFFLER SOUL",
    title: "LOEFFLER SOUL – Handgefertigte Taschen mit Charakter",
    description:
      "Handgefertigte Taschen aus pflanzlich gegerbtem Vollnarbenleder. Entworfen, um mit der Zeit persönlicher zu werden.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LOEFFLER SOUL – Handgefertigte Taschen mit Charakter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOEFFLER SOUL – Handgefertigte Taschen mit Charakter",
    description:
      "Handgefertigte Taschen aus pflanzlich gegerbtem Vollnarbenleder. Entworfen für Jahre, nicht für Saisons.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
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

// Strukturierte Daten (helfen Google, die Marke zu verstehen)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: "LOEFFLER SOUL",
  url: SITE_URL,
  email: "loefflersoul@gmail.com",
  slogan: "Handgefertigte Taschen mit Charakter.",
  founder: { "@type": "Person", name: "Alina Loeffler" },
  description:
    "Handgefertigte Taschen aus pflanzlich gegerbtem Vollnarbenleder, in kleinen Chargen und eigener Handarbeit gefertigt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
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
