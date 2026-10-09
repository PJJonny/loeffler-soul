# LOEFFLER SOUL — Landingpage

Handgefertigte Landingpage für die Marke LOEFFLER SOUL.
Gebaut mit **Next.js 14 (App Router) · TypeScript · Tailwind CSS**.
Ohne Backend, ohne externe UI-Bibliotheken — direkt auf Vercel deploybar.

---

## 1. Lokal starten

Du brauchst **Node.js 18.17 oder neuer**. Prüfen mit `node -v`.

```bash
npm install      # Pakete installieren (einmalig)
npm run dev      # Entwicklungsserver starten
```

Danach im Browser öffnen: <http://localhost:3000>

Weitere Befehle:

```bash
npm run build    # Produktions-Build erzeugen
npm run start    # Produktions-Build lokal testen
```

> Hinweis: Beim ersten `npm run dev` / `npm run build` lädt Next.js die
> Schriften **Fraunces** und **Hanken Grotesk** automatisch von Google.
> Dafür ist beim Build eine Internetverbindung nötig — auf Vercel läuft das
> ohne dein Zutun.

---

## 2. Bilder & Logo einfügen

Alle Bilder liegen im Ordner **`/public`**. Die Seite zeigt dort aktuell
schlichte Platzhalter. Du musst nichts im Code ändern — **ersetze einfach die
Dateien durch deine eigenen Fotos und behalte die Dateinamen bei.**

### Welches Foto gehört wohin?

| Datei in `/public`   | Bereich der Seite              | Empfohlenes Format | Empfohlenes Foto                              |
| -------------------- | ------------------------------ | ------------------ | --------------------------------------------- |
| `hero.jpg`           | Großes Bild ganz oben (Hero)   | Hochformat ~3:4    | Tasche am Körper getragen, Motiv mittig (Tablets zeigen einen Querformat-Ausschnitt) |
| `sling-beige.jpg`    | Kollektion: Karte „Kompakt"    | Querformat 4:3     | Freigestelltes Produktfoto auf Creme          |
| `sling-braun.jpg`    | Kollektion: Karte „Standard"   | Querformat 4:3     | Freigestelltes Produktfoto auf Creme          |
| `kenia.jpg`          | Geschichte                     | Hochformat ~4:5    | Foto zur Gründungsgeschichte                  |
| `entwurf-*.jpg`      | Neue Entwürfe („Aus dem Atelier“) | Quadrat 1:1     | Entwurfsbild je neuem Modell                  |
| `getragen-see.jpg`, `getragen.jpg`, `getragen-wiese.jpg`, `getragen2.jpg` | Getragen (Galerie) | Hochformat 3:4 | Tasche am Körper |
| `produkt-detail.jpg`, `innen.jpg`, `futter.jpg` | Materialien: Details | Hochformat 3:4 | Nahaufnahmen von Leder, Beschlägen, Innenleben |
| `og-image.jpg`       | Vorschaubild beim Teilen       | Querformat 1200×630| Stärkstes Produktfoto (wird bei Links gezeigt)|

So gehst du vor:

1. Foto passend zuschneiden (siehe Format oben).
2. Als `.jpg` exportieren und **exakt** so benennen wie in der Tabelle.
3. Die gleichnamige Datei in `/public` überschreiben.
4. Seite neu laden — fertig.

> Tipp: Halte die JPGs unter ~300 KB (Breite max. 1600 px), das hält die
> Seite schnell. Tools wie <https://squoosh.app> komprimieren ohne sichtbaren
> Qualitätsverlust.

### Logo

Im Header und Footer wird standardmäßig eine **schlanke Flammen-Grafik als
Inline-SVG** plus der Schriftzug „LOEFFLER SOUL" gezeigt. Vorteil: gestochen
scharf in jeder Größe und passt sich hell/dunkel automatisch an — kein weißer
Kasten um ein Logo-Bild.

Willst du dein eigenes Logo-Bild verwenden:

1. Exportiere dein Logo mit **transparentem Hintergrund** als PNG oder SVG
   (das mitgelieferte Logo ist schwarz auf weiß — auf cremefarbenem/dunklem
   Grund bräuchtest du je eine helle und eine dunkle Variante).
2. Lege es als `/public/logo.png` ab.
3. Öffne `components/Logo.tsx` — oben im Datei-Kommentar steht der fertige
   Code-Schnipsel zum Einkleben.

### Favicon

Das Browser-Tab-Icon liegt als `/public/favicon.ico`, `/public/icon.png` und
`/public/apple-touch-icon.png` bereit (Cognac-Flamme auf Creme). Zum Ändern
einfach diese Dateien überschreiben.

---

## 3. Kontaktformular verbinden (Web3Forms)

Das Formular funktioniert **ohne eigenen Server**. Empfohlen ist **Web3Forms**
(kostenlos, anfängerfreundlich). Anfragen landen automatisch in deinem
E-Mail-Postfach.

1. Konto anlegen auf <https://web3forms.com> und
   `info@loefflersoul.de` als Empfängeradresse hinterlegen.
2. Den **Access Key** kopieren.
3. Im Projekt eine Datei **`.env.local`** anlegen (neben `package.json`) mit:

   ```bash
   NEXT_PUBLIC_WEB3FORMS_KEY=dein-access-key-hier
   ```

4. Entwicklungsserver neu starten (`npm run dev`). Fertig — Anfragen kommen
   per E-Mail an.

> Solange kein Key gesetzt ist, zeigt das Formular einen freundlichen Hinweis
> an, statt eine leere Anfrage zu verschicken.

**Auf Vercel:** den Key dort unter *Settings → Environment Variables*
eintragen (Name `NEXT_PUBLIC_WEB3FORMS_KEY`), siehe Abschnitt 4.

### Alternative: Formspree

Falls du lieber Formspree nutzt:

1. Konto auf <https://formspree.io>, neues Formular anlegen → du erhältst eine
   Endpunkt-URL wie `https://formspree.io/f/xxxxxx`.
2. In `components/Contact.tsx` die `fetch`-Adresse in der Funktion
   `handleSubmit` auf deine Formspree-URL ändern und im Body statt
   `access_key` einfach die Felder (`name`, `email`, `interesse`, `message`)
   senden. Formspree akzeptiert auch direkt das `FormData`-Objekt.

---

## 4. Auf Vercel deployen

1. **Code zu GitHub pushen** (oder GitLab/Bitbucket):

   ```bash
   git init
   git add .
   git commit -m "LOEFFLER SOUL Landingpage"
   git branch -M main
   git remote add origin https://github.com/DEIN-KONTO/loeffler-soul.git
   git push -u origin main
   ```

2. Auf <https://vercel.com> einloggen → **Add New… → Project** →
   dein Repository importieren. Vercel erkennt Next.js automatisch; alle
   Build-Einstellungen passen out of the box.

3. **Umgebungsvariable setzen:** unter *Settings → Environment Variables*
   `NEXT_PUBLIC_WEB3FORMS_KEY` mit deinem Access Key hinzufügen.

4. **Deploy** klicken. Nach wenigen Minuten ist die Seite unter einer
   `*.vercel.app`-Adresse live.

5. **Eigene Domain verbinden:** unter *Settings → Domains* `loefflersoul.de`
   hinzufügen und die angezeigten DNS-Einträge bei deinem Domain-Anbieter
   eintragen.

> Jeder neue `git push` löst automatisch ein neues Deployment aus.

---

## 5. Inhalte anpassen

| Was                         | Wo                                            |
| --------------------------- | --------------------------------------------- |
| Texte der Abschnitte        | jeweilige Datei in `components/`              |
| Signatur der Gründerin      | `components/Story.tsx`                        |
| Navigation / CTA            | `components/Header.tsx`                       |
| Shop- & Instagram-Links, Tracking | `lib/shop.ts`                           |
| „ab"-Preis der Kollektion   | `lib/shop.ts` (`AB_PREIS`)                    |
| Kollektion (Karten, Maße)   | `components/Collection.tsx`                   |
| Neue Entwürfe („Aus dem Atelier“) | `components/Innovation.tsx`             |
| Galerie „Getragen“          | `components/Worn.tsx`                         |
| Google: Titel, Beschreibung, Vorschaubild, strukturierte Daten | `lib/site.ts` |
| Farben & Schriften          | `app/globals.css` + `tailwind.config.ts`      |
| Impressum / Datenschutz     | `app/impressum/`, `app/datenschutz/`          |

> **Rechtstexte aktuell halten:** Impressum und Datenschutz sind ausgefüllt.
> Ändert sich etwas (Anschrift, Mitarbeitende, Umsatzsteuer-Status), dort und
> im Shop anpassen.

### Wenn weitere Hände mitfertigen

Heute fertigt Alina jede Tasche selbst. Das sagt die Seite auch, aber bewusst
nur an **zwei Stellen**. Alle anderen Aussagen („von Hand gefertigt“, „am
Bodensee“, „kleine Chargen“, „Unikat“) bleiben wahr, solange in Handarbeit in
der Region gefertigt wird. An dem Tag, an dem jemand anderes mitfertigt (Team
oder Partnerwerkstatt), diese beiden Stellen anpassen:

| Stelle | Heute | Dann |
| ------ | ----- | ---- |
| `components/Craft.tsx`, Satz unter den sechs Schritten | „Jede Tasche fertigt Alina Loeffler selbst …“ | z. B. „Gefertigt in Handarbeit am Bodensee – von Alina Loeffler und ihrem Team.“ |
| `components/Craft.tsx`, Überschrift | „Sechs bis acht Stunden, ein Paar Hände.“ | Bleibt, wenn weiterhin jede Tasche komplett von einer Person gefertigt wird – sonst „Sechs bis acht Stunden reine Handarbeit.“ |

Außerdem:

- Schritt 06 („bevor sie das Atelier verlässt“) stimmt, solange Endkontrolle
  und Versand bei euch bleiben.
- Shop-Texte und Instagram auf gleichlautende Aussagen durchsehen.
- Wird die Kleinunternehmergrenze überschritten: Hinweis „§ 19 UStG“ in
  `components/Collection.tsx` und im Shop entfernen, Preisangaben prüfen.

---

## 6. Google & Tracking

**Suchmaschinen.** Titel, Beschreibung, Vorschaubild und strukturierte Daten
stehen zentral in `lib/site.ts`. Die Seite liefert automatisch
`/robots.txt` und `/sitemap.xml` aus. Impressum und Datenschutz sind für
Besucher erreichbar, aber bewusst nicht in Google (noindex).

Einmalig in der [Google Search Console](https://search.google.com/search-console):

1. Property-Typ **Domain** wählen, `loefflersoul.de` eintragen und per
   DNS-Eintrag (TXT) beim Domain-Anbieter bestätigen. Das deckt Website
   *und* Shop ab.
2. Unter *Sitemaps* `https://www.loefflersoul.de/sitemap.xml` und
   `https://shop.loefflersoul.de/sitemap.xml` einreichen.

**Tracking (UTM).** Jeder Link von der Website in den Shop trägt
`utm_source=loefflersoul.de` und mit `utm_content` die Stelle, an der
geklickt wurde (z. B. `hero-button`, `kollektion-kompakt`). In Shopify
erscheinen diese Besuche unter der Quelle „loefflersoul.de". Alle Links
entstehen in `lib/shop.ts` (`SHOP_LINKS`).

---

## Projektstruktur

```
app/
  layout.tsx          Grundgerüst, Schriften, SEO/OG, strukturierte Daten
  page.tsx            Setzt alle Abschnitte zusammen
  globals.css         Designtokens (Farben), Basis-Styles, Animationen
  impressum/page.tsx  Impressum (noindex)
  datenschutz/page.tsx Datenschutz (noindex)
  robots.ts           Erzeugt /robots.txt
  sitemap.ts          Erzeugt /sitemap.xml
components/            Alle Seitenabschnitte (Header, Hero, … , Footer)
lib/shop.ts           Shop- & Instagram-Links, Tracking, „ab"-Preis
lib/site.ts           Google-Angaben: Titel, Beschreibung, strukturierte Daten
public/               Bilder, Logo-Optionen, Favicon
```
