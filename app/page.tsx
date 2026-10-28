import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import Collection from "@/components/Collection";
import Worn from "@/components/Worn";
import Craft from "@/components/Craft";
import Materials from "@/components/Materials";
import Story from "@/components/Story";
import Innovation from "@/components/Innovation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { LightboxProvider } from "@/components/Lightbox";
import { OPEN_GRAPH } from "@/lib/site";

// Startseite: eindeutige Hauptadresse für Google (Canonical) und Link-Vorschau
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...OPEN_GRAPH, url: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="hauptinhalt">
        {/* Großansicht für alle Fotos (components/Lightbox.tsx) */}
        <LightboxProvider>
          <Hero />
          <Collection />
          <Worn />
          <Manifest />
          <Craft />
          <Materials />
          <Story />
          <Innovation />
          <Contact />
        </LightboxProvider>
      </main>
      <Footer />
    </>
  );
}
