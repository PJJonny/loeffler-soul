import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutz – LOEFFLER SOUL",
  robots: { index: false, follow: false },
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[0.68rem] uppercase tracking-eyebrow text-stone">
      {children}
    </p>
  );
}

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutz">
      <p className="text-ink/70">
        Der Schutz deiner Daten ist uns wichtig. Diese Seite arbeitet bewusst
        ohne Tracking, ohne Werbe-Cookies und ohne Analyse-Dienste. Nachfolgend
        erklären wir, welche Daten wann verarbeitet werden.
      </p>

      <section>
        <Label>Verantwortlicher</Label>
        <p>
          Alina Loeffler · Tägermoosstrasse 23a, 78462 Konstanz, Deutschland ·{" "}
          <a href="mailto:loefflersoul@gmail.com" className="link-underline text-ink">
            loefflersoul@gmail.com
          </a>
        </p>
      </section>

      <section>
        <Label>Allgemeines zur Datenverarbeitung</Label>
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit das für eine
          funktionsfähige Website und für die Bearbeitung deiner Anfragen
          erforderlich ist. Eine Weitergabe erfolgt ausschließlich an die unten
          genannten Dienstleister und nur im beschriebenen Umfang.
        </p>
      </section>

      <section>
        <Label>Hosting</Label>
        <p>
          Diese Website wird bei der Vercel Inc. (USA) gehostet. Vercel
          verarbeitet dabei in unserem Auftrag technische Daten, die dein
          Browser beim Aufruf übermittelt. Mit Vercel besteht ein Vertrag zur
          Auftragsverarbeitung; die Übermittlung in die USA wird auf geeignete
          Garantien (Standardvertragsklauseln) gestützt. Rechtsgrundlage ist
          unser berechtigtes Interesse an einem sicheren, stabilen Betrieb
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section>
        <Label>Server-Logfiles</Label>
        <p>
          Beim Aufruf der Seite werden automatisch Zugriffsdaten in
          Server-Logfiles erfasst: IP-Adresse, Datum und Uhrzeit, aufgerufene
          Seite, übertragene Datenmenge sowie Browser- und Systemangaben. Diese
          Daten dienen dem sicheren Betrieb und der Fehleranalyse, werden nicht
          mit anderen Quellen zusammengeführt und nur kurzfristig gespeichert
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section>
        <Label>Kontaktaufnahme per E-Mail</Label>
        <p>
          Wenn du uns direkt schreibst, verarbeiten wir deine Angaben zur
          Beantwortung deiner Nachricht. Unser Postfach läuft über Gmail
          (Google). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO.
        </p>
      </section>

      <section>
        <Label>Kontaktformular & Web3Forms</Label>
        <p>
          Das Kontaktformular übermitteln wir über den Dienst Web3Forms, der die
          Anfrage an unsere E-Mail-Adresse weiterleitet. Verarbeitet werden die
          von dir eingegebenen Daten (Name, E-Mail, Interesse, Nachricht). Der
          Versand erfolgt verschlüsselt (HTTPS); Web3Forms speichert
          Übermittlungen nach eigenen Angaben für 30 Tage und löscht sie
          anschließend automatisch. Grundlage ist deine Einwilligung über die
          Datenschutz-Checkbox sowie unser Interesse an der Bearbeitung deiner
          Anfrage (Art. 6 Abs. 1 lit. a und b DSGVO).
        </p>
      </section>

      <section>
        <Label>Empfänger & Drittlandübermittlung</Label>
        <p>
          Eingesetzte Dienstleister sind Vercel (Hosting), Web3Forms
          (Formularversand) und Google/Gmail (E-Mail-Empfang). Diese
          verarbeiten Daten ganz oder teilweise in den USA. Soweit eine
          Übermittlung in die USA stattfindet, stützt sie sich auf
          Standardvertragsklauseln bzw. – beim Formular – auf deine
          ausdrückliche Einwilligung (Art. 49 Abs. 1 lit. a DSGVO). Ein
          gleichwertiges Datenschutzniveau wie in der EU kann dabei nicht in
          jedem Fall garantiert werden.
        </p>
      </section>

      <section>
        <Label>Speicherdauer</Label>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für den
          jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen es verlangen. Anfragen werden gelöscht, sobald sie
          abschließend bearbeitet sind und keine Aufbewahrungspflicht besteht.
        </p>
      </section>

      <section>
        <Label>Verschlüsselung</Label>
        <p>
          Die Website nutzt eine SSL-/TLS-Verschlüsselung. Eine aktive
          Verschlüsselung erkennst du am „https://" in der Adresszeile deines
          Browsers.
        </p>
      </section>

      <section>
        <Label>Cookies & Tracking</Label>
        <p>
          Diese Website setzt keine nicht notwendigen Cookies und verwendet
          weder Analyse- noch Tracking- oder Marketing-Dienste. Ein
          Cookie-Banner ist daher nicht erforderlich.
        </p>
      </section>

      <section>
        <Label>Deine Rechte</Label>
        <p>
          Dir stehen die Rechte auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
          zu (Art. 15–21 DSGVO). Eine erteilte Einwilligung kannst du jederzeit
          mit Wirkung für die Zukunft widerrufen. Eine formlose Nachricht an uns
          genügt.
        </p>
      </section>

      <section>
        <Label>Beschwerderecht</Label>
        <p>
          Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
          beschweren, etwa bei der Behörde deines gewöhnlichen Aufenthaltsorts.
        </p>
      </section>
    </LegalShell>
  );
}
