import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <Trust />
      <Testimonials />
      <CTA />
    </main>
  );
}
