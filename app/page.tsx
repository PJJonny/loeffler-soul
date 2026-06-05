import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import Collection from "@/components/Collection";
import Patina from "@/components/Patina";
import Craft from "@/components/Craft";
import Materials from "@/components/Materials";
import Story from "@/components/Story";
import Principles from "@/components/Principles";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="hauptinhalt">
        <Hero />
        <Manifest />
        <Collection />
        <Patina />
        <Craft />
        <Materials />
        <Story />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
