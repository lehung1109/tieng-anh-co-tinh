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
      <Header1 />
      <Hero4 />
      <main id="main">
        <Cta1 href="#contact" />
        <Feature1 />
        <Testimonial1 />
        <Contact1 />
      </main>
      <Footer1 />
    </>
  );
}
