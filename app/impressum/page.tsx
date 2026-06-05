import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Impressum – LOEFFLER SOUL",
  robots: { index: true, follow: true },
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[0.68rem] uppercase tracking-eyebrow text-stone">
      {children}
    </p>
  );
}

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <section>
        <Label>Angaben gemäß § 5 DDG</Label>
        <p>
          Alina Loeffler
          <br />
          Tägermoosstrasse 23a
          <br />
          78462 Konstanz, Deutschland
        </p>
      </section>

      <section>
        <Label>Kontakt</Label>
        <p>
          <a href="mailto:loefflersoul@gmail.com" className="link-underline text-ink">
            loefflersoul@gmail.com
          </a>
        </p>
      </section>

      <section>
        <Label>Inhaltlich verantwortlich (§ 18 Abs. 2 MStV)</Label>
        <p>Alina Loeffler, Anschrift wie oben</p>
      </section>

      <section>
        <Label>Verbraucherstreitbeilegung</Label>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </section>

      {/* Bei Verkaufsstart ergänzen, falls zutreffend: USt-IdNr. (§ 27a UStG)
          bzw. Kleinunternehmer-Hinweis (§ 19 UStG), Telefon, Registereintrag.
          Ersetzt keine Rechtsberatung. */}
    </LegalShell>
  );
}
