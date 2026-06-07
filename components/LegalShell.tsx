import Link from "next/link";
import Logo from "./Logo";
import Footer from "./Footer";

export default function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-container items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" aria-label="Zurück zur Startseite" className="text-ink">
            <Logo />
          </Link>
          <Link
            href="/"
            className="link-underline text-[0.72rem] uppercase tracking-wide text-ink"
          >
            ← Startseite
          </Link>
        </div>
      </header>

      <main id="hauptinhalt" className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
          <h1 className="font-display text-3xl font-normal text-ink sm:text-4xl">
            {title}
          </h1>

          <div className="legal-content mt-10 space-y-8 text-[0.95rem] leading-relaxed text-ink/80">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
