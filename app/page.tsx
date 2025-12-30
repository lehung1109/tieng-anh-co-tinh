import { Contact1 } from "@/components/contact1";
import { Cta1 } from "@/components/cta";
import { Feature1 } from "@/components/feature1";
import { Footer1 } from "@/components/footer1";
import { Header1 } from "@/components/header";
import { Hero4 } from "@/components/hero";
import { Testimonial1 } from "@/components/testimonial1";

export default function Home() {
  return (
    <>
      <Header1 className="fixed top-0 z-50 w-full left-0 bg-background shadow-lg dark:shadow-gray-800/50" />
      <Hero4 id="hero" />
      <main id="main" className="scroll-mt-36 lg:scroll-mt-48">
        <Cta1
          id="advantage"
          href="#contact"
          className="scroll-mt-36 lg:scroll-mt-48"
        />
        <Feature1 id="roadmap" className="scroll-mt-36 lg:scroll-mt-48" />
        <Testimonial1 id="feedback" className="scroll-mt-36 lg:scroll-mt-48" />
        <Contact1 id="contact" className="scroll-mt-36 lg:scroll-mt-48" />
      </main>
      <Footer1 />
    </>
  );
}
