/*
  EXTERNE LINKS
  -------------
  Alle Verweise der Website auf den Shopify-Shop und auf Instagram an
  einer Stelle. Ändert sich eine Adresse, hier anpassen – Header, Hero,
  Kollektion, Kontakt und Footer übernehmen es automatisch.

  Alle Shop-Buttons führen auf die Startseite des Shops
  (https://shop.loefflersoul.de/). Von dort geht es zu allen Taschen; neue
  Modelle und Farben erscheinen dort automatisch, und kein Link führt ins
  Leere, wenn ein Einzelstück verkauft ist.

  TRACKING (UTM)
  Jeder Shop-Link trägt im Link mit, dass der Besuch von der Website kommt
  und über welchen Button (utm_content). In Shopify erscheinen diese Besuche
  unter der Quelle „loefflersoul.de“ – so wird sichtbar, wie viele Besuche
  und Käufe die Website bringt. Keine Cookies, keine personenbezogenen
  Daten, nur Angaben im Link.
*/

export const SHOP_URL = "https://shop.loefflersoul.de";

/** Startseite des Shops – Ziel aller Shop-Buttons */
const STARTSEITE = "/";

/**
 * Die beiden Größen als eigene Kollektion im Shop. Aktuell nicht verlinkt.
 * Sollen die Karten „Sling Kompakt“ und „Sling Standard“ direkt zur
 * passenden Größe führen, unten bei kollektionKompakt / kollektionStandard
 * den zweiten Wert ergänzen, z. B. shopLink("kollektion-kompakt", GROESSEN.kompakt).
 * Vorher im Shop prüfen, dass jede Kollektion nur Taschen ihrer Größe zeigt.
 */
export const GROESSEN = {
  kompakt: "/collections/sling-kompakt",
  standard: "/collections/sling-standard",
};

/**
 * Niedrigster Preis der Kollektion. Erscheint genau einmal auf der Seite
 * (Bereich „Die Kollektion“) und in der Google-Beschreibung.
 * Bei Preisänderungen im Shop hier mit anpassen.
 */
export const AB_PREIS = "269 €";

const UTM = {
  utm_source: "loefflersoul.de",
  utm_medium: "website",
  utm_campaign: "markenseite",
};

/**
 * Shop-Link mit Tracking.
 * @param platzierung wo der Link auf der Website sitzt (z. B. "hero-button")
 * @param pfad        Seite im Shop, standardmäßig die Startseite
 */
export function shopLink(platzierung: string, pfad: string = STARTSEITE): string {
  const query = new URLSearchParams({ ...UTM, utm_content: platzierung });
  return `${SHOP_URL}${pfad}?${query.toString()}`;
}

/** Alle Shop-Links der Website – jeder mit eigener Platzierung */
export const SHOP_LINKS = {
  headerButton: shopLink("header-button"),
  menueButton: shopLink("menue-button"),
  heroButton: shopLink("hero-button"),
  kollektionKompakt: shopLink("kollektion-kompakt"),
  kollektionStandard: shopLink("kollektion-standard"),
  versandkosten: shopLink("versandkosten", "/policies/shipping-policy"),
  kontakt: shopLink("kontakt"),
  footerButton: shopLink("footer-button"),
  footerVersand: shopLink("footer-versand", "/policies/shipping-policy"),
};

/** Instagram-Profil von LOEFFLER SOUL */
export const INSTAGRAM_URL = "https://www.instagram.com/loefflersoul";
export const INSTAGRAM_HANDLE = "@loefflersoul";
