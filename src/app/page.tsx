import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import VideoTestimonials from "@/components/VideoTestimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <HowItWorks />
      <Services />
      <VideoTestimonials />
      <CTA />
    </main>
  );
}
