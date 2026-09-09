import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
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
