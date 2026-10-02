/*
  EXTERNE LINKS
  -------------
  Alle Verweise der Website auf den Shopify-Shop und auf Instagram an
  einer Stelle. Ändert sich eine Adresse (z. B. ein Kollektions-Handle),
  hier anpassen – Header, Hero, Kollektion, Kontakt und Footer übernehmen
  es automatisch.

  Alle Shop-Links führen bewusst auf die Gesamtkollektion statt auf
  einzelne Produkte oder Größen: Jede Farbe ist ein Einzelstück. Ist sie
  verkauft, führt der Link trotzdem nicht ins Leere, und neue Taschen
  erscheinen dort automatisch.

  TRACKING (UTM)
  Jeder Shop-Link trägt im Link mit, dass der Besuch von der Website kommt
  und über welchen Button (utm_content). In Shopify erscheinen diese Besuche
  unter der Quelle „loefflersoul.de“ – so wird sichtbar, wie viele Besuche
  und Käufe die Website bringt. Keine Cookies, keine personenbezogenen
  Daten, nur Angaben im Link.
*/

export const SHOP_URL = "https://shop.loefflersoul.de";

/** Alle Taschen – Ziel aller Shop-Links */
const GESAMTKOLLEKTION = "/collections/die-kollektion";

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
 * @param pfad        Seite im Shop, standardmäßig die Gesamtkollektion
 */
export function shopLink(platzierung: string, pfad: string = GESAMTKOLLEKTION): string {
  const query = new URLSearchParams({ ...UTM, utm_content: platzierung });
  return `${SHOP_URL}${pfad}?${query.toString()}`;
}

/** Alle Shop-Links der Website – jeder mit eigener Platzierung */
export const SHOP_LINKS = {
  navigation: shopLink("navigation"),
  headerButton: shopLink("header-button"),
  menueButton: shopLink("menue-button"),
  heroButton: shopLink("hero-button"),
  heroBild: shopLink("hero-bild"),
  // Nur eine Größe zeigen? Pfad ergänzen, z. B.
  // shopLink("kollektion-kompakt", "/collections/sling-kompakt")
  kollektionKompakt: shopLink("kollektion-kompakt"),
  kollektionStandard: shopLink("kollektion-standard"),
  versandkosten: shopLink("versandkosten", "/policies/shipping-policy"),
  kontakt: shopLink("kontakt"),
  footerButton: shopLink("footer-button"),
  footerNavigation: shopLink("footer-navigation"),
};

/** Instagram-Profil von LOEFFLER SOUL */
export const INSTAGRAM_URL = "https://www.instagram.com/loefflersoul";
export const INSTAGRAM_HANDLE = "@loefflersoul";
