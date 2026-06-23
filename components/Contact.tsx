"use client";

import { useState } from "react";

/*
  KONTAKTFORMULAR — Anbindung an Web3Forms (kein Backend nötig)
  ------------------------------------------------------------
  1. Konto erstellen: https://web3forms.com  (kostenlos)
  2. Als Empfänger-E-Mail loefflersoul@gmail.com hinterlegen.
  3. Den "Access Key" kopieren.
  4. Lege im Projekt eine Datei .env.local an und trage ein:
        NEXT_PUBLIC_WEB3FORMS_KEY=dein-access-key
     (Alternativ direkt unten in ACCESS_KEY_FALLBACK eintragen.)

  Hinweis: Mit Web3Forms gehen alle Anfragen automatisch an die
  im Dashboard hinterlegte Adresse (loefflersoul@gmail.com).
  Eine Formspree-Alternative findest du in der README.
*/

const ACCESS_KEY_FALLBACK = "DEIN-WEB3FORMS-ACCESS-KEY";
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ACCESS_KEY_FALLBACK;

const INTERESSEN = [
  "Vorbestellung – Sling (Standard)",
  "Vorbestellung – Sling (Kompakt)",
  "Vorbestellung – Luna",
  "Produktanfrage",
  "Presse / Kooperation",
  "Sonstiges",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Sicherheitsnetz, falls der Key noch nicht gesetzt wurde
    if (ACCESS_KEY === ACCESS_KEY_FALLBACK) {
      setStatus("error");
      setErrorMsg(
        "Das Formular ist noch nicht verbunden. Bitte trage deinen Web3Forms-Access-Key ein (siehe README)."
      );
      return;
    }

    const payload = {
      access_key: ACCESS_KEY,
      subject: `Neue Anfrage über loefflersoul.de — ${data.get("interesse")}`,
      from_name: "loefflersoul.de",
      replyto: data.get("email"),
      name: data.get("name"),
      email: data.get("email"),
      interesse: data.get("interesse"),
      message: data.get("message"),
      botcheck: data.get("botcheck"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(
          result.message || "Etwas ist schiefgelaufen. Bitte versuche es erneut."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Verbindung fehlgeschlagen. Bitte versuche es später noch einmal oder schreibe uns direkt per E-Mail."
      );
    }
  }

  const fieldClass =
    "mt-2 w-full border border-line bg-cream px-4 py-3 text-[0.95rem] text-ink placeholder:text-stone/60 transition-colors focus:border-cognac focus:outline-none";
  const labelClass =
    "text-[0.68rem] uppercase tracking-eyebrow text-stone";

  return (
    <section id="kontakt" className="scroll-mt-36 border-t border-line bg-cream">
      <div className="mx-auto grid max-w-container gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-32">
        {/* Einleitung / direkter Kontakt */}
        <div>
          <p className="mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-eyebrow text-stone">
            <span className="h-px w-8 bg-cognac" />
            Kontakt
          </p>
          <h2 className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            Schreib uns.
          </h2>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-stone">
            Ob Produktanfrage, Vorbestellung, Presse oder einfach ein paar Worte
            zur Marke — wir freuen uns über jede Nachricht und antworten persönlich.
          </p>
          <div className="mt-10 border-t border-line pt-6">
            <p className={labelClass}>Direkt per E-Mail</p>
            <a
              href="mailto:loefflersoul@gmail.com"
              className="link-underline mt-2 inline-block font-display text-xl text-ink"
            >
              loefflersoul@gmail.com
            </a>
          </div>
        </div>

        {/* Formular */}
        <div className="border border-line bg-paper p-6 sm:p-10">
          {status === "success" ? (
            <div className="flex min-h-[20rem] flex-col items-start justify-center">
              <span className="font-display text-3xl font-normal text-ink">
                Danke für deine Nachricht.
              </span>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
                Sie ist bei uns angekommen. Wir melden uns persönlich bei dir.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="link-underline mt-8 text-[0.78rem] uppercase tracking-wide text-ink"
              >
                Weitere Anfrage senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot gegen Spam – für Menschen unsichtbar */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px]"
                aria-hidden="true"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span aria-hidden="true" className="text-cognac">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Vor- und Nachname"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    E-Mail <span aria-hidden="true" className="text-cognac">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="name@beispiel.de"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="interesse" className={labelClass}>
                  Dein Anliegen <span aria-hidden="true" className="text-cognac">*</span>
                </label>
                <select
                  id="interesse"
                  name="interesse"
                  required
                  defaultValue=""
                  className={`${fieldClass} appearance-none`}
                >
                  <option value="" disabled>
                    Bitte wählen
                  </option>
                  {INTERESSEN.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className={labelClass}>
                  Nachricht <span aria-hidden="true" className="text-cognac">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${fieldClass} resize-none`}
                  placeholder="Worum geht es?"
                />
              </div>

              <div className="mt-6 flex items-start gap-3">
                <input
                  id="datenschutz"
                  name="datenschutz"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-cognac"
                />
                <label
                  htmlFor="datenschutz"
                  className="text-[0.82rem] leading-relaxed text-stone"
                >
                  Ich habe die{" "}
                  <a
                    href="/datenschutz"
                    className="link-underline text-ink"
                    target="_blank"
                  >
                    Datenschutzhinweise
                  </a>{" "}
                  gelesen und bin einverstanden, dass meine Angaben zur
                  Bearbeitung meiner Anfrage verarbeitet werden.
                </label>
              </div>

              <p className="mt-5 text-[0.72rem] text-stone/80">
                <span aria-hidden="true" className="text-cognac">*</span> Pflichtfeld
              </p>

              {status === "error" && (
                <p
                  role="alert"
                  className="mt-6 border border-cognac/40 bg-cognac/5 px-4 py-3 text-sm text-cognac-deep"
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 text-[0.74rem] uppercase tracking-eyebrow text-cream transition-colors duration-300 hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Wird gesendet …" : "Anfrage senden"}
              </button>

              <p className="mt-4 text-[0.75rem] leading-relaxed text-stone/80">
                Deine Anfrage ist unverbindlich — es entsteht dadurch kein
                Kaufvertrag. Wir melden uns persönlich bei dir.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
