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
| `hero.jpg`           | Großes Bild ganz oben (Hero)   | Hochformat ~3:4    | Tasche am Körper getragen (stimmungsvoll)     |
| `produkt-front.jpg`  | Erste Kollektion, Hauptbild    | Querformat ~4:3    | Freisteller/Produktfoto der Tasche            |
| `produkt-detail.jpg` | Patina-Abschnitt + Detailzeile | Quadrat 1:1        | Nahaufnahme: Leder, Prägung, Reißverschluss   |
| `getragen.jpg`       | Detailzeile „getragen"         | Hochformat ~3:4    | Person mit Tasche, Ganzkörper/halb            |
| `innen.jpg`          | Detailzeile „Innenleben"       | Querformat ~4:3    | Blick in die Tasche / Zugriff aufs Innenfach  |
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
   `loefflersoul@gmail.com` als Empfängeradresse hinterlegen.
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
| Gründer-Signatur            | `components/Story.tsx` (Platzhalter `Gründer`)|
| Navigation / CTA            | `components/Header.tsx`                       |
| Produkt-Spezifikationen     | `components/Collection.tsx`                   |
| SEO-Titel, Beschreibung, OG | `app/layout.tsx`                              |
| Farben & Schriften          | `app/globals.css` + `tailwind.config.ts`      |
| Impressum / Datenschutz     | `app/impressum/`, `app/datenschutz/`          |

> **Wichtig vor dem Livegang:** Impressum und Datenschutzerklärung enthalten
> nur Platzhalter. Ergänze sie mit deinen echten Angaben (Name, Anschrift,
> Kontakt, ggf. rechtliche Beratung), bevor die Seite öffentlich erreichbar
> ist.

---

## Projektstruktur

```
app/
  layout.tsx          Grundgerüst, Schriften, SEO/OG, strukturierte Daten
  page.tsx            Setzt alle Abschnitte zusammen
  globals.css         Designtokens (Farben), Basis-Styles, Animationen
  impressum/page.tsx  Platzhalterseite
  datenschutz/page.tsx Platzhalterseite
components/            Alle Seitenabschnitte (Header, Hero, … , Footer)
public/               Bilder, Logo-Optionen, Favicon
```
