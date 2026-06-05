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
      <section>
        <Label>Verantwortlich</Label>
        <p>
          Alina Loeffler · Tägermoosstrasse 23a, 78462 Konstanz ·{" "}
          <a href="mailto:loefflersoul@gmail.com" className="link-underline text-ink">
            loefflersoul@gmail.com
          </a>
        </p>
      </section>

      <section>
        <Label>Hosting & Zugriff</Label>
        <p>
          Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden
          technisch notwendige Daten (u. a. IP-Adresse, Zugriffszeitpunkt)
          verarbeitet – Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <Label>Kontaktformular</Label>
        <p>
          Deine Angaben (Name, E-Mail, Interesse, Nachricht) verarbeiten wir
          ausschließlich zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b
          und f DSGVO). Der technische Versand läuft über den Dienst Web3Forms;
          wir speichern die Daten nur so lange, wie es dafür nötig ist.
        </p>
      </section>

      <section>
        <Label>Deine Rechte</Label>
        <p>
          Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit
          und Widerspruch (Art. 15–21 DSGVO) – eine formlose E-Mail genügt.
          Außerdem steht dir ein Beschwerderecht bei einer Aufsichtsbehörde zu.
        </p>
      </section>

      {/* Vor dem Livegang kurz prüfen lassen und ggf. um Punkte wie
          Auftragsverarbeitung oder Cookies ergänzen. Ersetzt keine Rechtsberatung. */}
    </LegalShell>
  );
}
